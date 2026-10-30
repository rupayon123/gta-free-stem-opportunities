/** Local QA fixture only; never imported or emitted by the product build. */
import { browserNotebookStorage } from "../lib/highSchool/browserNotebookStorage";
window.addEventListener("message", async event => {
  if (event.origin !== location.origin || event.source !== parent || event.data?.type !== "qa-cas") return;
  const { requestId, key, expected, replacement } = event.data;
  if (key !== "gta.highSchool.adapterQA") return;
  try { parent.postMessage({ type: "qa-cas-result", requestId, result: await browserNotebookStorage.compareAndSwap(key, expected, replacement) }, location.origin); }
  catch { parent.postMessage({ type: "qa-cas-result", requestId, error: "peer-storage-failed" }, location.origin); }
});
parent.postMessage({ type: "qa-peer-ready" }, location.origin);
