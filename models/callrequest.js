'use strict';
module.exports = (sequelize, DataTypes) => {
    const CallRequests = sequelize.define('CallRequests', {
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
        proposeTime: {
            allowNull: false,
            type: DataTypes.DATE
        },
        Status: {
            type: DataTypes.ENUM('Agree', 'onHold'),
            defaultValue: 'onHold'
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        },
    }, {});
    CallRequests.associate = function (models) {
        // associations can be defined here
        CallRequests.belongsTo(models.Users, {
            foreignKey: 'fromId',
            targetKey: 'id',
            as: 'callForUser'
          });
      
          CallRequests.belongsTo(models.Users, {
            foreignKey: 'toId',
            targetKey: 'id',
            as: 'callToUser'
          });   


    };
    return CallRequests;
};