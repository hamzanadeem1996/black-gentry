'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Logins',
      'deviceType', {
        allowNull: false,
        type: Sequelize.ENUM('ANDROID','IOS'),
        comment: 'ANDROID OR IOS'
      })
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Logins',
      'deviceType', {
        allowNull: false,
        type: Sequelize.ENUM('ANDROID','IOS'),
        comment: 'ANDROID OR IOS'
      })
    ])/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
