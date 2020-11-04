
'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    'ALTER TABLE `Peoples` CHANGE `City` `City` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;'
    )
    },

down: (queryInterface, Sequelize) => {
/*
Add reverting commands here.
Return a promise to correctly handle asynchronicity.

Example:
return queryInterface.dropTable('users');
*/
}
};
