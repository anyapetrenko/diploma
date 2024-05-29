'use strict';
const {Model} = require('sequelize');

export default class Game extends Model {
    static associate(models) {
      this.hasMany(models.Event,{foreignKey:"gameId"});
      this.hasMany(models.Part,{foreignKey:"gameId"});
    }

    static init(sequelize, DataTypes){
      return super.init({
        name: DataTypes.STRING,
        description_short: DataTypes.STRING,
        beginning_text: DataTypes.STRING,
        final_text: DataTypes.STRING,
        image: DataTypes.STRING,
        top_image: DataTypes.STRING,
        final_image: DataTypes.STRING,
        bg_image: DataTypes.STRING,
        parts_number: DataTypes.INTEGER,
      }, {
        sequelize,
        timestamps: false,
        modelName: 'Game',
      });
    }
  };
