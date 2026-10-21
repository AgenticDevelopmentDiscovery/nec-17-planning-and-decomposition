# Conclusion

## What you can do with this

- Take a one-line goal and rewrite it as units, each with a behavior and a check.
- Apply the test — *what would I run?* — and treat your inability to answer as
  the finding, rather than as a reason to start anyway.
- Name which family a failure belongs to, and the missing property behind it.
- Read a generated plan as a proposal to be reviewed, not an answer to be run.
- Recognise the cases where the overhead is not worth paying.

## What is still open

Three things this tutorial does not settle.

- **Where the boundary sits.** Too broad to verify and too narrow to be worth
  tracking are both real, and the line between them is judgment rather than rule.
- **What counts as a check.** An observation you actually make may beat an
  automated test you never run, which is uncomfortable but probably true.
- **Whether this survives scale.** Everything here assumes one agent and one
  person reviewing. Parallel agents change the economics, and that is the next
  topic rather than this one.
