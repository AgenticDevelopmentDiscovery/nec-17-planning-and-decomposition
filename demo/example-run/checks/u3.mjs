import { chromium } from "playwright";
import assert from "node:assert/strict";

const url = new URL("../index.html", import.meta.url).href;
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url);
  const faq = page.locator("section").filter({ has: page.getByRole("heading", { name: /common questions/i }) }).first();
  const items = faq.locator("details");
  const n = await items.count();
  assert.ok(n >= 5, `at least 5 questions (found ${n})`);

  const questions = [];
  for (let i = 0; i < n; i++) {
    const item = items.nth(i);
    const answer = item.locator(":scope > :not(summary)").first();
    assert.ok(!(await answer.isVisible()), `answer ${i + 1} hidden before click`);
    await item.locator("summary").click();
    assert.ok(await answer.isVisible(), `answer ${i + 1} visible after click`);
    assert.ok((await answer.innerText()).trim().length > 20, `answer ${i + 1} is substantive`);
    questions.push(await item.locator("summary").innerText());
  }
  assert.ok(questions.some((q) => /dog/i.test(q) && /need|have|own|without|don.t/i.test(q)), `a question about joining without a dog: ${questions.join(" | ")}`);
  console.log("U3 pass");
} finally {
  await browser.close();
}
