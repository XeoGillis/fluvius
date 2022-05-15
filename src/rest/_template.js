const Router = require("@koa/router");
const templateService = require("../service/template");
const Joi = require("joi");
const validate = require("./_validation.js");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const roles = require("../core/roles");
const { decode } = require("jsonwebtoken");

/**
 * * Creates a template for the given roleId
 * 
 * @param roleId
 * @see templateService.createTemplate
 * @returns {message}
 * @exception {message}
 */
const createTemplate = async (ctx) => {
  ctx.body = await templateService.createTemplate({ ...ctx.request.body });
};
createTemplate.validationScheme = {
  body: {
    roleId: Joi.string().uuid(),
  }
}

/**
 * * Deletes the template with the given templateId
 * 
 * @param id 
 * @returns {message} 
 * @see templateService.deleteTemplate
 * @exception {message}
 */
const deleteTemplate = async (ctx) => {
  ctx.body = await templateService.deleteTemplate(ctx.params.id);
};
deleteTemplate.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  }
}

/**
 * * Edits a template with the given template id, goal id and flag
 * 
 * @param templateId
 * @param goalId 
 * @param flag 
 * @returns {message} 
 * @see templateService.editTemplate
 * @exception {message}
 */
const editTemplate = async (ctx) => {
  ctx.body = await templateService.editTemplate(ctx.request.body);
};
editTemplate.validationScheme = {
  body: {
    templateId: Joi.string().uuid(),
    goalId: Joi.string().uuid(),
    flag: Joi.boolean()
  },
};

/**
 * * Edits a personal template for the user with the given goal id and flag
 * 
 * @param goalId 
 * @param flag
 * @returns {message}
 * @see templateService.editPersonalTemplate
 * @exception {message}
 */
const editPersonalTemplate = async (ctx) => {
  ctx.body = await templateService.editPersonalTemplate({ 
    ...ctx.request.body, 
    userId: decode(ctx.headers.authorization.substr(7)).userId 
  });
};
editPersonalTemplate.validationScheme = {
  body: {
    goalId: Joi.string().uuid(),
    flag: Joi.boolean()
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/template" });

  router.post(
    "/",
    requireAuthentication,
    makeRequireRole(roles.MVOcoördinator),
    validate(createTemplate.validationScheme),
    createTemplate
  );
  router.delete(
    "/:id",
    requireAuthentication,
    makeRequireRole(roles.MVOcoördinator),
    validate(deleteTemplate.validationScheme),
    deleteTemplate
  );
  router.put(
    "/",
    requireAuthentication,
    makeRequireRole(roles.MVOcoördinator),
    validate(editTemplate.validationScheme),
    editTemplate
  );
  router.put(
    "/personal",
    requireAuthentication,
    validate(editPersonalTemplate.validationScheme),
    editPersonalTemplate
  );

  app.use(router.routes()).use(router.allowedMethods());
};