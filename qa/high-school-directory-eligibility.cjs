/** Read-only browser regression. Requires an already built local site and an existing
 * Playwright module/browser supplied by the coordinating chat; installs nothing.
 * Not part of the public export. Run only after the shared browser slot is granted. */
const assert = require("node:assert/strict");
const { chromium } = require(process.env.GTA_PLAYWRIGHT_MODULE || "playwright-core");

(async () => {
  const base = new URL(process.env.GTA_QA_BASE_URL || "http://127.0.0.1:8793");
  assert(["127.0.0.1", "localhost"].includes(base.hostname), "Use the isolated local export");
  assert(process.env.GTA_QA_BROWSER, "Supply an existing browser executable; do not install one");
  const browser = await chromium.launch({ executablePath: process.env.GTA_QA_BROWSER, headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    // The reviewed catalogue is current at this clock. This is not live intake evidence.
    await context.clock.install({ time: new Date("2026-10-30T12:00:00Z") });
    const page = await context.newPage();
    await page.goto(new URL("/high-school/", base).href);
    const directory = page.getByRole("button", { name: "Explore Markham Public Library volunteering", exact: true });
    await directory.waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Filter these opportunities", exact: true }).click();
    await page.getByLabel("Age (optional)", { exact: true }).fill("12");
    await directory.waitFor({ state: "detached" });
    assert.equal(await directory.count(), 0, "Age 12 must not show the provider's 14+ directory");
    await page.getByLabel("Age (optional)", { exact: true }).fill("14");
    await directory.waitFor({ state: "visible" });
    await page.getByLabel("Age (optional)", { exact: true }).fill("");
    await directory.waitFor({ state: "visible" });
    assert.equal(await directory.count(), 1, "Unspecified age must keep a reviewed directory discoverable");
    console.log(JSON.stringify({ passed: true, cases: ["age12-excluded", "age14-included", "unknown-age-included"], clock: "2026-10-30T12:00:00Z" }));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
