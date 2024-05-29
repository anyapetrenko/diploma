'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class TeamEvent {
  static resolver() {
    return {
      Query: {
        getTeamEvent: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function getTeamEvent(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })(),
        teamEventData: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            const data = yield models.TeamEvent.findOne({ where: { url_code } });
            return data;
          });

          return function teamEventData(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })(),
        teamEventRates: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            let isEndgame = false;
            //Count Game Answers
            let currentEvent = yield models.TeamEvent.findOne({
              where: { url_code },
              include: {
                model: models.Event,
                include: {
                  model: models.Game
                }
              }
            });
            if (currentEvent !== null) {
              let allTeamEvents = yield models.TeamEvent.findAll({
                where: { eventId: currentEvent.Event.id },
                include: {
                  model: models.Answer
                }
              });

              let answersCount = 0;
              allTeamEvents.map((() => {
                var _ref4 = _asyncToGenerator(function* (elem) {
                  answersCount += elem.dataValues.Answers.length;
                });

                return function (_x13) {
                  return _ref4.apply(this, arguments);
                };
              })());

              const totalAnswersCount = currentEvent.Event.Game.parts_number * currentEvent.Event.teams_number;
              isEndgame = answersCount === totalAnswersCount;
              if (isEndgame) models.Event.update({ state: 'finished' }, { where: { id: currentEvent.Event.id } });
            }

            //Pack data
            let teamEvents = yield models.TeamEvent.findAll({
              order: [['score', 'DESC']],
              include: {
                model: models.Team
              }
            });
            return { teamEvents, isEndgame };
          });

          return function teamEventRates(_x9, _x10, _x11, _x12) {
            return _ref3.apply(this, arguments);
          };
        })(),
        teamEvents: (() => {
          var _ref5 = _asyncToGenerator(function* (obj, {}, context, info) {
            return yield models.TeamEvent.findAll();
          });

          return function teamEvents(_x14, _x15, _x16, _x17) {
            return _ref5.apply(this, arguments);
          };
        })()
      },
      TeamEvent: {
        event: teamEvent => teamEvent.getEvent(),
        team: teamEvent => teamEvent.getTeam(),
        puzzle_stats: teamEvent => teamEvent.getPuzzleStats(),
        answers: teamEvent => teamEvent.getAnswers()
      }
    };
  }

  static typeDefs() {
    return `
        type TeamEvent {
            id: Int
            teamId: Int
            team: Team
            eventId: Int
            event: Event
            url_code: String
            total_time: Int
            score: Int
            place: Int
            puzzle_stats: [PuzzleStats]
            answers: [Answer]
        }

        input TeamEventInput {
            eventId: Int
            url_code: String
            team_name: String
            members: [String]
            notes: String
        }

        input TeamEventEditInput {
            teamId: Int
            team_name: String
            members: [String]
            memberIds: [Int]
            notes: String
      }
    `;
  }
}
exports.default = TeamEvent;