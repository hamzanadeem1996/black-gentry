'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'expiredMatches', {
        type: Sequelize.ENUM('On', 'Off'),
        defaultValue: 'On',
        after: 'callNotify'
      }),
      queryInterface.addColumn('Peoples',
      'callReminder', {
        type: Sequelize.ENUM('On', 'Off'),
        defaultValue: 'On',
        after: 'expiredMatches'
      }),
      queryInterface.addColumn('Peoples',
      'matchUpdates', {
        type: Sequelize.ENUM('On', 'Off'),
        defaultValue: 'On',
        after: 'callReminder'
      })
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
