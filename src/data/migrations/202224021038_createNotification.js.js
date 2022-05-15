const { tables } = require("..");

/**
 * This creates a table Notification with
 * 
 * * id {uuid}
 * * userId {uuid}
 * *** references to User
 * * goal {uuid}
 * * text {string}
 * * seen {boolean}
 * * date {dateTime}
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Notification, (table) => {
      table.uuid("id").primary();
      table.uuid("userId");
      table
        .foreign("userId")
        .references(`${tables.User}.id`)
        .onDelete("CASCADE");
      table.uuid("goal");
      table
        .foreign("goal")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");

      table.string("text");
      table.boolean("seen").default("false");
      table.dateTime("date");
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Notification);
  },
};
