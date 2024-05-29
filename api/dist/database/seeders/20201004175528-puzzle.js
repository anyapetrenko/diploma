'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Puzzles', [{
    answer_format: 'one word',
    answer: 'one'
  }, {
    answer_format: 'one word',
    answer: 'two'
  }, {
    answer_format: 'one word',
    answer: 'three'
  }, {
    answer_format: 'one word',
    answer: 'four'
  }, {
    answer_format: 'one word',
    answer: 'five'
  }, {
    answer_format: 'one word',
    answer: 'one'
  }, {
    answer_format: 'one word',
    answer: 'two'
  }, {
    answer_format: 'one word',
    answer: 'three'
  }, {
    answer_format: 'one word',
    answer: 'four'
  }, {
    answer_format: 'one word',
    answer: 'five'
  }, {
    answer_format: 'one word',
    answer: 'one'
  }, {
    answer_format: 'one word',
    answer: 'two'
  }, {
    answer_format: 'one word',
    answer: 'three'
  }, {
    answer_format: 'one word',
    answer: 'four'
  }, {
    answer_format: 'one word',
    answer: 'five'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Puzzles', null, {})
};