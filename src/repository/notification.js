const { tables, getKnex } = require("../data");
const uuid = require("uuid");

/**
 * * Finds and returns all the notifications
 *  
 * @returns {id, text, seen, date, name, username}
 */
const findAllNotification = async () => {
  return await getKnex()(`${tables.Notification} as n`)
    .select('n.id', 'n.text', 'n.seen', 'n.date', 'g.name', 'u.username')
    .join(`${tables.Goal} as g`, 'n.goal', 'g.id')
    .join(`${tables.User} as u`, 'n.userId', 'u.id')
    .orderBy("n.date");
};

/**
 * * Deletes all the notifications
 */
const deleteAllNotifications = async () => {
  return await getKnex()(tables.Notification).del();
}

/**
 * * Deletes the notification with the given id
 * 
 * @param id  
 */
const deleteNotificationById = async (id) => {
  return await getKnex()(tables.Notification).where("id", id).del();
}

/**
 * * Sets the notification as seen
 * 
 * @param id  
 */
const updateNotification = async (id) => {
  return await getKnex()(tables.Notification)
    .update({ "seen": true })
    .where("id", id)
    .onConflict()
    .ignore();
}

/**
 * * Creates a notification for a given goal with a given text
 * 
 * @param goal
 * @param text  
 * @param userId
 */
const createNotification = async (userId, goal, text) => {
  return await getKnex()(tables.Notification)
    .insert({
      id: uuid.v4(),
      userId: userId,
      goal: getKnex()(tables.Goal).select("id").where("name", goal),
      seen: false,
      text: text,
      date: new Date()
    }).onConflict().ignore();
}

module.exports = {
  findAllNotification,
  deleteAllNotifications,
  deleteNotificationById,
  updateNotification,
  createNotification
};
