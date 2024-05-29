'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Teams', [{
  //   team_name: 'Managers',
  //   description: 'Looking started he up perhaps against. How remainder all additions get elsewhere resources. '
  // }, {
  //   team_name: 'Sales',
  //   description: 'Looking started he up perhaps against. How remainder all additions get elsewhere resources. '
  // }, {
  //   team_name: 'Developers',
  //   description: 'Looking started he up perhaps against. How remainder all additions get elsewhere resources. '
  // }, {
  //   team_name: 'Engineers',
  //   description: 'Looking started he up perhaps against. How remainder all additions get elsewhere resources. '
  // }], {}),

  up: () => new Promise(resolve => {
    resolve();
  }),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Teams', null, {})
};
