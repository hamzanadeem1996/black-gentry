'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('Reactions', {
    fromId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    toId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    reaction: {
      type: DataTypes.ENUM('dislike', 'like', 'superlike'),
      defaultValue: null,
    },
  }, {});
  Reactions.associate = function (models) {
    // associations can be defined here

    // associations can be defined here
    Reactions.belongsTo(models.Users, {
      foreignKey: 'fromId',
      targetKey: 'id',
      as: 'reactionForUser'
    });

    // associations can be defined here
    Reactions.belongsTo(models.Users, {
      foreignKey: 'toId',
      targetKey: 'id',
      as: 'reactionToUser'
    });

  };

  return Reactions;
};