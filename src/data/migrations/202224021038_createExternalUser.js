const { tables } = require("..");

/**
 * This creates a table ExternalUser with
 * 
 * * id {uuid}
 * * roleId {uuid}
 * *** references to Role
 * * username {string}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.ExternalUser, (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("roleId").notNullable();
      table
        .foreign("roleId")
        .references(`${tables.Role}.id`)
        .onDelete("CASCADE");
      table.string("username", 255).notNullable();
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.ExternalUser);
  },
};
