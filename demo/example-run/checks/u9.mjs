import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const members = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("adws.members") || "[]"));

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url);

  // First member, with a dog.
  await page.getByLabel(/your name/i).fill("Reveille Fan");
  await page.getByLabel(/A&M email/i).fill("rfan@tamu.edu");
  await page.getByLabel(/class year/i).selectOption({ index: 1 });
  await page.getByRole("radio", { name: /I have a dog/i }).check();
  await page.getByLabel(/dog.s name/i).fill("Biscuit");
  await page.getByLabel(/^breed/i).fill("Labrador Retriever");
  await page.getByLabel(/^sex/i).selectOption({ label: "Female" });
  await page.getByLabel(/^age/i).fill("4");
  await page.getByLabel(/^size/i).selectOption({ index: 1 });
  await page.getByLabel(/good with other dogs/i).selectOption({ index: 1 });
  await page.getByLabel(/walk leader/i).fill("Pulls toward squirrels");
  await page.getByRole("button", { name: /review my info/i }).click();
  await page.getByRole("button", { name: /confirm (&|and) join/i }).click();

  const welcome = page.getByText(/welcome/i).filter({ hasText: "Reveille Fan" }).first();
  assert.ok(await welcome.isVisible(), "welcome message names the member");
  let saved = await members(page);
  assert.equal(saved.length, 1, "one member saved");
  assert.equal(saved[0].name, "Reveille Fan");
  assert.equal(saved[0].email, "rfan@tamu.edu");
  assert.ok(saved[0].classYear, "class year saved");
  assert.equal(saved[0].dog?.name, "Biscuit");
  assert.equal(saved[0].dog?.breed, "Labrador Retriever");
  assert.equal(Number(saved[0].dog?.age), 4);
  assert.equal(saved[0].dog?.notes, "Pulls toward squirrels");
  for (const k of ["sex", "size", "goodWithDogs"]) assert.ok(saved[0].dog?.[k], `dog.${k} saved`);

  // Survives reload; second member picks a dog, then changes their mind.
  await page.reload();
  assert.equal((await members(page)).length, 1, "member survives reload");
  await page.getByLabel(/your name/i).fill("Shelter Walker");
  await page.getByLabel(/A&M email/i).fill("walker@email.tamu.edu");
  await page.getByLabel(/class year/i).selectOption({ index: 2 });
  await page.getByRole("radio", { name: /I have a dog/i }).check();
  await page.getByLabel(/dog.s name/i).fill("Ghost");
  await page.getByRole("radio", { name: /no dog/i }).check();
  await page.getByRole("button", { name: /review my info/i }).click();
  await page.getByRole("button", { name: /confirm (&|and) join/i }).click();

  saved = await members(page);
  assert.equal(saved.length, 2, "signups accumulate");
  assert.equal(saved[0].name, "Reveille Fan", "first member untouched");
  assert.equal(saved[1].name, "Shelter Walker");
  assert.equal(saved[1].dog, null, "switched-to-no-dog member saved with dog: null");
  console.log("U9 pass");
} finally {
  await browser.close();
}
