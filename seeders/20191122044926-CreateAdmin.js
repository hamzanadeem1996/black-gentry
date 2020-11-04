'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('GentryBlack@123', 10)
          .then(hash => {
              return hash;
          })
          .catch(err => { 
              throw new Error(); 
          });

    return queryInterface.bulkInsert('Admins', [{
      email: 'admin@blackgentryapp.com',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}).catch(err => {console.log('err...',err)});
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
