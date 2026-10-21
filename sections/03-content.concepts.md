# Content — concepts

## Claims

- One question — "what would I run to see this worked?" — is sufficient to test
  whether a unit is ready to hand over.
- The question's failure cases are diagnostic: no answer means too vague, five
  answers mean too broad.
- Edges / a check / written down are the three properties, and they correspond
  one-to-one with the three failure families in `02-motivation`.
- Plan mode relocates decomposition work from authoring to reviewing. It does not
  remove it, and reviewing requires the same judgment as authoring.
- A plausible-looking wrong plan is more dangerous than no plan.
- Decomposition has a real cost and a real threshold below which it loses.

## Decisions

- Plan mode is presented as what the audience already uses, not as a
  recommendation. Author's instruction. It is ambient, so advising it would be
  both redundant and faintly condescending.
- "Launders a vague ask" is the sharpest phrase in the tutorial and is load
  bearing — it names why generated plans are risky without claiming they are bad.
- The worked example is the live demo. Introduced once in `01-context`, specified
  here, executed on stage. The audience should never need it explained twice.
- The tiles/chart split is a genuine structural property of the demo app:
  `summarize()` and `renderChart()` each consume `records` independently. It was
  not contrived to fail. Say so if asked.
- `## What it costs` exists to pre-empt the obvious objection, and is the
  designated cut if the rehearsal runs long — it is the least load-bearing of the
  four units here.

## Open questions

- Does the three-property table earn its place on a slide, or is it the kind of
  thing that reads well on the page and scans as dense when projected? Decide
  against the rendered deck, not in the source.
- Is a human observation a legitimate check, or does a check have to be
  executable? The tutorial currently allows both ("run, or look at"). Defensible,
  but a reviewer may push, and the honest answer is that an observation you
  actually perform beats an automated check you never run.
- Four `##` units in this section may be one too many for the time budget.

## Not doing

- Prescribing a file format for writing units down. Formats are a distraction at
  this length and every team's will differ.
- Prompt engineering within a unit. That is wording inside a boundary; this is
  about where the boundary goes.
- Multi-agent orchestration and graph-shaped workflows. The natural sequel, and
  far too large for the remaining minutes.
