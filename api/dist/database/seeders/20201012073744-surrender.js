'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Surrenders', [
  //   {
  //     puzzleStatId: 1,
  //   }, {
  //     puzzleStatId: 1,
  //   }
  // ], {}),


  up: () => new Promise(resolve => {
    resolve();
  }),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Surrenders', null, {})
};