# Context

## The handoff problem

An agent session begins with a sentence you write. Everything that follows — what
it reads, what it edits, when it decides to stop — descends from that sentence.

Most of the attention in this space goes to making agents more capable. This
tutorial is about the other side of the handoff: the shape of the work we give
them. A capable agent handed a badly-shaped task fails in ways that look like the
agent's fault and are not.

A one-line goal is not a small task. It is an underspecified one.

## What decomposition actually is

Rewriting a goal into units an agent can finish and you can check.

A unit carries two things:

- **a behavior** — what is true once it is done
- **a check** — the command, test, or observation that proves it

"Add a date range filter" is a goal. "Selecting *Last 30 days* updates the three
summary tiles to totals for that window" is a unit.

The difference is not length, and it is not difficulty. It is whether anything in
the world could tell you it worked.
