const { tables } = require("..");

/**
 * Fills the table Template
 *
 * @see src\data\migrations\202224021024_createTemplate.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Template).delete();
    await knex(tables.Template).insert([
      {
        id: "c401740a-2046-4458-b57f-955ddbf4e018",
        roleId: "eb3c0a1d-9217-45c0-bc20-79fee16cc700",
      },
      {
        id: "3aefcce6-422b-434c-a872-6399a104ab6a",
        roleId: "443213d4-9508-41f5-8b8e-892f6e1a5c31",
      },
    ]);
  },
};
