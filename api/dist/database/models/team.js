'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Team extends Model {
  static associate(models) {
    this.hasMany(models.Member);
  }

  static init(sequelize, DataTypes) {
    return super.init({
      team_name: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Team'
    });
  }
}exports.default = Team;
;