'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Matches',
      'CalltimerExpiry', {
        type: Sequelize.DATE,
        after: 'toId',
        // defaultValue: Sequelize.literal('TIMESTAMPADD(HOUR,72,CURRENT_TIMESTAMP)')
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
