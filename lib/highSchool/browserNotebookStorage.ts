import type { AtomicNotebookStorage } from "./notebook";

const DATABASE = "gta-high-school-notebook";
const STORE = "archives";

function openNotebook(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("This browser cannot store the hours notebook."));
      return;
    }
    let settled = false;
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onerror = () => { settled = true; reject(request.error ?? new Error("Notebook storage could not open.")); };
    request.onblocked = () => { settled = true; reject(new Error("Close other notebook tabs, then try again.")); };
    request.onsuccess = () => {
      const db = request.result;
      if (settled) { db.close(); return; }
      settled = true;
      db.onversionchange = () => db.close();
      resolve(db);
    };
  });
}

/** IndexedDB serializes overlapping readwrite transactions across connections.
 * Compare and put share one transaction; request success is never save success.
 * Strict durability is a browser hint, not protection against clearing site data.
 */
export const browserNotebookStorage: AtomicNotebookStorage = {
  async read(key) {
    const db = await openNotebook();
    return new Promise<string | null>((resolve, reject) => {
      let value: string | null = null;
      let transaction: IDBTransaction;
      try { transaction = db.transaction(STORE, "readonly"); }
      catch (error) { db.close(); reject(error); return; }
      const request = transaction.objectStore(STORE).get(key);
      request.onsuccess = () => {
        if (request.result !== undefined && typeof request.result !== "string") { transaction.abort(); return; }
        value = request.result ?? null;
      };
      transaction.oncomplete = () => { db.close(); resolve(value); };
      transaction.onabort = transaction.onerror = () => { db.close(); reject(transaction.error ?? new Error("Notebook could not load.")); };
    });
  },
  async compareAndSwap(key, expected, replacement) {
    const db = await openNotebook();
    return new Promise<boolean>((resolve, reject) => {
      let transaction: IDBTransaction;
      try {
        transaction = db.transaction(STORE, "readwrite", { durability: "strict" });
      } catch (error) { db.close(); reject(error); return; }
      transaction.onabort = transaction.onerror = () => { db.close(); reject(transaction.error ?? new Error("Notebook changes could not be saved.")); };
      if (transaction.durability !== "strict") {
        transaction.abort();
        db.close();
        reject(new Error("This browser cannot confirm a durable notebook save."));
        return;
      }
      let matches = false;
      const store = transaction.objectStore(STORE);
      const request = store.get(key);
      request.onsuccess = () => {
        const current: unknown = request.result === undefined ? null : request.result;
        if (current === expected) { matches = true; store.put(replacement, key); }
      };
      transaction.oncomplete = () => { db.close(); resolve(matches); };
    });
  }
};
