const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class Puzzle {
  static resolver() {
    return {
      Query: {
        getPuzzle: async(obj, {id}, context, info) => {
            return await models.Puzzle.findByPk(id);
        }
      },
      Puzzle: {
        hints: (puzzle) => puzzle.getHints(),
        puzzle_stat: (puzzle) => puzzle.getPuzzleStat()
      },
      Mutation: {
        addPuzzle: async (obj, {input}, context, info) => {
            return await models.Puzzle.create(input);
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Puzzle {
            id: Int
            answer_format: String
            answer: String
            hints: [Hint]
            puzzle_stat: PuzzleStats
        }

        input PuzzleInput {
            answer_format: String
            answer: String
        }
    `;
  }
}
