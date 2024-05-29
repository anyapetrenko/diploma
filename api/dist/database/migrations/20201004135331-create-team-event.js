'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const TIMESTAMP = require('../../utils/timestamp');

module.exports = {
  up: (() => {
    var _ref = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.createTable('TeamEvents', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        eventId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Events'
          },
          allowNull: false,
          onDelete: 'CASCADE'
        },
        teamId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Teams'
          },
          allowNull: false,
          onDelete: 'CASCADE'
        },
        url_code: {
          type: Sequelize.STRING
        },
        total_time: {
          type: Sequelize.INTEGER
        },
        score: {
          type: Sequelize.INTEGER
        },
        place: {
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
      yield queryInterface.dropTable('TeamEvents');
    });

    return function down(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })()
};