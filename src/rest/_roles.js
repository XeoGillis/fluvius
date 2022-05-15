const Router = require('@Koa/router');
const roleService = require('../service/roles');
const validate = require('./_validation.js');
const Role = require("../core/roles")
const { requireAuthentication, makeRequireRole } = require("../core/auth");

/**
 * * Returns all roles
 * 
 * @returns {id, color, name, templateId}
 * @see roleService.getAllRoles
 */
const getAllRoles = async (ctx) => {
  ctx.body = await roleService.getAllRoles();
}
getAllRoles.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/roles" });

  router.get(
    "/", 
    makeRequireRole(Role.MVOcoördinator), 
    requireAuthentication, 
    validate(getAllRoles.validationScheme), 
    getAllRoles
  );

  app.use(router.routes()).use(router.allowedMethods());
}