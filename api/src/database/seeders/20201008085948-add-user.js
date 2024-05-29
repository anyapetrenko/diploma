'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
  {
    url_identity: 'admin',
    email: 'admin',
    login: 'admin',
    password: '$2a$10$XnSMZKCkihqrVMPPS.5MaO5EuueOfIIa8DPatPU0NasakPAq0hWiS',
    role: 'admin'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
