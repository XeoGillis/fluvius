const { tables } = require("..");

/**
 * Fills the table Notification
 * 
 * @see src\data\migrations\202224021038_createNotification.js.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Notification).delete();
    await knex(tables.Notification).insert([
      {
        id: "72e8a0c6-ad1e-4f71-b4d6-53d88d021a82",
        userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        goal: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        text: "Verenigingen aanmoedigen bevat een typo",
        seen: false,
        date: "2022-03-06 09:00:00",
      },
      {
        id: "5b556e3a-44d4-462d-bdf7-daabd0bc3f2a",
        userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
        goal: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        text: "De elektriciteitsprijzen stijgen",
        seen: false,
        date: "2022-03-07 09:00:00",
      },
      {
        id: "a70be62e-ec7f-4c31-aa19-bac1d45e5f46",
        userId: "dc0b8382-badf-4cad-b323-999f0adae4a3",
        goal: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        text: "De hongerigen spijzen is één van de zeven werken van barmhartigheid",
        seen: true,
        date: "2022-01-06 09:00:00",
      },

      {
        id: "1456885c-5cd9-40ec-b7de-a29b28e3cb7d",
        userId: "dc0b8382-badf-4cad-b323-999f0adae4a3",
        goal: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        text: "de naam is verkeerd",
        seen: false,
        date: "2022-01-06 09:00:00",
      },
      {
        id: "4238bddc-11c7-4d6e-bf81-1e823162d4ce",
        userId: "dc0b8382-badf-4cad-b323-999f0adae4a3",
        goal: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        text: "grafiek data is fout",
        seen: true,
        date: "2022-01-06 09:00:00",
      },
      {
        id: "fe61156c-485e-4ce1-89d8-1142815532a9",
        userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        goal: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        text: "de doelwaarde is niet haalbaar",
        seen: true,
        date: "2022-01-06 09:00:00",
      },
    ]);
  },
};
