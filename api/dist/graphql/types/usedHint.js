'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class UsedHint {
  static resolver() {
    return {
      Query: {
        usedHints: (() => {
          var _ref = _asyncToGenerator(function* (obj, { puzzleStatId }, context, info) {
            return yield models.UsedHint.findAll({ where: { puzzleStatId } });
          });

          return function usedHints(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })()
      }
    };
  }

  static typeDefs() {
    return `
        type UsedHint {
            id: Int
            puzzleStatId: String
            createdAt: String
            puzzleId: Int
        }

        input UsedHintInput {
            puzzleStatId: Int
            createdAt: String
        }
    `;
  }
}
exports.default = UsedHint;