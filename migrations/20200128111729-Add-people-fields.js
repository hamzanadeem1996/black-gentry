'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Peoples',
                'Answer1', {
                type: Sequelize.TEXT,
                after: 'Question1'
            }),
            queryInterface.addColumn('Peoples',
                'Answer2', {
                type: Sequelize.TEXT,
                after: 'Question2'
            }),
            queryInterface.addColumn('Peoples',
                'Answer3', {
                type: Sequelize.TEXT,
                after: 'Question3'
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
