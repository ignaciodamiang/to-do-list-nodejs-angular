'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Folder);
    }
  }
  Task.init(
    {
      taskName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'The field task can not be null',
          },
        },
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      folder_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'folder',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
