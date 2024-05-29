'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Mistakes', [
  //   {
  //     puzzleStatId: 1,
  //     text:"bbb"
  //   }, {
  //     puzzleStatId: 1,
  //     text:"ccc"
  //   }
  // ], {}),

  up: () => new Promise(resolve => {
    resolve();
  }),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Mistakes', null, {})
};