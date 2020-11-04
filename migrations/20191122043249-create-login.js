'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logins', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },  
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          allowNull: false
        },
        auth_token: {
          allowNull: false,
          type: Sequelize.STRING
        },
        deviceId: {
            allowNull: false,
            type: Sequelize.STRING
        },
        deviceType: {
            allowNull: false,
            type: Sequelize.STRING
        },
        devicetoken: {
            allowNull: false,
            type: Sequelize.STRING
        },
        rememberToken: {
            type: Sequelize.ENUM('Yes','No'),
            defaultValue: 'No',
            comment: 'Yes OR No'  
        },
        socialType: {
          type: Sequelize.ENUM('1','2','3'),
          defaultValue: '1',
          comment: '1 = email , 2 = facebook , 3 = Google'  
      },
      socialId: {
        type: Sequelize.STRING
    },
        status: {
            type: Sequelize.ENUM('LoggedIn','LoggedOut','Blocked'),
            comment: 'LoggedIn , LoggedOut OR Blocked' 
          },
          deletedAt: {
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
    return queryInterface.dropTable('Logins');
  }
};