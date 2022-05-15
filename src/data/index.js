const { join } = require("path");
const config = require("config");
const knex = require("knex");
const { getChildLogger } = require("../core/logging");

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";
const isTest = NODE_ENV === "test";
const DATABASE_CLIENT = config.get("database.client");
const DATABASE_NAME = config.get("database.name");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_USERNAME = config.get("database.username");
const DATABASE_PASSWORD = config.get("database.password");

let knexInstance;

/**
 * * Logs the given message with the given level
 * 
 * @param logger 
 * @param level 
 */
const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((innerMessage) =>
      logger.log(
        level,
        innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)
      )
    );
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

/**
 * * Initializes the data
 * 
 * @exception Could not initialize the data layer
 * @exception migrations failed
 * @exception Error while seeding database
 */
async function initializeData() {
  const logger = getChildLogger("database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    debug: true,
    log: {
      debug: getKnexLogger(logger, "debug"),
      error: getKnexLogger(logger, "error"),
      warn: getKnexLogger(logger, "warn"),
      deprecate: (method, alternative) =>
        logger.warn("Knex reported something deprecated", {
          method,
          alternative,
        }),
    },
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error(error.message, {
      error,
    });
    throw new Error("Could not initialize the data layer");
  }

  let migrationsFailed = true;
  try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  } catch (error) {
    logger.error("Error while migrating the database", {
      error,
    });
  }

  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error("Error while undoing last migration", {
        error,
      });
    }
    throw new Error("migrations failed");
  }

  if (isDevelopment || isTest) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      logger.error("Error while seeding database", {
        error,
      });
    }
  }

  logger.info("Data layer initialized");
  return knexInstance;
}

/**
 * * Shuts down the connection with the database
 */
async function shutdownData() {
  const logger = getChildLogger("database");

  logger.info("Shutting down database connection");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
}

/**
 * * Checks if the knexInstance is initialized
 * 
 * @returns {knexInstance} 
 * @exception Please initialize the data layer before getting the Knex instance
 */
function getKnex() {
  if (!knexInstance) {
    throw Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  }
  return knexInstance;
}

const tables = Object.freeze({
  Category: "category",
  SDG: "sdg",
  User: "user",
  Role: "role",
  ExternalUser: "externaluser",
  ValueHistory: "valuehistory",
  Goal: "goal",
  PersonalTemplate: "personaltemplate",
  TemplateGoal: "templategoal",
  Template: "template",
  Notification: "notification",
});

module.exports = {
  initializeData,
  getKnex,
  tables,
  shutdownData,
};
