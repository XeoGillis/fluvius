const { tables } = require("..");

/**
 * Fills the table Goal
 *
 * @see src\data\migrations\202223021603_createGoal.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Goal).delete();
    await knex(tables.Goal).insert([
      {
        id: "6e8c05ef-131b-47b7-8369-dff051204608",
        name: "Elektrisch rijden",
        valueAxisName: "Aantal elektrische wagens",
        sdgId: "9",
        subSdgId: null,
        parentId: null,
        IconName: "6e8c05ef-131b-47b7-8369-dff051204608.png",
      },
      {
        id: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        name: "Gebruik van LED",
        valueAxisName: "Procentuele hoeveelheid LEDs",
        sdgId: "12",
        subSdgId: null,
        parentId: null,
        IconName: "ee4e88df-1a66-4c89-b0d2-42188ed899e3.png",
      },
      {
        id: "491fe175-c2b6-4279-be4a-5de802547d91",
        name: "Openbare verlichting (OV)",
        valueAxisName: "Procentuele hoeveelheid",
        sdgId: null,
        subSdgId: null,
        parentId: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        IconName: "491fe175-c2b6-4279-be4a-5de802547d91.png",
      },
      {
        id: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        name: "Duurzame energie",
        valueAxisName: "Procentuele uitstootvermindering",
        sdgId: "9",
        subSdgId: null,
        parentId: null,
        IconName: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0.png",
      },
      {
        id: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        name: "Netverlies opsporen",
        valueAxisName: "Hoeveelheid opgelost netverlies",
        sdgId: "12",
        subSdgId: null,
        parentId: null,
        IconName: "9f92e8f6-9601-4752-ac9e-d45f7ec39272.png",
      },
      {
        id: "f3328d22-231d-4947-8883-024e8b3a5e48",
        name: "Digitale meters",
        valueAxisName: "Aantal",
        sdgId: "9",
        subSdgId: null,
        parentId: null,
        IconName: "f3328d22-231d-4947-8883-024e8b3a5e48.png",
      },
      {
        id: "524bc55c-8c86-454b-93a5-620ccc818339",
        name: "Zonder zonnepanelen",
        valueAxisName: "Aantal",
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      {
        id: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        name: "Bij zonnepanelen",
        valueAxisName: "Aantal",
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      {
        id: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        name: "Met zonneboiler",
        valueAxisName: "axisName",
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      {
        id: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        name: "Verenigingen aanmoedigen",
        valueAxisName: "Aantal verenigingen",
        sdgId: "17",
        subSdgId: "17.2",
        parentId: null,
        IconName: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd.png",
      },
      {
        id: "637d7bab-a67d-4791-ba58-187320c06cb6",
        name: "Teamspirit verhogen",
        valueAxisName: "Procentuele groepsdynamiek",
        sdgId: null,
        subSdgId: null,
        parentId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      },
      {
        id: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        name: "SDGs promoten",
        valueAxisName: "Globale score",
        sdgId: null,
        subSdgId: null,
        parentId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      }
    ]);
  },
};
