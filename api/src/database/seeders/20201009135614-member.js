'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Members', [
  //   {
  //     teamId: 1,
  //     name: "Jack",
  //   }, {
  //     teamId: 1,
  //     name: "Mike",
  //   }, {
  //     teamId: 1,
  //     name: "Polli",
  //   }, {
  //     teamId: 1,
  //     name: "Lambert",
  //   },
  //   {
  //     teamId: 2,
  //     name: "Jack",
  //   }, {
  //     teamId: 2,
  //     name: "Mike",
  //   }, {
  //     teamId: 2,
  //     name: "Polli",
  //   }, {
  //     teamId: 2,
  //     name: "Lambert",
  //   },
  //   {
  //     teamId: 3,
  //     name: "Jack",
  //   }, {
  //     teamId: 3,
  //     name: "Mike",
  //   }, {
  //     teamId: 3,
  //     name: "Polli",
  //   }, {
  //     teamId: 3,
  //     name: "Lambert",
  //   },
  //   {
  //     teamId: 4,
  //     name: "Jack",
  //   }, {
  //     teamId: 4,
  //     name: "Mike",
  //   }, {
  //     teamId: 4,
  //     name: "Polli",
  //   }, {
  //     teamId: 4,
  //     name: "Lambert",
  //   }
  // ], {}),

  up: () => new Promise((resolve)=>{resolve()}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Members', null, {})
};
