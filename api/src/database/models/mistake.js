'use strict';
const {Model} = require('sequelize');

export default class Mistake extends Model {
    static associate(models) {
      this.belongsTo(models.PuzzleStat,{foreigKey:"puzzleStatId"});
    }

    static init(sequelize, DataTypes){
      return super.init({
        puzzleStatId: DataTypes.INTEGER,
        text: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'Mistake',
      });
    };
  };

