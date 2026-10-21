# Motivation — concepts

## Claims

- The familiar agent failures sort into exactly three families: boundary,
  completion, continuity.
- Each family is the agent substituting a default for something the operator did
  not specify.
- The agent's implicit definition of done is "the code looks finished."
- These failures do not diminish as the model improves; they are specification
  failures, not capability failures. This is the load-bearing claim of the talk.

## Decisions

- Three families, not a flat list of symptoms. An earlier draft had four
  unstructured failure modes; the author judged it incomplete and it was. The
  families are a real taxonomy and each maps onto one property in `03-content`,
  which is what makes the structure teach rather than enumerate.
- Three instances per family, chosen for recognisability over completeness. The
  audience should be nodding, not learning.
- No measured error rates, no cited studies. The audience has no context for
  numbers from outside this course, and borrowed statistics would invite
  questions about provenance that the talk cannot answer.
- "A stronger model does all three faster, and more convincingly" — *more
  convincingly* is deliberate and should not be cut. A better model's wrong
  output is harder to catch, not easier.

## Open questions

- Are the three families genuinely peers, or is continuity partly a consequence
  of boundary failure? A session that sprawls exhausts context sooner. Worth
  conceding if asked rather than defended.
- Nine instances may be too many to absorb at this pace. Cutting to two per
  family is the obvious trim if the rehearsal runs long.

## Not doing

- Attributing failures to specific model versions or vendors.
- Claiming the taxonomy is exhaustive. It covers what this audience has seen.
