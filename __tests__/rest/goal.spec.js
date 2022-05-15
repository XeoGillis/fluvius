const { withServer, login } = require('../supertest.setup');
const path = require("path");
const fs = require('fs-extra');

const FIRST = [
  {
    "color": "#a0214e",
    "id": "637d7bab-a67d-4791-ba58-187320c06cb6",
    "interested": 1,
    "name": "Teamspirit verhogen",
    "parentId": "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
    "sdgId": null,
    "subSdgId": null,
    "title": null,
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_17.png",
  },
  {
    "color": "#a0214e",
    "id": "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
    "interested": 1,
    "name": "SDGs promoten",
    "parentId": "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
    "sdgId": null,
    "subSdgId": null,
    "title": null,
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_17.png",
  },
]

const SECOND = [
  {
    "id": "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
    "name": "Duurzame energie",
    "sdgId": "9",
    "subSdgId": null,
    "parentId": null,
    "hasIcon": 1,
    "title": "Industry, Innovation and Infrastructure",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "color": "#004C69",
    "interested": 1
  },
  {
    "id": "6e8c05ef-131b-47b7-8369-dff051204608",
    "name": "Elektrisch rijden",
    "sdgId": "9",
    "subSdgId": null,
    "parentId": null,
    "hasIcon": 1,
    "title": "Industry, Innovation and Infrastructure",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "color": "#004C69",
    "interested": 0
  },
  {
    "id": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "name": "Digitale meters",
    "sdgId": "9",
    "subSdgId": null,
    "parentId": null,
    "hasIcon": 1,
    "title": "Industry, Innovation and Infrastructure",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "color": "#004C69",
    "interested": 1
  }
];

const THIRD = [
  {
    "id": "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
    "valueAxisName": "Procentuele uitstootvermindering",
    "name": "Duurzame energie",
    "sdgId": "9",
    "hasIcon": 1,
    "subSdgId": null,
    "parentId": null,
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "hasChildren": false,
    "visible": 0
  },
  {
    "id": "6e8c05ef-131b-47b7-8369-dff051204608",
    "valueAxisName": "Aantal elektrische wagens",
    "name": "Elektrisch rijden",
    "sdgId": "9",
    "hasIcon": 1,
    "subSdgId": null,
    "parentId": null,
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "hasChildren": false,
    "visible": 0
  },
  {
    "id": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "valueAxisName": "Aantal",
    "name": "Digitale meters",
    "sdgId": "9",
    "hasIcon": 1,
    "subSdgId": null,
    "parentId": null,
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
    "hasChildren": true,
    "visible": 0
  }
]

const FOURTH = [
  {
    "id": "491fe175-c2b6-4279-be4a-5de802547d91",
    "valueAxisName": "Procentuele hoeveelheid",
    "name": "Openbare verlichting (OV)",
    "sdgId": null,
    "hasIcon": 1,
    "subSdgId": null,
    "parentId": "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
    "hasChildren": false,
    "visible": 0
  }
]

const FIFTH = {
  "name": "Elektrisch rijden",
  "yAxisName": "Aantal elektrische wagens",
  "data": [
    {
      "targetValue": 100,
      "currentValue": 20,
      "date": "2021-03-08T23:00:00.000Z",
      "year": 2021,
      "quarter": 1
    },
    {
      "targetValue": 120,
      "currentValue": 90,
      "date": "2021-06-08T22:00:00.000Z",
      "year": 2021,
      "quarter": 2
    },
    {
      "targetValue": 120,
      "currentValue": 130,
      "date": "2021-08-08T22:00:00.000Z",
      "year": 2021,
      "quarter": 3
    }
  ]
}

const REACHEDGOALS = [
  {
    "id": "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
    "name": "Verenigingen aanmoedigen",
    "category": "Sociaal"
  },
  {
    "id": "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
    "name": "Duurzame energie",
    "category": "Economisch"
  },
  {
    "id": "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
    "name": "Netverlies opsporen",
    "category": "Klimaat"
  }
]

const FIRSTINPUT = "Verenigingen aanmoedigen"
const SECONDINPUT = "Economisch";
const THIRDINPUT = "b1d22218-734b-4e19-b493-f06a0409afd4/Economisch"
const FOURTHINPUT = "d38dc4d7-1734-4d4d-967a-c6b25d120667/Gebruik%20van%20LED"
const FIFTHINPUT = "Elektrisch rijden"

const EMPTYINPUT = {};
const WRONGTHIRDINPUT = "b1d22e218-734b-4e19-b493-f06a0409afd4/Economisch"
const WRONGFOURTHINPUT = "d38dce4d7-1734-4d4d-967a-c6b25d120667/Natuurgebieden%20voorzien"

const WRONGROUTE = [
  {
    "code": "NOT_FOUND",
    "message": "Unkown resource: /api/goal/roleqsdf"
  },
  {
    "code": "NOT_FOUND",
    "message": "Unkown resource: /api/goal/reachedgoalse"
  }
]

let request;
let knex;
let loginHeader;
describe('goal', () => {
  withServer(({
    request: r,
    knex: k
  }) => {
    request = r;
    knex = k;
  });
  const url = '/api/goal';
  beforeAll(async () => {
    loginHeader = await login(request);
  });
  afterAll(async () => {
    fs.removeSync("../../public/Verenigingen aanmoedigen.png")
  })
  describe('GET api/goal/children/:name', () => {
    it('should return children of category and status 200', async () => {
      const response = await request.get(`${url}/children/${FIRSTINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(FIRST);
    })
  });
  describe('GET api/goal/category/:name', () => {
    it('should return goal with the given name and status 200', async () => {
      const response = await request.get(`${url}/category/${SECONDINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(SECOND);
    })
  });
  describe('GET api/goal/roles/:roleId/:category', () => {
    it('should return goal by given category and role and status 200', async () => {
      const response = await request.get(`${url}/roles/${THIRDINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(THIRD);
    })
  });
  describe('GET api/goal/parents/:roleId/:parent', () => {
    it('should return goals by parent and role and status 200', async () => {
      const response = await request.get(`${url}/parents/${FOURTHINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(FOURTH);
    })
  });
  describe('GET api/goal/history/:name', () => {
    it('should return valuehistory of goal and status 200', async () => {
      const response = await request.get(`${url}/history/${FIFTHINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(FIFTH);
    })
  });
  describe('POST api/goal/upload/icon', () => {
    it('should upload testfile and return status 201', async () => {
      const response = await request.post(`${url}/upload/icon`)
        .set('Authorization', loginHeader)
        .set('uploaddata', JSON.stringify({ name: "Verenigingen aanmoedigen" }))
        .attach('file', path.join(__dirname, "../../public/Elektrisch rijden.png"));
      expect(response.status).toBe(201);
    })
  });
  describe('GET api/goal/download/:name', () => {
    it('should download testfile and return status 200', async () => {
      const response = await request.get(`${url}/download/Elektrisch rijden`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.type).toBe("image/png")
      expect(response.header["content-lenght"]).toBe("16364");
    })
  });
  describe('GET api/goal/reachedgoals', () => {
    it('should return the reached goals and status 200', async () => {
      const response = await request.get(`${url}/reachedgoals`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(REACHEDGOALS);
    })
  });

  describe('GET api/goal/category/:name', () => {
    it('should return an empty array and status 200', async () => {
      const response = await request.get(`${url}/category/Economische`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(EMPTYINPUT);
    })
  });
  describe('GET api/goal/children/:name', () => {
    it('should return an empty array and status 200', async () => {
      const response = await request.get(`${url}/children/sdg goal of sdg 3`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(EMPTYINPUT);
    })
  });
  describe('GET api/goal/roles/:roleId/:category', () => {
    it('should return status 400', async () => {
      const response = await request.get(`${url}/roles/${WRONGTHIRDINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(400);
    })
  });
  describe('GET api/goal/roles/:roleId/:category', () => {
    it('should fail and status 400', async () => {
      const response = await request.get(`
          ${url}/roles/b1d22218-734b-4e19-b493-f06a0409afd4/Economische`
      )
        .set('Authorization', loginHeader);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(EMPTYINPUT);
    })
  });
  describe('GET api/goal/parents/:roleId/:category', () => {
    it('should return status 400', async () => {
      const response = await request.get(`${url}/parents/${WRONGFOURTHINPUT}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(400);
    })
  });
  describe('GET api/goal/parents/:roleId/:category', () => {
    it('should return an empty array and status 400', async () => {
      const response = await request.get(`{url}/parents/d38dc4d7-1734-4d4d-967a-c6b25d120667/Natuurgebieden%20voorziene`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(EMPTYINPUT);
    })
  });
  describe('GET api/goal/history/:name', () => {
    it('should return status 500', async () => {
      const response = await request.get(`${url}/history/Sociale Zekerheide`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(500);
    })
  });
  describe('GET api/goal/roleqsdf', () => {
    it('should return status 200', async () => {
      const response = await request.get(`${url}/roleqsdf`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(WRONGROUTE[0]);
    })
  });
  describe('POST api/goal/upload/icon', () => {
    it('should upload testfile and return status 201', async () => {
      const response = await request.post(`${url}/upload/icon`)
        .set('Authorization', loginHeader)
        .set('uploaddata', JSON.stringify({ name: "Socialee Zekerheid" }))
        .attach('file', path.join(__dirname, "../../public/Elektrisch rijden.png"));
      expect(response.status).toBe(404);
    })
  });
  describe('GET api/goal/download/:name', () => {
    it('should try to download the testfile', async () => {
      const response = await request.get(`${url}/download/testsdf`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(404);
    })
  });
  describe('GET api/goal/reachedgoalse', () => {
    it('should return status 200', async () => {
      const response = await request.get(`${url}/reachedgoalse`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(WRONGROUTE[1]);
    })
  });
});