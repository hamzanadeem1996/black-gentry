'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Matches',
      'answersGiven', {
        type: Sequelize.ENUM('Yes', 'No'),
        comment: 'Yes , No',
        after: 'CalltimerExpiry'
      })
    ])/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Matches',
      'answersGiven', {
        type: Sequelize.ENUM('Yes', 'No'),
        comment: 'Yes , No',
        after: 'CalltimerExpiry'
      })
    ])/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  }
};
