'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Folder);
      User.belongsToMany(models.Role, {
        as: 'roles',
        through: 'user_role',
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The field username can not be null',
          },
          isAlpha: {
            msg: 'The username must contain only letters',
          },
          len: {
            args: [5, 10],
            msg: 'The username contain between 5 and 10 characters',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The field password can not be null',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The field email can not be null',
          },
          isEmail: {
            args: true,
            msg: 'The email must have a valid format',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  // check if the user is admin
  User.isAdmin = function (roles) {
    let tmpArray = [];
    roles.forEach((role) => tmpArray.push(role.role));

    return tmpArray.includes('admin');
  };

  return User;
};
