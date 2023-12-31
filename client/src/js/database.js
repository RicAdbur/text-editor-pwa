import { openDB } from 'idb';

const initDb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1)
  const transaction = db.transaction("jate", "readwrite")
  const store = transaction.store
  return await store.put({id: 1, value: content})
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1)
  const transaction = db.transaction("jate", "readonly")
  const store = transaction.store
  const result = await store.getAll()
  return result.value
};

initDb();
