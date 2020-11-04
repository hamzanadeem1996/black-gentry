'use strict';
module.exports = (sequelize, Sequelize) => {
  const Selfies = sequelize.define('Selfies', {
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
    selfieUrl: {
      type: Sequelize.STRING
    },
    isVerified: {
      allowNull: false,
      type: Sequelize.ENUM('Yes','No'),
      defaultValue: 'No',
      comment: 'Yes OR No'
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  }, {});
  Selfies.associate = function (models) {
    // associations can be defined here

    Selfies.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'SelfiesForUser'
    });

  };
  return Selfies;
};