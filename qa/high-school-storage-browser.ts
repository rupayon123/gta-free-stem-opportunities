/** Purpose-built, button-operated local QA harness. Not a production app route.
 * Run only on an isolated localhost QA origin with disposable test data.
 */
import { browserNotebookStorage as storage } from "../lib/highSchool/browserNotebookStorage";
import { NOTEBOOK_KEY, loadHoursNotebook, saveHoursEntry, type HoursEntry } from "../lib/highSchool/notebook";
const QA_KEY = "gta.highSchool.adapterQA";
const results = document.querySelector<HTMLPreElement>("#qa-results")!;
function assert(value: unknown, message: string): asserts value { if (!value) throw new Error(message); }
function report(text: string) { results.textContent += `${text}\n`; }
function request<T>(req: IDBRequest<T>): Promise<T> { return new Promise((resolve, reject) => { req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); }); }
async function disposableOnly() {
  assert(["127.0.0.1", "localhost"].includes(location.hostname) && location.port === "8793", "Dedicated localhost QA port8793 only");
  const raw = await storage.read(NOTEBOOK_KEY);
  if (raw !== null) {
    try {
      const data = JSON.parse(raw);
      assert(Array.isArray(data.entries) && data.entries.every((entry: HoursEntry) => entry.provider.startsWith("QA ")), "Refusing to alter non-QA notebook data");
    } catch (error) { if (raw !== "QA deliberate invalid archive") throw error; }
  }
}
async function openRaw(version?: number) { return request(indexedDB.open("gta-high-school-notebook", version)); }
async function deleteDisposableDatabase() {
  assert(["127.0.0.1", "localhost"].includes(location.hostname) && location.port === "8793", "Dedicated localhost QA port8793 only");
  // This control is explicitly for the dedicated, disposable QA origin.
  await new Promise<void>((resolve, reject) => { const req = indexedDB.deleteDatabase("gta-high-school-notebook"); req.onsuccess = () => resolve(); req.onerror = () => reject(req.error); req.onblocked = () => reject(new Error("Close active QA notebook operations, then retry.")); });
}
async function runChecks() {
  await disposableOnly();
  const initial = await storage.read(QA_KEY);
  const seed = `qa-seed-${crypto.randomUUID()}`;
  assert(await storage.compareAndSwap(QA_KEY, initial, seed), "Initial CAS failed");
  assert(await storage.read(QA_KEY) === seed, "Read after commit failed"); report("PASS durable CAS/read");
  assert(!await storage.compareAndSwap(QA_KEY, "stale", "must-not-write"), "Stale CAS wrote data");
  assert(await storage.read(QA_KEY) === seed, "Mismatch changed bytes"); report("PASS mismatch preserves exact bytes");

  const originalTransaction = IDBDatabase.prototype.transaction;
  let completed = false;
  let observedReadwrite = false;
  // Instrument real native transactions inside this QA page only.
  IDBDatabase.prototype.transaction = function (...args: Parameters<IDBDatabase["transaction"]>) {
    const tx = originalTransaction.apply(this, args);
    if (args[1] === "readwrite") { observedReadwrite = true; tx.addEventListener("complete", () => { completed = true; }); }
    return tx;
  };
  try {
    assert(await storage.compareAndSwap(QA_KEY, seed, "qa-complete"), "Completion CAS failed");
    assert(observedReadwrite && completed, "Promise resolved before native transaction completion"); report("PASS save acknowledges transaction completion");
  } finally { IDBDatabase.prototype.transaction = originalTransaction; }

  const beforeAbort = await storage.read(QA_KEY);
  let aborted = false;
  IDBDatabase.prototype.transaction = function (...args: Parameters<IDBDatabase["transaction"]>) {
    const tx = originalTransaction.apply(this, args);
    if (args[1] === "readwrite") queueMicrotask(() => tx.abort());
    return tx;
  };
  try { await storage.compareAndSwap(QA_KEY, beforeAbort, "must-not-commit"); }
  catch { aborted = true; }
  finally { IDBDatabase.prototype.transaction = originalTransaction; }
  assert(aborted, "Aborted transaction reported success"); assert(await storage.read(QA_KEY) === beforeAbort, "Abort changed saved bytes"); report("PASS actual native abort rejects and preserves bytes");

  const baseline = `qa-race-${crypto.randomUUID()}`;
  assert(await storage.compareAndSwap(QA_KEY, beforeAbort, baseline), "Could not prepare race");
  const iframe = document.createElement("iframe"); iframe.title = "Isolated same-origin storage test peer"; iframe.hidden = true;
  let peer: Promise<boolean> | null = null;
  const requestId = crypto.randomUUID();
  const ready = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => { window.removeEventListener("message", listener); reject(new Error("QA peer did not load")); }, 10000);
    const listener = (event: MessageEvent) => { if (event.origin === location.origin && event.source === iframe.contentWindow && event.data?.type === "qa-peer-ready") { clearTimeout(timeout); window.removeEventListener("message", listener); resolve(); } };
    window.addEventListener("message", listener);
  });
  iframe.src = "/__qa__/storage-peer.html"; document.body.append(iframe);
  try {
    await ready;
    peer = new Promise<boolean>((resolve, reject) => {
      const timeout = setTimeout(() => { window.removeEventListener("message", listener); reject(new Error("QA peer CAS timed out")); }, 10000);
      const listener = (event: MessageEvent) => { if (event.origin === location.origin && event.source === iframe.contentWindow && event.data?.requestId === requestId) { clearTimeout(timeout); window.removeEventListener("message", listener); if (event.data.error) reject(new Error(event.data.error)); else resolve(event.data.result); } };
      window.addEventListener("message", listener);
    });
    iframe.contentWindow!.postMessage({ type: "qa-cas", requestId, key: QA_KEY, expected: baseline, replacement: "qa-peer-winner" }, location.origin);
    const outcomes = await Promise.all([storage.compareAndSwap(QA_KEY, baseline, "qa-parent-winner"), peer]);
    assert(outcomes.filter(Boolean).length === 1, "Two realm writers both won");
    assert(["qa-peer-winner", "qa-parent-winner"].includes((await storage.read(QA_KEY))!), "Concurrent result was lost"); report("PASS cross-context concurrent CAS: exactly one winner");
  } finally { iframe.remove(); }

  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const entry: HoursEntry = { id: crypto.randomUUID(), revision: 1, provider: "QA adapter", role: "QA abort retention", activityLocalDate: localDate, actualMinutes: 17, notes: "Disposable harness entry", createdAt: today.toISOString(), updatedAt: today.toISOString() };
  const notebookBefore = await storage.read(NOTEBOOK_KEY);
  IDBDatabase.prototype.transaction = function (...args: Parameters<IDBDatabase["transaction"]>) { const tx = originalTransaction.apply(this, args); if (args[1] === "readwrite") queueMicrotask(() => tx.abort()); return tx; };
  try { const outcome = await saveHoursEntry(storage, entry, localDate); assert(!outcome.ok && outcome.error === "write-failed", "Core did not report write failure after abort"); }
  finally { IDBDatabase.prototype.transaction = originalTransaction; }
  assert(await storage.read(NOTEBOOK_KEY) === notebookBefore, "Notebook abort changed prior archive"); report("PASS core save abort returns write-failed without changing archive");
  const loaded = await loadHoursNotebook(storage, localDate); assert(loaded.ok, "QA notebook cannot reload"); report("PASS notebook reload remains readable");
  report("ALL 7 STORAGE CHECKS PASSED");
}
async function operation(fn: () => Promise<void>) {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button")); buttons.forEach(button => { button.disabled = true; }); results.textContent = "";
  try { await fn(); } catch (error) { report(`FAIL: ${error instanceof Error ? error.message : String(error)}`); }
  finally { buttons.forEach(button => { button.disabled = false; }); }
}
document.querySelector("#qa-run")!.addEventListener("click", () => operation(runChecks));
document.querySelector("#qa-corrupt")!.addEventListener("click", () => operation(async () => { await disposableOnly(); const raw = await storage.read(NOTEBOOK_KEY); assert(await storage.compareAndSwap(NOTEBOOK_KEY, raw, "QA deliberate invalid archive"), "Archive changed during seed"); report("Seeded deliberate invalid QA archive. Open product notebook and verify visible error + preserved bytes."); }));
document.querySelector("#qa-upgrade")!.addEventListener("click", () => operation(async () => { await disposableOnly(); const db = await openRaw(2); db.close(); report("QA database upgraded to version2. Existing open product draft should remain visible after Save reports storage failure."); }));
document.querySelector("#qa-reset")!.addEventListener("click", () => operation(async () => { await deleteDisposableDatabase(); report("Disposable QA notebook database removed. Reload product notebook to restart."); }));
