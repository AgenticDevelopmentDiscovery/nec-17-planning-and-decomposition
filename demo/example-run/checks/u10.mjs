import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const allowedFields = ["name", "email", "classYear", "hasDog", "dogName", "dogBreed", "dogSex", "dogAge", "dogSize", "dogGoodWithDogs", "dogNotes"];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url);

  const controls = await page.locator("form input, form select, form textarea").evaluateAll((els) => els.map((e) => ({ name: e.name, type: e.type })));
  const extra = controls.filter((c) => !allowedFields.includes(c.name));
  assert.deepEqual(extra, [], "form has only the listed fields");
  const risky = controls.filter((c) => /password|tel|date|file|month|week/.test(c.type));
  assert.deepEqual(risky, [], "no password/phone/date/file inputs");

  await page.getByLabel(/your name/i).fill("Reveille Fan");
  await page.getByLabel(/A&M email/i).fill("rfan@tamu.edu");
  await page.getByLabel(/class year/i).selectOption({ index: 1 });
  await page.getByRole("radio", { name: /I have a dog/i }).check();
  await page.getByLabel(/dog.s name/i).fill("Biscuit");
  await page.getByLabel(/^breed/i).fill("Mutt");
  await page.getByLabel(/^sex/i).selectOption({ label: "Male" });
  await page.getByLabel(/^age/i).fill("2");
  await page.getByLabel(/^size/i).selectOption({ index: 1 });
  await page.getByLabel(/good with other dogs/i).selectOption({ index: 1 });
  await page.getByRole("button", { name: /review my info/i }).click();
  await page.getByRole("button", { name: /confirm (&|and) join/i }).click();

  const [rec] = await page.evaluate(() => JSON.parse(localStorage.getItem("adws.members") || "[]"));
  assert.ok(rec, "a record was saved");
  assert.deepEqual(Object.keys(rec).sort(), ["classYear", "dog", "email", "joinedAt", "name"], "record keys");
  assert.deepEqual(Object.keys(rec.dog).sort(), ["age", "breed", "goodWithDogs", "name", "notes", "sex", "size"], "dog keys");
  console.log("U10 pass");
} finally {
  await browser.close();
}
