const { tables } = require("..");

/**
 * This creates a table Goal with
 * 
 * * id {uuid}
 * * valueAxisName {string}
 * * name {string}
 * * sdgId {string}
 * *** references to SDG
 * * subSdgId {string}
 * *** references to SDG
 * * parent {uuid}
 * *** references to Goal
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Goal, (table) => {
      table.uuid("id").primary();
      table.string("valueAxisName", 255);
      table.string("name", 255).unique();
      table.string("sdgId");
      table.string("IconName").defaultTo(null);
      table
        .foreign("sdgId")
        .references(`${tables.SDG}.id`)
        .onDelete("CASCADE");
      table.string("subSdgId");
      table
        .foreign("subSdgId")
        .references(`${tables.SDG}.id`)
        .onDelete("CASCADE");
      table.uuid("parentId");
      table
        .foreign("parentId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Goal);
  },
};
