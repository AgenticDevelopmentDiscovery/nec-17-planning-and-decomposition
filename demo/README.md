# Live demo — decompose, approve, then build

A single Claude Code session turns a request into a plan, stops for approval,
then works the plan one unit at a time, proving each unit with a check it wrote
before any of it existed.

## What is here

```text
harness/CLAUDE.md   the whole harness: how to work, and nothing about dogs
request.md          what gets pasted into the session (the presenter's copy)
example-run/        a recorded run, kept as the worked example
tools/setup.sh      rebuilds run/ and archives whatever was there
run/                the live working folder, gitignored
```

`run/` starts with **two entries**: `CLAUDE.md` and a symlink to Playwright.
No plan, no checks, no page. The agent writes all of it.

## Running it

```sh
./tools/setup.sh      # archives the last run, gives you a clean folder
cd run && claude
```

Paste the contents of `request.md`, or say it in your own words. Keep `PLAN.md`
open in an editor tab — it does not exist yet, and watching it appear is the
first half of the demo.

**Phase 0.** The session writes `PLAN.md` — what it heard, its open questions,
what it is leaving out of scope, and the units with a check named for each —
plus the check scripts themselves. Then it stops.

**Review this.** The unit count is the scope dial and the only place you control
it. The open questions are decisions the request did not settle; answering them
here costs a sentence, and answering them later costs a rebuild.

**Phase 1.** On approval it works the whole list unattended, one unit at a time,
ticking boxes with real check output underneath, then re-runs every check at the
end so nothing is reported green that a later unit broke.

## What to point at

- `PLAN.md` filling in: that is the decomposition, visible
- an open question: a decision that would otherwise have been guessed silently
- a check: `node checks/u7.mjs` exits non-zero when the behaviour is absent
- the evidence under a ticked box: the command and what it actually printed

## Honesty

A check is evidence about what it checks and nothing else. The recorded run says
so itself, about the one requirement it could not test:

> "Polished, with some life to it." ... No check can judge taste — that part is
> your eye at review, not a unit.
