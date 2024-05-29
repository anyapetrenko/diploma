'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Hints', [{
    puzzleId: 1,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 1,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 1,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 2,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 2,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 2,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 3,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 3,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 3,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 4,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 4,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 4,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 5,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 5,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 5,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 6,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 6,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 6,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 7,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 7,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 7,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 8,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 8,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 8,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 9,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 9,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 9,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 10,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 10,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 10,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 11,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 11,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 11,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 12,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 12,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 12,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 13,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 13,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 13,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 14,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 14,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 14,
    text: "Mess around",
    order: 3
  }, {
    puzzleId: 15,
    text: "Think about it",
    order: 1
  }, {
    puzzleId: 15,
    text: "Love yourself",
    order: 2
  }, {
    puzzleId: 15,
    text: "Mess around",
    order: 3
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Hints', null, {})
};