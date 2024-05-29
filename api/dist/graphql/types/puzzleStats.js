'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class PuzzleStats {
  static resolver() {
    return {
      Query: {
        puzzleStats: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function puzzleStats(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })(),
        puzzleStatsNumbers: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function puzzleStatsNumbers(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      },
      PuzzleStats: {
        mistakes: puzzleStats => puzzleStats.getMistakes(),
        used_hints: puzzleStats => puzzleStats.getUsedHints(),
        surrenders: puzzleStats => puzzleStats.getSurrenders(),
        puzzle: puzzleStats => puzzleStats.getPuzzle(),
        answer: puzzleStats => puzzleStats.getAnswer()
      },
      Mutation: {
        addPuzzleStats: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { input }, context, info) {
            return yield models.PuzzleStats.create(input);
          });

          return function addPuzzleStats(_x9, _x10, _x11, _x12) {
            return _ref3.apply(this, arguments);
          };
        })()
      }
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
exports.default = PuzzleStats;