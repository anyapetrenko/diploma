'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');

class Game {
  static resolver() {
    return {
      Query: {
        currentGame: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            return yield models.TeamEvent.findOne({ where: { url_code } });
          });

          return function currentGame(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })(),
        games: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, {}, context, info) {
            return yield models.Game.findAll();
          });

          return function games(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })()
      },
      Game: {
        parts: game => game.getParts()
      },
      Mutation: {
        addGame: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { input }, context, info) {
            return yield models.Game.create(input);
          });

          return function addGame(_x9, _x10, _x11, _x12) {
            return _ref3.apply(this, arguments);
          };
        })()
      }
    };
  }

  static typeDefs() {
    return `
        type Game {
            id: Int
            name: String
            parts: [Part]
            description_short: String
            beginning_text: String
            final_text: String
            image: String
            top_image: String
            final_image: String
            bg_image: String
            parts_number: Int
        }

        input GameInput {
            name: String
            description_short: String
            image: String
            parts_number: Int
        }
    `;
  }
}
exports.default = Game;