'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
      'instaTokenCreated', {
        type: Sequelize.DATE,
        after: 'approvesIn'
      }),
      queryInterface.addColumn('Users',
      'instaToken', {
        type: Sequelize.STRING,
        after: 'approvesIn'
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
