const Router = require("@koa/router");
const categoryService = require("../service/category");
const validate = require("./_validation.js");
const Joi = require("joi");
const { decode } = require("jsonwebtoken");
const { requireAuthentication } = require("../core/auth");

/**
 * * Finds and returns all categories in the database
 * 
 * @returns {id, color, name}
 * @see categoryService.getAllCategories
 * @exception Error occurred while fetching all categories
 */
const getAllCategories = async (ctx) => {
  ctx.body = await categoryService.getAllCategories();
};
getAllCategories.validationScheme = null;

/**
 * * Finds and returns all the categories and their sdgs
 * 
 * @param limit
 * @returns {id, color, name, sdgs}
 * @see categoryService.getCategoriesAndSDGs
 * @exception Error occurred while fetching categories and sdgs
 */
const getCategoriesAndSDGs = async (ctx) => {
  ctx.body = await categoryService.getCategoriesAndSDGs(
    ctx.request.params.limit,
    decode(ctx.headers.authorization.substr(7)).roles[0]
  );
};
getCategoriesAndSDGs.validationScheme = {
  params: {
    limit: Joi.number().integer().min(0),
  }
};

module.exports = (app) => {
  const router = new Router({ prefix: "/category", });

  router.get(
    "/", 
    requireAuthentication, 
    validate(getAllCategories.validationScheme), getAllCategories
  );
  router.get(
    "/sdg/:limit", 
    requireAuthentication, 
    validate(getCategoriesAndSDGs.validationScheme), 
    getCategoriesAndSDGs
  );

  app.use(router.routes()).use(router.allowedMethods());
};
