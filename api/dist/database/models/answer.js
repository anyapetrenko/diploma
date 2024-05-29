'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Answer extends Model {
  static associate(models) {
    this.belongsTo(models.TeamEvent, { foreigKey: "teamEventId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      teamEventId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Answer'
    });
  }
}exports.default = Answer;
;
