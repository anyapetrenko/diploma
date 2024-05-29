'use strict';
const TIMESTAMP = require('../../utils/timestamp');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamEventId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'TeamEvents',
          },
          allowNull: false,
          onDelete: 'CASCADE'
      },
      createdAt: {
        type: TIMESTAMP,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: TIMESTAMP,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Answers');
  }
};