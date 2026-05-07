# Handoff: Elm Standard — Site Update

## Overview

This package documents an update to the **Elm Standard** marketing site (custom radiator covers, Milton MA). The update covers:

1. **Light copy refinements** to five existing pages (Home, How it works, Styles, About, Get a quote).
2. **Four new pages** — Measure your radiator, Worksheets, Tip safety, FAQ.
3. **A footer update** — a new "Resources" column linking to the four new pages.

The existing design system, palette, typography, and component patterns stay exactly as they are. This is a content + new-page expansion, not a redesign.

## About the Design Files

The files in `prototypes/` are **design references created in HTML/JSX** — interactive prototypes showing intended look and behavior. They are not production code to copy verbatim.

The task is to **recreate these designs in your target codebase's existing environment** (React, Next.js, Astro, Vue, etc.), using its established conventions, component primitives, and design tokens. If no codebase exists yet, pick the most appropriate framework for a content marketing site (Next.js or Astro are both strong choices) and implement the designs there.

The CSS variables in `tokens/colors_and_type.css` are the canonical source of truth for colors, type scale, spacing, radii, and shadows. They should be ported into your codebase as design tokens (CSS custom properties, Tailwind config, or your token system of choice).

## Fidelity

**High-fidelity.** The prototypes use exact final colors, typography, spacing, and component patterns. Recreate the UI pixel-perfectly, but **do** swap in your codebase's existing primitives (Button, Field, Section, etc.) where they already match the prototype's behavior.

## Routes & Navigation

| Route key   | Path (suggested) | Page                | In top nav? |
|-------------|------------------|---------------------|-------------|
| `home`      | `/`              | Home                | Yes         |
| `how`       | `/how-it-works`  | How it works        | Yes         |
| `styles`    | `/styles`        | Styles              | Yes         |
| `about`     | `/about`         | About               | Yes         |
| `quote`     | `/quote`         | Get a quote         | Yes (CTA)   |
| `measure`   | `/measure`       | Measure your radiator | **No**    |
| `worksheets`| `/worksheets`    | Worksheets          | **No**      |
| `safety`    | `/safety`        | Tip safety          | **No**      |
| `faq`       | `/faq`           | FAQ                 | **No**      |

The four new pages are reachable via the **footer Resources column** and **contextual links** (HowItWorks step 01 → Measure; Quote helper text → Measure; Measure CTA strip → Worksheets; Worksheets and Safety CTA strips → Quote).

---

## Existing pages — copy refinements

Apply these edits to the corresponding existing pages. Page structure and layout do **not** change.

### Home
No copy change in current copy deck delivery — keep as-is.

### How it works (`HowItWorks.jsx`)
- **Step 01 body** appends a contextual link below the body paragraph: *"If you'd rather measure yourself, there's a 90-second video and a printable worksheet here →"* — links to `/measure`. Render as oxide-colored, 14px sans, 1px oxide bottom border, self-aligned to flex-start.
- **Step 02 body** appends: *"50% deposit holds your spot in the build queue."*
- **Step 04 body** changes to a two-line block (use `white-space: pre-line`):
  > Local: I deliver, level, and anchor it to the wall. About an hour on site.
  > Flat-pack: panels ship pre-cut and pre-primed with hardware and a one-page assembly guide. About 30 minutes to assemble with a screwdriver.

The existing `120px 1fr 1fr` grid stays. The body cell becomes `flex-direction: column; gap: 12px` so the body paragraph + link sit stacked.

### Styles
No copy change.

### Get a quote (`Quote.jsx`)
- **Section 02 helper text** becomes: *"Rough is fine — I'll measure the final dimensions in person if you're local."* followed by an inline oxide link *"Need help measuring? Watch the 90-second guide →"* (`/measure`).
- **Section 03 style chips** add a fourth option: **"Not sure yet"**. Grid changes from `repeat(3, 1fr)` to `repeat(4, 1fr)`. Same chip styling (1.5px ink border, ink-fill on active, paper text on active).
- **New Section 05 — "Anything else?"**, optional textarea:
  - Helper text: *"Pipes in odd places, window recess, tile floor, custom paint color — anything I should know."*
  - 4-row textarea, full width, `1px solid var(--hairline)`, `var(--bone)` background, 12px padding, vertical resize, `var(--font-sans)`, 15px, ink color, 2px radius.
  - Form state key: `notes`.

### About
No copy change.

---

## New pages — detailed specs

All four new pages share the existing site's layout language:
- 1180px max content width, 32px gutter.
- Hero: `padding: 96px 0 48px`. Eyebrow (`.overline`, 11px caps, ink-3) → 1.5px × 64px ink rule (`.rule-strong`) → 56px serif H1 with -0.02em tracking, 1.05 line-height, `var(--font-serif)`.
- Section bands alternate between `--bone` (page ground) and `--paper` / `--linen` / `--canvas` (hairline-bordered top/bottom).
- One oxide CTA per view, max.

### 1. Measure your radiator (`/measure`)

Six sections, top to bottom:

1. **Hero**
   - Eyebrow: `MEASURING GUIDE`
   - H1: *"Five measurements. Ten minutes. The cover only fits if these are right."* — max-width 820px.

2. **Intro + supplies — two-column** (`1.1fr 1fr`, 64px gap)
   - Left: prose paragraphs (20px serif lede, 18px serif body, ink-2, line-height 1.6).
   - Right: `paper` aside, 1px hairline border, 28px padding. Eyebrow "WHAT YOU'LL NEED" + 28px ink rule + ordered list with mono `0N` numerals (oxide) and 16px serif text. The third item ("The printable worksheet") includes an inline oxide "download PDF →" link to `/worksheets`.

3. **Video — 16:9 placeholder** (`paper` band)
   - Eyebrow: `WATCH THE VIDEO`
   - H2: *"Ninety seconds. Five measurements. One radiator."*
   - 16:9 aspect, `bone` ground, 1px hairline border, soft 2-shadow.
   - SVG decoration: dotted mesh-pattern fill (1.1px ink dots at 14px grid, 10% opacity), inner 48px-inset hairline frame, four corner ticks (12px crosses), top dimension line + label `90 SEC · ROB IN THE SHOP` in mono 14px ink-3.
   - Centered play button: 88px circle, 1.5px ink border, paper fill, oxide right-pointing triangle inside. Hover swaps fill `paper → linen`.
   - Below button: mono 12px ink-3 label `MEASURING GUIDE · 01:30`.
   - Below frame: mono 12px ink-3 caption row (`Rob, in the shop · 16:9` left, `00:00 / 01:30` right) on a 1px hairline rule.

4. **The five measurements** — same row pattern as `HowItWorks` but with a fourth column for a mono spec callout.
   - Grid: `120px 1fr 1fr 180px`, 48px gap, 36px vertical padding, hairline rules between rows.
   - Per row: STEP NN (mono oxide) · 32px serif title · 17px serif body (ink-2) · right-aligned mono 12px spec (e.g. `A → B · ¼" up`).
   - Steps + specs:
     - **01 Length** — `A → B · ¼" up`
     - **02 Depth** — `wall → front`
     - **03 Height** — `floor → top`
     - **04 Distance to baseboard** — `rad → baseboard`
     - **05 Side clearance** — `≥ ¾" each side`
   - Bodies are verbatim from copy deck.

5. **Pipes, valves, complications** (`linen` band)
   - Two-column: `1fr 1.4fr`, 64px gap, sticky-top left column.
   - Left: eyebrow "PIPES, VALVES, COMPLICATIONS" + rule-strong + 36px serif H2: *"Most radiators have at least one. None of them are dealbreakers — I just need to know about them."*
   - Right: `bone` card with 1px hairline border. Five rows (`32px 1fr` grid, 20×24 padding, hairline dividers): mono `0N` oxide, then 15px sans-medium title + 16px serif body. Items per copy deck (Side pipes, Front valve, Window recess, Baseboard heat, Tile/uneven floor).
   - Footer of the card: `paper` background, 1.5px ink top border, "WHEN IN DOUBT" oxide eyebrow + serif body about photographing from three angles.

6. **When in doubt, ask** — single-column 720px section: eyebrow, rule-strong, 36px serif H2, 18px serif body, `hello@elmstandard.co` in mono 16px.

7. **CTA strip** (`canvas` band) — H2 left ("Print, measure, and send.") + 17px serif support, two buttons right (`btn-outline` "Print the worksheet (PDF) →" → `/worksheets`, `btn-primary` "Get a quote" → `/quote`).

### 2. Worksheets (`/worksheets`)

Three sections:

1. **Hero** — `PRINTABLES` eyebrow, *"Print, measure, send."* H1, 20px serif lede.

2. **Three worksheet cards** — `repeat(3, 1fr)` grid, 24px gap.
   - Card: `paper` background, 1px hairline border, 24px padding, 18px gap, sh-1 shadow → sh-2 on hover.
   - Top: SVG **worksheet thumbnail** at 8.5/11 aspect, `bone` background, 1px hairline. Each is an architectural shop-drawing mockup of the actual sheet:
     - **01 Standard radiator**: front elevation of a radiator with 8 fins, floor line, two baseboard segments, oxide dimension lines for ① L (top), ② D (small bottom-left), ③ H (right), ④ baseboard distance, ⑤ side clearance (rotated). Sheet header: mono `ELM STANDARD · WORKSHEET 01` left, `8.5 × 11` right, 1px ink rule. Title `Standard radiator` in 14px Petrona, subtitle `FIVE-MEASUREMENT WORKSHEET` in 7px mono.
     - **02 Pipes and valves**: radiator + side pipe right, side pipe left (terminating in 4px circles), front valve (16×20 rect with stem), three oxide dim lines (RAD L, PIPE → PIPE, PIPE H).
     - **03 Window recess + baseboard**: wall path forming a recess, radiator inside, baseboard heat unit (30×10 with 5px tick fins), three oxide dim lines (RECESS W, BB HEAT, RECESS H).
     - All three end with footer hairline + six form-field rows (LENGTH, DEPTH, HEIGHT, ZIP, STYLE, DATE) — mono 7px caps labels above 90px ink rules.
   - Below thumbnail: `WORKSHEET NN` mono oxide, 26px serif title, 16px serif body. Then 1px hairline. Footer row: mono 11px spec line `1 page · 8.5 × 11 · pencil-fillable` left, `btn-text` "Download PDF →" right.

3. **Don't want to print?** (`paper` band) — two-column. Left: eyebrow + rule-strong + 36px serif H2 *"Email me your measurements and a few photos."* + 17px serif support. Right: `bone` card with `Reach me` eyebrow, mono 18px `hello@elmstandard.co`, two buttons (`btn-outline` "Read the guide" → `/measure`, `btn-primary` "Get a quote" → `/quote`).

### 3. Tip safety (`/safety`)

Six sections:

1. **Hero** — `SAFETY`, *"Anchored to the wall. Stable on the floor."*, 20px serif lede.

2. **What's included** — eyebrow + rule-strong + 36px H2 *"Two channels. Same hardware story."* Then `1fr 1fr` grid of two channel cards (`paper` background, 1px hairline, 28px padding):
   - Mono 11px oxide spec (`LOCAL INSTALL` / `FLAT-PACK`) → 26px serif title → 1px hairline → 16px serif body. Bodies verbatim from copy deck.

3. **CPSC pull-quote** (`paper` band, 96px padding) — eyebrow `FROM THE CPSC` + rule-strong. Then a `<figure>` with 1.5px ink left border, 32px left padding:
   - 36px serif blockquote (line-height 1.25, -0.02em tracking) with **"24 minutes"** colored oxide.
   - Mono 12px caps figcaption: `U.S. CONSUMER PRODUCT SAFETY COMMISSION` (24px above-margin from quote).
   - Below figure (48px gap): 18px serif intro line + 4-item bulleted list (`40px 1fr` grid, 16px vertical padding, hairline rules, mono `0N` oxide numerals + 18px serif text). Items verbatim from copy deck.

4. **When to call me** — two-column `1fr 1.2fr`. Left: eyebrow + rule-strong + 36px serif H2 *"I'd rather talk through it than have you install something that won't hold."* Right: `canvas` callout card (1px hairline, 32px padding, sh-1) with mono 11px oxide kicker `FLAT-PACK · WALL FEELS WRONG?`, 18px serif body, hairline divider, footer row of mono 16px `hello@elmstandard.co` + `btn-text` "Email →" (mailto link).

5. **External resources** (`linen` band) — eyebrow + rule-strong, then `1fr 1fr` grid of two link cards (`bone` background, 1px hairline, 24px padding, hairline → paper hover with sh-2):
   - Mono 11px oxide kicker + mono 14px `↗` arrow row, 22px serif title, mono 12px ink-3 host.
   - `anchorit.gov` — *"CPSC's furniture anchoring program"*
   - `cpsc.gov` — *"Tip-Over Information Center"*

6. **CTA strip** — single-column with H2 *"Anchoring is the price of safe furniture. Every cover gets it."* + `btn-primary` "Get a quote".

### 4. FAQ (`/faq`)

Two sections:

1. **Hero** — `COMMON QUESTIONS`, *"Most-asked, plainly answered."*

2. **Two-column body** — `240px 1fr` grid, 64px gap, top-aligned.
   - **Left: sticky TOC** (top 96px). Eyebrow `SECTIONS` + 28px ink rule, then six items (`32px 1fr` grid, 10px vertical padding, hairline tops):
     - Mono 11px numeral (oxide when active, ink-4 when not).
     - 14px sans group title (medium weight when active, regular otherwise).
     - Smooth-scroll on click with 96px top offset; active group derived from scroll position.
   - **Right: six accordion groups**, 64px between groups.
     - Group header: 1.5px ink bottom rule, mono 14px oxide group number + 32px serif title.
     - Within each group, a stack of FAQItem rows separated by 1px hairline:
       - Question button (full-width, transparent, padding 20px 0): 21px serif question on left, 18px mono `+` icon on right (oxide when open, ink-3 otherwise). Hover paints background `paper` and adds 12px horizontal padding (transitioned).
       - Open animation: rotates `+` to 45° (220ms cubic-bezier(0.2,0.6,0.2,1)) and reveals the answer via `max-height` from 0 → 600px (320ms).
       - Answer: 18px serif (ink-2), line-height 1.6, max-width 680px, 24px bottom padding.
     - Within a group, only one FAQItem can be open at a time.
   - **Bottom CTA card** (after last group): `paper` background, 1px hairline, 32px padding, flex space-between. *"Didn't find your answer?"* 26px serif H3 + mono `hello@elmstandard.co` left; `btn-primary` "Get a quote" right.

   Six groups, in order, with question/answer pairs verbatim from copy deck §FAQ:
   1. Ordering & lead times (4 items)
   2. Sizing & fit (5 items)
   3. Finishes & customization (4 items)
   4. Local install vs flat-pack (4 items)
   5. Care & maintenance (4 items)
   6. About the shop (4 items)

---

## Footer update

Footer grid changes from `2fr 1fr 1fr 1fr` to `1.6fr 1fr 1fr 1fr 1fr` to fit a fifth column.

| Column | Links |
|---|---|
| (Wordmark + tagline) | "Custom radiator covers, handbuilt in Milton, MA. One pair of hands, one shop." |
| **Shop** | Three styles · How it works · Get a quote |
| **Channels** | Local install · Flat-pack ship · Etsy storefront *(no route)* |
| **Resources** *(NEW)* | Measure your radiator · Worksheets · Tip safety · FAQ |
| **Shop info** | About · Milton, MA *(no route)* · hello@elmstandard.co *(no route)* |

Each column heading uses the existing pattern: `.overline` eyebrow, 28×1px ink rule, then 14px sans links (ink for routed, ink-3 for non-routed).

---

## Design Tokens

All tokens are defined in `tokens/colors_and_type.css`. Port these into your codebase's token system. Key values:

### Colors

| Token | Hex | Use |
|---|---|---|
| `--bone` | `#F4EFE6` | Page ground (default body bg) |
| `--paper` | `#FAF7F1` | Cards, panels, secondary section bands |
| `--linen` | `#ECE5D6` | Tertiary section bands, footer ground |
| `--canvas` | `#E4DAC4` | Warm accent band (CTA strips, callouts) |
| `--ink` | `#1F1B16` | Primary text, hairlines on emphasis |
| `--ink-2` | `#3B342A` | Secondary text (body copy in serif) |
| `--ink-3` | `#6B6052` | Tertiary, captions, eyebrows |
| `--ink-4` | `#A89E8B` | Disabled, mesh dots |
| `--hairline` | `#D9D0BD` | 1px rules, card borders |
| `--oxide` | `#8C3A2A` | Primary CTA, accent (one per view) |
| `--oxide-deep` | `#6B2A1C` | CTA hover/press |
| `--brass` | `#B08A3E` | Mesh detail accent |
| `--moss` | `#4A5A3A` | Cast-iron green secondary accent |

### Typography
- `--font-serif`: **Petrona** (variable) → fallback Iowan Old Style, Hoefler Text, Georgia, serif. Display + headings + most body copy.
- `--font-sans`: **Geist** → fallback `-apple-system`. UI labels, buttons, eyebrows, form labels.
- `--font-mono`: **JetBrains Mono** → fallback ui-monospace. Specs, dimensions, footer meta, `step NN` numerals.

Type scale (Major Third, anchored 17px): overline 11, caption 13, small 15, body 17, lead 20, h4 24, h3 30, h2 40, h1 56, display 80.

Weights used: 400 (regular), 500 (medium). Never bolder than 600 on serif headings.

Tracking: -0.02em on serif headings, 0.04em on UI sans, 0.14em on `.overline` caps.

### Spacing (8pt)
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px — `--s-1` through `--s-10`.

### Radii
2 (buttons/inputs), 4 (cards), 8 (modals), 999 (chips). Never larger than 8px on cards.

### Shadows
- `--sh-1`: `0 1px 0 rgba(31,27,22,0.04), 0 1px 2px rgba(31,27,22,0.06)` — resting cards.
- `--sh-2`: `0 1px 0 rgba(31,27,22,0.04), 0 4px 12px rgba(31,27,22,0.08)` — hover lift.
- `--sh-3`: `0 2px 0 rgba(31,27,22,0.04), 0 12px 28px rgba(31,27,22,0.10)` — modals/floats.

### Motion
- 120ms ease for hover/press color changes.
- 220ms ease for size/transform changes.
- 320ms for accordion expand.
- Standard easing: `cubic-bezier(0.2, 0.6, 0.2, 1)`.
- No bounces, no spring, no scale-up on hover (use 1–2px Y-translate or shadow-only).

---

## Shared Components

These already exist in the prototype kit and are referenced throughout. Reuse / port:

- **Wordmark** — text wordmark "Elm Standard" in serif; size prop in px.
- **btn-primary** — oxide bg, paper fg, 14×26 padding, 2px radius, 15px sans medium, 0.04em tracking. Hover → oxide-deep.
- **btn-outline** — transparent bg, ink fg, 1.5px ink border, otherwise same. Hover → linen bg.
- **btn-text** — transparent, ink, 1.5px ink bottom border, no padding.
- **field-input** — full-width, transparent, 1px ink bottom border, 10×0 padding, 16px sans, ink color. Focus → oxide bottom border.
- **rule-strong** — 1.5px × 64px ink horizontal rule (the heading underline motif).
- **overline** — 11px sans medium, 0.14em tracking, uppercase, ink-3 color.

---

## Assets

The prototypes reference these (already in the design-system repo at `assets/`):

- `logo-wordmark.svg` — primary horizontal lockup (used in Header).
- `logo-mark.svg` — circular ES monogram.
- `logo-stamp.svg` — full back-of-cover stamp (used in About sidebar).
- `radiator-cover-isometric.png` — Home hero illustration.
- `style-traditional.svg`, `style-shaker.svg`, `style-modern.svg` — architectural elevations (used in Home and Styles).

The new pages do **not** introduce new external image assets. The Measure page video frame and the Worksheets thumbnails are inline SVG (drawn in `Measure.jsx` and `Worksheets.jsx`).

---

## Files in this bundle

```
design_handoff_site_update/
├── README.md                    ← this file
├── copy_deck.md                 ← full final copy for every page
├── tokens/
│   └── colors_and_type.css      ← canonical design tokens (port these)
└── prototypes/
    ├── index.html               ← prototype shell (React + Babel inline)
    ├── App.jsx                  ← router (page → component)
    ├── Footer.jsx               ← updated footer with Resources column
    ├── HowItWorks.jsx           ← updated step 01/02/04 copy
    ├── Quote.jsx                ← updated form (helper text, 4th style, section 05)
    ├── Measure.jsx              ← NEW page
    ├── Worksheets.jsx           ← NEW page (with inline SVG sheet thumbs)
    ├── Safety.jsx               ← NEW page (CPSC pull-quote)
    └── FAQ.jsx                  ← NEW page (sticky TOC + accordions)
```

To run the prototype locally for visual reference, open `prototypes/index.html` in a static server (e.g. `python -m http.server`). It depends on the design-system repo's `colors_and_type.css` and `assets/` folder relative path — when extracting this bundle, either preserve that path structure or update the `<link>`/`<img>` paths in `index.html` and the JSX.
