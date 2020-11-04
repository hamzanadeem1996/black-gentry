'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Peoples',
      'maxAgePrefer', {
        type: Sequelize.INTEGER,
        defaultValue: 80,
        after: 'minAgePrefer'
      }),
      queryInterface.changeColumn('Peoples',
      'distance', {
        type: Sequelize.INTEGER,
        defaultValue: 180,
        after: 'maxAgePrefer'
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
