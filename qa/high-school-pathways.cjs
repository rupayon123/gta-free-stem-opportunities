/** Actual-render regression for the isolated export. No installs, user profile or
 * production writes. Start only after the coordinator grants the browser slot. */
const assert = require("node:assert/strict");
const { chromium } = require(process.env.GTA_PLAYWRIGHT_MODULE || "playwright-core");

(async () => {
  const base = new URL(process.env.GTA_QA_BASE_URL || "http://127.0.0.1:8793");
  assert(["127.0.0.1", "localhost"].includes(base.hostname), "Use the isolated local export");
  assert(process.env.GTA_QA_BROWSER, "Supply an existing browser executable; do not install one");
  const browser = await chromium.launch({ executablePath: process.env.GTA_QA_BROWSER, headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(new URL("/high-school/", base).href);
    const cards = page.getByRole("navigation", { name: "Student pathways" }).getByRole("button");
    await cards.last().waitFor({ state: "visible" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await cards.count(), 4);
    assert.equal(await page.locator(".hs-language-note").count(), 0, "English UI must have no guide-language banner");
    const layouts = [];
    for (const theme of ["light", "dark"]) {
      if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme", exact: true }).click();
      for (const [width, columns] of [[320, 1], [390, 1], [768, 2], [1440, 4]]) {
        await page.setViewportSize({ width, height: 1000 });
        const layout = await cards.evaluateAll(elements => {
          const boxes = elements.map(element => {
            const r = element.getBoundingClientRect();
            return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, height: r.height };
          });
          const pairsOverlap = boxes.some((a, i) => boxes.slice(i + 1).some(b =>
            Math.min(a.right, b.right) - Math.max(a.x, b.x) > 1 &&
            Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y) > 1));
          const textOutside = elements.some(element => [...element.querySelectorAll("strong, strong + span")].some(text => {
            const range = document.createRange(); range.selectNodeContents(text);
            const card = element.getBoundingClientRect();
            return [...range.getClientRects()].some(r => r.left < card.left || r.right > card.right || r.top < card.top || r.bottom > card.bottom);
          }));
          return { columns: boxes.filter(r => Math.abs(r.y - boxes[0].y) < 1).length,
            heightDifference: Math.max(...boxes.map(r => r.height)) - Math.min(...boxes.map(r => r.height)),
            pairsOverlap, textOutside,
            horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
            // The global reduced-motion rule sets duration to .01ms !important;
            // transition-property:none is what prevents any transition running.
            reducedMotion: getComputedStyle(elements[0]).transitionProperty === "none" };
        });
        assert.equal(layout.columns, columns, `${theme}/${width} column count`);
        assert(layout.heightDifference < 1, `${theme}/${width} equal-height cards`);
        assert(!layout.pairsOverlap && !layout.textOutside && !layout.horizontalOverflow, `${theme}/${width} readable bounded layout`);
        assert(layout.reducedMotion, "Reduced motion must remove every transition property");
        await cards.first().scrollIntoViewIfNeeded();
        const target = await cards.first().boundingBox();
        await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2);
        await page.mouse.down();
        const pressedTransform = await cards.first().evaluate(e => getComputedStyle(e).transform);
        await page.mouse.up();
        assert.equal(pressedTransform, "none", "Reduced motion must suppress the pressed movement");
        layout.pressedMovementSuppressed = true;
        layouts.push({ theme, width, ...layout });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    for (const title of ["Learn & create", "Leadership & careers", "Scholarships & support", "Volunteer"]) {
      const button = cards.filter({ has: page.locator("strong", { hasText: title }) });
      await button.click();
      await page.waitForFunction(title => document.activeElement?.tagName === "H2" && document.activeElement.textContent === title, title);
      assert.equal(await button.getAttribute("aria-pressed"), "true");
      assert.equal(await page.getByRole("heading", { level: 2, name: title, exact: true }).evaluate(e => e === document.activeElement), true, "Pathway navigation restores section focus");
    }
    await page.locator(".language-tool select").selectOption("fr");
    await page.getByText("This student content is currently available in English.", { exact: true }).waitFor();
    assert.equal(await page.locator(".hs-hub").getAttribute("lang"), "en");
    await page.locator(".language-tool select").selectOption("en");
    await page.locator(".hs-language-note").waitFor({ state: "detached" });
    console.log(JSON.stringify({ passed: true, layouts, pathways: 4, englishBannerAbsent: true, nonEnglishNotice: true }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
