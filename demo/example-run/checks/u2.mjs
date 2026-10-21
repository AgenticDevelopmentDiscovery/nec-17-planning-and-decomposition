import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const sections = [
  [/who we are/i, []],
  [/what we do/i, [/weekly|every week/i, /shelter/i, /potluck/i]],
  [/when (&|and) where/i, [/(mon|tues|wednes|thurs|fri|satur|sun)day/i, /\d{1,2}(:\d{2})?\s*[ap]\.?m/i, /College Station/i]],
  [/first walk/i, [/bring|wear/i]],
  [/find us/i, [/park|bus|map/i]],
  [/common questions/i, []],
];

const inView = (h) => h.evaluate((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight; });
const scrollTo = (page, where) => page.evaluate((w) => window.scrollTo({ top: w === "top" ? 0 : document.body.scrollHeight, behavior: "instant" }), where);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(url);
  const nav = page.getByRole("navigation").first();

  for (const [name, mustMention] of sections) {
    const heading = page.getByRole("heading", { name }).first();
    assert.ok(await heading.isVisible(), `heading ${name} visible`);
    const text = await page.locator("section").filter({ has: heading }).first().innerText();
    assert.ok(text.length > 150, `${name} has substantive text (${text.length} chars)`);
    for (const re of mustMention) assert.match(text, re, `${name} mentions ${re}`);

    await scrollTo(page, "top");
    if (await inView(heading)) await scrollTo(page, "bottom");
    assert.ok(!(await inView(heading)), `${name} starts off screen`);
    await nav.getByRole("link", { name }).click();
    await page.waitForFunction((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight; }, await heading.elementHandle(), { timeout: 3000 });
  }
  console.log("U2 pass");
} finally {
  await browser.close();
}
