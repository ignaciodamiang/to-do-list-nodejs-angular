'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    static associate(models) {
      Folder.belongsTo(models.User);
      Folder.hasMany(models.Task);
    }
  }
  Folder.init(
    {
      folderName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The field folder name can not be null',
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },

    {
      sequelize,
      modelName: 'Folder',
    }
  );
  return Folder;
};
