const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
import { withFilter } from 'graphql-subscriptions';
const pubsub = require('../pubSub');



export default class Hint {
  static resolver() {
    return {
      Query: {
        hints: async(obj, {puzzleId,puzzleStatId}, context) => {
            const length = (await models.UsedHint.findAll({where:{puzzleStatId}})).length + 1;
            const hints = await models.Hint.findAll({where:{puzzleId},limit:length});
            return hints;
            // return await models.Hint.findAll({where:{puzzleId}});
        }
      },
      Hint:{
        puzzle: (hint) => hint.getPuzzle()
      },
      Subscription:{
        hintWasUsed:{
          subscribe: withFilter( 
            () => pubsub.asyncIterator('HINT_WAS_USED'),
            (payload,variables) => {
              if(payload.hintWasUsed.dataToCheck.eventId !== variables.eventId) return false;
              if(variables.teamEventId === -1 || payload.hintWasUsed.dataToCheck.teamEventId === variables.teamEventId) return true;
              else return false;
            }
          )
        }
      },
      Mutation: {
        addHint: async (obj, {input}, context) => {
            return await models.Hint.create(input);
        },
        useHint: async (obj, {puzzleStatId,puzzleId,url_code}, context, info) => {
          const currentEvent = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
            },
          });
          const teamEventId = currentEvent.dataValues.id;
          const eventId = currentEvent.Event.dataValues.id

          const length = (await models.UsedHint.findAll({where:{puzzleStatId}})).length + 1;
          const newHint = await models.Hint.findOne({where:{puzzleId},order:[['order','ASC']],limit:1,offset:length});
          const newUsedHint = await models.UsedHint.create({puzzleStatId});
          pubsub.publish('HINT_WAS_USED',{hintWasUsed:{newHint,newUsedHint,url_code,dataToCheck:{eventId,teamEventId}}});
          return {newHint,newUsedHint};
          return await models.UsedHint.create({puzzleStatId});
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Hint {
            id: Int
            puzzleId: Int
            puzzle: Puzzle
            text: String
            order: Int
        }

        input HintInput {
            teamEventId: Int,
            puzzleId: Int,
            puzzleStatId:Int,
            url_code:String
        }
    `;
  }
}
