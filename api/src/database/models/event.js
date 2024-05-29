'use strict';
const {Model} = require('sequelize');

export default class Event extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:"userId"})
      this.belongsTo(models.Game,{foreignKey:"gameId"})
      this.hasMany(models.TeamEvent,{foreignKey:"eventId"})
    }

    static init(sequelize, DataTypes){
      return super.init({
        gameId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        event_name: DataTypes.STRING,
        customer: DataTypes.STRING,
        description: DataTypes.STRING,
        state: DataTypes.STRING,
        teams_number: DataTypes.INTEGER,
        max_teams_number: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
        start_datetime: DataTypes.DATE,
      }, {
        sequelize,
        timestamps: false,
        modelName: 'Event',
      });
    }

    static isPdfAvailable(eventId) {
      return new Promise(async (resolve, reject) => {
        const user = await this.findByPk(eventId);
        const {state,start_datetime,duration} = user.dataValues;

        if(state === 'finished' || state === 'canceled') resolve(false);
        else if ((Date.parse(start_datetime) + duration) < Date.parse(new Date())) resolve(false);
        else resolve(true);
      });
    }
  };
  

