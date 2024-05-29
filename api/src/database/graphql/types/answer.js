const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const pubsub = require('../pubSub');
import { withFilter } from 'graphql-subscriptions';



export default class Answer {
  static resolver() {
    return {
      Query: {
        answers: async(obj, {teamEventId}, context, info) => {
            return await models.Answer.findAll({where:{teamEventId}});
        }
      },
      Subscription:{
        puzzleWasSolved:{
          subscribe: withFilter( 
            () => pubsub.asyncIterator('PUZZLE_WAS_SOLVED'),
            (payload,variables) => {
              if(payload.puzzleWasSolved.dataToCheck.eventId !== variables.eventId) return false;
              if(variables.teamEventId === -1 || payload.puzzleWasSolved.dataToCheck.teamEventId === variables.teamEventId) return true;
              else return false;
            }
          )}
      },
      Mutation: {
        sendAnswer: async (obj, {puzzleStatId,puzzleId,url_code,teamEventId}, context, info) => {
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
          // const TIME_FINES = [1,15,30];
          // const FINE_AMMOUNT = 5;
          const DEFAULT_POINTS = process.env.DEFAULT_PART_POINTS;
          let points = DEFAULT_POINTS;
          const usedHints = await models.UsedHint.findAll({where:{puzzleStatId}});
          points -= (usedHints.length*POINTS_FOR_HINT);
          // TIME_FINES.map(elem=>{
          //   if((elem*60) < answerTime) points -= FINE_AMMOUNT
          // })
          await models.TeamEvent.increment("score",{by:points,where:{url_code}});

          //Add data to DB and return it to Client
          let newPart = teamEvent.Event.Game.Parts[0];

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


        
          pubsub.publish('PUZZLE_WAS_SOLVED',{puzzleWasSolved:{newPart,newAnswer,url_code,dataToCheck:{eventId,teamEventId:teamEvId}}});
          return {newPart,newAnswer}
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Answer {
            id: Int,
            teamEventId: Int
            createdAt: String
            blocking: String
        }

        input AnswerInput {
            puzzleStatId: Int
            createdAt: String
        }
    `;
  }
}
