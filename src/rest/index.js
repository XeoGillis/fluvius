const Router = require("@koa/router");

const InstallCategoryRoute = require("./_category");
const InstallUserRoute = require("./_user");
const InstallTemplateRoute = require("./_template");
const InstallHealthRouter = require("./_health");
const InstallGoalRouter = require("./_goal");
const InstallRoles = require('./_roles');
const InstallExternalUserRouter = require('./_externalUser');
const InstallNotification = require("./_notification");

module.exports = (app) => {
  const router = new Router({ prefix: "/api", });

  InstallCategoryRoute(router);
  InstallUserRoute(router);
  InstallTemplateRoute(router);
  InstallHealthRouter(router);
  InstallGoalRouter(router);
  InstallRoles(router);
  InstallExternalUserRouter(router);
  InstallNotification(router);

  app.use(router.routes()).use(router.allowedMethods());
};