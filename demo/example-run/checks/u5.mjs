import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(url);
  await page.getByRole("radio", { name: /I have a dog/i }).check(); // show every field

  const widths = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(widths.doc <= 375 && widths.body <= 375, `no horizontal scroll at 375px (${JSON.stringify(widths)})`);

  const off = await page.locator("form input, form select, form textarea, form button").evaluateAll((els) =>
    els.filter((e) => e.offsetParent !== null)
      .map((e) => ({ name: e.name || e.textContent.trim(), r: e.getBoundingClientRect() }))
      .filter(({ r }) => r.left < 0 || r.right > 375)
      .map(({ name, r }) => `${name}: ${Math.round(r.left)}..${Math.round(r.right)}`));
  assert.deepEqual(off, [], "every visible form control fits within 375px");
  console.log("U5 pass");
} finally {
  await browser.close();
}
