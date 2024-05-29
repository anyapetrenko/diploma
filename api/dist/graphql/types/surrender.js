'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const pubsub = require('../pubSub');
class Surrender {
  static resolver() {
    return {
      Query: {
        surrenders: (() => {
          var _ref = _asyncToGenerator(function* (obj, { puzzleStatId }, context, info) {
            return yield models.Surrender.findAll({ where: { puzzleStatId } });
          });

          return function surrenders(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Subscription: {
        puzzleWasGaveUp: {
          subscribe: (0, _graphqlSubscriptions.withFilter)(() => pubsub.asyncIterator('PUZZLE_WAS_GAVE_UP'), (payload, variables) => {
            if (payload.puzzleWasGaveUp.dataToCheck.eventId !== variables.eventId) return false;
            if (variables.teamEventId === -1 || payload.puzzleWasGaveUp.dataToCheck.teamEventId === variables.teamEventId) return true;else return false;
          })
        }
      },
      Surrender: {
        puzzleStats: surrender => surrender.getPuzzleStats()
      },
      Mutation: {
        giveUp: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { puzzleStatId, teamEventId, puzzleId, url_code }, context, info) {
            const length = (yield models.Answer.findAll({ where: { teamEventId } })).length + 1;

            let teamEvent = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event,
                include: {
                  model: models.Game,
                  include: {
                    model: models.Part,
                    order: [['order', 'ASC']],
                    limit: 1,
                    offset: length
                  }
                }
              }
            });

            //Get Time Of Start
            const gameStartTime = Date.parse(teamEvent.Event.dataValues.start_datetime);

            //Get Time we Spen for Answer
            const answers = yield models.Answer.findOne({ where: { teamEventId }, order: [['createdAt', 'DESC']] });
            const newAnswer = yield models.Answer.create({ teamEventId });
            let answerTime;
            if (!answers) answerTime = (Date.parse(newAnswer.dataValues.createdAt) - gameStartTime) / 1000;else answerTime = (Date.parse(newAnswer.dataValues.createdAt) - Date.parse(answers.dataValues.createdAt)) / 1000;
            yield models.PuzzleStat.update({ time_used: answerTime }, { where: { id: puzzleStatId } });

            //Check if last Answer
            const partsNumber = teamEvent.Event.Game.dataValues.parts_number;
            if (partsNumber === length) {
              models.TeamEvent.update({ total_time: (Date.parse(newAnswer.dataValues.createdAt) - gameStartTime) / 1000 }, { where: { id: teamEventId } });
            }

            //Change score
            const POINTS_FOR_HINT = process.env.POINTS_FOR_HINT;
            const POINTS_FOR_SURRENDER = process.env.POINTS_FOR_SURRENDER;
            const DEFAULT_POINTS = process.env.DEFAULT_PART_POINTS;

            let points = DEFAULT_POINTS - POINTS_FOR_SURRENDER;
            const usedHints = yield models.UsedHint.findAll({ where: { puzzleStatId } });
            points -= usedHints.length * POINTS_FOR_HINT;
            yield models.TeamEvent.increment("score", { by: points, where: { url_code } });

            //Set team places
            let currentEvent = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event
              }
            });
            let allTeamEvents = yield models.TeamEvent.findAll({
              where: { eventId: currentEvent.Event.id },
              order: [['score', 'DESC']]
            });
            allTeamEvents.map((() => {
              var _ref3 = _asyncToGenerator(function* (elem, index) {
                yield models.TeamEvent.update({ place: index + 1 }, { where: { id: elem.dataValues.id } });
              });

              return function (_x9, _x10) {
                return _ref3.apply(this, arguments);
              };
            })());

            const teamEvId = currentEvent.dataValues.id;
            const eventId = currentEvent.Event.dataValues.id;

            const newPart = teamEvent.Event.Game.Parts[0];
            const newSurrender = yield models.Surrender.create({ puzzleStatId });
            pubsub.publish('PUZZLE_WAS_GAVE_UP', { puzzleWasGaveUp: { newAnswer, newSurrender, newPart, url_code, dataToCheck: { eventId, teamEventId: teamEvId } } });
            return { newAnswer, newSurrender, newPart };
          });

          return function giveUp(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      }
    };
  }

  static typeDefs() {
    return `
        type Surrender {
            id: Int
            puzzleStatId: Int
            createdAt: String
            puzzleStats: PuzzleStats
        }

        input SurrenderInput {
            puzzleStatId: Int
            createdAt: String
        }
    `;
  }
}
exports.default = Surrender;