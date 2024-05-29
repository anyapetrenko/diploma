const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const pubsub = require('../pubSub');
import { withFilter } from 'graphql-subscriptions';



export default class Mistake {
  static resolver() {
    return {
      Query: {
        mistakes: async(obj, {puzzleStatId}, context, info) => {
            return await models.Mistake.findAll({where:{puzzleStatId},order: [['createdAt', 'DESC']]});
        }
      },
      Subscription:{
        puzzleWasUnsolved:{
          subscribe: withFilter( 
            () => pubsub.asyncIterator('PUZZLE_WAS_UNSOLVED'),
            (payload,variables) => {
              if(payload.dataToCheck.eventId !== variables.eventId) return false;
              if(variables.teamEventId === -1 || payload.dataToCheck.teamEventId === variables.teamEventId) return true;
              else return false;
            }
          )
        }
      },
      Mistake:{
        puzzleStats: (mistake) => mistake.getPuzzleStats()
      },
      Mutation: {
        sendMistake: async (obj, {puzzleStatId,puzzleId,text,url_code}, context, info) => {
          const currentEvent = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
            },
          });
          const teamEventId = currentEvent.dataValues.id;
          const eventId = currentEvent.Event.dataValues.id

          const data = await models.Mistake.create({puzzleStatId,text});
          pubsub.publish('PUZZLE_WAS_UNSOLVED',{puzzleWasUnsolved:data,dataToCheck:{eventId,teamEventId}});
          return data;
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Mistake {
            id: Int,
            puzzleStatId: Int
            createdAt: String
            text:String
            blocking: String
            puzzleStats: PuzzleStats
        }

        input MistakeInput {
            puzzleStatId: Int
            createdAt: String
            text:String
        }
    `;
  }
}
