'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Model } = require('sequelize');
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require('../../config/const');

class User extends Model {
  static associate(models) {
    this.hasOne(models.Event);
  }

  static init(sequelize, DataTypes) {
    return super.init({
      url_identity: DataTypes.STRING,
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('amdin', 'coordinator'),
      crypt_password: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false,
      modelName: 'User'
    });
  }

  static getUserByToken(token) {
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        const decoded = jwt.verify(token, JWT_KEY);
        const user = yield _this.findByPk(decoded.id);
        if (user) return resolve(user);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
  }
}exports.default = User;
;