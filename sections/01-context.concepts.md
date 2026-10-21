# Context — concepts

## Claims

- The handoff sentence determines the session; it is the highest-leverage thing
  the operator writes.
- A one-line goal is underspecified, not small. The two are routinely confused.
- A unit of work is defined by behavior + check, not by size.
- Checkability is the primitive. Size is downstream of it.

## Decisions

- Open cold on the handoff problem. Earlier drafts opened by placing the topic
  after the cohort's prior tutorials (ReAct, hardware, MCP); cut, because the
  audience does not need the map and the talk is only ten minutes.
- Define before motivating (WHAT before WHY). A reader cannot judge the argument
  for decomposition without a picture of what a unit is.
- The date-filter example is introduced here in one line and carried all the way
  to the demo, so the audience meets it once and sees it three times.
- No statistics anywhere in the tutorial. The failure modes are presented as
  things the audience has already lived, because they have.

## Open questions

- Is "a one-line goal is not a small task, it is an underspecified one" strong
  enough to open on, or does it need the failure modes first to land?
- "Behavior + check" vs. naming it a triple with state. State is real but the
  third element is hard to justify in ten minutes.

## Not doing

- Classical planning (STRIPS, PDDL, HTN). Adjacent, and about machine search
  rather than human handoff.
- Any history of the idea. No room, and it does not help the capability.
