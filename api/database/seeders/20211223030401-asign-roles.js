'use strict';

const { User, Role } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = await User.findOne({ where: { user_name: 'admin' } });
    let users = await User.findAll();
    let roles = await Role.findAll();
    let idUsers = [];
    let idRoles = [];

    roles.forEach((rol) => {
      idRoles.push(rol.id);
    });

    users.forEach((user) => {
      idUsers.push({
        user_id: user.id,
        role_id: +idRoles[1],
      });
    });

    return Promise.all([
      await queryInterface.bulkInsert(
        'user_role',
        [
          {
            user_id: admin.id,
            role_id: +idRoles[0],
          },
        ],
        {}
      ),

      await queryInterface.bulkInsert('user_role', idUsers, {}),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([await queryInterface.bulkDelete('roles', null, {})]);
  },
};
