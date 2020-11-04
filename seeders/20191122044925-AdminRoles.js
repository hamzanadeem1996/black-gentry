'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      slug: 'admin',
      description: 'Super Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'User',
      slug: 'User',
      description: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
