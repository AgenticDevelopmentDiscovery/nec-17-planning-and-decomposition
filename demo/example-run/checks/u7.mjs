import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const browser = await chromium.launch();

async function fresh() {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}
async function fillPerson(page, email = "rfan@tamu.edu") {
  await page.getByLabel(/your name/i).fill("Reveille Fan");
  await page.getByLabel(/A&M email/i).fill(email);
  await page.getByLabel(/class year/i).selectOption({ index: 1 });
}
async function fillDog(page, { name = "Biscuit", age = "4" } = {}) {
  await page.getByRole("radio", { name: /I have a dog/i }).check();
  await page.getByLabel(/dog.s name/i).fill(name);
  await page.getByLabel(/^breed/i).fill("Labrador Retriever");
  await page.getByLabel(/^sex/i).selectOption({ label: "Female" });
  await page.getByLabel(/^age/i).fill(age);
  await page.getByLabel(/^size/i).selectOption({ index: 1 });
  await page.getByLabel(/good with other dogs/i).selectOption({ index: 1 });
}
const submit = (page) => page.getByRole("button", { name: /review my info/i }).click();
const advanced = (page) => page.getByRole("heading", { name: /review your info/i }).isVisible();

// The field is marked invalid and one of the elements describing it shows a message.
async function errorOf(page, field) {
  assert.equal(await field.getAttribute("aria-invalid"), "true", "field marked aria-invalid");
  for (const id of ((await field.getAttribute("aria-describedby")) || "").split(/\s+/).filter(Boolean)) {
    const el = page.locator(`[id="${id}"]`);
    if (await el.isVisible()) { const t = (await el.innerText()).trim(); if (t) return t; }
  }
  assert.fail("no visible message described by the field");
}

try {
  { // empty form
    const page = await fresh();
    for (const l of [/your name/i, /A&M email/i, /class year/i]) assert.notEqual(await page.getByLabel(l).getAttribute("aria-invalid"), "true", `${l} not invalid before submit`);
    await submit(page);
    assert.ok(!(await advanced(page)), "empty form does not advance");
    for (const l of [/your name/i, /A&M email/i, /class year/i]) await errorOf(page, page.getByLabel(l));
    await page.close();
  }
  { // non-A&M email
    const page = await fresh();
    await fillPerson(page, "rfan@gmail.com");
    await page.getByRole("radio", { name: /no dog/i }).check();
    await submit(page);
    assert.ok(!(await advanced(page)), "gmail does not advance");
    assert.match(await errorOf(page, page.getByLabel(/A&M email/i)), /tamu\.edu/i, "email error names tamu.edu");
    await page.close();
  }
  { // no dog/no-dog choice made
    const page = await fresh();
    await fillPerson(page);
    await submit(page);
    assert.ok(!(await advanced(page)), "must choose dog or no dog");
    await page.close();
  }
  { // dog chosen, dog name missing
    const page = await fresh();
    await fillPerson(page);
    await fillDog(page, { name: "" });
    await submit(page);
    assert.ok(!(await advanced(page)), "missing dog name does not advance");
    await errorOf(page, page.getByLabel(/dog.s name/i));
    await page.close();
  }
  { // negative age
    const page = await fresh();
    await fillPerson(page);
    await fillDog(page, { age: "-2" });
    await submit(page);
    assert.ok(!(await advanced(page)), "negative age does not advance");
    await errorOf(page, page.getByLabel(/^age/i));
    await page.close();
  }
  for (const email of ["rfan@tamu.edu", "rfan@email.tamu.edu", "RFan@TAMU.EDU"]) { // valid, no dog
    const page = await fresh();
    await fillPerson(page, email);
    await page.getByRole("radio", { name: /no dog/i }).check();
    await submit(page);
    assert.ok(await advanced(page), `no-dog signup with ${email} advances`);
    await page.close();
  }
  { // valid, with dog
    const page = await fresh();
    await fillPerson(page);
    await fillDog(page);
    await submit(page);
    assert.ok(await advanced(page), "valid dog signup advances");
    await page.close();
  }
  console.log("U7 pass");
} finally {
  await browser.close();
}
