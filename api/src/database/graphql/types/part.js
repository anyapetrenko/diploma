const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class Part {
  static resolver() {
    return {
      Query: {
        parts: async(obj, {url_code,teamEventId}, context, info) => {
          const length = (await models.Answer.findAll({where:{teamEventId}})).length + 1;

          let data = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
              include:{
                model:models.Game,
                include:{
                  model:models.Part,
                  limit:length,
                  order:[['order','ASC']]
                }
              }
            }
          });
          return data.Event.Game.Parts;
        }
      },
      Part:{
        puzzle: (part) => part.getPuzzle()
      },
      Mutation: {
        addPart: async (obj, {input}, context, info) => {
            return await models.Part.create(input);
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Part {
            id: Int
            gameId: Int
            puzzleId: Int
            part_name: String
            file: String
            order: Int
            puzzle: Puzzle
        }

        input PartInput {
            gameId: Int
            puzzleId: Int
            part_name: String
            file: String
            order:Int
        }
    `;
  }
}
