'use strict';
const faker = require('faker');
const bcrypt = require('bcrypt'); 
const fs = require('fs');

const seedArray = [];

for(let i = 0; i < 100000; i++) {
  const password = faker.internet.password();


  const newUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()

  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
