'use strict';
const {Model} = require('sequelize');
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../../config/const');

export default class User extends Model {
    static associate(models) {
      this.hasOne(models.Event)
    }

    static init(sequelize, DataTypes){
      return super.init({
        url_identity: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM('amdin','coordinator'),
        crypt_password: DataTypes.STRING
      }, {
        sequelize,
        timestamps: false,
        modelName: 'User',
      });
    }

    static getUserByToken(token) {
      return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(token, JWT_KEY);
        const user = await this.findByPk(decoded.id);
        if(user) return resolve(user);
      });
    }
  };

