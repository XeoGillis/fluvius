const { tables } = require("..");

/**
 * Fills the table ValueHistory
 *
 * @see src\data\migrations\202223021604_createValueHistory.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.ValueHistory).delete();
    await knex(tables.ValueHistory).insert([
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 20,
        targetValue: 100,
        date: "2021-03-09",
        weight: 1,
      },
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 40,
        targetValue: 100,
        date: "2021-04-09",
        weight: 1,
      },
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 70,
        targetValue: 120,
        date: "2021-05-09",
        weight: 1,
      },
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 90,
        targetValue: 120,
        date: "2021-06-09",
        weight: 1,
      },
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 110,
        targetValue: 120,
        date: "2021-07-09",
        weight: 1,
      },
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 130,
        targetValue: 120,
        date: "2021-08-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 40,
        targetValue: 200,
        date: "2021-03-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 60,
        targetValue: 200,
        date: "2021-04-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 90,
        targetValue: 200,
        date: "2021-05-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 130,
        targetValue: 200,
        date: "2021-06-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 180,
        targetValue: 200,
        date: "2021-07-09",
        weight: 1,
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 240,
        targetValue: 200,
        date: "2021-08-09",
        weight: 1,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 20,
        targetValue: 150,
        date: "2021-03-09",
        weight: 1.5,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 55,
        targetValue: 150,
        date: "2021-04-09",
        weight: 1.5,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 75,
        targetValue: 150,
        date: "2021-05-09",
        weight: 1.5,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 110,
        targetValue: 150,
        date: "2021-06-09",
        weight: 1.5,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 140,
        targetValue: 150,
        date: "2021-07-09",
        weight: 1.5,
      },
      {
        goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        currentValue: 160,
        targetValue: 150,
        date: "2021-08-09",
        weight: 1.5,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-03-09",
        weight: null,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-04-09",
        weight: null,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-05-09",
        weight: null,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-06-09",
        weight: null,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-07-09",
        weight: null,
      },
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2021-08-09",
        weight: null,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 0,
        targetValue: 100,
        date: "2021-03-09",
        weight: 0.5,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 20,
        targetValue: 100,
        date: "2021-04-09",
        weight: 0.5,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 50,
        targetValue: 120,
        date: "2021-05-09",
        weight: 0.5,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 70,
        targetValue: 120,
        date: "2021-06-09",
        weight: 0.5,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 100,
        targetValue: 120,
        date: "2021-07-09",
        weight: 0.5,
      },
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 130,
        targetValue: 120,
        date: "2021-08-09",
        weight: 0.5,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 10,
        targetValue: 100,
        date: "2021-03-09",
        weight: 2,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 20,
        targetValue: 100,
        date: "2021-04-09",
        weight: 2,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 40,
        targetValue: 120,
        date: "2021-05-09",
        weight: 2,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 70,
        targetValue: 120,
        date: "2021-06-09",
        weight: 2,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 100,
        targetValue: 120,
        date: "2021-07-09",
        weight: 2,
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 120,
        targetValue: 120,
        date: "2021-08-09",
        weight: 2,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 30,
        targetValue: 120,
        date: "2021-03-09",
        weight: 1.5,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 50,
        targetValue: 120,
        date: "2021-04-09",
        weight: 1.5,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 70,
        targetValue: 130,
        date: "2021-05-09",
        weight: 1.5,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 100,
        targetValue: 150,
        date: "2021-06-09",
        weight: 1.5,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 120,
        targetValue: 150,
        date: "2021-07-09",
        weight: 1.5,
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 140,
        targetValue: 160,
        date: "2021-08-09",
        weight: 1.5,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-03-09",
        weight: null,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-04-09",
        weight: null,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-05-09",
        weight: null,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-06-09",
        weight: null,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-07-09",
        weight: null,
      },
      {
        goalId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        currentValue: null,
        targetValue: null,
        date: "2021-08-09",
        weight: null,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 30,
        targetValue: 200,
        date: "2021-03-09",
        weight: 1,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 50,
        targetValue: 200,
        date: "2021-04-09",
        weight: 1,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 75,
        targetValue: 200,
        date: "2021-05-09",
        weight: 1,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 90,
        targetValue: 200,
        date: "2021-06-09",
        weight: 1,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 120,
        targetValue: 200,
        date: "2021-07-09",
        weight: 1,
      },
      {
        goalId: "491fe175-c2b6-4279-be4a-5de802547d91",
        currentValue: 150,
        targetValue: 200,
        date: "2021-08-09",
        weight: 1,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-03-09",
        weight: null,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-04-09",
        weight: null,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-05-09",
        weight: null,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-06-09",
        weight: null,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-07-09",
        weight: null,
      },
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2021-08-09",
        weight: null,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 20,
        targetValue: 170,
        date: "2021-03-09",
        weight: 2,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 30,
        targetValue: 170,
        date: "2021-04-09",
        weight: 2,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 60,
        targetValue: 170,
        date: "2021-05-09",
        weight: 2,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 80,
        targetValue: 170,
        date: "2021-06-09",
        weight: 2,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 130,
        targetValue: 170,
        date: "2021-07-09",
        weight: 2,
      },
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 180,
        targetValue: 170,
        date: "2021-08-09",
        weight: 2,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 10,
        targetValue: 150,
        date: "2021-03-09",
        weight: 1,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 25,
        targetValue: 150,
        date: "2021-04-09",
        weight: 1,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 40,
        targetValue: 150,
        date: "2021-05-09",
        weight: 1,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 60,
        targetValue: 150,
        date: "2021-06-09",
        weight: 1,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 120,
        targetValue: 150,
        date: "2021-07-09",
        weight: 1,
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 150,
        targetValue: 150,
        date: "2021-08-09",
        weight: 1,
      },
    ]);
  },
};