const { tables } = require("..");

/**
 * This creates a table PersonalTemplate with
 * 
 * * templateGoalId {uuid}
 * *** references to TemplateGoal
 * * userId {uuid}
 * *** references to User
 * * interested {boolean}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.PersonalTemplate, (table) => {
      table.uuid("templateGoalId").notNullable();
      table
        .foreign("templateGoalId")
        .references(`${tables.TemplateGoal}.id`)
        .onDelete("CASCADE");
      table.uuid("userId").notNullable();
      table
        .foreign("userId")
        .references(`${tables.User}.id`)
        .onDelete("CASCADE");
      table.boolean("interested").defaultTo(true);
      table.primary(["templateGoalId", "userId"]);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.PersonalTemplate);
  },
};
