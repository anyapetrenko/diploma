'use strict';
const {Model} = require('sequelize');

export default class Hint extends Model {
    static associate(models) {
      this.belongsTo(models.Puzzle,{foreignKey:"puzzleId"});
    }
    
    static init(sequelize, DataTypes){
      return super.init({
        puzzleId: DataTypes.INTEGER,
        text: DataTypes.STRING,
        order: DataTypes.INTEGER,
      }, {
        sequelize,
        timestamps: false,
        modelName: 'Hint',
      });
    };
  };

