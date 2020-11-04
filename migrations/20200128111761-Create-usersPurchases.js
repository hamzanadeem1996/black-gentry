'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('usersPurchases', {
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
            tokenType: {
                type: Sequelize.ENUM('TimeTokens','CrushTokens'),
                comment: 'TimeTokens OR CrushTokens'
            },
            Quantity: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            price: {
                type: Sequelize.DOUBLE
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
        return queryInterface.dropTable('usersPurchases');
    }
};