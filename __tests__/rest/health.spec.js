const { withServer } = require('../supertest.setup');

let request;
let knex;
describe('health', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });
    const url = '/api/health';
    describe('GET api/ping', () => {
        it('should get a response from the server return status 200', async () => {
            const response = await request.get(`${url}/ping`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({ response: true }));
        })
    });
    describe('GET api/version', () => {
        it('should get the version and enviroment and return status 200', async () => {
            const response = await request.get(`${url}/version`);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                "environment": "test",
                "version": "1.0.0"
            });
        })
    });
    describe('POST api/validateroute', () => {
        it('should check a route return true and return status 200', async () => {
            const response = await request.post(`${url}/validateroute`)
                .send({ "data": ["Economisch", "Elektrisch rijden"] });
            expect(response.status).toBe(200);
            expect(response.body).toBe(true);
        })
    });
    describe('GET api/ping', () => {
        it('should fail to get a response from the server return status 400', async () => {
            const response = await request.get(`${url}/ping`)
                .send({ "test": "test" });
            expect(response.status).toBe(400);
        })
    });
    describe('GET api/version', () => {
        it('should fail to get the version and enviroment and return status 400', async () => {
            const response = await request.get(`${url}/version`)
                .send({ "test": "test" });
            expect(response.status).toBe(400);
        })
    });
    describe('POST api/validateroute', () => {
        it('should check a route return false and return status 200', async () => {
            const response = await request.post(`${url}/validateroute`)
                .send({ "data": ["Economisch", "sdg goal of sdg 3dd"] });
            expect(response.status).toBe(200);
            expect(response.body).toBe(false);
        })
    });
    describe('POST api/validateroute', () => {
        it('should check a route and return status 400', async () => {
            const response = await request.post(`${url}/validateroute`)
                .send({ "data": ["Economisch", "sdg goal of sdg 3dd"], "test": "test" });
            expect(response.status).toBe(400);
        })
    });
    describe('GET api/health/qsdfff', () => {
        it('should return status 200', async () => {
            const response = await request.get(`${url}/qsdfff`);
            expect(response.status).toBe(200);
        })
    });
});