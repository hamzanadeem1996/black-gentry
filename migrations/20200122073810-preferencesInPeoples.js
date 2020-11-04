'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'distance', {
        type: Sequelize.INTEGER,
        defaultValue: 50,
        after: 'latitude'
      }),
      queryInterface.addColumn('Peoples',
      'maxAgePrefer', {
        type: Sequelize.INTEGER,
        defaultValue: 40,
        after: 'latitude'
      }),
      queryInterface.addColumn('Peoples',
      'minAgePrefer', {
        type: Sequelize.INTEGER,
        defaultValue: 18,
        after: 'latitude'
      }),
      queryInterface.addColumn('Peoples',
      'visible', {
        type: Sequelize.ENUM('True', 'False'),
        defaultValue: 'True',
        after: 'latitude'
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
