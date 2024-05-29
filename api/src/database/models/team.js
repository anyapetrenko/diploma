'use strict';
const {Model} = require('sequelize');

export default class Team extends Model {
    static associate(models) {
      this.hasMany(models.Member);
    }

    static init(sequelize, DataTypes){
      return super.init({
        team_name: DataTypes.STRING,
        description: DataTypes.STRING
      }, {
        sequelize,
        timestamps: false,
        modelName: 'Team',
      });
    };
  };

