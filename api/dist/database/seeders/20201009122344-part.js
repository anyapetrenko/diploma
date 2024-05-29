'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Parts', [{
    puzzleId: 1,
    gameId: 1,
    part_name: "Rabbit story",
    file: "game1/Puzzle1.pdf",
    order: 1
  }, {
    puzzleId: 2,
    gameId: 1,
    part_name: "Around the world",
    file: "game1/Puzzle2.pdf",
    order: 2
  }, {
    puzzleId: 3,
    gameId: 1,
    part_name: "Better now",
    file: "game1/Puzzle3.pdf",
    order: 3
  }, {
    puzzleId: 4,
    gameId: 1,
    part_name: "Among us",
    file: "game1/Puzzle4.pdf",
    order: 4
  }, {
    puzzleId: 5,
    gameId: 1,
    part_name: "Final episode",
    file: "game1/Puzzle5.pdf",
    order: 5
  }, {
    puzzleId: 6,
    gameId: 2,
    part_name: "Rabbit story",
    file: "game2/Puzzle1.pdf",
    order: 1
  }, {
    puzzleId: 7,
    gameId: 2,
    part_name: "Around the world",
    file: "game2/Puzzle2.pdf",
    order: 2
  }, {
    puzzleId: 8,
    gameId: 2,
    part_name: "Better now",
    file: "game2/Puzzle3.pdf",
    order: 3
  }, {
    puzzleId: 9,
    gameId: 2,
    part_name: "Among us",
    file: "game2/Puzzle4.pdf",
    order: 4
  }, {
    puzzleId: 10,
    gameId: 2,
    part_name: "Final episode",
    file: "game2/Puzzle5.pdf",
    order: 5
  }, {
    puzzleId: 11,
    gameId: 3,
    part_name: "Rabbit story",
    file: "game3/Puzzle1.pdf",
    order: 1
  }, {
    puzzleId: 12,
    gameId: 3,
    part_name: "Around the world",
    file: "game3/Puzzle2.pdf",
    order: 2
  }, {
    puzzleId: 13,
    gameId: 3,
    part_name: "Better now",
    file: "game3/Puzzle3.pdf",
    order: 3
  }, {
    puzzleId: 14,
    gameId: 3,
    part_name: "Among us",
    file: "game3/Puzzle4.pdf",
    order: 4
  }, {
    puzzleId: 15,
    gameId: 3,
    part_name: "Final episode",
    file: "game3/Puzzle5.pdf",
    order: 5
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Parts', null, {})
};