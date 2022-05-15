const { tables, getKnex } = require("../data");
const uuid = require("uuid");

/**
 * * Creates a template for the given role id
 */
const addTemplate = async ({ roleId }) => {
  await getKnex()(tables.Template)
    .insert({ id: uuid.v4(), roleId });
};

/**
 * * Deletes the template with the given template id
 * 
 * @param id 
 */
const deleteTemplate = async (id) => {
  await getKnex()(tables.Template).where("id", id).del();
};

/**
 * * Returns the rolename of a given template id
 * 
 * @param templateId 
 * @returns {name}
 */
const getRolename = async (templateId) => {
  return await getKnex()(tables.Role)
    .select("name")
    .join(tables.Template, `${tables.Template}.roleId`, `${tables.Role}.id`)
    .where(`${tables.Template}.id`, templateId)
    .first()
}

/**
 * * Updates the templategoal with the given template id
 * 
 * @param flag 
 * @param templateId 
 * @param goalId 
 */
const updateTemplateGoal = async (flag, templateId, goalId) => {
  return await getKnex()(tables.TemplateGoal)
    .update({ canView: flag })
    .where({ templateId: templateId, goalId: goalId });
}

/**
 * * Updates all the templates with the given template id as parent
 * 
 * @param flag 
 * @param templateId 
 * @param parentId  
 */
const updateTemplateChildren = async (flag, templateId, parentId) => {
  return await getKnex().raw(`
    UPDATE templategoal 
    SET canView = ${flag}
    WHERE goalId IN (
      SELECT id 
      FROM goal 
      WHERE parentId = '${parentId}'
    ) AND templateId = '${templateId}' 
  `)
}

/**
 * * Creates a templategoal with the given template id, goal id and flag
 * 
 * @param flag 
 * @param templateId 
 * @param goalId 
 */
const createTemplateGoal = async (flag, templateId, goalId) => {
  return await getKnex()(tables.TemplateGoal)
    .insert({
      id: uuid.v4(),
      templateId: templateId,
      goalId: goalId,
      canView: flag
    })
    .onConflict()
    .merge();
}

/**
 * * Deletes a template with the given template id
 * 
 * @param goalId 
 * @param userId 
 */
const deletePersonalTemplate = async (goalId, userId) => {
  await getKnex()(tables.PersonalTemplate)
    .where({
      templateGoalId: getTemplateGoalId(goalId, userId),
      userId: userId
    })
    .del();
}

/**
 * * Edits a personal template for the user with the given goal id and flag
 * 
 * @param goalId 
 * @param flag 
 * @param userId 
 */
const editPersonalTemplate = async (goalId, flag, userId) => {
  await getKnex()(tables.PersonalTemplate)
    .insert({
      templateGoalId: getTemplateGoalId(goalId, userId),
      userId: userId,
      interested: flag
    })
    .onConflict()
    .merge();
};

/**
 * * Finds the templategoal id for the given user with the given goal
 * 
 * @param goalId 
 * @param userId
 * @returns {id} 
 */
const getTemplateGoalId = (goalId, userId) => {
  return getKnex()(tables.TemplateGoal)
    .select(`${tables.TemplateGoal}.id`)
    .join(tables.Goal, `${tables.TemplateGoal}.goalId`, `${tables.Goal}.id`)
    .join(tables.Template, `${tables.TemplateGoal}.templateId`, `${tables.Template}.id`)
    .join(tables.Role, `${tables.Template}.roleId`, `${tables.Role}.id`)
    .join(tables.User, `${tables.Role}.id`, `${tables.User}.roleId`)
    .where(`${tables.User}.id`, userId).and.where(`${tables.Goal}.id`, goalId)
    .first()
}

module.exports = {
  addTemplate,
  deleteTemplate,
  editPersonalTemplate,
  getRolename,
  updateTemplateGoal,
  updateTemplateChildren,
  createTemplateGoal,
  deletePersonalTemplate
};
