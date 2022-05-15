const Router = require('@koa/router');
const Joi = require('joi');
const healthService = require('../service/health');
const validate = require('./_validation');

/**
 * * Returns if a response reaches the server
 * 
 * @returns {response, TimeReceived}
 * @see healthService.ping
 * @exception error occurred while pinging the server
 */
const ping = async (ctx) => {
    ctx.body = healthService.ping();
};
ping.validationScheme = null;

/**
 * * Returns the version and the environment
 * 
 * @returns {environment, version}
 * @see healthService.getVersion
 * @exception error occurred while fetching the version
 */
const getVersion = async (ctx) => {
    ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

/**
 * * Returns if a route is valid or not
 * 
 * @param data
 * @returns {boolean}
 * @see healthService.validateRoute
 * @exception error occurred while checking the route
 */
const validateRoute = async (ctx) => {
    ctx.body = await healthService.validateRoute(ctx.request.body.data);
};
validateRoute.validationScheme = {
    body: {
        data: Joi.array().items(Joi.string().allow('')),
    }
};

module.exports = function installPlacesRoutes(app) {
    const router = new Router({ prefix: "/health" });
    
    router.get(
        "/ping", 
        validate(ping.validationScheme), 
        ping
    );
    router.get(
        "/version", 
        validate(getVersion.validationScheme), 
        getVersion
    );
    router.post(
        "/validateroute", 
        validate(validateRoute.validationScheme), 
        validateRoute
    );

    app.use(router.routes()).use(router.allowedMethods());
};