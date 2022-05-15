const { withServer, login } = require('../supertest.setup');

const ROLES = [
  {
    "id": "443213d4-9508-41f5-8b8e-892f6e1a5c31",
    "color": "#B2D235",
    "name": "Manager",
    "templateId": "3aefcce6-422b-434c-a872-6399a104ab6a",
  },
  {
    "id": "aaaed50b-48f8-42be-b8cf-6c80595ff85d",
    "color": "#007BFF",
    "name": "Stakeholder",
    "templateId": null
  },
  {
    "id": "b1d22218-734b-4e19-b493-f06a0409afd4",
    "color": "#FF3B30",
    "name": "Directeur",
    "templateId": null
  },
  {
    "id": "d38dc4d7-1734-4d4d-967a-c6b25d120667",
    "color": "#939393",
    "name": "User",
    "templateId": null
  }
]

const NOT_FOUND = [
  {
    "code": "NOT_FOUND",
    "message": "Unkown resource: /api/roless"
  }
]

let request;
let knex;
let loginHeader;
describe('roles', () => {
  withServer(({
    request: r,
    knex: k
  }) => {
    request = r;
    knex = k;
  });
  const url = '/api/roles';
  beforeAll(async () => {
    loginHeader = await login(request);
  });
  describe('GET api/roles', () => {
    it('should return all roles and status 200', async () => {
      const response = await request.get(`${url}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(ROLES);
    })
  });
  describe('GET api/roles', () => {
    it('should return error message for NOT_FOUND', async () => {
      const response = await request.get(`${url}s`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(NOT_FOUND[0]);
    })
  });
});