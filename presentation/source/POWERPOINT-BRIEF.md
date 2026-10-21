# PowerPoint production brief — Planning and Task Decomposition

## Purpose

Create a **seven-slide, five-minute** visual talk for ENGR689 on planning and task decomposition. The talk’s single idea is:

> **A good handoff names what to build and how we will know it is done.**

**The talk is about the topic, not about the demo.** A live demonstration follows it, but no slide and no figure refers to that demonstration, its subject, or its setup. The presenter introduces the demo verbally after slide 7.

## Production specification

- **Canvas:** 16:9, widescreen (13.333 × 7.5 in).
- **Use:** PowerPoint, Google Slides, or a presentation agent. This brief is the source of truth; it replaces the former Beamer deck.
- **Palette:** maroon `#500000`, parchment `#F2EBDD`, charcoal `#1D1A17`, signal green `#167A55`, faded gold `#D7B56D`.
- **Type:** Bahnschrift SemiBold for titles; Aptos or Segoe UI for body; Consolas for quoted prompts and checks. These travel well on a classroom Windows machine.
- **Motif:** collegiate field notes — flat shapes, dog-tag and index-card forms, no gradients or drop shadows. Do **not** use official Texas A&M logos, wordmarks, or photographs.
- **Density:** one idea per slide; at least 28 pt body type; no paragraph longer than two lines; no more than 12 words of supporting copy on a slide.
- **Motion:** use no more than two reveals in the whole deck. Never hide essential text behind an animation.

## Deck-wide layout

Put a narrow maroon strip along the left edge. Let it act as the deck’s progress marker: a small cream dot moves down it from slide to slide. Keep backgrounds mostly parchment; spend the strongest maroon on quoted prompts, and the signal green only on things that have been checked.

Editable source figures are in `presentation/assets/`. They are simple SVG shapes and text, designed to be opened in a browser or imported into PowerPoint as editable vector graphics. **Each figure leaves its top area clear so the slide title sits above it.** The running example throughout is `"Add authentication."` — keep it consistent; it is what makes slides 1, 4 and 5 read as one argument.

---

## Slide 1 — The handoff problem

**Purpose:** Open on the moment everyone in the room recognizes — the one-line goal.

**On-slide copy**

Title: **A one-line goal is underspecified, not small**

Nothing else. The figure carries the slide.

**Layout:** Title across the top. The figure fills the rest: the quoted goal on the left, the agent in the middle, and the five decisions it had to make on the right.

**Figure:** `assets/01-handoff.svg`.

**Presenter line (0:00–0:30):** “Everyone here has typed something like this. The agent did something. The question worth asking is what it had to decide on our behalf to get there.”

**Transition:** None.

**Alt text:** A one-line goal passes through an agent, which emits five unanswered decisions about scope, protection, and completion.

---

## Slide 2 — The missing information

**Purpose:** Make vague prompts feel visibly incomplete.

**On-slide copy**

```
Clean up the data pipeline.
```

Below it, three empty tags: **What belongs?** · **What is enough?** · **How do we check?**

**Layout:** Put the prompt in an oversized cream code card on maroon. The three questions sit below as three outlined cards with intentional empty centers. Do not enumerate agent failure jargon yet.

**Figure:** `assets/02-missing-information.svg`.

**Presenter line (0:30–1:00):** “A different goal, the same three blanks. They are not details — they are what turns a request into finishable work, and the agent fills them in silently.”

**Alt text:** A one-line data-pipeline prompt sits above three empty cards labeled scope, completion, and verification questions.

---

## Slide 3 — Three places the guess leaks

**Purpose:** Name the diagnostic model succinctly.

**On-slide copy**

| Boundary | Completion | Continuity |
| --- | --- | --- |
| What is in or out? | What proves done? | What survives the next session? |

**Layout:** Three tall, unequal-color panels on a parchment background. Boundary uses maroon, Completion uses gold, Continuity uses charcoal. Each panel includes one tiny concrete visual: stray file tabs, a “Done” stamp over an unchecked list, and a broken handoff line.

**Figure:** `assets/03-three-leaks.svg`.

**Presenter line (1:00–1:35):** “Most frustrating agent moments fit one of these three. It touches things we did not mean, calls unfinished work done, or leaves the next session to reconstruct the state. A stronger model does all three faster.”

**Alt text:** Three panels depict an unclear scope, unverified completion, and lost work continuity.

---

## Slide 4 — A task unit has a finish line

**Purpose:** Give the room one rule they can reuse immediately.

**On-slide copy**

> A task unit = an outcome + boundaries + a check

Question beneath: **What would I run, or look at, to know this worked?**

**Layout:** A dog-tag-shaped task card on the left, divided into outcome, boundaries, and check, with a green “passes” chip beside it. On the right, the question and the three verdicts it produces: no answer, five answers, one answer.

**Figure:** `assets/04-task-card.svg`.

**Presenter line (1:35–2:15):** “A unit is not defined by how many minutes it takes. It is defined by whether you can state the behavior, its edges, and the observation that closes it. If you need five checks, that is five units wearing one name.”

**Alt text:** A task card divides a unit into outcome, boundaries, and an observable check, beside the three verdicts the checkability question produces.

---

## Slide 5 — The same goal, decomposed

**Purpose:** Show the rule applied — the opening goal, rewritten as units that each carry a check.

**On-slide copy**

Title: **Each unit carries its own proof**

Footer: *Worked one at a time. Finished when the check passes, not when the agent says so.*

**Layout:** The quoted goal from slide 1 at the top left, with a maroon spine running down into three numbered units. Each unit shows its behavior in bold and its check beneath, with a green check chip on the right.

**Figure:** `assets/05-decompose.svg`.

**Presenter line (2:15–2:55):** “Same goal as the first slide. Three units, and each one names what you would run to see it worked. Notice the units got small as a consequence of being checkable — small was never the goal.”

**Alt text:** The authentication goal branches into three numbered units, each with a stated behavior, a check, and a green check chip.

---

## Slide 6 — Plan mode moves the work

**Purpose:** Address the obvious objection — the model will plan for you — before anyone raises it.

**On-slide copy**

Title: **Plan mode moves the work**

Two lines: *Good at: surfacing files, steps and consequences you had not considered.*  
*Cannot do: supply a vision you never gave it.*

Closing line: **A generated plan is a proposal to review.**

**Layout:** A left-to-right sequence on maroon: a vague goal goes in, a tidy plan comes out, and it reads as rigorous. The two “good at / cannot do” lines sit in a parchment band beneath.

**Figure:** `assets/06-plan-mode.svg`.

**Presenter line (2:55–3:25):** “Most of us hand this to plan mode now. But a vague goal yields a plan that reads as rigorous and is confidently wrong, which is worse than no plan — it launders a vague ask into something shaped like a decomposition. Reviewing one well needs the same skill.”

**Alt text:** A vague goal becomes a tidy generated plan that reads as rigorous and can still be confidently wrong.

---

## Slide 7 — What it costs, and when to skip it

**Purpose:** End on the honest limit, so the method reads as a judgement call rather than a rule.

**On-slide copy**

Title: **Front-loaded work, so it is not always worth it**

**Skip it:** throwaway scripts · exploration · anything you would rather restart than resume · one-shot tasks that finish faster than the planning

**Pay it:** the work outlives one session · somebody else has to believe it works · being wrong is expensive to discover late

Closing band: **You pay before anything visibly happens** — *which is exactly when it feels least worth paying.*

**Layout:** Two columns, charcoal on the left and signal green on the right, with the closing band in maroon across the bottom. No winner badge and no checkmarks.

**Figure:** `assets/07-cost.svg`.

**Presenter line (3:25–4:00):** “This is overhead, and it is paid up front. Skip it for anything you would rather restart than resume. Pay it when the work outlives the session, or when someone other than you has to believe it works.”

**Alt text:** Two columns contrast when to skip decomposition and when to pay for it, above a band stating that the cost comes before any visible progress.

---

## Demo handoff

The demo is **not** on the slides. After slide 7, the presenter introduces it verbally and switches away from the deck. Do not add a demo slide, a results scorecard, or any reference to the demo’s subject in the figures — the talk has to stand on its own if the live runs go badly.

Talk budget: slides 1–7 run about four minutes, leaving a minute of margin inside the five-minute half of the slot.

## AI-use disclosure

Place this statement in the presenter notes and, if a markdown artifact is submitted, in an end matter section:

> **AI-use disclosure:** Claude Code assisted with ideation, drafting, visual specifications, and development of the demonstration harness. Tripp Robinson selected the topic, the argument, and the final presentation choices; any live demonstration results are reported as observed.
