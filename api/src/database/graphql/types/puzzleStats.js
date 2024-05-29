const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class PuzzleStats {
  static resolver() {
    return {
      Query: {
        puzzleStats:async(obj, {url_code}, context, info) => {
          return await models.TeamEvent.findOne({where:{url_code}});
        },
        puzzleStatsNumbers:async(obj, {url_code}, context, info) => {
          return await models.TeamEvent.findOne({where:{url_code}});
        }
      },
      PuzzleStats:{
        mistakes: (puzzleStats) => puzzleStats.getMistakes(),
        used_hints: (puzzleStats) => puzzleStats.getUsedHints(),
        surrenders: (puzzleStats) => puzzleStats.getSurrenders(),
        puzzle: (puzzleStats) => puzzleStats.getPuzzle(),
        answer: (puzzleStats) => puzzleStats.getAnswer()
      },
      Mutation: {
        addPuzzleStats: async (obj, {input}, context, info) => {
            return await models.PuzzleStats.create(input);
        },
      },
    };
  }

  static typeDefs() {
    return `
        type PuzzleStats {
            id: Int
            teamEventId: Int
            puzzleId: Int
            puzzle: Puzzle
            time_used: Int
            mistakes: [Mistake]
            used_hints: [UsedHint]
            surrenders: [Surrender]
            answer: Answer
        }

        input PuzzleStatsInput {
            teamEventId: Int
            puzzleId: Int
            time_used: Int
        }
    `;
  }
}
