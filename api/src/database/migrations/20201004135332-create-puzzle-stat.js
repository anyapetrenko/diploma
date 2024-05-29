'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PuzzleStats', {
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
      puzzleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Puzzles',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      time_used: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PuzzleStats');
  }
};