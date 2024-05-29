'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users','crypt_password', {
      type:Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users','crypt_password');
  }
};