'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class PuzzleStat extends Model {
  static associate(models) {
    this.belongsTo(models.Puzzle), { foreignKey: "puzzleId" };
    this.belongsTo(models.TeamEvent, { foreignKey: "teamEventId" });
    this.hasMany(models.Mistake);
    this.hasMany(models.UsedHint);
    this.hasMany(models.Surrender);
    // this.hasOne(models.Answer);
  }

  static init(sequelize, DataTypes) {
    return super.init({
      teamEventId: DataTypes.INTEGER,
      puzzleId: DataTypes.INTEGER,
      time_used: DataTypes.INTEGER
    }, {
      sequelize,
      timestamps: false,
      modelName: 'PuzzleStat'
    });
  }
}exports.default = PuzzleStat;
;