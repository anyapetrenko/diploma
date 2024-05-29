'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Model } = require('sequelize');

class Event extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.Game, { foreignKey: "gameId" });
    this.hasMany(models.TeamEvent, { foreignKey: "eventId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      gameId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      event_name: DataTypes.STRING,
      customer: DataTypes.STRING,
      description: DataTypes.STRING,
      state: DataTypes.STRING,
      teams_number: DataTypes.INTEGER,
      max_teams_number: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      start_datetime: DataTypes.DATE
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Event'
    });
  }

  static isPdfAvailable(eventId) {
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        const user = yield _this.findByPk(eventId);
        const { state, start_datetime, duration } = user.dataValues;

        if (state === 'finished' || state === 'canceled') resolve(false);else if (Date.parse(start_datetime) + duration < Date.parse(new Date())) resolve(false);else resolve(true);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
  }
}exports.default = Event;
;