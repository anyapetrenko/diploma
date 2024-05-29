'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      event_name: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      teams_number: {
        type: Sequelize.INTEGER
      },
      max_teams_number:{
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      start_datetime: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};