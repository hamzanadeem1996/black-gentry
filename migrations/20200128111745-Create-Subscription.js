'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Subscriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                allowNull: false
            },
            subscriptionId: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE
            },
            subscriptionPeriod: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            subscriptionStatus:{
                allowNull: false,
                type: Sequelize.ENUM('Active','Cancelled'),
                defaultValue: 'Active',
                comment: 'Active OR Cancelled'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Subscriptions');
    }
};