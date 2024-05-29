'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => queryInterface.bulkInsert('PuzzleStats', [
  //   {
  //     teamEventId: 1,
  //     puzzleId: 1,
  //     time_used: "0"
  //   },{
  //     teamEventId: 1,
  //     puzzleId: 2,
  //     time_used: "0"
  //   },{
  //     teamEventId: 1,
  //     puzzleId: 3,
  //     time_used: "0"
  //   },{
  //     teamEventId: 1,
  //     puzzleId: 4,
  //     time_used: "0"
  //   },{
  //     teamEventId: 1,
  //     puzzleId: 5,
  //     time_used: "0"
  //   },
  //   {
  //     teamEventId: 2,
  //     puzzleId: 1,
  //     time_used: "0"
  //   },{
  //     teamEventId: 2,
  //     puzzleId: 2,
  //     time_used: "0"
  //   },{
  //     teamEventId: 2,
  //     puzzleId: 3,
  //     time_used: "0"
  //   },{
  //     teamEventId: 2,
  //     puzzleId: 4,
  //     time_used: "0"
  //   },{
  //     teamEventId: 2,
  //     puzzleId: 5,
  //     time_used: "0"
  //   },
  //   {
  //     teamEventId: 3,
  //     puzzleId: 1,
  //     time_used: "0"
  //   },{
  //     teamEventId: 3,
  //     puzzleId: 2,
  //     time_used: "0"
  //   },{
  //     teamEventId: 3,
  //     puzzleId: 3,
  //     time_used: "0"
  //   },{
  //     teamEventId: 3,
  //     puzzleId: 4,
  //     time_used: "0"
  //   },{
  //     teamEventId: 3,
  //     puzzleId: 5,
  //     time_used: "0"
  //   },
  //   {
  //     teamEventId: 4,
  //     puzzleId: 1,
  //     time_used: "0"
  //   },{
  //     teamEventId: 4,
  //     puzzleId: 2,
  //     time_used: "0"
  //   },{
  //     teamEventId: 4,
  //     puzzleId: 3,
  //     time_used: "0"
  //   },{
  //     teamEventId: 4,
  //     puzzleId: 4,
  //     time_used: "0"
  //   },{
  //     teamEventId: 4,
  //     puzzleId: 5,
  //     time_used: "0"
  //   }
  // ], {}),

  up: () => new Promise((resolve)=>{resolve()}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PuzzleStats', null, {})
};


