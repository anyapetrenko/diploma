'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description_short: {
        type: Sequelize.STRING
      },
      beginning_text: {
        type: Sequelize.TEXT
      },
      final_text: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      top_image: {
        type: Sequelize.STRING
      },
      final_image: {
        type: Sequelize.STRING
      },
      bg_image: {
        type: Sequelize.STRING
      },
      parts_number: {
        type: Sequelize.INTEGER
      },  
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};