'use strict';
const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
    const Admins = sequelize.define('Admins', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {});
    Admins.associate = function (models) {

        Admins.beforeCreate((user, options) => {
            if (user.password) {
                return bcrypt.hash(user.password, 10)
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => {
                        console.log('========', err)
                        throw new Error();
                    });
            }

        });
        Admins.beforeUpdate((user, options) => {
            if (user.password) {
                return bcrypt.hash(user.password, 10)
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => {
                        throw new Error();
                    });
            }
        });

    };

    return Admins;
};