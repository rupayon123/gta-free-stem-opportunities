import { readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";

/** Discovery is a review queue, not the library feed's health gate. */
export function runGuardedDiscovery(path: string, run: () => boolean): boolean {
  const previous = readFileSync(path);
  let succeeded = false;
  try { succeeded = run(); } catch { succeeded = false; }
  if (succeeded) return true;
  // Restore exact previous bytes even if a failing child partly wrote output.
  const temporary = `${path}.${process.pid}.restore`;
  try {
    writeFileSync(temporary, previous, { flag: "wx" });
    renameSync(temporary, path);
  } finally { rmSync(temporary, { force: true }); }
  return false;
}
