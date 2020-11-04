'use strict';
module.exports = (sequelize, Sequelize) => {
  const Login = sequelize.define('Logins', {
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
    auth_token: {
      allowNull: false,
      type: Sequelize.STRING
    },
    deviceId: {
        allowNull: false,
        type: Sequelize.STRING
    },
    deviceType: {
        allowNull: false,
        type: Sequelize.ENUM('ANDROID','IOS'),
        defaultValue: 'No',
        comment: 'ANDROID OR IOS'
      },
    devicetoken: {
        allowNull: false,
        type: Sequelize.STRING
    },
    rememberToken: {
        type: Sequelize.ENUM('Yes','No'),
        defaultValue: 'No',
        comment: 'Yes OR No'  
    },
    socialType: {
      type: Sequelize.ENUM('1','2','3','4','5'),
      defaultValue: '1',
      comment: '1 = email , 2 = facebook , 3 = Google , 4 = linkedin , 5 = Apple',   
  },
  socialId: {
    type: Sequelize.STRING
},
    status: {
        type: Sequelize.ENUM('LoggedIn','LoggedOut','Blocked'),
        comment: 'LoggedIn , LoggedOut OR Blocked' 
      },
      deletedAt: {
        type: Sequelize.DATE
      }
  }, {});
  Login.associate = function(models) {
    // associations can be defined here

    Login.belongsTo(models.Users, {
      foreignKey : 'userId',
      targetKey: 'id',
      as: 'loginForUser'
    });

  };
  return Login;
};