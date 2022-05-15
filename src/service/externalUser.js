const externalUserRepository = require("../repository/externalUser");
const { generateJWT } = require("../core/jwt");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("externalUser-service");
  this.logger.debug(message, meta);
};

/**
 * * Logs a user in by creating a token
 * 
 * @param {Object} user 
 * @returns {Object}
 * @see generateJWT
 * @exception Error while signing new token
 */
const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return { user: user, token };
};

/**
 * * Logs an external user in with the given username
 * 
 * @returns {user, token}
 * @see externalUserRepository.findByExternalUsername
 * @see makeLoginData
 * @exception Given username is incorrect
 * @exception Error while signing new token
 */
const externalLogin = async (username) => {
  const user = await externalUserRepository.findByExternalUsername(username);
  if (!user) throw new Error("Given username is incorrect");
  debugLog(`External user ${username} has logged in`);
  return await makeLoginData(user);
};

/**
 * * Finds and returns the external user in the database with the given id
 * 
 * @param id
 * @returns {externalUserId, username, rolename}
 * @see externalUserRepository.findByExternalUserId
 * @exception Error occurred while fetching external user with id
 */
const getExternalUserByExternalUserId = async (externalUserId) => {
  try {
    debugLog(`Fetching external user with id ${externalUserId}`);
    return await externalUserRepository.findByExternalUserId(externalUserId);
  } catch (error) {
    throw Error(
      `Error occurred while fetching external user with id ${externalUserId}`
    );
  }
};

module.exports = {
  externalLogin,
  getExternalUserByExternalUserId,
};
