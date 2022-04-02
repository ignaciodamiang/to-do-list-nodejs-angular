'use strict';

const faker = require('faker');
const { User } = require('../../models/index');

module.exports = {
  // execute when it seeds
  up: async (queryInterface, Sequelize) => {
    let folders = [];

    let users = await User.findAll();

    users.forEach((user) => {
      folders.push({
        folder_name: faker.lorem.word().toLocaleLowerCase(),
        user_id: user.id,
      }),
        folders.push({
          folder_name: faker.lorem.word().toLocaleLowerCase(),
          user_id: user.id,
        }),
        folders.push({
          folder_name: faker.lorem.word().toLocaleLowerCase(),
          user_id: user.id,
        }),
        folders.push({
          folder_name: faker.lorem.word().toLocaleLowerCase(),
          user_id: user.id,
        });
    });

    await queryInterface.bulkInsert('folders', folders, {});
  },
  // execute when undoes the seed
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('folders', null, {});
  },
};
