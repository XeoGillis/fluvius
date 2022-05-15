const { getChildLogger } = require("../core/logging");
const roleRepository = require("../repository/roles");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("roles-service");
  this.logger.debug(message, meta);
};

/**
 * * Returns all roles
 * 
 * @returns {id, color, name, templateId}
 * @see roleRepository.findAllRoles
 */
const getAllRoles = async () => {
  try {
  debugLog(`Fetching all roles`);
  return (await roleRepository.findAllRoles())[0];
  } catch (error) {
    throw Error(`Error occurred while fetching all roles`)
  }
}

module.exports = {
  getAllRoles
}