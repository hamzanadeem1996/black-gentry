'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Peoples',
      'Kids', {
        type: Sequelize.ENUM('Don’t have any', 'Have and want more', 'Have and don’t want anymore', 'Don’t want any'),
        comment: 'Don’t have any, Have and want more, Have and don’t want anymore, Don’t want any', after: 'ethnicity'
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
