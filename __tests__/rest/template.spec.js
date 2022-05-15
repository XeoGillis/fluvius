const { withServer, login } = require('../supertest.setup');

const createTemplateResponses = [
    { 
        "message": "Template has successfully been created" 
    },
    { 
        "message": "Error occurred while creating a template for role-id aaaed50b-48f8-42be-b8cf-6c80595ff86d" 
    }
]

const editTemplateResponses = [
    { 
        "message": "Template has successfully been edited" 
    },
    { 
        "message": "Error occurred while editing template with id 3aefcce6-422b-434c-a872-6399a104ab9a" 
    }
]
const editPersonalTemplateResponses = [
    { 
        "message": "Template has successfully been edited" 
    },
    { 
        "message": "Error occurred while editing template with id 913b370a-6266-4a6f-89d7-7eae2dc93f47" 
    }
]

const deleteTemplateResponses = [
    { 
        "message": "Template has successfully been deleted" 
    },
]

let request;
let knex;
let loginHeader;
describe('template', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });
    const url = '/api/template';
    beforeAll(async () => {
        loginHeader = await login(request);
    });
    describe('CREATE api/template/', () => {
        it('should create a template for the given roleId and return status 200', async () => {
            const response = await request.post(`${url}`)
                .set('Authorization', loginHeader)
                .send({ roleId: "aaaed50b-48f8-42be-b8cf-6c80595ff85d" });
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(createTemplateResponses[0]);
        })
    });
    describe('PUT api/template/', () => {
        it('should update a template and return status 200', async () => {
            const response = await request.put(`${url}`)
                .set('Authorization', loginHeader)
                .send({
                    templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
                    goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
                    flag: true
                });
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(editTemplateResponses[0]);
        })
    });
    describe('PUT api/template/personal/', () => {
        it('should update a template and return status 200', async () => {
            const response = await request.put(`${url}/personal/`)
                .set('Authorization', loginHeader)
                .send({
                    goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
                    flag: true
                });
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(editPersonalTemplateResponses[0]);
        })
    });
    describe('DELETE api/template/:id', () => {
        it('should update a template and return status 200', async () => {
            const response = await request.delete(
                    `${url}/3aefcce6-422b-434c-a872-6399a104ab6a`
                )
                .set('Authorization', loginHeader);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(deleteTemplateResponses[0]);
        })
    });
    describe('CREATE api/template/', () => {
        it('should fail to create a template for the given roleId and return status 500', async () => {
            const response = await request.post(`${url}`)
                .set('Authorization', loginHeader)
                .send({ roleId: "aaaed50b-48f8-42be-b8cf-6c80595ff86d" });
            expect(response.status).toBe(500);
            expect(response.body).toMatchObject(createTemplateResponses[1]);
        })
    });
    describe('PUT api/template/', () => {
        it('should fail to update a template and return status 500', async () => {
            const response = await request.put(`${url}`)
                .set('Authorization', loginHeader)
                .send({
                    templateId: "3aefcce6-422b-434c-a872-6399a104ab9a",
                    goalId: "6e8c05ef-131b-47b7-8369-dff051204609",
                    flag: true
                });
            expect(response.status).toBe(500);
            expect(response.body).toMatchObject(editTemplateResponses[1]);
        })
    });
    describe('PUT api/template/personal/', () => {
        it('should fail to update a template and return status 500', async () => {
            const response = await request.put(`${url}/personal/`)
                .set('Authorization', loginHeader)
                .send({
                    goalId: "6e8c05ef-131b-47b7-8369-dff051204609",
                    flag: false
                });
            expect(response.status).toBe(500);
            expect(response.body).toMatchObject(editPersonalTemplateResponses[1]);
        })
    });
    describe('DELETE api/template/:id', () => {
        it('should fail to update a template and return status 200', async () => {
            const response = await request.delete(`${url}/3aefcce6-422b-434c-a872-6399a104ab7a`)
                .set('Authorization', loginHeader);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(deleteTemplateResponses[0]);
        })
    });
    describe('POST api/template/', () => {
        it('should return status 405', async () => {
            const response = await request.delete(`${url}/`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(405);
        })
    });
});