'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

const pubsub = require('../pubSub');

class Hint {
  static resolver() {
    return {
      Query: {
        hints: (() => {
          var _ref = _asyncToGenerator(function* (obj, { puzzleId, puzzleStatId }, context) {
            const length = (yield models.UsedHint.findAll({ where: { puzzleStatId } })).length + 1;
            const hints = yield models.Hint.findAll({ where: { puzzleId }, limit: length });
            return hints;
            // return await models.Hint.findAll({where:{puzzleId}});
          });

          return function hints(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Hint: {
        puzzle: hint => hint.getPuzzle()
      },
      Subscription: {
        hintWasUsed: {
          subscribe: (0, _graphqlSubscriptions.withFilter)(() => pubsub.asyncIterator('HINT_WAS_USED'), (payload, variables) => {
            if (payload.hintWasUsed.dataToCheck.eventId !== variables.eventId) return false;
            if (variables.teamEventId === -1 || payload.hintWasUsed.dataToCheck.teamEventId === variables.teamEventId) return true;else return false;
          })
        }
      },
      Mutation: {
        addHint: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { input }, context) {
            return yield models.Hint.create(input);
          });

          return function addHint(_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
          };
        })(),
        useHint: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { puzzleStatId, puzzleId, url_code }, context, info) {
            const currentEvent = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event
              }
            });
            const teamEventId = currentEvent.dataValues.id;
            const eventId = currentEvent.Event.dataValues.id;

            const length = (yield models.UsedHint.findAll({ where: { puzzleStatId } })).length + 1;
            const newHint = yield models.Hint.findOne({ where: { puzzleId }, order: [['order', 'ASC']], limit: 1, offset: length });
            const newUsedHint = yield models.UsedHint.create({ puzzleStatId });
            pubsub.publish('HINT_WAS_USED', { hintWasUsed: { newHint, newUsedHint, url_code, dataToCheck: { eventId, teamEventId } } });
            return { newHint, newUsedHint };
            return yield models.UsedHint.create({ puzzleStatId });
          });

          return function useHint(_x7, _x8, _x9, _x10) {
            return _ref3.apply(this, arguments);
          };
        })()
      }
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
exports.default = Hint;