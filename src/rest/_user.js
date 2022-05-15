const Router = require("@koa/router");
const userService = require("../service/user");
const Joi = require("joi");
const validate = require("./_validation.js");
const { requireAuthentication } = require("../core/auth");

/**
 * * Logs a user in
 * 
 * @param username
 * @param password 
 * @returns {user, token}
 * @see userService.login 
 * @exception Given password or username is incorrect
 */
const login = async (ctx) => {
  ctx.body = await userService.login(
    ctx.request.body.username, 
    ctx.request.body.password
  );
};
login.validationScheme = {
  body: {
    username: Joi.string().min(4).max(255),
    password: Joi.string().min(4).max(255),
  },
};

/**
 * * Finds and returns the user in the database with the given user id
 * 
 * @param userId 
 * @returns {id, username, email, rolename}
 * @exception Error occurred while fetching user with id
 */
const getUserByUserId = async (ctx) => {
  ctx.body = await userService.getUserByUserId(ctx.params.userId);
};
getUserByUserId.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/user", });

  router.post(
    "/login", 
    validate(login.validationScheme), 
    login
  );
  router.get(
    "/:userId", 
    requireAuthentication, 
    validate(getUserByUserId.validationScheme), 
    getUserByUserId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
