'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'callNotify', {
        type: Sequelize.ENUM('On', 'Off'),
        defaultValue: 'On',
        after: 'distance'
      }),
      queryInterface.addColumn('Peoples',
      'matchNotify', {
        type: Sequelize.ENUM('On', 'Off'),
        defaultValue: 'On',
        after: 'distance'
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
