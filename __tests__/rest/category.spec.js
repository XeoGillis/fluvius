const { withServer, login } = require("../supertest.setup");

const CATEGORIES = [
    {
        "id": "5d79e9b1-45d8-4035-bacb-b814c27b3444",
        "color": "#a0214e",
        "name": "Sociaal",
        "sdgs": [
            {
                "id": "4",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_4.png",
                "title": "Quality Education"
            },
            {
                "id": "5",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_5.png",
                "title": "Gender Equality"
            },
            {
                "id": "10",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_10.png",
                "title": "Reduced Inequalities"
            },
            {
                "id": "16",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_16.png",
                "title": "Peace and Justice - Strong Institutions"
            },
            {
                "id": "17",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_17.png",
                "title": "Partnerships for the Goals"
            }
        ],
        "icons": [
            {
                "name": "Verenigingen aanmoedigen"
            }
        ]
    },
    {
        "id": "a3776314-bc44-40c4-beae-bf2a5aef7e64",
        "color": "#004C69",
        "name": "Economisch",
        "sdgs": [
            {
                "id": "1",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_1.png",
                "title": "No Poverty"
            },
            {
                "id": "2",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_2.png",
                "title": "Zero Hunger"
            },
            {
                "id": "3",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_3.png",
                "title": "Good Health and Well-being"
            },
            {
                "id": "8",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_8.png",
                "title": "Decent Jobs and Economic Growth"
            },
            {
                "id": "9",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_9.png",
                "title": "Industry, Innovation and Infrastructure"
            }
        ],
        "icons": [
            {
                "hasIcon": 1,
                "name": "Duurzame energie",
            },
            {
                "hasIcon": 1,
                "name": "Elektrisch rijden",
            },
            {
                "hasIcon": 1,
                "name": "Digitale meters",
            }
        ]
    },
    {
        "id": "b0bb0a0a-621e-4f23-9278-e477913af3fb",
        "color": "#b2d235",
        "name": "Klimaat",
        "sdgs": [
            {
                "id": "6",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_6.png",
                "title": "Clean Water and Sanitation"
            },
            {
                "id": "7",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_7.png",
                "title": "Affordable and Clean Energy"
            },
            {
                "id": "11",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_11.png",
                "title": "Sustainable Cities and Communities"
            },
            {
                "id": "12",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_12.png",
                "title": "Responsible Consumption and Production"
            },
            {
                "id": "13",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_13.png",
                "title": "Climate Action"
            },
            {
                "id": "14",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_14.png",
                "title": "Life Below Water"
            },
            {
                "id": "15",
                "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_15.png",
                "title": "Life on Land"
            }
        ],
        "icons": [
            {
                "hasIcon": 1,
                "name": "Netverlies opsporen",
            },
            {
                "hasIcon": 1,
                "name": "Gebruik van LED",
            }
        ]
    }
]

const NOT_FOUND = [
    {
        "code": "NOT_FOUND",
        "message": "Unkown resource: /api/category/sdge"
    },
    {
        "code": "NOT_FOUND",
        "message": "Unkown resource: /api/categorys"
    }
]

let request;
let knex;
let loginHeader;
describe("categories", () => {
    withServer(({ request: r, knex: k }) => {
        request = r;
        knex = k;
    });
    const url = "/api/category";
    beforeAll(async () => {
        loginHeader = await login(request);
    });
    describe("GET api/category", () => {
        it("should return all categories and status 200", async () => {
            const response = await request.get(url).set("Authorization", loginHeader);
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual(3);
        });
    });
    describe("GET api/category/sdg", () => {
        it("should return category and status 200", async () => {
            const response = await request.get(`${url}/sdg/3`).set("Authorization", loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CATEGORIES);
        });
    });
    describe("GET api/category", () => {
        it("should return error message for NOT_FOUND", async () => {
            const response = await request.get(`${url}s`).set("Authorization", loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(NOT_FOUND[1]);
        });
    });
    describe("GET api/category/sdg", () => {
        it("should return error message for NOT_FOUND", async () => {
            const response = await request.get(`${url}/sdge`).set("Authorization", loginHeader);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(NOT_FOUND[0]);
        });
    });
});
