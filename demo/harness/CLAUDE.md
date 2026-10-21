# How I want you to work

This directory is self-contained. Instruction files in parent directories
describe other projects and do not apply here — ignore them. Do not read, edit
or run anything outside this directory.

You work in **two phases**, and you stop between them.

---

## Phase 0 — Decompose. Do this once, then stop.

I will tell you what I want built. Before you write any of it, turn my request
into a plan.

Write **`PLAN.md`** in this shape:

```markdown
## What you asked for
One sentence, in my own words.

## Open questions
- Anything your request genuinely left unsettled, and what I would do by default.

## Out of scope
- Things I am deliberately not building.

## Units
- [ ] U1 — one behaviour, stated so you could accept or reject it
      check: node checks/u1.mjs
- [ ] U2 — ...
      check: node checks/u2.mjs
```

**Write the checks in this phase too** — one runnable script per unit, in
`checks/`, before any of it is built. A check:

- exits 0 when the behaviour is there and non-zero when it is not;
- drives the real page in a browser and asserts on what a person would see;
- is **not** a search for a string in the source. "The file contains the word
  review" is not evidence that a review step works.

Playwright is installed here; `import { chromium } from "playwright"` works.
There is no network, so load the page as a `file://` URL.

**Rules for the units:**

- Each is a single behaviour I could accept or reject on its own.
- Each is verifiable when it is finished, not only at the end.
- If you cannot name a check for a unit, it is not specified well enough —
  split it or sharpen it.
- If a unit needs five different checks, it is probably five units.
- Anything I did not settle goes under **Open questions**. Do not guess quietly
  and do not bury the guess inside a unit.
- Anything you decide not to build goes under **Out of scope**, where it is
  binding once written.

Then **stop and show me the plan.** Do not start building. I review the
decomposition before any of it exists — that review is the point of this phase.

---

## Phase 1 — Build. One unit at a time, all the way through.

Once I approve the plan, work the whole list without checking back with me.
My approval was on the plan, not on each unit.

Still do them **one at a time, in order**. For each unit:

1. Say which unit you are starting. Do not touch any other.
2. Build it, and only it.
3. Run its check exactly as written in `PLAN.md`.
4. If it fails, fix and rerun. A unit is not done because it looks done.
5. When it passes, tick its box in `PLAN.md` and put the command and its **real
   output** underneath as evidence.
6. Move to the next unit.

Finish the list before you report. Come back to me early only if a unit turns
out to be impossible as written, or if finishing it would mean breaking
something in **Out of scope** — say which, and why, instead of deciding for me.

When the list is done, re-run **every** check once more and report the results
together, so I can see nothing earlier broke along the way.

## Rules

- Do not weaken or edit a check to make it pass.
- Do not tick a box without the evidence underneath it.
- Do not add files I did not ask for.
- Once **Out of scope** is written, it is binding.

A unit is done when its own check passes and the evidence is there. Telling me
it works is not evidence.
