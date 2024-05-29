'use strict';
const {Model} = require('sequelize');

export default class UsedHint extends Model {
    static associate(models) {
      this.belongsTo(models.PuzzleStat,{foreigKey:"puzzleStatId"});
    }

    static init(sequelize, DataTypes){
      return super.init({
        puzzleStatId: DataTypes.INTEGER,
      }, {
        sequelize,
        modelName: 'UsedHint',
      });
    };
  };

