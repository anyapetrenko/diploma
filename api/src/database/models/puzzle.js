'use strict';
const {Model} = require('sequelize');

export default class Puzzle extends Model {
    static associate(models) {
      this.hasOne(models.Part);
      this.hasOne(models.PuzzleStat);
      this.hasMany(models.Hint);
    }

    static init(sequelize, DataTypes){
      return super.init({
        answer_format: DataTypes.STRING,
        answer: DataTypes.STRING
      }, {
        sequelize,
        timestamps: false,
        modelName: 'Puzzle',
      });
    };
  };

