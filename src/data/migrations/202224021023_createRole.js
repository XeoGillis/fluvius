const { tables } = require("..");

/**
 * This creates a table Role with
 * 
 * * id {uuid}
 * * name {string}
 * * color {string}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Role, (table) => {
      table.uuid("id").notNullable().primary();
      table.string("name", 255).notNullable();
      table.string("color", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Role);
  },
};
