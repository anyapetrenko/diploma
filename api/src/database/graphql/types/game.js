const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class Game {
  static resolver() {
    return {
      Query: {
        currentGame: async(obj, {url_code}, context, info) => {
          return await models.TeamEvent.findOne({where:{url_code}});
        },
        games: async(obj, {}, context, info) => {
          return await models.Game.findAll();
        },
      },
      Game:{
        parts: (game) => game.getParts()
      },
      Mutation: {
        addGame: async (obj, {input}, context, info) => {
            return await models.Game.create(input);
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Game {
            id: Int
            name: String
            parts: [Part]
            description_short: String
            beginning_text: String
            final_text: String
            image: String
            top_image: String
            final_image: String
            bg_image: String
            parts_number: Int
        }

        input GameInput {
            name: String
            description_short: String
            image: String
            parts_number: Int
        }
    `;
  }
}
