'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TeamEvents', [
  //   {
  //     teamId: 1,
  //     eventId: 1,
  //     url_code: 'one/team_one',
  //     total_time: 0,
  //     score: 0,
  //     place: 1
  //   },
  //   {
  //     teamId: 2,
  //     eventId: 1,
  //     url_code: 'one/team_two',
  //     total_time: 0,
  //     score: 0,
  //     place: 2
  //   },
  //   {
  //     teamId: 3,
  //     eventId: 1,
  //     url_code: 'one/team_three',
  //     total_time: 0,
  //     score: 0,
  //     place: 3
  //   },
  //   {
  //     teamId: 4,
  //     eventId: 1,
  //     url_code: 'one/team_four',
  //     total_time: 0,
  //     score: 0,
  //     place: 4
  //   }
  // ], {}),

  up: () => new Promise(resolve => {
    resolve();
  }),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TeamEvents', null, {})
};