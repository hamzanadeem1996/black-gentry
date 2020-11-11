'use strict';
module.exports = (sequelize, Sequelize) => {
  const Otp = sequelize.define('Otps', {
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
    otp: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    counter: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    isPhoneOtp: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
  }, {});
  Otp.associate = function(models) {
    // associations can be defined here
    Otp.belongsTo(models.Users, {
      foreignKey : 'userId',
      targetKey: 'id',
      as: 'otpOfUser'
    });
  };
  return Otp;
};