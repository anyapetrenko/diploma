'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const pubsub = require('../pubSub');
class Mistake {
  static resolver() {
    return {
      Query: {
        mistakes: (() => {
          var _ref = _asyncToGenerator(function* (obj, { puzzleStatId }, context, info) {
            return yield models.Mistake.findAll({ where: { puzzleStatId }, order: [['createdAt', 'DESC']] });
          });

          return function mistakes(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Subscription: {
        puzzleWasUnsolved: {
          subscribe: (0, _graphqlSubscriptions.withFilter)(() => pubsub.asyncIterator('PUZZLE_WAS_UNSOLVED'), (payload, variables) => {
            if (payload.dataToCheck.eventId !== variables.eventId) return false;
            if (variables.teamEventId === -1 || payload.dataToCheck.teamEventId === variables.teamEventId) return true;else return false;
          })
        }
      },
      Mistake: {
        puzzleStats: mistake => mistake.getPuzzleStats()
      },
      Mutation: {
        sendMistake: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { puzzleStatId, puzzleId, text, url_code }, context, info) {
            const currentEvent = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event
              }
            });
            const teamEventId = currentEvent.dataValues.id;
            const eventId = currentEvent.Event.dataValues.id;

            const data = yield models.Mistake.create({ puzzleStatId, text });
            pubsub.publish('PUZZLE_WAS_UNSOLVED', { puzzleWasUnsolved: data, dataToCheck: { eventId, teamEventId } });
            return data;
          });

          return function sendMistake(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      }
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
exports.default = Mistake;