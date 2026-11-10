import type { AtomicPresetStorage } from "./repository";

const DATABASE = "gta-scoped-saved-filters";
const STORE = "archives";

// Same transaction-completion and strict-CAS pattern as browserNotebookStorage;
// a separate database leaves opportunity bookmarks and the hours archive alone.
function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") { reject(new Error("Saved-filter storage is unavailable.")); return; }
    let settled = false;
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE); };
    request.onerror = () => { settled = true; reject(request.error ?? new Error("Saved filters could not open.")); };
    request.onblocked = () => { settled = true; reject(new Error("Close older saved-filter tabs and try again.")); };
    request.onsuccess = () => {
      const db = request.result;
      if (settled) { db.close(); return; }
      settled = true; db.onversionchange = () => db.close(); resolve(db);
    };
  });
}
/** Home must not create a missing DB while reading shortcuts. Inventory first;
 * abort an upgrade if another tab deletes it between inventory and opening. */
async function openExisting(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined" || typeof indexedDB.databases !== "function") throw new Error("Read-only saved-filter storage is unavailable.");
  if (!(await indexedDB.databases()).some(db => db.name === DATABASE)) return null;
  return new Promise((resolve, reject) => {
    let settled = false;
    const request = indexedDB.open(DATABASE);
    request.onupgradeneeded = () => { request.transaction?.abort(); };
    request.onerror = () => { settled = true; reject(request.error ?? new Error("Saved filters could not open read-only.")); };
    request.onblocked = () => { settled = true; reject(new Error("Saved filters are blocked by another tab.")); };
    request.onsuccess = () => { const db = request.result; if (settled) { db.close(); return; } settled = true; db.onversionchange = () => db.close(); resolve(db); };
  });
}
function readArchive(db: IDBDatabase, key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    let transaction: IDBTransaction, value: string | null = null;
    try { transaction = db.transaction(STORE, "readonly"); }
    catch (error) { db.close(); reject(error); return; }
    const request = transaction.objectStore(STORE).get(key);
    request.onsuccess = () => {
      if (request.result !== undefined && typeof request.result !== "string") { transaction.abort(); return; }
      value = request.result ?? null;
    };
    transaction.oncomplete = () => { db.close(); resolve(value); };
    transaction.onabort = transaction.onerror = () => { db.close(); reject(transaction.error ?? new Error("Saved filters could not load.")); };
  });
}
export const browserPresetStorage: AtomicPresetStorage = {
  async read(key) { return readArchive(await open(), key); },
  async readExisting(key) { const db = await openExisting(); return db ? readArchive(db, key) : null; },
  async compareAndSwap(key, expected, replacement) {
    const db = await open();
    return new Promise<boolean>((resolve, reject) => {
      let transaction: IDBTransaction;
      try { transaction = db.transaction(STORE, "readwrite", { durability: "strict" }); }
      catch (error) { db.close(); reject(error); return; }
      transaction.onabort = transaction.onerror = () => { db.close(); reject(transaction.error ?? new Error("Saved-filter changes could not commit.")); };
      if (transaction.durability !== "strict") { transaction.abort(); return; }
      let matches = false;
      const store = transaction.objectStore(STORE);
      const request = store.get(key);
      request.onsuccess = () => {
        const current = request.result === undefined ? null : request.result;
        if (current === expected) { matches = true; store.put(replacement, key); }
      };
      transaction.oncomplete = () => { db.close(); resolve(matches); };
    });
  }
};
