'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class Member {
  static resolver() {
    return {
      Query: {
        getMembers: (() => {
          var _ref = _asyncToGenerator(function* (obj, { teamId }, context, info) {
            return yield models.Member.findAll({ where: { teamId } });
          });

          return function getMembers(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      },
      Member: {
        team: member => member.getTeam()
      },
      Mutation: {
        addMember: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { input }, context, info) {
            return yield models.Member.create(input);
          });

          return function addMember(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      }
    };
  }

  static typeDefs() {
    return `
        type Member {
            id: Int
            teamId: Int
            team: Team
            name: String
        }

        input MemberInput {
            name: String
            teamId: Int
        }
    `;
  }
}
exports.default = Member;