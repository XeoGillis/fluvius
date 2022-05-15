const { withServer, login, specificLogin } = require('../supertest.setup');


const notifications = [
    {
      "id": "a70be62e-ec7f-4c31-aa19-bac1d45e5f46",
      "text": "De hongerigen spijzen is één van de zeven werken van barmhartigheid",
      "seen": 1,
      "date": "2022-01-06T08:00:00.000Z",
      "name": "Duurzame energie",
      "username": "Peters.Eli"
    },
    {
      "id": "72e8a0c6-ad1e-4f71-b4d6-53d88d021a82",
      "text": "Verenigingen aanmoedigen bevat een typo",
      "seen": 0,
      "date": "2022-03-06T08:00:00.000Z",
      "name": "Verenigingen aanmoedigen",
      "username": "Andy.Capelle"
    },
    {
      "id": "5b556e3a-44d4-462d-bdf7-daabd0bc3f2a",
      "text": "De elektriciteitsprijzen stijgen",
      "seen": 0,
      "date": "2022-03-07T08:00:00.000Z",
      "name": "Gebruik van LED",
      "username": "Ann.Onym"
    }
  ]

const createNotificationResponse = { 
    "message": "Datasource has been successfully reported" 
};

let request;
let knex;
let loginHeader;
describe('notifications', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });
    const url = '/api/notification';
    beforeAll(async () => {
        loginHeader = await login(request);
    });
    describe('GET api/notification', () => {
        it('should get all notifications and return status 200', async () => {
            const response = await request.get(`${url}/`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(notifications);
        })
    });
    describe('DELETE api/notification/:id', () => {
        it('should delete 1 notification and return status 200', async () => {
            const response = await request.delete(`${url}/a70be62e-ec7f-4c31-aa19-bac1d45e5f46`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toBe(1);
        })
    });
    describe('PUT api/notification/:id', () => {
        it('should update 1 notification and return status 200', async () => {
            const response = await request.put(`${url}/72e8a0c6-ad1e-4f71-b4d6-53d88d021a82`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toBe(1);
        })
    });
    describe('POST api/notification/', () => {
        it('should create a new notification and return status 200', async () => {
            const SpecificloginHeader = await specificLogin(
                request, "Peters.Eli"
            );
            const response = await request.post(`${url}/`)
                .set('Authorization', SpecificloginHeader)
                .send({
                    "goal": "Sociale zekerheid",
                    "text": "Second time best time, I hope"
                });
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(createNotificationResponse);
        })
    });
    describe('DELETE api/notification', () => {
        it('should delete all notifications and return status 200', async () => {
            const response = await request.delete(`${url}/`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toBe(3);
        })
    });
    describe('GET api/notification', () => {
        it('should fail to get all notifications and return status 400', async () => {
            const response = await request.get(`${url}/`)
                .set('Authorization', loginHeader)
                .send({ test: "test" });
            expect(response.status).toBe(400);
        })
    });
    describe('DELETE api/notification/:id', () => {
        it('should fail to delete 1 notification and return status 200', async () => {
            const response = await request.delete(`${url}/a70be62e-ec7f-4c31-aa19-bac1d45e5f47`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toBe(0);
        })
    });
    describe('PUT api/notification/:id', () => {
        it('should fail to update 1 notification and return status 200', async () => {
            const response = await request.put(`${url}/72e8a0c6-ad1e-4f71-b4d6-53d88d021a83`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toBe(0);
        })
    });
    describe('POST api/notification/', () => {
        it('should fail to create a new notification and return status 400', async () => {
            const SpecificloginHeader = await specificLogin(request, "Peters.Eli");

            const response = await request.post(`${url}/`)
                .set('Authorization', SpecificloginHeader)
                .send({
                    "goal": "Sociale zekerheid",
                    "text": "Second time best time, I hope",
                    "yes": "something random"
                });
            expect(response.status).toBe(400);
        })
    });
    describe('POST api/notification/', () => {
        it('should fail to create a new notification and return status 403', async () => {

            const response = await request.post(`${url}/`)
                .set('Authorization', loginHeader)
                .send({
                    "goal": "Sociale zekerheid",
                    "text": "Second time best time, I hope"
                });
            expect(response.status).toBe(403);
        })
    });
    describe('DELETE api/notification', () => {
        it('should fail to delete all notifications and return status 400', async () => {
            const response = await request.delete(`${url}/`)
                .set('Authorization', loginHeader)
                .send({ test: "test" });
            expect(response.status).toBe(400);
        })
    });
    describe('GET api/notification/qsdf', () => {
        it('should return status 405', async () => {
            const response = await request.get(`${url}/qsdf`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(405);
        })
    });
});