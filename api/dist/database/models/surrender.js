'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Surrender extends Model {
  static associate(models) {
    this.belongsTo(models.PuzzleStat, { foreigKey: "puzzleStatId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      puzzleStatId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Surrender'
    });
  }
}exports.default = Surrender;
;