import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const label = (loc) => loc.evaluate((s) => s.selectedOptions[0].textContent.trim());
const stored = (page) => page.evaluate(() => localStorage.getItem("adws.members"));

const browser = await chromium.launch();
try {
  { // with a dog: review, edit, review again
    const page = await browser.newPage();
    await page.goto(url);
    await page.getByLabel(/your name/i).fill("Reveille Fan");
    await page.getByLabel(/A&M email/i).fill("rfan@tamu.edu");
    await page.getByLabel(/class year/i).selectOption({ index: 2 });
    await page.getByRole("radio", { name: /I have a dog/i }).check();
    await page.getByLabel(/dog.s name/i).fill("Biscuit");
    await page.getByLabel(/^breed/i).fill("Labrador Retriever");
    await page.getByLabel(/^sex/i).selectOption({ label: "Female" });
    await page.getByLabel(/^age/i).fill("4");
    await page.getByLabel(/^size/i).selectOption({ index: 3 });
    await page.getByLabel(/good with other dogs/i).selectOption({ index: 2 });
    await page.getByLabel(/walk leader/i).fill("Pulls toward squirrels");
    const expected = ["Reveille Fan", "rfan@tamu.edu", await label(page.getByLabel(/class year/i)), "Biscuit", "Labrador Retriever", "Female", "4",
      await label(page.getByLabel(/^size/i)), await label(page.getByLabel(/good with other dogs/i)), "Pulls toward squirrels"];

    await page.getByRole("button", { name: /review my info/i }).click();
    const heading = page.getByRole("heading", { name: /review your info/i });
    assert.ok(await heading.isVisible(), "review shown");
    assert.ok(!(await page.getByLabel(/your name/i).isVisible()), "form hidden during review");
    const review = await page.locator("section, div").filter({ has: heading }).last().innerText();
    for (const v of expected) assert.ok(review.includes(v), `review shows "${v}"`);
    assert.equal(await stored(page), null, "nothing saved before confirm");

    await page.getByRole("button", { name: /^edit/i }).click();
    assert.ok(await page.getByLabel(/your name/i).isVisible(), "edit returns to the form");
    assert.equal(await page.getByLabel(/your name/i).inputValue(), "Reveille Fan", "name kept");
    assert.equal(await page.getByLabel(/dog.s name/i).inputValue(), "Biscuit", "dog name kept");
    assert.equal(await page.getByLabel(/walk leader/i).inputValue(), "Pulls toward squirrels", "notes kept");
    await page.getByLabel(/your name/i).fill("Sully Fan");
    await page.getByRole("button", { name: /review my info/i }).click();
    const again = await page.locator("section, div").filter({ has: heading }).last().innerText();
    assert.ok(again.includes("Sully Fan") && !again.includes("Reveille Fan"), "review shows the edit");
    assert.equal(await stored(page), null, "still nothing saved");
    await page.close();
  }
  { // no dog
    const page = await browser.newPage();
    await page.goto(url);
    await page.getByLabel(/your name/i).fill("Shelter Walker");
    await page.getByLabel(/A&M email/i).fill("walker@tamu.edu");
    await page.getByLabel(/class year/i).selectOption({ index: 1 });
    await page.getByRole("radio", { name: /no dog/i }).check();
    await page.getByRole("button", { name: /review my info/i }).click();
    const heading = page.getByRole("heading", { name: /review your info/i });
    const review = await page.locator("section, div").filter({ has: heading }).last().innerText();
    assert.match(review, /no dog/i, "no-dog review says so");
    assert.doesNotMatch(review, /breed/i, "no dog fields in no-dog review");
    await page.close();
  }
  console.log("U8 pass");
} finally {
  await browser.close();
}
