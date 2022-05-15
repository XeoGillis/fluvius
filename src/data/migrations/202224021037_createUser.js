const { tables } = require("..");

/**
 * This creates a table User with
 * 
 * * id {uuid}
 * * roleId {uuid}
 * *** references to Role
 * * username {string}
 * * passwordhash {string}
 * * email {string}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.User, (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("roleId").notNullable();
      table
        .foreign("roleId")
        .references(`${tables.Role}.id`)
        .onDelete("CASCADE");
      table.string("username", 255).notNullable();
      table.string("passwordhash").notNullable();
      table.string("email", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.User);
  },
};
