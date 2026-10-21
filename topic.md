# Topic

## In one sentence

Planning and task decomposition is the practice of breaking a goal into units of
work an agent can finish and you can check, so that "done" is something a command
proves rather than something the agent asserts.

## What it is

Task decomposition is the step between having a capable agent and getting useful
work out of it. You take a goal stated the way a person would state it — "add
authentication," "clean up the data pipeline" — and rewrite it as an ordered set
of smaller units, each one carrying a description of the behavior it delivers and
a specific way to confirm that behavior exists. The units are worked one at a
time. A unit is finished when its check passes, not when the agent reports that it
is finished.

The decisive property is not size. It is checkability. Cutting a task into five
vague pieces produces five vague pieces. A unit is decomposed correctly when you
can name the command, test, or observation that would tell you it works — and that
constraint is what forces the pieces to be small, specific, and independent, as a
consequence rather than as a goal.

## Why it belongs in this course

The three tutorials before this one built up a capable agent: the ReAct loop gave
it a way to reason and act in turns, the hardware discussion gave it somewhere to
run, and MCP gave it tools to reach real systems. Each of those raises what the
agent *can* do.

This topic is about the first problem in that sequence that does not improve when
the agent gets better. Hand a fully-equipped Claude Code session a one-line goal
and it will sprawl across files you did not ask it to touch, announce completion
without running anything, lose the thread when context fills, and leave several
things half-built. A stronger model does all of that faster. The failure is in the
shape of the work handed over, not in the agent — which is why it belongs after
the capability topics and before anything that builds a larger system on top.

## What the reader will be able to do

- Rewrite a one-line goal as units of work, each with a stated behavior and a
  named way to verify it.
- Apply the checkability test to a proposed unit, and recognize when a unit is
  too broad to verify or too narrow to be worth tracking separately.
- Identify which of the four common agent failures they are looking at — sprawl,
  premature completion, lost context, or half-finished work — and name the
  decomposition weakness behind it.
- Decide when decomposition overhead is not worth paying.

## Scope

**In scope**

- The checkability test, and what it rejects.
- The four recognizable failure modes, framed from the audience's own Claude Code
  experience rather than from reported statistics.
- One worked example carried end to end: a single goal handed over twice, direct
  and plan-first, with the verification step run live on both results.
- The honest cost: what decomposition takes from you up front.

**Out of scope**

- Classical AI planning (STRIPS, PDDL, hierarchical task networks) — a real and
  adjacent field, but it answers how a *machine* searches for a plan, where this
  tutorial is about how a *person* hands work over.
- Multi-agent orchestration and graph-shaped workflows — the natural next topic,
  and too large to share a ten-minute slot with this one.
- Prompt engineering for individual steps — concerns the wording inside a unit,
  not the boundary between units.
- Benchmark numbers for any of the claims. The failure modes are presented as
  things the audience has already seen, because they have.

## Shape

- Ten minutes total: roughly five of talk, five of demo.
- `01-context` places the topic after ReAct, hardware, and MCP, and defines it.
- `02-motivation` carries the four failures and the single diagnosis behind them.
  This is the part the audience should recognize from their own sessions.
- `03-content` holds the checkability test, the worked example, and the cost.
- `04-conclusion` states what the reader can now do and what is left open.
- The demo is the worked example from `03-content`, run for real: **two live
  Claude Code sessions**, given the same audience-chosen marketing brief, one told
  to build directly and one told to plan first. Both results are inspected against
  the same observable requirements in front of the room.

## Settled since the proposal

- **The demo is one live session, not a comparison.** Two earlier designs were
  built and rejected. A dashboard with a planted defect taught the defect rather
  than the method. A vague-versus-specific race produced two working pages and no
  measurable difference, because the specification handed to both *was* the
  decomposition — the work had already been done by a person before either
  session started. Nothing in either design showed a unit, a check, or a plan
  being worked through, which is the topic.
- **What the demo shows now:** a request, a harness that says plan first, and a
  session that writes the decomposition and its checks before building anything,
  stops for review, then works the list one unit at a time with real check output
  recorded under each ticked box.
- **The example is a fictional student club page.** Chosen because the audience
  can judge the result without reading code, and because the signup form carries
  a real conditional — members without a dog must still be able to join.
- **The deck is nine designed slides**, authored in PowerPoint from
  `presentation/source/POWERPOINT-BRIEF.md`, not generated one slide per heading.

## Open questions

- Whether the three failure families are the right three, or whether continuity is
  a consequence of the other two rather than a peer.
- How much of the method survives a real codebase. The demo builds one file from
  nothing, which is the case where boundary and continuity failures cannot occur.
- Whether a session that writes its own checks will reliably write honest ones,
  or whether the review step has to catch a weak check sooner or later.
