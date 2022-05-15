const { tables } = require("..");

/**
 * Fills the table Role
 *
 * @see src\data\migrations\202224021023_createRole.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Role).delete();
    await knex(tables.Role).insert([
      {
        id: "eb3c0a1d-9217-45c0-bc20-79fee16cc700",
        name: "MVO Coördinator",
        color: "#004C69",
      },
      {
        id: "b1d22218-734b-4e19-b493-f06a0409afd4",
        name: "Directeur",
        color: "#FF3B30",
      },
      {
        id: "443213d4-9508-41f5-8b8e-892f6e1a5c31",
        name: "Manager",
        color: "#B2D235",
      },
      {
        id: "aaaed50b-48f8-42be-b8cf-6c80595ff85d",
        name: "Stakeholder",
        color: "#007BFF",
      },
      {
        id: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        name: "User",
        color: "#939393",
      },
    ]);
  },
};
