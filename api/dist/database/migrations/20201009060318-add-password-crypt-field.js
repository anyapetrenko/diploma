'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  up: (() => {
    var _ref = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.addColumn('Users', 'crypt_password', {
        type: Sequelize.STRING
      });
    });

    return function up(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })(),
  down: (() => {
    var _ref2 = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.removeColumn('Users', 'crypt_password');
    });

    return function down(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })()
};