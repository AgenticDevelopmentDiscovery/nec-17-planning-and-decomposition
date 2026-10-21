# Content

## The test: name the check

Before handing over a unit, answer one question.

> What would I run, or look at, to see that this worked?

- You can answer it → the unit is ready.
- Your answer is "I'd look at the thing and tell" → not a unit yet. Too vague to
  hand over, and too vague to verify when it comes back.
- You need five different checks → that is five units wearing one name.

## Three properties, one per failure family

| Property | Means | Answers |
| --- | --- | --- |
| **Edges** | what is in, and what is not | boundary |
| **A check** | the unit carries its own proof | completion |
| **Written down** | lives in a file, worked one at a time | continuity |

A unit with all three is not merely smaller. It is handed over with the three
things the agent would otherwise have had to invent.

## Plan mode moves the work, it does not remove it

Most of us hand the front-loading to the model now: plan mode produces a
decomposition before anything gets edited.

What it is good at: surfacing files, steps, and consequences you had not
considered.

What it cannot do is supply a vision you never gave it. A vague goal yields a
plan that *reads* as rigorous and is confidently wrong — which is worse than no
plan, because it launders a vague ask into something with the shape of a
decomposition.

A generated plan is a proposal to review. Reviewing one well means knowing what a
good unit looks like, which is the skill on the previous slide — relocated, not
replaced.

## Worked example: a club page, decomposed

A request for a student club homepage and signup form, handed to a session whose
harness says: plan first, then stop.

**What came back.** Ten units, each with a check named before anything was
built. Eleven open questions — which addresses count as a university email, what
"one dog per member" means, where the fictional-club notice goes. Seven things
ruled out of scope and binding once written.

**What each unit looked like.**

> U7 — Validation refuses to advance while required fields are empty.
> *Check: `node checks/u7.mjs`.*

The check drives the page in a browser and asserts what a person would see. It
is not a search for a word in the source: "the file contains the word review" is
not evidence that a review step works.

**The one requirement that had no check**, in the session's own words:

> "Polished, with some life to it." No check can judge taste — that part is your
> eye at review, not a unit.

That is the honest boundary of the method. A check is evidence about the thing
it checks, and about nothing else.

## What it costs

Decomposition is front-loaded work. You pay it before anything visibly happens,
which is exactly when it feels least worth paying.

It is not always worth it. Skip it for throwaway scripts, for exploration, for
anything you would rather restart than resume, and for one-shot tasks that finish
in less time than the planning takes.

It earns its keep when the work outlives a single session, when somebody other
than you has to believe it works, or when being wrong is expensive to discover
late.
