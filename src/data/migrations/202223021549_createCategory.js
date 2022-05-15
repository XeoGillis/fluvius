const { tables } = require("..");

/**
 * This creates a table Category with
 * 
 * * id {uuid}
 * * name {string}
 * * color {string}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Category, (table) => {
      table.uuid("id").primary();
      table.string("name", 255);
      table.string("color", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Category);
  },
};
