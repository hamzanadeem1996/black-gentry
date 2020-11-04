'use strict';
module.exports = (sequelize, Sequelize) => {
  const Subscriptions = sequelize.define('Subscriptions', {
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
    subscriptionId: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    loginType: {
      type: Sequelize.ENUM('ANDROID', 'IOS'),
      allowNull: false
    },
    orderId: {
      type: Sequelize.STRING,
    },
    purchaseToken: {
      type: Sequelize.STRING,
    },
    purchaseTime: {
      type: Sequelize.DATE,
    },
    signature: {
      type: Sequelize.TEXT,
    },
    purchaseState: {
      type: Sequelize.STRING,
    },
    autoRenewing: {
      type: Sequelize.ENUM('0', '1'),
    },
    price: {
      type: Sequelize.DOUBLE
    },
    subscriptionPeriod: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    subscriptionStatus: {
      allowNull: false,
      type: Sequelize.ENUM('Active', 'Cancelled'),
      defaultValue: 'Active',
      comment: 'Active OR Cancelled'
    }
  }, {});
  Subscriptions.associate = function (models) {
    // associations can be defined here

    Subscriptions.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'subscriptionForUser'
    });

  };
  return Subscriptions;
};