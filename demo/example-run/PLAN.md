## What you asked for
A polished, A&M-maroon, single-page site for the (fictional) Aggie Dog Walking
Society that tells newcomers everything they need, and lets them join — with or
without a dog — through a form they can review and fix before it is saved in the
browser.

## Open questions
- **Which emails count as "A&M email"?** Decided: anything ending in `@tamu.edu`
  or `@email.tamu.edu`, case-insensitive. Everything else is rejected.
- **Class year format.** Decided: a dropdown of Freshman / Sophomore / Junior /
  Senior / Graduate student. No free text.
- **Dog age.** Default: whole years, 0–25, as a number field.
- **Dog sex.** Default: Female / Male only. I am *not* asking spayed/neutered —
  you didn't list it. Say so if walk leaders need it.
- **Dog size.** Default: Small (under 25 lb) / Medium (25–50) / Large (50–90) /
  Extra large (90+).
- **"Good around other dogs."** Default: Yes / Sometimes — needs space / No /
  Not sure yet.
- **One dog per member.** Default: one. A second dog is out of scope (below).
- **Same email twice.** Default: no de-duplication; both signups are kept.
- **Where the "it's fictional" notice goes.** Default: a slim banner at the very
  top, visible on load, repeated in the footer.
- **"Polished, with some life to it."** Default: hover/scroll-in motion, an
  illustrated hero, rounded cards. No check can judge taste — that part is your
  eye at review, not a unit.
- **Storage key.** Default: `localStorage["adws.members"]`, a JSON array of
  `{ name, email, classYear, dog, joinedAt }`, where `dog` is `null` or
  `{ name, breed, sex, age, size, goodWithDogs, notes }`.

## Out of scope
- Any backend, email confirmation, or sending data anywhere.
- An admin/officer view of who has signed up.
- Real photos, external fonts, CDNs, or any network request — the page is one
  self-contained `index.html`.
- Accounts, logins, editing a signup after it is confirmed.
- More than one dog per member.
- Anything sensitive: no UIN, phone, address, birthday, password, or payment.
- Multiple pages. It is one page with in-page navigation.

## Units
Everything lives in one file, `index.html`. Field labels and button text below
are the contract the checks rely on.

- [x] U1 — The page opens with no errors and no network requests; shows an `h1`
      "Aggie Dog Walking Society", a placeholder logo image (accessible name
      containing "logo"), and a "fictional club" notice visible on load.
      check: node checks/u1.mjs
      evidence:
      ```
      $ node checks/u1.mjs
      U1 pass
      (exit 0)
      ```
- [x] U2 — The homepage has real sections, each reachable from the nav:
      "Who we are"; "What we do" (weekly walks, shelter walks, potlucks);
      "When & where" (a weekday, a time, College Station); "Your first walk"
      (what to bring/wear); "Find us" (parking/bus/map); and "Common questions".
      Each has substantive text, and its nav link scrolls it into view.
      check: node checks/u2.mjs
      evidence:
      ```
      $ node checks/u2.mjs
      U2 pass
      (exit 0)
      ```
- [x] U3 — "Common questions" has at least 5 questions, one of them about joining
      without a dog. Each answer is hidden until its question is clicked.
      check: node checks/u3.mjs
      evidence:
      ```
      $ node checks/u3.mjs
      U3 pass
      (exit 0)
      ```
- [x] U4 — Visual interest and theme: at least 3 illustrated "photo" panels
      (besides the logo), each a labelled image of real size; Aggie maroon
      (`#500000`) used as a solid fill on a large surface.
      check: node checks/u4.mjs
      evidence:
      ```
      $ node checks/u4.mjs
      U4 pass
      (exit 0)
      ```
- [x] U5 — Works at phone width: at 375 px wide there is no horizontal scroll
      and every form control fits on screen.
      check: node checks/u5.mjs
      evidence:
      ```
      $ node checks/u5.mjs
      U5 pass
      (exit 0)
      ```
- [x] U6 — The join form asks "Your name", "A&M email", "Class year", and offers
      two choices, "I have a dog" / "No dog". Dog fields — "Dog's name", "Breed",
      "Sex", "Age (years)", "Size", "Good with other dogs?", "Anything a walk
      leader should know?" — appear only when "I have a dog" is chosen.
      check: node checks/u6.mjs
      evidence:
      ```
      $ node checks/u6.mjs
      U6 pass
      (exit 0)
      ```
- [x] U7 — Validation: "Review my info" refuses to advance while required fields
      are missing or wrong, marks each bad field and shows its message next to
      it; non-A&M email says so; dog fields are required only with a dog; a
      negative age is rejected. Valid input (with or without a dog) advances.
      check: node checks/u7.mjs
      evidence:
      ```
      $ node checks/u7.mjs
      U7 pass
      (exit 0)
      ```
- [x] U8 — Review step: valid input shows a "Review your info" summary of every
      entered value in place of the form, with nothing saved yet. "Edit" brings
      the form back with values intact; changes show on the next review.
      check: node checks/u8.mjs
      evidence:
      ```
      $ node checks/u8.mjs
      U8 pass
      (exit 0)
      ```
- [x] U9 — Confirm & persist: "Confirm & join" saves the member to
      `localStorage["adws.members"]` and shows a welcome naming them. Signups
      survive reload and accumulate. A member who picked a dog then switched to
      "No dog" is saved with `dog: null`.
      check: node checks/u9.mjs
      evidence:
      ```
      $ node checks/u9.mjs
      U9 pass
      (exit 0)
      ```
- [x] U10 — Nothing sensitive: the form has only the listed fields (`name`,
      `email`, `classYear`, `hasDog`, `dogName`, `dogBreed`, `dogSex`, `dogAge`,
      `dogSize`, `dogGoodWithDogs`, `dogNotes`), no
      password/phone/date/file inputs, and a saved record holds only the listed keys.
      check: node checks/u10.mjs
      evidence:
      ```
      $ node checks/u10.mjs
      U10 pass
      (exit 0)
      ```
