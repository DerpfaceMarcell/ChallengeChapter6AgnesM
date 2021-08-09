"use strict";

const fs = require("fs");
const biodata = JSON.parse(
  fs.readFileSync("./seed_data/user_game_biodata.json")
);
biodata.map((e) => {
  e.createdAt = new Date();
  e.updatedAt = new Date();
});
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
    await queryInterface.bulkInsert("UserGameBiodatas", biodata, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserGameBiodatas", biodata, {});
  },
};
