'use strict';

const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  // execute when it seeds
  up: async (queryInterface, Sequelize) => {
    let users = [
      {
        user_name: 'admin',
        password: bcrypt.hashSync('123456', +authConfig.rounds),
        email: 'admin@mail.com',
      },
    ];
    await queryInterface.bulkInsert('users', users, {});
  },
  // execute when undoes the seed
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
