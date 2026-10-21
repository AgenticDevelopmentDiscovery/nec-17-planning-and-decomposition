# AI-use disclosure

This tutorial was produced with Claude Code. Required by course decision D-022,
which is cited in the course rubrics.

## What the agent did

- Drafted and revised the prose in `sections/`, against direction and corrections
  from the author.
- Wrote the slide specification in `presentation/source/POWERPOINT-BRIEF.md` and
  the original SVG figure sources in `presentation/source/assets/`. A second
  agent session built the `.pptx` from that specification.
- Built the demo harness in `demo/` and rebuilt it three times as earlier designs
  were rejected.
- Performed the rehearsal runs described below.

## What the author did

- Chose the topic, the argument, and what the talk claims.
- Rejected the first deck as too dense, and rejected three demo designs in turn —
  the last of them for supplying the agent with a feature list that a real
  project would have to produce for itself.
- Decided that the demo should show the method rather than stage a comparison.
- Approved the parody framing and the constraint to use no official marks.
- Delivers the talk and reports the live results.

## Where the agent was wrong, and what it cost

These are recorded because the failure modes are the subject of the tutorial.

- **The first deck was built on a false constraint.** The pipeline rendered one
  slide per `##` heading, producing 16 near-identical text slides for a
  five-minute slot. The agent treated "it builds" as "it works" and did not
  question whether the output suited the format until the author said so.
- **A fairness check never worked.** A setup script in the discarded two-run demo hashed absolute
  file paths, so the two "identical starter" hashes could not match even when the
  folders were identical. It was written, syntax-checked, and never run until
  rehearsal. This is exactly the completion failure the tutorial names.
- **A reset destroyed work.** The same script deleted the previous run instead of
  archiving it, and the agent ran it during rehearsal without saving the two
  pages that had just been produced. They were unrecoverable. The script now
  archives.
- **The first verifier passed everything.** It clicked the first button on the
  page, which was a hero link rather than the form's submit, so a check named
  "interaction changes visible page state" never tested the interaction. It
  reported nine of nine passing on both runs.
- **The replacement verifier passed a visibly broken page.** During the second
  rehearsal `check.mjs` reported 14 of 14 while every club-card icon rendered as
  an empty box: they were emoji characters, and no emoji font exists in this
  environment. Nothing in the check set looked at glyphs. The agent found it by
  opening its own screenshot and looking, then replaced the icons with inline
  SVG. A passing check set is evidence about the things it checks and nothing
  else — which is the argument this tutorial makes, arriving uninvited.
- **A plan was almost filled in before the work was done.** The plan-first agent
  drafted `PLAN.md` with a pre-filled table of passing results before running
  anything, caught it, and replaced it with real output. Had it not, the recorded
  evidence would have been fiction in exactly the shape the rubric rewards.
- **Two demo designs were built, rehearsed, and thrown away.** The first planted
  a defect in a dashboard, which taught the defect rather than the method. The
  second raced a vague prompt against a specific one; both produced working pages
  and the difference was not measurable, because the specification given to both
  *was* the decomposition. Neither design ever showed a unit, a check, or a plan
  being worked — which is the subject of the tutorial.

## Rehearsal record

The demo was rehearsed repeatedly. The final design was run end to end before
the talk: ten units, ten checks written before any code, all ten ticked with
real command output recorded as evidence. That run is kept at
`demo/example-run/` and is the worked example cited in the tutorial.

Live results are reported as observed. If a check fails on stage, or a unit is
built that the room disagrees with, that is said plainly.
