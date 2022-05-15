const { withServer, login } = require('../supertest.setup');

const EXTERNALUSERS = [
    {
        externalUserId: "2f4e0e16-4e52-4693-8c0a-f30585d56cb6",
        username: "Cara.Van",
        rolename: "User"
    }
]

const LOGINRETURNBODY = {
    "user": {
        "externalUserId": "2f4e0e16-4e52-4693-8c0a-f30585d56cb6",
        "username": "Cara.Van",
        "rolename": "User"
    },
};

const WRONGUSER = [{
    username: "Rian.Carnation"
}]

let request;
let knex;
let loginHeader;
describe('externalUsers', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });
    const url = '/api/externalUser';
    beforeAll(async () => {
        loginHeader = await login(request);
    });
    describe('GET api/externalUser/:id', () => {
        it('should return external user and status 200', async () => {
            const response = await request.get(`${url}/${EXTERNALUSERS[0].externalUserId}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(EXTERNALUSERS[0]);
        })
    });
    describe('POST api/externalUser/login', () => {
        it('should log in an external user and return his data alongside rolename', async () => {
            const response = await request.post(`${url}/login`).send(
                {
                    username: "Cara.Van",
                }
            );
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(LOGINRETURNBODY);
        });
    });
    describe('POST api/externalUser/login', () => {
        it('should log in an external user and return status code 500', async () => {
            const response = await request.post(`${url}/login`).send(
                {
                    username: WRONGUSER[0].username,
                }
            );
            expect(response.status).toBe(500);
        });
    });
});