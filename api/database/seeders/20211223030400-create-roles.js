'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            role: 'admin',
          },
          {
            role: 'user',
          },
        ],
        {}
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([await queryInterface.bulkDelete('roles', null, {})]);
  },
};
