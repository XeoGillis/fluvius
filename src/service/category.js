const categoryRepository = require("../repository/category");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("category-service");
  this.logger.debug(message, meta);
};

/**
 * * Finds and returns all categories in the database
 * 
 * @returns {id, color, name}
 * @see categoryRepository.findAllCategories
 * @exception Error occurred while fetching all categories
 */
const getAllCategories = async () => {
  try {
    debugLog(`Fetching all categories`);
    return await categoryRepository.findAllCategories();
  } catch (error) {
    throw Error(`Error occurred while fetching all categories`);
  }
};

/**
 * * Finds and returns all the categories and their sdgs
 * 
 * @param limit 
 * @param rolename 
 * @returns {id, color, name, sdgs}
 * @see categoryRepository.findAllCategories
 * @see categoryRepository.findSDGsByCategory
 * @exception Error occurred while fetching categories and sdgs
 */
const getCategoriesAndSDGs = async (limit, rolename) => {
  try { 
    debugLog(`Fetching categories with sdgs`);
    const data = await categoryRepository.findAllCategories();
    const roleId = (await categoryRepository.findRoleId(rolename)).id;
    return await Promise.all(
      data.map(async (d) => {
        d.sdgs = await categoryRepository.findSDGsByCategory(d.id);
        d.icons = (await categoryRepository.findGoalsByCategoryAndLimit(
          limit, d.id, roleId
        ))[0];
        return d;
      })
    );
  } catch (error) {
    throw Error(`Error occurred while fetching categories and sdgs`);
  }
}

module.exports = {
  getAllCategories,
  getCategoriesAndSDGs,
};
