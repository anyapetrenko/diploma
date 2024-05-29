'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Events', [{
  //   gameId: 1,
  //   userId: 1,
  //   event_name: "Microsoft Event",
  //   customer: "Microsoft",
  //   description: "Microsoft team building. Out believe has request not how comfort evident. Up delight cousins we feeling minutes. ",
  //   state: "default",
  //   teams_number: 4,
  //   max_teams_number: 4,
  //   duration: (90*60*1000),
  //   start_datetime: '2020-11-01 10:00',
  // }], {}),

  up: () => new Promise((resolve)=>{resolve()}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Events', null, {})
};
