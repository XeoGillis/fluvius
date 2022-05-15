const { tables } = require("..");

/**
 * Fills the table Category
 *
 * @see src\data\migrations\202223021549_createCategory.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Category).delete();
    await knex(tables.Category).insert([
      {
        id: "b0bb0a0a-621e-4f23-9278-e477913af3fb",
        name: "Klimaat",
        color: "#b2d235",
      },
      {
        id: "5d79e9b1-45d8-4035-bacb-b814c27b3444",
        name: "Sociaal",
        color: "#a0214e",
      },
      {
        id: "a3776314-bc44-40c4-beae-bf2a5aef7e64",
        name: "Economisch",
        color: "#004C69",
      },
    ]);
  },
};
