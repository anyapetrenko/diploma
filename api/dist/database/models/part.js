'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Part extends Model {
  static associate(models) {
    this.belongsTo(models.Puzzle, { foreignKey: "puzzleId" });
    this.belongsTo(models.Game, { foreignKey: "gameId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      puzzleId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      part_name: DataTypes.STRING,
      file: DataTypes.STRING,
      order: DataTypes.INTEGER
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Part'
    });
  }
}exports.default = Part;
;