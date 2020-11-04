'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
        defaultValue: '2'
      },
      status: {
        type: Sequelize.ENUM('Active','Deactive'),
        defaultValue: 'Active',
        comment: 'Active OR Deactive'
      },
      isVerified: {
        allowNull: false,
        type: Sequelize.ENUM('Yes','No'),
        defaultValue: 'No',
        comment: 'Yes OR No'
      },
      approvesIn: {
        allowNull: false,
        type: Sequelize.ENUM('2','5'),
        defaultValue: '5',
        comment: '2 OR 5 days'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};