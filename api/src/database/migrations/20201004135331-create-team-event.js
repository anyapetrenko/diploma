'use strict';
const TIMESTAMP = require('../../utils/timestamp');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeamEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      url_code: {
        type: Sequelize.STRING
      },
      total_time: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      place: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeamEvents');
  }
};