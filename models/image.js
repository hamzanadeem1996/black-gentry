'use strict';
module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define('Images', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    orderId: {
      type: Sequelize.INTEGER
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  }, {});
  Image.associate = function (models) {
    // associations can be defined here

    Image.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'ImageForUser'
    });

  };
  return Image;
};