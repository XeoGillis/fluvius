const userRepository = require("../repository/user");
const { generateJWT, verifyJWT } = require("../core/jwt");
const { verifyPassword } = require("../core/password");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("user-service");
  this.logger.debug(message, meta);
};

/**
 * * Logs a user in by creating a token
 * 
 * @param user 
 * @returns {user, token} 
 * @see generateJWT
 * @see makeExposedUser
 * @exception Error while signing new token
 */
const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

/**
 * * Refactors the given user into the necessary material
 * 
 * @param user 
 * @returns {id, username, email, rolename}
 */
const makeExposedUser = ({ passwordhash, roleId, ...user }) => user;

/**
 * * Logs a user in
 * 
 * @param username 
 * @param password 
 * @returns {user, token}
 * @see userRepository.findByUsername
 * @see verifyPassword
 * @see makeLoginData
 * @exception Given password or username is incorrect
 * @exception Error while signing new token
 */
const login = async (username, password) => {
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error("Given password or username is incorrect");
  }

  const validPassword = await verifyPassword(password, user.passwordhash);
  if (!validPassword) {
    throw new Error("Given password or username is incorrect");
  }

  debugLog(`user ${username} has logged in`);
  return await makeLoginData(user);
};

/**
 * * Checks if a user is signed in
 * 
 * @param authHeader 
 * @returns {userId, roles, authToken}
 * @see verifyJWT
 * @exception You need to be signed in
 * @exception Invalid authentication token
 * @exception Error while verifying token
 * @exception Token could not be parsed
 */
const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const data = await verifyJWT(authToken);

    const { roles, userId } = data;
    return {
      userId,
      roles,
      authToken,
    };
  } catch (error) {
    const logger = getChildLogger("user-service");
    logger.error(error.message, { error, });
    throw ServiceError.unauthorized(error.message);
  }
};

/**
 * * Checks if the given user has permisions to view or alter data
 * 
 * @param role 
 * @param roles 
 * @exception You are not allowed to view this part of the application
 */
const checkRequireRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

/**
 * * Checks if the given user has permisions to view or alter data
 * 
 * @param role 
 * @param roles 
 * @exception You are not allowed to view this part of the application
 */
const checkBanRole = (role, roles) => {
  const hasPermission = !roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

/**
 * * Finds and returns the user in the database with the given user id
 * 
 * @param userId 
 * @returns {id, username, email, rolename}
 * @see userRepository.findByUserId
 * @exception Error occurred while fetching user with id
 */
const getUserByUserId = async (userId) => {
  try {
    debugLog(`Fetching user with id ${userId}`);
    return await userRepository.findByUserId(userId);
  } catch (error) {
    throw Error(`Error occurred while fetching user with id ${userId}`);
  }
};

module.exports = {
  login,
  getUserByUserId,
  checkAndParseSession,
  checkRequireRole,
  checkBanRole,
};
