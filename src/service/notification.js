const notificationRepository = require("../repository/notification");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("notification-service");
  this.logger.debug(message, meta);
};

/**
 * * Finds and returns all the notifications
 *  
 * @returns {id, text, seen, date, name, username}
 * @see notificationRepository.findAllNotification
 * @exception Error occurred while fetching all notifications
 */
const getAllNotifications = async () => {
  try {
    debugLog(`Fetching all notifications`);
    return await notificationRepository.findAllNotification();
  } catch (error) {
    throw Error(`Error occurred while fetching all notifications`);
  }
};

/**
 * * Deletes all the notifications
 * 
 * @see notificationService.deleteAllNotifications 
 * @exception Error occurred while deleting all notifications
 */
const deleteAllNotifications = async () => {
  try {
    debugLog(`Deleting all notifications`);
    return await notificationRepository.deleteAllNotifications();
  } catch (error) {
    throw Error(`Error occurred while deleting all notifications`);
  }
}

/**
 * * Deletes the notification with the given id
 * 
 * @param id  
 * @see notificationRepository.deleteNotificationById
 * @exception Error occurred while deleting notification with id
 */
const deleteNotificationById = async (id) => {
  try {
    debugLog(`Deleting notification with id = ${id}`);
    return await notificationRepository.deleteNotificationById(id);
  } catch (error) {
    throw Error(`Error occurred while deleting notification with id = ${id}`);
  }
}

/**
 * * Sets the notification as seen
 * 
 * @param id  
 * @see notificationRepository.updateNotification
 * @exception Error occurred while updating notification with id
 */
const updateNotification = async (id) => {
  try {
    debugLog(`Updating notification with id = ${id}`);
    return await notificationRepository.updateNotification(id);
  } catch (error) {
    throw Error(`Error occurred while updating notification with id = ${id}`)
  }
}

/**
 * * Creates a notification for a given goal with a given text
 * 
 * @param goal
 * @param text  
 * @param userId 
 * @returns {message} 
 * @see notificationRepository.createNotification
 * @exception Error occurred while creating notification with text, goal and user
 */
const createNotification = async ({ goal, text, userId }) => {
  try {
    debugLog(`
      Creating notification with 
      text = ${text}, 
      goal = ${goal} 
      and userId = ${userId}
    `);
    await notificationRepository.createNotification(userId, goal, text);
    return {
      "message": "Datasource has been successfully reported"
    }
  } catch (error) {
    throw Error(
      `Error occurred while creating notification with 
      text = ${text}, 
      goal = ${goal} 
      and userId = ${userId}
    `)
  }
}

module.exports = {
  getAllNotifications,
  deleteAllNotifications,
  deleteNotificationById,
  updateNotification,
  createNotification
};
