import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(url);

  const pictures = await page.locator('img, [role="img"]').evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      const label = e.getAttribute("aria-label") || e.getAttribute("alt") || e.querySelector?.("title")?.textContent || "";
      return { label: label.trim(), w: r.width, h: r.height };
    }));
  const panels = pictures.filter((p) => p.label && !/logo/i.test(p.label) && p.w >= 150 && p.h >= 100);
  assert.ok(panels.length >= 3, `at least 3 labelled illustrations >=150x100 (found ${JSON.stringify(panels)})`);

  const maroonArea = await page.evaluate(() =>
    Math.max(0, ...[...document.querySelectorAll("body *")]
      .filter((e) => getComputedStyle(e).backgroundColor === "rgb(80, 0, 0)")
      .map((e) => { const r = e.getBoundingClientRect(); return r.width * r.height; })));
  assert.ok(maroonArea >= 40000, `a large maroon #500000 surface (largest ${maroonArea}px²)`);
  console.log("U4 pass");
} finally {
  await browser.close();
}
