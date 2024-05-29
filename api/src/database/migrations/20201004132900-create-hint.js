'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      puzzleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Puzzles',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      text: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Hints');
  }
};