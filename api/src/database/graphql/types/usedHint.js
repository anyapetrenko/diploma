const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class UsedHint {
  static resolver() {
    return {
      Query: {
        usedHints:async(obj, {puzzleStatId}, context, info) => {
          return await models.UsedHint.findAll({where:{puzzleStatId}});
        },
      },
    };
  }

  static typeDefs() {
    return `
        type UsedHint {
            id: Int
            puzzleStatId: String
            createdAt: String
            puzzleId: Int
        }

        input UsedHintInput {
            puzzleStatId: Int
            createdAt: String
        }
    `;
  }
}
