'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parts', {
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
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      part_name: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parts');
  }
};