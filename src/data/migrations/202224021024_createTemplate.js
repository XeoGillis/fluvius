const { tables } = require("..");

/**
 * This creates a table Template with
 * 
 * * id {uuid}
 * * roleId {uuid}
 * *** references to Role
 */
module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.Template, (table) => {
            table.uuid("id").primary();
            table.uuid("roleId").notNullable().unique();
            table
                .foreign("roleId")
                .references(`${tables.Role}.id`)
                .onDelete("CASCADE");
        });
    },
    down: async (knex) => {
        return await knex.schema.dropIfExists(tables.Template);
    },
};
