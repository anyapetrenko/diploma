'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { Model } = require('sequelize');

class Member extends Model {
  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: "teamId" });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      teamId: DataTypes.INTEGER,
      name: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Member'
    });
  }
}exports.default = Member;
;