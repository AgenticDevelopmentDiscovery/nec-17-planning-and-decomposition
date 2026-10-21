import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const options = (loc) => loc.evaluate((s) => [...s.options].map((o) => o.textContent.trim()));
const dogFields = [/dog.s name/i, /^breed/i, /^sex/i, /^age/i, /^size/i, /good with other dogs/i, /walk leader/i];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url);

  for (const label of [/your name/i, /A&M email/i, /class year/i]) assert.ok(await page.getByLabel(label).isVisible(), `${label} visible`);
  const years = await options(page.getByLabel(/class year/i));
  for (const c of [/freshman/i, /sophomore/i, /junior/i, /senior/i, /graduate/i]) assert.ok(years.some((y) => c.test(y)), `class year offers ${c}: ${years}`);

  const yes = page.getByRole("radio", { name: /I have a dog/i });
  const no = page.getByRole("radio", { name: /no dog/i });
  assert.ok((await yes.isVisible()) && (await no.isVisible()), "dog / no-dog choice visible");

  for (const f of dogFields) assert.ok(!(await page.getByLabel(f).isVisible()), `${f} hidden before choosing`);
  await yes.check();
  for (const f of dogFields) assert.ok(await page.getByLabel(f).isVisible(), `${f} visible with a dog`);

  assert.deepEqual((await options(page.getByLabel(/^sex/i))).filter((o) => /female|male/i.test(o)).length, 2, "sex: female and male");
  assert.ok((await options(page.getByLabel(/^size/i))).filter((o) => /small|medium|large/i.test(o)).length >= 3, "at least 3 sizes");
  const good = (await options(page.getByLabel(/good with other dogs/i))).join("|");
  for (const re of [/yes/i, /\bno\b/i, /not sure/i]) assert.match(good, re, `good-with-dogs offers ${re}`);

  await no.check();
  for (const f of dogFields) assert.ok(!(await page.getByLabel(f).isVisible()), `${f} hidden with no dog`);
  console.log("U6 pass");
} finally {
  await browser.close();
}
