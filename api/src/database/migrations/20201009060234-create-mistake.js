'use strict';
const TIMESTAMP = require('../../utils/timestamp');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mistakes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      puzzleStatId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'PuzzleStats',
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
      }, 
      text: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mistakes');
  }
};