const templateRepository = require("../repository/template");
const { getChildLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("template-service");
  this.logger.debug(message, meta);
};

/**
 * * Creates a template for the given role id
 * 
 * @param roleId 
 * @returns {message} 
 * @see templateRepository.addTemplate
 * @exception {message}
 */
const createTemplate = async (body) => {
  try {
    debugLog(`Creating a template for role-id ${body?.roleId}`);
    await templateRepository.addTemplate(body);
    return { "message": "Template has successfully been created" }
  } catch (error) {
    throw Error(`Error occurred while creating a template for role-id ${body?.roleId}`);
  }
};

/**
 * * Deletes the template with the given template id
 * 
 * @param id 
 * @returns {message} 
 * @see templateRepository.deleteTemplate
 * @exception {message} 
 */
const deleteTemplate = async (id) => {
  try {
    debugLog(`Deleting template with id ${id}`);
    await templateRepository.deleteTemplate(id);
    return { "message": "Template has successfully been deleted" }
  } catch (error) {
    throw Error(`Error occurred while deleting template with TemplateId ${id}`);
  }
};

/**
 * * Edits a template with the given template id, goalId and flag
 * 
 * @param templateId 
 * @param goalId 
 * @param flag 
 * @returns {message}
 * @see templateRepository.getRolename
 * @see templateRepository.updateTemplateGoal
 * @see templateRepository.createTemplateGoal
 * @see templateRepository.updateTemplateChildren
 * @exception {message}
 */
const editTemplate = async ({ templateId, goalId, flag }) => {
  try {
    debugLog(`editing template with id ${templateId}`);
    const rolename = (await templateRepository.getRolename(templateId)).name;
    if (rolename === "MVO Coördinator")
      return { "message": "Can't edit MVO Coördinator's template" };
    const success = await templateRepository.updateTemplateGoal(flag, templateId, goalId);
    if (success !== 1)
      await templateRepository.createTemplateGoal(flag, templateId, goalId);
    debugLog(success);
    await templateRepository.updateTemplateChildren(flag, templateId, goalId);
    return { "message": "Template has successfully been edited" };
  } catch (error) {
    throw Error(`Error occurred while editing template with id ${templateId}`);
  }
};

/**
 * * Edits a personal template for the user with the given goal id and flag
 * 
 * @param goalId 
 * @param flag
 * @param userId
 * @returns {message}
 * @see templateRepository.deletePersonalTemplate
 * @see templateRepository.editPersonalTemplate
 * @exception {message}
 */
const editPersonalTemplate = async ({ goalId, flag, userId }) => {
  try {
    debugLog(`editing template with id ${userId}`);
    if (flag) 
      await templateRepository.deletePersonalTemplate(goalId, userId);
    else 
      await templateRepository.editPersonalTemplate(goalId, flag, userId);
    return { "message": "Template has successfully been edited" }
  } catch (error) {
    throw Error(`Error occurred while editing template with id ${userId}`);
  }
};

module.exports = {
  createTemplate,
  deleteTemplate,
  editTemplate,
  editPersonalTemplate
};