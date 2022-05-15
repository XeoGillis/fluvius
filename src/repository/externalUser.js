const { tables, getKnex } = require("../data");


/**
 * * Finds and returns the external user in the database with the given username
 * 
 * @returns {externalUserId, username, rolename}
 */
const findByExternalUsername = async (username) => {
  return await help("username", username)
};

/**
 * * Finds and returns the external user in the database with the given id
 *
 * @returns {externalUserId, username, rolename}
 */
const findByExternalUserId = async (externalUserId) => {
  return await help(`${tables.ExternalUser}.id`, externalUserId);
};

/**
 * * Generic method for finding an external user
 * 
 * @param {string} value 
 * @param {string} user 
 * @returns {externalUserId, username, rolename}
 */
const help = async (value, user) => {
  return await getKnex()(tables.ExternalUser)
  .select(`${tables.ExternalUser}.id as externalUserId`, "username", "name as rolename")
  .join(tables.Role, `${tables.Role}.id`, `${tables.ExternalUser}.roleId`)
  .where(value, user)
  .first();
}

module.exports = {
  findByExternalUsername,
  findByExternalUserId,
};
