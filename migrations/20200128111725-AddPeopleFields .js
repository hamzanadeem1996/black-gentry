'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'lookingFor', {
        type: Sequelize.ENUM('Relationship', 'Marriage', 'Something Casual', 'Not Sure'),
        comment: 'Relationship,Marriage,Something Casual,Not Sure',
        after: 'Exercise'
      }),
      // queryInterface.addColumn('Peoples',
      // 'ambitions', {
      //   type: Sequelize.TEXT,
      //   after: 'lookingFor'
      // }),
      queryInterface.addColumn('Peoples',
      'pets', {
        type: Sequelize.ENUM('Yes', 'No'),
        comment: 'Yes or No',
        after: 'City'
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
