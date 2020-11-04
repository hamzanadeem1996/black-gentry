'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
      'statusByadmin', {
        type: Sequelize.ENUM('Activate', 'Deactivate'),
        defaultValue: "Activate",
        comment: 'Activate / Deactivate ',
        after: 'status'
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
      queryInterface.removeColumn('Users',
      'statusByadmin', {
        type: Sequelize.ENUM('Activate', 'Deactivate'),
        comment: 'Activate / Deactivate ',
        after: 'status'
      }),
    ])/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
