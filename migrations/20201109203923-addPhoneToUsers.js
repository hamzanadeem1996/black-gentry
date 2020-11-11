'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
      'phone', {
        type: Sequelize.STRING,
        after : 'email',
        defaultValue: null,
        allowNull: true
      }),
      queryInterface.changeColumn('Users',
      'email', {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users',
      'phone', {
        type: Sequelize.STRING,
        after : 'email',
        defaultValue: null,
        allowNull: true
      }),
      queryInterface.changeColumn('Users',
      'email', {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false
      })
    ])
  }
};
