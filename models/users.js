'use strict';
const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    roleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
      defaultValue: '2'
    },
    linkedinId: { 
      type: Sequelize.TEXT,
    },
    AppleID: {
      type: Sequelize.TEXT,
    },
    isLinkedinUser: {
      type: Sequelize.ENUM('Yes', 'No'),
      defaultValue: 'No'
    },
    status: {
      type: Sequelize.ENUM('Active', 'Deactive'),
      defaultValue: 'Deactive',
      comment: 'Active OR Deactive'
    },
    statusByadmin: {
      type: Sequelize.ENUM('Activate', 'Deactivate'),
      defaultValue: 'Activate',
      comment: 'Activate OR Deactivate'
    },
    isRejected: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    isReported: {
      allowNull: false,
      type: Sequelize.ENUM('Yes', 'No'),
      defaultValue: 'No',
      comment: 'Yes OR No'
    },
    isVerified: {
      allowNull: false,
      type: Sequelize.ENUM('Yes', 'No'),
      defaultValue: 'No',
      comment: 'Yes OR No'
    },
    isPremium: {
      allowNull: false,
      type: Sequelize.ENUM('Yes', 'No'),
      defaultValue: 'No',
      comment: 'Yes OR No'
    },
    approvesIn: {
      allowNull: false,
      type: Sequelize.ENUM('2', '5'),
      defaultValue: '5',
      comment: '2 OR 5 days'
    },
    instaTokenCreated: {
      type: Sequelize.DATE
    },
    instaToken: {
      type: Sequelize.STRING
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
  }, {});
  Users.associate = function (models) {
    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      targetKey: 'id',
      as: 'userroles'
    });


    Users.hasOne(models.Otps, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'otpOfUser'
    });

    Users.hasOne(models.Logins, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'loginForUser'
    });

    Users.hasOne(models.Peoples, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'profileOfUser'
    });

    Users.hasMany(models.Images, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'ImageForUser'
    });

    Users.hasOne(models.Selfies, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'SelfiesForUser'
    });

    Users.hasOne(models.Answers, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'AnswerForUser'
    });

    Users.hasMany(models.Reactions, {
      foreignKey: 'toId',
      targetKey: 'id',
      as: 'reactedPerson'
    });

    Users.hasMany(models.Reactions, {
      foreignKey: 'fromId',
      targetKey: 'id',
      as: 'reactPerson'
    });

    Users.hasMany(models.Chat, {
      foreignKey: 'from_id',
      targetKey: 'id',
      as: 'ChatByUser'
    });

    Users.hasMany(models.Chat, {
      foreignKey: 'to_id',
      targetKey: 'id',
      as: 'ChatToUser'
    });

    Users.hasMany(models.Reports, {
      foreignKey: 'reportedBy',
      targetKey: 'id',
      as: 'ReportByUser'
    });

    Users.hasMany(models.Reports, {
      foreignKey: 'reportedFor',
      targetKey: 'id',
      as: 'ReportForUser'
    });

    Users.hasMany(models.Reactions, {
      foreignKey: 'fromId',
      targetKey: 'id',
      as: 'reactionForUser'
    });


    Users.hasMany(models.Reactions, {
      foreignKey: 'toId',
      targetKey: 'id',
      as: 'reactionToUser'
    });

    Users.hasOne(models.Subscriptions, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'subscriptionForUser'
    });

    Users.hasOne(models.Swipescounters, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'swipeCounterForUser'
    });

    Users.hasMany(models.usersPurchases, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'TokenForUser'
    });

  };

  return Users;
};