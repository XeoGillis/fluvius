const { tables } = require("..");

/**
 * Fills the table TemplateGoal
 *
 * @see src\data\migrations\202224091044_createTemplateGoal.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.TemplateGoal).delete();
    await knex(tables.TemplateGoal).insert([
      {
        id: "9817158e-87b8-482d-85d6-b75004f5233a",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        canView: true,
      },
      {
        id: "f5ecce10-f810-4eab-8efc-dcaa15e7e1b6",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        canView: true,
      },
      {
        id: "cc6cd45c-0770-4118-9f84-49533c7a8479",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        canView: true,
      },
      {
        id: "8efe1cfb-e242-45c1-8a31-f405315f5788",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        canView: false,
      },
      {
        id: "dc03c489-1994-4475-8fcc-9ec4b46ddd90",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        canView: true
      },
      {
        id: "8f0680e4-76ee-4b9a-b17c-e793b9c819f3",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        canView: true
      },
      {
        id: "2481a633-26b2-48d1-88cf-d64eefd98e12",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        canView: true,
      },
      {
        id: "d386ddbb-1ba5-414a-af3c-9cd0a2bd034f",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        canView: false,
      },
      {
        id: "9ab96845-6ac4-45a9-88db-8d09d6928784",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        canView: true,
      },
      {
        id: "e3f35026-ae29-48ad-ab03-3282e5edc51f",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        canView: true,
      },
      {
        id: "e4562e47-8e99-4f4f-acce-2e3e89b60ca3",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        canView: true,
      },
      {
        id: "ea6fe4ab-4cea-4033-9905-7c00499c48d4",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        canView: true,
      },
      {
        id: "3aa789f5-95b4-483c-9074-df137b650d2a",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        canView: true,
      },
      {
        id: "ee0d6cd7-1ce3-46f1-8849-6ba786c8c3df",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        canView: true,
      },
      {
        id: "4d536086-c9fa-4cb0-9744-2699c3f4184c",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        canView: true,
      },
      {
        id: "9aabbb62-6f3c-4446-8803-4a218c1872e3",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        canView: true,
      },
      {
        id: "142d6332-9f88-4b7b-a107-c8bc7e8eedc1",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        canView: true,
      },
      {
        id: "a90a8e23-9135-4598-95b8-2990e361545a",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        canView: true,
      },
      {
        id: "a90eb0d2-2d9e-4d4b-9135-39609716b5a6",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        canView: true,
      },
      {
        id: "04fdd8e1-c626-4b1b-a617-0df267777296",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        canView: true,
      },
      {
        id: "54873d99-5e2b-42a9-8746-efeaa4626588",
        templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        canView: true,
      },
      {
        id: "6fb25fea-c60b-48cb-8a52-8125c1308d0a",
        templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        canView: true,
      },
    ]);
  },
};
