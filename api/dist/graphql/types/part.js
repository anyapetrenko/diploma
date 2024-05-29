'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class Part {
  static resolver() {
    return {
      Query: {
        parts: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code, teamEventId }, context, info) {
            const length = (yield models.Answer.findAll({ where: { teamEventId } })).length + 1;

            let data = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event,
                include: {
                  model: models.Game,
                  include: {
                    model: models.Part,
                    limit: length,
                    order: [['order', 'ASC']]
                  }
                }
              }
            });
            return data.Event.Game.Parts;
          });

          return function parts(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Part: {
        puzzle: part => part.getPuzzle()
      },
      Mutation: {
        addPart: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { input }, context, info) {
            return yield models.Part.create(input);
          });

          return function addPart(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      }
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
exports.default = Part;