'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  up: (() => {
    var _ref = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.createTable('PuzzleStats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        teamEventId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'TeamEvents'
          },
          allowNull: false,
          onDelete: 'CASCADE'
        },
        puzzleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Puzzles'
          },
          allowNull: false,
          onDelete: 'CASCADE'
        },
        time_used: {
          type: Sequelize.INTEGER
        }
      });
    });

    return function up(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })(),
  down: (() => {
    var _ref2 = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.dropTable('PuzzleStats');
    });

    return function down(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })()
};