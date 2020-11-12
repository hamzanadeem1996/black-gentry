'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Peoples',
      'state', {
        type: Sequelize.STRING,
        after : 'City',
        defaultValue: null,
        allowNull: true
      }),
      queryInterface.addColumn('Peoples',
      'country', {
        type: Sequelize.STRING,
        after: 'state',
        defaultValue: null,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Peoples',
        'state', {
          type: Sequelize.STRING,
          after : 'City',
          defaultValue: null,
          allowNull: true
        }),
        queryInterface.removeColumn('Peoples',
        'country', {
          type: Sequelize.STRING,
          defaultValue: null,
          allowNull: true
        })
    ])
  }
};
