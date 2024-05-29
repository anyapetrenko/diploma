'use strict';

var _models = require('../database/models');

_models.sequelize.drop({ cascade: true }).then(() => _models.sequelize.query('DELETE FROM SequelizeData;').then(() => _models.sequelize.query('DELETE FROM SequelizeMeta;')).then(() => process.exit(0)));
