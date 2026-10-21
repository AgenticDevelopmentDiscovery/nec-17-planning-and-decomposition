# Motivation

## Three families of failure

**Boundary** — it did the wrong *amount* of work.

- Touched a dozen files you never mentioned
- Started three things and finished none of them

**Completion** — it does not know when it is *done*.

- "Done!" with nothing run
- Patched the failing assertion instead of the bug

**Continuity** — it lost the *thread*.

- Context filled; the next session redid finished work
- Built something that was never what you meant, discovered at the end

## Why a better model does not fix them

Every one of these is the agent supplying something you left out.

- No edges, so it chose its own.
- No definition of done, so it used its own — which is *the code looks finished*.
- No written record, so it reconstructed from context, and context ran out.

A stronger model does all three faster, and more convincingly. Capability is not
the missing input here. Specification is.
