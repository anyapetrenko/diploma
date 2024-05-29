const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const pubsub = require('../pubSub');
import { withFilter } from 'graphql-subscriptions';




export default class Surrender {
  static resolver() {
    return {
      Query: {
        surrenders:async(obj, {puzzleStatId}, context, info) => {
          return await models.Surrender.findAll({where:{puzzleStatId}});
        },
      },
      Subscription:{
        puzzleWasGaveUp:{
          subscribe: withFilter( 
            () => pubsub.asyncIterator('PUZZLE_WAS_GAVE_UP'),
            (payload,variables) => {
              if(payload.puzzleWasGaveUp.dataToCheck.eventId !== variables.eventId) return false;
              if(variables.teamEventId === -1 || payload.puzzleWasGaveUp.dataToCheck.teamEventId === variables.teamEventId) return true;
              else return false;
            }
          )
        }
      },
      Surrender:{
        puzzleStats: (surrender) => surrender.getPuzzleStats()
      },
      Mutation: {
        giveUp: async (obj, {puzzleStatId,teamEventId,puzzleId,url_code}, context, info) => {
          const length = (await models.Answer.findAll({where:{teamEventId}})).length + 1;

          let teamEvent = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
              include:{
                model:models.Game,
                include:{
                  model:models.Part,
                  order:[['order','ASC']],
                  limit:1,
                  offset:length,
                }
              }
            }
          });

          //Get Time Of Start
          const gameStartTime = Date.parse(teamEvent.Event.dataValues.start_datetime);

          //Get Time we Spen for Answer
          const answers = await models.Answer.findOne({where:{teamEventId},order:[['createdAt','DESC']]})
          const newAnswer = await models.Answer.create({teamEventId});
          let answerTime;
          if(!answers) answerTime = (Date.parse(newAnswer.dataValues.createdAt) - gameStartTime)/1000;
          else answerTime = ((Date.parse(newAnswer.dataValues.createdAt) - Date.parse(answers.dataValues.createdAt))/1000);
          await models.PuzzleStat.update({time_used:answerTime},{where:{id:puzzleStatId}})

          //Check if last Answer
          const partsNumber = teamEvent.Event.Game.dataValues.parts_number;
          if(partsNumber === length) {
            models.TeamEvent.update({total_time:(Date.parse(newAnswer.dataValues.createdAt) - gameStartTime)/1000},{where:{id:teamEventId}});
          }

          //Change score
          const POINTS_FOR_HINT = process.env.POINTS_FOR_HINT;
          const POINTS_FOR_SURRENDER = process.env.POINTS_FOR_SURRENDER;
          const DEFAULT_POINTS = process.env.DEFAULT_PART_POINTS;

          let points = DEFAULT_POINTS - POINTS_FOR_SURRENDER;
          const usedHints = await models.UsedHint.findAll({where:{puzzleStatId}});
          points -= (usedHints.length*POINTS_FOR_HINT);
          await models.TeamEvent.increment("score",{by:points,where:{url_code}});

          //Set team places
          let currentEvent = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
            },
          });
          let allTeamEvents = await models.TeamEvent.findAll({
            where:{eventId:currentEvent.Event.id},
            order:[['score','DESC']]
          });
          allTeamEvents.map(async(elem,index)=>{
            await models.TeamEvent.update({place:index+1},{where:{id:elem.dataValues.id}})
          })


          const teamEvId = currentEvent.dataValues.id;
          const eventId = currentEvent.Event.dataValues.id


          const newPart = teamEvent.Event.Game.Parts[0];
          const newSurrender = await models.Surrender.create({puzzleStatId});
          pubsub.publish('PUZZLE_WAS_GAVE_UP',{puzzleWasGaveUp:{newAnswer,newSurrender,newPart,url_code,dataToCheck:{eventId,teamEventId:teamEvId}}});
          return {newAnswer,newSurrender,newPart};
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Surrender {
            id: Int
            puzzleStatId: Int
            createdAt: String
            puzzleStats: PuzzleStats
        }

        input SurrenderInput {
            puzzleStatId: Int
            createdAt: String
        }
    `;
  }
}
