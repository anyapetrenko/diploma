'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class Puzzle {
  static resolver() {
    return {
      Query: {
        getPuzzle: (() => {
          var _ref = _asyncToGenerator(function* (obj, { id }, context, info) {
            return yield models.Puzzle.findByPk(id);
          });

          return function getPuzzle(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Puzzle: {
        hints: puzzle => puzzle.getHints(),
        puzzle_stat: puzzle => puzzle.getPuzzleStat()
      },
      Mutation: {
        addPuzzle: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { input }, context, info) {
            return yield models.Puzzle.create(input);
          });

          return function addPuzzle(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      }
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
exports.default = Puzzle;