// Review draft: Node application/test HTTP is disabled in offline phases.
// Dependency registry access and Git/GitHub operations occur in separate phases.
import http from "node:http";
import https from "node:https";
import { syncBuiltinESMExports } from "node:module";
const reject = () => { throw new Error("Provider/network HTTP forbidden in offline reconciliation/QA"); };
globalThis.fetch = async () => reject();
http.request = reject;
http.get = reject;
https.request = reject;
https.get = reject;
syncBuiltinESMExports();
