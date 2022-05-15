const { tables, getKnex } = require("../data");

/**
 * * Finds and returns all categories in the database
 * 
 * @returns {id, color, name}
 */
const findAllCategories = async () => {
  return await getKnex()(tables.Category).select("id", "color", "name");
};

/**
 * * Finds and returns all the categories and their sdgs
 * 
 * @returns {id, color, name, sdgs}
 * @see categoryRepository.findAllCategories
 */
const findSDGsByCategory = async (categoryId) => {
  return await getKnex()(tables.SDG)
    .select("id", "url", "title")
    .where(`${tables.SDG}.categoryId`, categoryId)
    .orderBy(`${tables.SDG}.goal`)
}

/**
 * * Finds all the goals belonging to a categoryname
 * 
 * @param limit 
 * @param id 
 * @param roleId
 * @returns {name} 
 */
 const findGoalsByCategoryAndLimit = async (limit, id, roleId) => {
  return await getKnex().raw(`
    SELECT g.name, g.IconName
    FROM ${tables.Goal} g 
      JOIN ${tables.SDG} s ON g.sdgId = s.id 
      JOIN ${tables.Category} c ON s.categoryId = c.id
      JOIN ${tables.TemplateGoal} tg ON g.id = tg.goalId
      JOIN ${tables.Template} t ON tg.templateId = t.id
    WHERE c.id = '${id}' 
      AND t.roleId = '${roleId}' 
      AND tg.canView = 1 
    ORDER BY g.IconName DESC
    LIMIT ${limit}
  `);
}

/**
 * * Finds and returns the id in the database with the given rolename
 * 
 * @param rolename 
 * @returns {id} 
 */
 const findRoleId = async (rolename) => {
  return await getKnex()(tables.Role)
    .select("id")
    .where("name", rolename)
    .first();
}

module.exports = {
  findAllCategories,
  findSDGsByCategory,
  findGoalsByCategoryAndLimit,
  findRoleId
};
