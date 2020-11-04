'use strict';
module.exports = (sequelize, Sequelize) => {
  const Answers = sequelize.define('Answers', {
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
      }
  }, {});
  Answers.associate = function(models) {
    // associations can be defined here

    Answers.belongsTo(models.Users, {
        foreignKey : 'userId',
        targetKey: 'id',
        as: 'AnswerForUser'
    });

    Answers.belongsTo(models.Users, {
      foreignKey : 'matchId',
      targetKey: 'id',
      as: 'AnswerByUser'
  });


    Answers.belongsTo(models.Peoples, {
      foreignKey : 'matchId',
      targetKey: 'userId',
      as: 'AnswerForPeople'
  });
  

  };
  return Answers;
};