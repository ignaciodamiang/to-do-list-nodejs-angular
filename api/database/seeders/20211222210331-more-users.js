'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  // execute when it seeds
  up: async (queryInterface, Sequelize) => {
    let names = [
      faker.name.firstName().toLocaleLowerCase(),
      faker.name.firstName().toLocaleLowerCase(),
      faker.name.firstName().toLocaleLowerCase(),
      faker.name.firstName().toLocaleLowerCase(),
    ];
    let users = [
      {
        user_name: names[0],
        email: names[0] + '@mail.com',
        password: bcrypt.hashSync('default', +authConfig.rounds),
      },
      {
        user_name: names[1],
        email: names[1] + '@mail.com',
        password: bcrypt.hashSync('default', +authConfig.rounds),
      },
      {
        user_name: names[2],
        email: names[2] + '@mail.com',
        password: bcrypt.hashSync('default', +authConfig.rounds),
      },
      {
        user_name: names[3],
        email: names[3] + '@mail.com',
        password: bcrypt.hashSync('default', +authConfig.rounds),
      },
    ];
    await queryInterface.bulkInsert('users', users, {});
  },
  // execute when undoes the seed
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
