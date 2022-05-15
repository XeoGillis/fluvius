const { tables } = require("..");

/**
 * This creates a table SDG with
 * 
 * * goal {integer}
 * * id {string}
 * * categoryId {string}
 * *** references to Category
 * * description {string}
 * * title {string}
 * * color {string}
 * * url {string}
 * * parent {integer}
 * *** references to SDG
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.SDG, (table) => {
      table.integer("goal").unique();
      table.string("id").primary();
      table.string("categoryId");
      table
        .foreign("categoryId")
        .references(`${tables.Category}.id`)
        .onDelete("CASCADE");
      table.string("description", 1024);
      table.string("title");
      table.string("color");
      table.string("url");
      table.integer("parent");
      table
        .foreign("parent")
        .references(`${tables.SDG}.goal`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.SDG);
  },
};
