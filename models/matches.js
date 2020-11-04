'use strict';
var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    fromId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    toId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    CalltimerExpiry: {
      type: DataTypes.DATE,
    },
    answersGiven: {
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No'
    },
    isChatStarted: {
      allowNull: false,
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No',
      comment: 'Yes OR No'
    },
    isNotified: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    timetokenAppliedOn: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Matches.associate = function (models) {
    // associations can be defined here


    Matches.belongsTo(models.Users, {
      foreignKey: 'fromId',
      targetKey: 'id',
      as: 'MatchForUser'
    });

    Matches.belongsTo(models.Users, {
      foreignKey: 'toId',
      targetKey: 'id',
      as: 'MatchToUser'
    });

  };
  Matches.beforeCreate((matches, options) => {
    return matches.CalltimerExpiry = moment(matches.createdAt).add(24,'hours');
  });
  return Matches;
};