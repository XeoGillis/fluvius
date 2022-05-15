const Router = require("@koa/router");
const notificationService = require("../service/notification");
const Joi = require("joi");
const Role = require("../core/roles")
const validate = require("./_validation.js");
const { decode } = require("jsonwebtoken");
const { requireAuthentication, makeRequireRole } = require("../core/auth");

/**
 * * Finds and returns all the notifications
 *  
 * @returns {id, text, seen, date, name, username}
 * @see notificationService.getAllNotifications
 * @exception Error occurred while fetching all notifications
 */
const getAllNotifications = async (ctx) => {
  ctx.body = await notificationService.getAllNotifications();
};
getAllNotifications.validationScheme = null;

/**
 * * Deletes all the notifications
 * 
 * @see notificationService.deleteAllNotifications 
 * @exception Error occurred while deleting all notifications
 */
const deleteAllNotifications = async (ctx) => {
  ctx.body = await notificationService.deleteAllNotifications();
};
deleteAllNotifications.validationScheme = null;

/**
 * * Deletes the notification with the given id
 * 
 * @param id  
 * @see notificationService.deleteNotificationById
 * @exception Error occurred while deleting notification with id
 */
const deleteNotificationById = async (ctx) => {
  ctx.body = await notificationService.deleteNotificationById(ctx.params.id);
};
deleteNotificationById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};

/**
 * * Sets the notification as seen
 * 
 * @param id  
 * @see notificationService.updateNotification
 * @exception Error occurred while updating notification with id
 */
const updateNotification = async (ctx) => {
  ctx.body = await notificationService.updateNotification(
    ctx.params.id,
  )
};
updateNotification.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  }
}

/**
 * * Creates a notification for a given goal with a given text
 * 
 * @param goal
 * @param text  
 * @returns {message} 
 * @see notificationService.createNotification
 * @exception Error occurred while creating notification with text, goal and user
 */
const createNotification = async (ctx) => {
  ctx.body = await notificationService.createNotification(
    {
      ...ctx.request.body,
      userId: decode(ctx.headers.authorization.substr(7)).userId
    })
};
createNotification.validationScheme = {
  body: {
    goal: Joi.string(),
    text: Joi.string(),
  }
}

module.exports = (app) => {
  const router = new Router({ prefix: "/notification", });

  router.get("/",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(getAllNotifications.validationScheme),
    getAllNotifications
  );
  router.delete("/",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(deleteAllNotifications.validationScheme),
    deleteAllNotifications
  );
  router.delete("/:id",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(deleteNotificationById.validationScheme),
    deleteNotificationById
  );
  router.put("/:id",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(updateNotification.validationScheme),
    updateNotification
  );
  router.post("/",
    requireAuthentication,
    makeRequireRole(Role.Manager),
    validate(createNotification.validationScheme),
    createNotification
  );

  app.use(router.routes()).use(router.allowedMethods());
};

