# Portfolio Rebuild — Faith Catherine Otieno
## faithkatherine.github.io/Portfolio

---

## The brief in one sentence
Transform this from a resume someone skims into a technical portfolio
someone *reads* — then emails.

---

## Who is viewing this

Two audiences, same page:

**Recruiter (30 seconds):** Opening on their phone, scrolling fast.
They need to feel: *"This person builds real things, not toy projects."*
One clear product. One clear stack. One clear way to reach her.

**Technical hiring manager (5 minutes):** Will click into Pursuit.
They need to feel: *"She made real engineering decisions and can explain why."*
Not just a list of technologies — a person who thinks about tradeoffs.

Design and copy for both. Neither should feel like a compromise.

---

## Voice / tone
Write all copy in first person, present tense, confident but not
boastful. Not "Skilled in React Native" — more like:

> "I build full-stack mobile products end to end. Right now that means
> Pursuit — a hyperlocal event discovery app for Nairobi that I've
> taken from schema design to shipped UI, solo."

Short sentences. No jargon stacking. If you have to list a technology,
earn it with one reason it mattered.

---

## Tech constraints
- Static site, GitHub Pages deployment — do not break this
- Keep existing stack (no new dependencies unless essential)
- Mobile responsive is mandatory — not optional polish
- Performance: no heavy animations, no large asset loads
- All interactive elements must work without JavaScript where possible

---

## Page structure

### Hero section
One screen, no scroll needed.

```
Faith Catherine Otieno
Full-Stack Engineer · React Native · Django · TypeScript

I build mobile-first products end to end.
Currently: Pursuit — a hyperlocal event discovery app for Nairobi.

[Download CV]  [See Pursuit]  [GitHub]
```

The three CTAs are the only navigation the recruiter needs.
"See Pursuit" should be the most visually prominent.

---

### Pursuit — the product section
This is the core of the portfolio. Everything else supports this.
Write it like a product case study, not a project description.

**Structure:**

**1. What it is (2–3 sentences max)**
> Pursuit is a hyperlocal event discovery app for Nairobi, Kenya.
> Editorial curation over an events database — think TimeOut, but
> actually maintained. Built solo from schema to shipped UI under
> Pursuit HQ, my registered sole proprietorship.

**2. The stack (pill tags, not prose)**
React Native · TypeScript · Expo Router · Apollo Client
Django 5 · Graphene-Django · GraphQL
PostgreSQL 17 · Redis · Celery · Docker · Render IaC

**3. Try it (two links)**
- Expo staging build: [INSERT_EXPO_URL]
- Web version: [INSERT_VERCEL_URL]

**4. How it's built — architecture decisions**
This section must earn its place. Don't describe the stack again.
Explain four decisions and *why they were the right call*:

**Single aggregate GraphQL query for the home screen**
> The home screen has five data sources: editor's picks, trending,
> upcoming, categories, and personalised feed. On a mobile connection
> in Nairobi — often 3G — five network round trips is a broken product.
> One `getHome` query returns everything. Cold load under 800ms.

**Redis cache-aside with user-scoped keys**
> Home screen data is expensive to compute but changes slowly.
> User-scoped Redis keys mean the cache warms on first load and
> stays fast on return. TTL is tuned to event recency, not a
> generic 5-minute timeout.

**Location as a string tag, not a City FK**
> Nairobi events don't map cleanly to administrative boundaries.
> "Westlands" is a neighbourhood, a nightlife zone, and a
> commercial district — none of which match any official geodata.
> A `location_tag` string let me ship faster and gave curators
> flexibility that a City model never would.

**EditorsPick as a separate model with a required curator_note**
> The "Editor's Pick" badge needs to mean something. A boolean flag
> on an Event model is meaningless — a second model with a required
> `curator_note` field forces accountability. The badge can't be set
> accidentally. Editorial integrity is enforced at the schema level.

**5. Screen showcase**
Four screenshots with captions explaining *design decisions*, not
just what the screen does:

- Home screen: "The Editor's Pick hero anchors the home screen.
  Everything below — Made for Your Week, Trending Now — earns its
  position through the same editorial layer, not an algorithm."

- Event detail: "Category colour derives from event type. A concert
  card should feel like night. A workshop card should feel like
  daylight. The stat strip (date, price, attendance) is always in
  the same position — users learn to scan without thinking."

- Category grid: "Eight card treatments, each mapped to an event
  type. The visual system communicates category before the user
  reads the label."

- Onboarding: "Location and interest selection happen before sign-up.
  Pursuit earns permission by showing value first."

Screenshots live in the repo or will be provided. Place them with
generous whitespace — not in a cramped grid.

---

### Experience (condensed, not a CV)

**Walking on Earth (WONE) · 2023–2025**
> UK digital health platform. Feature lead on the mobile team —
> owned the mindfulness session module end to end, from product
> spec to React Native delivery. Worked in a distributed team
> across Nairobi and London.

**Pursuit HQ · 2024–present**
> Sole proprietorship. Building Pursuit.

**Reaction Power · 2023**
> Python recommendation engine. GA4 and Looker Studio analytics.

**Nifty Works via Andela · 2022–2023**
> Full-stack development on client products.

No bullet points. Two sentences max per role. Link to Pursuit HQ
GitHub if relevant.

---

### What I'm building toward

Four items, each one sentence:

- React Native Web — building Pursuit's web layer with shared code
- AI-integrated development — Claude Code and Copilot as structured
  workflow tools, not autocomplete
- System design for mobile-first, low-bandwidth conditions
- AWS AI & ML Scholars program, currently in progress

This section should feel like forward momentum, not a skills list.

---

### Contact

```
faithcathy12@gmail.com
github.com/faithkatherine
linkedin.com/in/faith-catherine-otieno-92b708199
```

One clean block. No form. No CTA copy. Just the links.

---

## Design direction

**Aesthetic target:** Editorial and technical. Think a well-designed
developer blog, not a Dribbble portfolio. The Pursuit screenshots
are the visual anchor — let them breathe.

**Typography:** One display typeface for headings (something with
character — not Inter, not Roboto). One mono or clean sans for body
and code references.

**Color:** Two or three maximum. Use the dark purple from the existing
Pursuit header card (`#1a1333` or similar) as an accent. Neutrals
for everything else. No gradients.

**Spacing:** Generous. Sections need room to separate. No cramped grids.

**Mobile:** Test at 390px width. Every section should work as a single
column. The Pursuit screenshots can stack vertically — that's fine.

**What to avoid:**
- No animations that delay content appearing
- No full-screen "loading" states
- No hero images that aren't the product screenshots
- No "I'm a passionate developer who loves solving problems" copy
- No skills percentage bars
- No timeline charts

---

## Checkpoint protocol
After completing each section, write a summary line to
`PORTFOLIO_CHECKPOINT.md`:

```
DONE: Hero section — name, title, three CTAs
DONE: Pursuit — what it is, stack, try it links
DONE: Pursuit — four architecture decisions
DONE: Pursuit — screen showcase with captions
DONE: Experience section
DONE: What I'm building toward
DONE: Contact
```

If context resets, read `PORTFOLIO_CHECKPOINT.md` and resume from
the first incomplete section.

---

## The test

When done, load the page on a phone.

Can a recruiter read the hero and know in 10 seconds what Faith
builds and how to reach her?

Can a technical hiring manager open the Pursuit section and understand
one real engineering decision she made?

If both answers are yes, the rebuild is done.
