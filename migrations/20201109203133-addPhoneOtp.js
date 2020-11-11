'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Otps',
      'isPhoneOtp', {
        type: Sequelize.BOOLEAN,
        after : 'counter',
        defaultValue: false,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Otps',
      'isPhoneOtp', {
        type: Sequelize.BOOLEAN,
        after : 'counter',
        defaultValue: false,
        allowNull: true
      })
    ])
  }
};
