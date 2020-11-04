'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Selfies', {
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
          imageUrl:{
              type:Sequelize.STRING
          }, 
          isVerified: {
            allowNull: false,
            type: Sequelize.ENUM('Yes','No'),
            defaultValue: 'No',
            comment: 'Yes OR No'
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
    return queryInterface.dropTable('Selfies');
  }
};