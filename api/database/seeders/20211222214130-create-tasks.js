'use strict';

const faker = require('faker');
const { Folder } = require('../../models/index');

module.exports = {
  // execute when it seeds
  up: async (queryInterface, Sequelize) => {
    let tasks = [];

    let folders = await Folder.findAll();

    folders.forEach((folder) => {
      tasks.push({
        task_name: faker.lorem.word().toLocaleLowerCase(),
        folder_id: folder.id,
      }),
        tasks.push({
          task_name: faker.lorem.word().toLocaleLowerCase(),
          folder_id: folder.id,
        }),
        tasks.push({
          task_name: faker.lorem.word().toLocaleLowerCase(),
          folder_id: folder.id,
        }),
        tasks.push({
          task_name: faker.lorem.word().toLocaleLowerCase(),
          folder_id: folder.id,
        });
    });
    await queryInterface.bulkInsert('tasks', tasks, {});
  },
  // execute when undoes the seed
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
