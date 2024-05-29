'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Hint extends Model {
  static associate(models) {
    this.belongsTo(models.Puzzle, { foreignKey: "puzzleId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      puzzleId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      order: DataTypes.INTEGER
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Hint'
    });
  }
}exports.default = Hint;
;