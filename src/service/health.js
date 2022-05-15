const packageJson = require('../../package.json');
const healthRepository = require("../repository/health");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("health-service");
    this.logger.debug(message, meta);
};

/**
 * * Returns if a response reaches the server
 * 
 * @returns {response, TimeReceived}
 * @exception error occurred while pinging the server
 */
const ping = () => {
    try {
        debugLog(`pinging the server`);
        return { response: true, TimeReceived: new Date().getTime() };
    } catch (error) {
        throw Error(`error occurred while pinging the server`);
    }
};

/**
 * * Returns the version and the environment
 * 
 * @returns {environment, version}
 * @exception error occurred while fetching the version
 */
const getVersion = () => {
    try {
        debugLog(`fetching the version`);
        return {
            environment: process.env.NODE_ENV,
            version: packageJson.version,
        }
    } catch (error) {
        throw Error(`error occurred while fetching the version`);
    }
};

/**
 * * Returns if a route is valid or not
 * 
 * @param RouteArr 
 * @returns {boolean}
 * @see healthRepository.validateRoute
 * @exception error occurred while checking the route
 */
const validateRoute = async (RouteArr) => {
    try {
        debugLog(`checking the route ${RouteArr.join("/")}`);

        if (RouteArr[0] === "")
            return true;
        const sdgIds = (await healthRepository.findSdgIds(RouteArr[0])).map(e => e.id);

        if (!sdgIds || sdgIds.length === 0)
            return false;

        if (RouteArr[1] === undefined && RouteArr.slice(2).length === 0)
            return true;
        const headgoalId = await healthRepository.findHeadgoalId(RouteArr[1], sdgIds);
        if (!headgoalId)
            return false;

        let validation = true;
        await RouteArr.slice(2).reduce(async (parentId, goalName, index) => {
            const response = await healthRepository.findResponse(parentId, goalName);
            if (!response || response?.id === null)
                validation = false;
            return response?.id;
        }, headgoalId?.id);

        return validation;
    } catch (error) {
        throw Error(
            `error occurred while checking the route ${RouteArr.join("/")}`
        );
    }
};

module.exports = {
    ping,
    getVersion,
    validateRoute
};