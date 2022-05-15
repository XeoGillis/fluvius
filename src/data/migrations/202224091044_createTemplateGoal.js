const { tables } = require("..");

/**
 * This creates a table TemplateGoal with
 * 
 * * id {uuid}
 * * templateId {uuid}
 * *** references to Template
 * * goaldId {uuid}
 * *** references to Goal
 * * canView {boolean}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.TemplateGoal, (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("templateId").notNullable();
      table
        .foreign("templateId")
        .references(`${tables.Template}.id`)
        .onDelete("CASCADE");
      table.uuid("goalId").notNullable();
      table
        .foreign("goalId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");
      table.unique(["templateId", "goalId"]);
      table.boolean("canView").defaultTo(false);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.TemplateGoal);
  },
};
