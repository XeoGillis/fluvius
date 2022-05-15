const { tables } = require("..");
const sdgData = require("../sdgData.json");

/**
 * Fills the table SDG
 *
 * @see src\data\migrations\202223021601_createSdg.js
 * @see src\data\sdgData.json
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.SDG).delete();
    await knex(tables.SDG).insert(sdgData);
  },
};
