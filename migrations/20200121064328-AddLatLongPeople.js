'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'latitude', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'Question3'
      }),
      queryInterface.addColumn('Peoples',
      'longitude', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'Question3'
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
      queryInterface.removeColumn('Peoples',
      'latitude', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'Question3'
      }),
      queryInterface.removeColumn('Peoples',
      'longitude', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'Question3'
      })
    ])/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
