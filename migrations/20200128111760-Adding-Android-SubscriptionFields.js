'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Subscriptions','loginType', {
        type: Sequelize.ENUM('ANDROID','IOS'),
        after: 'subscriptionId'
      }),
      queryInterface.addColumn('Subscriptions','orderId', {
        type: Sequelize.STRING,
        after: 'loginType'
      }),
      queryInterface.addColumn('Subscriptions','purchaseToken', {
        type: Sequelize.STRING,
        after: 'orderId'
      }),
      queryInterface.addColumn('Subscriptions','purchaseTime', {
        type: Sequelize.DATE,
        after: 'purchaseToken'
      }),
      queryInterface.addColumn('Subscriptions','signature', {
        type: Sequelize.TEXT,
        after: 'purchaseTime'
      }),
      queryInterface.addColumn('Subscriptions','purchaseState', {
        type: Sequelize.STRING,
        after: 'signature'
      }),
      queryInterface.addColumn('Subscriptions','autoRenewing', {
        type: Sequelize.ENUM('0','1'),
        defaultValue: 1,
        after: 'purchaseState'
      }),
    ])/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
