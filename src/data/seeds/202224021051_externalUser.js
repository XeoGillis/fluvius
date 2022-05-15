const nodemon = require("nodemon");
const { tables } = require("..");

/**
 * Fills the table Externaluser
 *
 * @see src\data\migrations\202224021038_createExternalUser.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.ExternalUser).delete();
    await knex(tables.ExternalUser).insert([
      {
        id: "2f4e0e16-4e52-4693-8c0a-f30585d56cb6",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Cara.Van",
      },
      {
        id: "442af60b-b230-4377-99dd-2222d8c5ff43",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Dick.Tater",
      },
      {
        id: "36ce5bdc-c864-42c1-bc5d-e9fc64fd0acd",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Dinah.Soares",
      },
      {
        id: "998d4f30-5785-451e-8c2e-f5cfddf2faeb",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Dusty.Rhodes",
      },
      {
        id: "9ea5f3fb-01dd-40a9-8a6b-4d8e34e7a971",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Ella.Vader",
      },
      {
        id: "7e24f340-ecb5-4eb8-83fa-4adb48561fa2",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Hugh.Jass",
      },
      {
        id: "bb7ee0a1-7e58-4963-9010-591c68764fcf",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "jerry.Atrick",
      },
      {
        id: "7da22228-12f9-4ff8-a118-67dc8abedbea",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Mo.Lestor",
      },
      {
        id: "67b5a98a-5e37-4cfa-946e-8718cd9ed4a7",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Ryan.Carnation",
      },
      {
        id: "de59acf0-8329-4d6d-afd9-128c2bb9677c",
        roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
        username: "Warren.Peace",
      },
    ]);
  },
};
