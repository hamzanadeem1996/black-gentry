'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Logins',
      'socialType', {
        type: Sequelize.ENUM('1','2','3','4','5'),
        defaultValue: '1',
        comment: '1 = email , 2 = facebook , 3 = Google , 4 = linkedin , 5 = Apple',  
        after: 'rememberToken'
      }),
    ])
/*
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
