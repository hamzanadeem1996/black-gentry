'use strict';
module.exports = (sequelize, Sequelize) => {
  const tokenRecords = sequelize.define('tokenRecords', {
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
    timeTokensPurchased: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    superlikesPurchased: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    price: {
        type: Sequelize.DOUBLE
    }
  }, {});
  tokenRecords.associate = function (models) {
    // associations can be defined here

  };
  return tokenRecords;
};