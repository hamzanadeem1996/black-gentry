'use strict';
module.exports = (sequelize, Sequelize) => {
  const Swipescounters = sequelize.define('Swipescounters', {
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
    likesCounter: {
      type: Sequelize.INTEGER
    },
    totalCounter: {
      type: Sequelize.INTEGER
    },
    swipesGivenAt: {
      type: Sequelize.DATE
    }
  }, {});
  Swipescounters.associate = function (models) {
    // associations can be defined here


    Swipescounters.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'swipeCounterForUser'
    });


  };
  return Swipescounters;
};