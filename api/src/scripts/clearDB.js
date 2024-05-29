import { sequelize } from '../database/models';

sequelize.drop({ cascade: true })
  .then(() => (
    sequelize.query('DELETE FROM SequelizeData;')
      .then(() => sequelize.query('DELETE FROM SequelizeMeta;'))
      .then(() => process.exit(0))
  ));
