const supertest = require('supertest');
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

/**
 * * Initializes the database with migrations and seeds
 * 
 * @param setter 
 * @see src\createServer.js
 */
module.exports.withServer = (setter) => {
    let server;
    beforeAll(async () => {
        server = await createServer();
        setter({
            request: supertest(server.getApp().callback()),
            knex: getKnex(),
        });
    });
    afterAll(async () => {
        await server.stop();
    });
}

/**
 * * Logs in as MVO Coördinator
 * 
 * @param supertest 
 * @returns {token}
 * @exception Unknown error occurred
 */
module.exports.login = async (supertest) => {
    const response = await supertest.post('/api/user/login').send({
        username: "Ann.Onym",
        password: "12345678"
    });
    if (response.statusCode !== 200) {
        throw new Error(response.body.message || 'Unkown error occurred');
    }
    return `Bearer ${response.body.token}`;
}

/**
 * * Logs in as a user with the given username
 * 
 * @param supertest 
 * @param username 
 * @returns {token} 
 * @exception Unkown error occurred
 */
module.exports.specificLogin = async (supertest, username) => {
    const response = await supertest.post('/api/user/login').send({
        username: username,
        password: "12345678"
    });
    if (response.statusCode !== 200) {
        throw new Error(response.body.message || 'Unkown error occurred');
    }
    return `Bearer ${response.body.token}`;
}