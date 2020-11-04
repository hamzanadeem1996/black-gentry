'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
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
          orderId:{
            type: Sequelize.INTEGER
          },
          imageUrl:{
              type:Sequelize.STRING
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
    return queryInterface.dropTable('Images');
  }
};