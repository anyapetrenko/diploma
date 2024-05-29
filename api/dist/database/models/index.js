'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path2.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../../config/db`)[env];
const models = {};

if (config.use_env_variable) {
  var sequelize = new _sequelize2.default(process.env[config.use_env_variable]);
} else {
  var sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

_fs2.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  const model = require(_path2.default.join(__dirname, file)).default;
  models[model.name] = model.init(sequelize, _sequelize2.default);
});

Object.values(models).filter(model => typeof model.associate === 'function').forEach(model => model.associate(models));

module.exports = _extends({}, models, {
  sequelize,
  Sequelize: _sequelize2.default
});