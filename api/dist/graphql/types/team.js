'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class Team {
  static resolver() {
    return {
      Query: {
        currentTeam: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function currentTeam(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })(),
        teams: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function teams(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      },
      Team: {
        members: team => team.getMembers()
      },
      Mutation: {
        addTeam: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { input }, context, info) {
            const newTeam = yield models.Team.create({ team_name: input.team_name, description: input.notes });
            input.members.map(function (elem) {
              models.Member.create({ teamId: newTeam.dataValues.id, name: elem });
            });
            models.Event.increment('teams_number', { by: 1, where: { id: input.eventId } });

            const newTeamEvent = yield models.TeamEvent.create({ eventId: input.eventId, teamId: newTeam.dataValues.id, url_code: input.url_code, total_time: 0, score: 0, place: 0 });

            let games = yield models.Event.findOne({
              where: { id: input.eventId },
              include: {
                model: models.Game,
                include: {
                  model: models.Part,
                  include: {
                    model: models.Puzzle
                  }
                }
              }
            });

            const parts = games.Game.Parts;
            parts.map(function (elem) {
              models.PuzzleStat.create({ teamEventId: newTeamEvent.dataValues.id, puzzleId: elem.Puzzle.dataValues.id, time_used: 0 });
            });
          });

          return function addTeam(_x9, _x10, _x11, _x12) {
            return _ref3.apply(this, arguments);
          };
        })(),
        editTeam: (() => {
          var _ref4 = _asyncToGenerator(function* (obj, { input }, context, info) {
            models.Team.update({ team_name: input.team_name, description: input.notes }, { where: { id: input.teamId } });
            input.memberIds.map(function (elem, index) {
              models.Member.update({ name: input.members[index] }, { where: { id: elem } });
            });
          });

          return function editTeam(_x13, _x14, _x15, _x16) {
            return _ref4.apply(this, arguments);
          };
        })(),
        removeTeam: (() => {
          var _ref5 = _asyncToGenerator(function* (obj, { teamId, eventId }, context, info) {
            models.Team.destroy({ where: { id: teamId } });
            models.Event.increment('teams_number', { by: -1, where: { id: eventId } });
          });

          return function removeTeam(_x17, _x18, _x19, _x20) {
            return _ref5.apply(this, arguments);
          };
        })()
      }
    };
  }

  static typeDefs() {
    return `
        type Team {
            id: Int
            team_name: String,
            description: String,
            members: [Member]
        }

        input TeamInput {
            team_name: String,
            description: String,
        }
    `;
  }
}
exports.default = Team;