'use strict';
module.exports = (sequelize, Sequelize) => {
  const usersPurchases = sequelize.define('usersPurchases', {
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
    tokenType: {
        type: Sequelize.ENUM('TimeTokens','CrushTokens'),
        comment: 'TimeTokens OR CrushTokens'
    },
    Quantity: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    price: {
        type: Sequelize.DOUBLE
    },
  }, {});
  usersPurchases.associate = function (models) {
    // associations can be defined here

    usersPurchases.belongsTo(models.Users, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'TokenForUser'
      });

  };
  return usersPurchases;
};