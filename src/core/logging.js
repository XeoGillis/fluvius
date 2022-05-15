const winston = require("winston");
const {combine, timestamp, colorize, printf, json} = winston.format;

let logger;

/**
 * * Generates the standard for the development format
 * 
 * @returns {format}
 */
const devFormat = () => {
  const formatMessage = (
    {level, message, timestamp, name = "server", ...rest}
  ) =>
    `${timestamp} [${level}] ${name.toUpperCase()} \t ${message}`;

  const formatError = ({error: {stack},...rest}) =>
    `${formatMessage(rest)}\n\n${stack}\n`;
  
    const format = (info) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);

  return combine(colorize(), timestamp(), printf(format));
};

/**
 * * Generates the standard for the production format
 * 
 * @returns {format}
 */
const prodFormat = () => {
  const replaceError = ({label, level, message, stack}) => 
    ({ label, level, message, stack,});

  const replacer = (_, value) =>
    value instanceof Error ? replaceError(value) : value;

  return json({replacer});
};

/**
 * * Throws an error if the logger is not initialized
 * 
 * @returns {logger}
 * @exception You must first initialize the logger
 */
const getLogger = () => {
  if (!logger) throw new Error("You must first initialize the logger");
  return logger;
};

/**
 * * Ensures a relation between a parentlogger and its childlogger
 * 
 * @param name 
 * @param meta 
 * @see getLogger
 * @returns {logger}
 */
const getChildLogger = (name, meta = {}) => {
  const logger = getLogger();
  const previousName = logger.defaultMeta?.name;

  return logger.child({
    name: previousName ? `${previousName}.${name}` : name,
    previousName,
    ...meta,
  });
};

/**
 * * Initializes the logger
 * 
 * @param {*}  
 * @see prodFormat
 * @see devFormat
 */
const initializeLogger = ({
  level,
  disabled,
  isProduction,
  defaultMeta = {},
  extraTransports = [],
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: isProduction ? prodFormat() : devFormat(),
    transports: [
      new winston.transports.Console({
        silent: disabled,
      }),
      ...extraTransports,
    ],
  });

  logger.info(` Logger initialized with minimum log level ${level}`);
};

module.exports = {
  getLogger,
  getChildLogger,
  initializeLogger,
};