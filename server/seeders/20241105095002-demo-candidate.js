'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../candidates.json').map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert('Candidates', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Candidates', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
