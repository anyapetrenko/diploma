'use strict';
const {Model} = require('sequelize');

export default class Answer extends Model {
    static associate(models) {
      this.belongsTo(models.TeamEvent,{foreigKey:"teamEventId"});
    }

    static init(sequelize, DataTypes){
      return super.init({
        teamEventId: DataTypes.INTEGER,
      }, {
        sequelize,
        modelName: 'Answer',
      });
    };
  };
