const { tables } = require("..");

/**
 * Fills the table PersonalTemplate
 *
 * @see src\data\migrations\202224091045_createPersonalTemplate.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.PersonalTemplate).delete();
    await knex(tables.PersonalTemplate).insert([
      {
        userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
        templateGoalId: "9817158e-87b8-482d-85d6-b75004f5233a",
        interested: false,
      },
      {
        userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
        templateGoalId: "e4562e47-8e99-4f4f-acce-2e3e89b60ca3",
        interested: false,
      },
      {
        userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        templateGoalId: "6fb25fea-c60b-48cb-8a52-8125c1308d0a",
        interested: false,
      },
    ]);
  },
};
