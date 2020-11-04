'use strict';
const User         = require('./users.js')
module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define('Chat', {
    from_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }, 
    to_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }, 
    message: Sequelize.TEXT,
    status: {
      type:   Sequelize.ENUM,
      values: ['Unread', 'Read'],
    },
    // type: {
    //   type:   Sequelize.ENUM,
    //   values: ['0', '1', '2','3'],
    // },
    // filename:Sequelize.STRING,  
  }, {
    // freezeTableName: true, 
    // tableName: 'chats'
  });
  Chat.associate = function(models) { 

    Chat.belongsTo(models.Users, {
      foreignKey: 'from_id',
      targetKey: 'id',
      as: 'ChatByUser'
    });

    Chat.belongsTo(models.Users, {
      foreignKey: 'to_id',
      targetKey: 'id',
      as: 'ChatToUser'
    });

  };
  //Chat.belongsTo(User);
  //Chat.hasMany(User, {foreignKey: 'from_id', sourceKey: 'id'});
  return Chat;
};