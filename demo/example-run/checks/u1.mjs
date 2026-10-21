import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const problems = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("request", (r) => !/^(file|data|blob):/.test(r.url()) && problems.push(`network: ${r.url()}`));
  await page.goto(url);

  assert.ok(await page.getByRole("heading", { level: 1, name: /Aggie Dog Walking Society/i }).isVisible(), "h1 names the club");
  assert.ok(await page.getByRole("img", { name: /logo/i }).first().isVisible(), "placeholder logo visible");

  const notice = page.getByText(/fictional/i).first();
  assert.ok(await notice.isVisible(), "fictional notice visible");
  const box = await notice.boundingBox();
  assert.ok(box && box.y < 800, `fictional notice is on screen at load (y=${box?.y})`);

  assert.deepEqual(problems, [], "no errors or network requests");
  console.log("U1 pass");
} finally {
  await browser.close();
}
