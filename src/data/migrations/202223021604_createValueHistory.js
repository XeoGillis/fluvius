const { tables } = require("..");

/**
 * This creates a table ValueHistory with
 * 
 * * targetValue {integer}
 * * currentValue {integer}
 * * weight {float}
 * * date {dateTime}
 * * goalId {uuid}
 * *** references to Goal
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.ValueHistory, (table) => {
      table.integer("targetValue");
      table.integer("currentValue");
      table.float("weight");
      table.dateTime("date");
      table.uuid("goalId");
      table
        .foreign("goalId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");
      table.primary(["goalId", "date"]);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.ValueHistory);
  },
};
