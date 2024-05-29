'use strict';
const {Model} = require('sequelize');
const TIMESTAMP = require('../../utils/timestamp');

export default class TeamEvent extends Model {
    static associate(models) {
      this.belongsTo(models.Team,{foreignKey:"teamId"});
      this.belongsTo(models.Event,{foreignKey:"eventId"});
      this.hasMany(models.PuzzleStat)
      this.hasMany(models.Answer);
    }

    static init(sequelize, DataTypes){
      return super.init({
        teamId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        url_code: DataTypes.STRING,
        total_time: DataTypes.INTEGER,
        score: DataTypes.NUMBER,
        place: DataTypes.NUMBER
      }, {
        sequelize,
        timestamps: false,
        modelName: 'TeamEvent',
      });
    };
  };

