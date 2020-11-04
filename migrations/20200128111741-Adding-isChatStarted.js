'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Matches',
      'isChatStarted', {
        type: Sequelize.ENUM('Yes', 'No'),
        defaultValue: 'No',
        comment: 'Yes , No',
        after: 'answersGiven'
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
      queryInterface.removeColumn('Matches',
      'isChatStarted', {
        type: Sequelize.ENUM('Yes', 'No'),
        defaultValue: 'No',
        comment: 'Yes , No',
        after: 'answersGiven'
      }),
    ])/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
