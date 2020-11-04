'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
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
          matchId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'id'
            },
            allowNull: false
          },
          Answer1:{
            type: Sequelize.TEXT
        },
        Answer2:{
            type: Sequelize.TEXT
        },
        Answer3:{
            type: Sequelize.TEXT
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
    return queryInterface.dropTable('Answers');
  }
};