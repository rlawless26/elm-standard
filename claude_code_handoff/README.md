# Elm Standard — Claude Code Handoff

A complete handoff package for the **Elm Standard** marketing site (custom radiator covers, handbuilt in Milton, MA). This bundle contains everything Claude Code needs to ship the site end-to-end: design tokens, fonts, brand assets, full reference prototype (all nine pages), and the final copy deck.

---

## What's in this bundle

```
claude_code_handoff/
├── README.md                            ← you are here
├── copy_deck.md                         ← final copy for every page
├── tokens/
│   └── colors_and_type.css              ← canonical design tokens
├── fonts/
│   ├── Petrona-VariableFont_wght.ttf
│   └── Petrona-Italic-VariableFont_wght.ttf
├── assets/
│   ├── logo-wordmark.svg                ← primary horizontal lockup (Header)
│   ├── logo-mark.svg                    ← circular ES monogram
│   ├── logo-stamp.svg                   ← full back-of-cover stamp (About sidebar)
│   ├── radiator-cover-isometric.png     ← Home hero illustration
│   ├── style-traditional.svg            ← architectural elevation
│   ├── style-shaker.svg                 ← architectural elevation
│   └── style-modern.svg                 ← architectural elevation
└── prototypes/
    ├── index.html                       ← prototype shell — open this to view
    └── components/
        ├── App.jsx                      ← simple route switcher
        ├── Wordmark.jsx                 ← text wordmark with end-tick rule
        ├── Header.jsx                   ← top nav (sticky)
        ├── Footer.jsx                   ← five-column footer
        ├── Home.jsx                     ← landing
        ├── HowItWorks.jsx               ← 4-step process
        ├── Styles.jsx                   ← three styles, alternating layout
        ├── Quote.jsx                    ← multi-section form
        ├── About.jsx                    ← founder bio + stamp sidebar
        ├── Measure.jsx                  ← 5-measurement guide + video frame
        ├── Worksheets.jsx               ← 3 printable PDF cards
        ├── Safety.jsx                   ← anchoring + CPSC pull-quote
        └── FAQ.jsx                      ← sticky TOC + accordion groups
```

To run locally for visual reference:
```
cd claude_code_handoff/prototypes
python3 -m http.server 8000
```
Then open `http://localhost:8000/`.

---

## Scope

This is the **complete Elm Standard site**, nine pages total:

| # | Route key      | Path             | Page                  | In top nav? |
|---|----------------|------------------|-----------------------|-------------|
| 1 | `home`         | `/`              | Home                  | Yes         |
| 2 | `how`          | `/how-it-works`  | How it works          | Yes         |
| 3 | `styles`       | `/styles`        | Styles                | Yes         |
| 4 | `about`        | `/about`         | About                 | Yes         |
| 5 | `quote`        | `/quote`         | Get a quote           | Yes (CTA)   |
| 6 | `measure`      | `/measure`       | Measure your radiator | No          |
| 7 | `worksheets`   | `/worksheets`    | Worksheets            | No          |
| 8 | `safety`       | `/safety`        | Tip safety            | No          |
| 9 | `faq`          | `/faq`           | FAQ                   | No          |

The four resource pages (Measure, Worksheets, Safety, FAQ) are reachable via the **footer Resources column** and **contextual links**:
- HowItWorks step 01 → `/measure`
- Quote section 02 helper text → `/measure`
- Measure CTA strip → `/worksheets`
- Worksheets and Safety CTA strips → `/quote`

---

## Fidelity

**High-fidelity.** The prototypes use the exact final colors, typography, spacing, and component patterns. Recreate the UI pixel-perfectly, but **swap in your codebase's existing primitives** (Button, Field, Section, etc.) where they already match the prototype's behavior.

The files in `prototypes/` are design references created in inline-Babel JSX — they're meant to demonstrate intended look and behavior, not be copied verbatim into a production codebase. Pick the most appropriate framework for a content marketing site (Next.js or Astro are both strong choices) and implement the designs there.

---

## Brand assets — use the provided files

The three logo artworks are shipped as **separate SVG files** in `assets/`. Do not redraw them; use the provided files:

- **`logo-wordmark.svg`** — primary horizontal lockup. Used in the Header. Optimized for ~16–22px cap height.
- **`logo-mark.svg`** — circular ES monogram. Use as a favicon, social avatar, or compact mark anywhere the wordmark won't fit.
- **`logo-stamp.svg`** — full back-of-cover stamp ("HANDBUILT IN MILTON · MA · EST. 2025"). Used in the About sidebar. Don't shrink below 120px diameter.

`Wordmark.jsx` is a **text-rendered** wordmark used for inline contexts where the SVG is overkill (Footer, etc.). Either approach is fine — the text version derives the same Petrona 800-caps lockup with end-tick rule from CSS. For the canonical raster/print/social-media artwork, always use `logo-wordmark.svg`.

---

## The mesh background

The brass mesh pattern is the brand's most distinctive visual motif — it references the actual brass mesh in every Elm Standard cover. It's implemented as a **lightweight CSS pseudo-element overlay**, applied per-section, never globally.

### How it works

A `.mesh-ground` class on a section creates a `::before` overlay with a `radial-gradient` dot pattern. Foreground content sits above via `position: relative`. Two variants ship:

```css
/* Default — subtle ink dots, used on warm backgrounds (bone, canvas) */
.mesh-ground {
  position: relative;
}
.mesh-ground::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, #1F1B16 0.7px, transparent 0.9px);
  background-size: 6px 6px;
  opacity: 0.07;
  pointer-events: none;
}
.mesh-ground > * { position: relative; }

/* Brass — louder, used sparingly for highlight moments */
.mesh-ground.brass::before {
  background-image: radial-gradient(circle, #B08A3E 0.8px, transparent 1px);
  opacity: 0.28;
}
```

### Where to use it

- **Default (`.mesh-ground`)** — Home hero (above-the-fold), Home CTA strip. Subtle texture you only notice when you look for it. Quietly says "this is a craft product."
- **Brass (`.mesh-ground.brass`)** — reserve for a single hero moment if needed (currently unused; available as an option). Don't apply globally — it'll fight body copy.

### Don'ts

- **Don't** put it on the page background body (`body { background-image: ... }`). It belongs to specific sections so the rest of the site stays clean.
- **Don't** put it behind dense text. Stick to hero-style sections with limited copy.
- **Don't** layer it over `--paper` or `--linen`; the dots disappear. It's tuned for `--bone` and `--canvas`.
- **Don't** raise opacity past `0.10` for the default (or `0.32` for brass). It becomes noisy.

### Implementation notes for production

In your codebase, port `.mesh-ground` and `.mesh-ground.brass` as a global utility class (or a Tailwind component class). Or, if you prefer a React component, wrap with `<MeshGround variant="default" | "brass">` that renders the same `::before` pattern. Either is fine — the CSS is the source of truth.

---

## Design tokens

All tokens live in `tokens/colors_and_type.css`. Port them into your codebase's token system (CSS custom properties, Tailwind config, or whatever you use). Highlights:

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

- `--font-serif`: **Petrona** (variable, shipped in `fonts/`) → fallback Iowan Old Style, Hoefler Text, Georgia, serif. Display + headings + most body copy.
- `--font-sans`: **Geist** (Google Fonts, imported in the CSS) → fallback `-apple-system`. UI labels, buttons, eyebrows, form labels.
- `--font-mono`: **JetBrains Mono** (Google Fonts) → fallback ui-monospace. Specs, dimensions, footer meta, `STEP NN` numerals.

Type scale (Major Third, anchored 17px): overline 11, caption 13, small 15, body 17, lead 20, h4 24, h3 30, h2 40, h1 56, display 80.

Weights used: 400 (regular), 500 (medium). Never bolder than 600 on serif headings.

Tracking: `-0.02em` on serif headings, `0.04em` on UI sans, `0.14em` on `.overline` caps.

### Spacing (8pt scale)
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

## Shared components / utility classes

Defined in `prototypes/index.html` (the `<style>` block). Port them into your codebase as components or utility classes:

- **`.btn-primary`** — oxide bg, paper fg, 14×26 padding, 2px radius, 15px sans medium, 0.04em tracking. Hover → oxide-deep.
- **`.btn-outline`** — transparent bg, ink fg, 1.5px ink border. Hover → linen bg.
- **`.btn-text`** — transparent, ink, 1.5px ink bottom border, no padding.
- **`.field-input`** — full-width, transparent, 1px ink bottom border, 10×0 padding, 16px sans, ink color. Focus → oxide bottom border.
- **`.rule-strong`** — 1.5px × 64px ink horizontal rule (the heading underline motif).
- **`.overline`** — 11px sans medium, 0.14em tracking, uppercase, ink-3 color.
- **`.container`** — max-width 1180px, 32px gutters.
- **`.mesh-ground`** / **`.mesh-ground.brass`** — see "The mesh background" above.

---

## Page-by-page notes

All pages use the same layout language:
- 1180px max content width, 32px gutter.
- Hero pattern: `padding: 96px 0 48px`, eyebrow → 1.5px×64px ink rule (`.rule-strong`) → 56px serif H1.
- Section bands alternate between `--bone` (page ground) and `--paper` / `--linen` / `--canvas` (hairline-bordered top/bottom).
- One oxide CTA per view, max.

For per-page detail (sections, grid templates, copy, animation specs), read the corresponding component in `prototypes/components/`. They're heavily commented and the inline styles are the spec.

### Footer (5-column grid)

`gridTemplateColumns: 1.6fr 1fr 1fr 1fr 1fr`:

| Column | Links |
|---|---|
| (Wordmark + tagline) | "Custom radiator covers, handbuilt in Milton, MA. One pair of hands, one shop." |
| **Shop** | Three styles · How it works · Get a quote |
| **Channels** | Local install · Flat-pack ship · Etsy storefront *(no route)* |
| **Resources** | Measure your radiator · Worksheets · Tip safety · FAQ |
| **Shop info** | About · Milton, MA *(no route)* · hello@elmstandard.co *(no route)* |

Each column heading uses: `.overline` eyebrow, 28×1px ink rule, then 14px sans links (ink for routed, ink-3 for non-routed).

---

## Things to wire up that aren't in this bundle

The site references three things that need to be set up separately:

1. **Worksheet PDFs.** The Worksheets page links to `01-standard-radiator.pdf`, `02-pipes-and-valves.pdf`, and `03-window-recess-and-baseboard.pdf`. The architectural thumbnails in `Worksheets.jsx` show what the actual sheets should look like — generate the PDFs to match, with the same dimension lines, header rule, and form-field rows.
2. **Measuring video.** The Measure page has a 16:9 placeholder. Once Rob records the ~90-second video, swap the `<VideoPlaceholder />` for an actual `<iframe>` or `<video>`. The script for the video is in `copy_deck.md` under "Video script."
3. **Email + form delivery.** The Quote form currently `console.log`s on submit. Wire it to whatever transactional-email or form-handler service the rest of the site uses. `hello@elmstandard.co` is referenced in 5+ places — make sure the inbox is live before launch.

---

## Voice & content rules

First person, plainspoken, confident but humble. Short sentences. Craft-specific where it matters (ogee, brass mesh, MDF). No corporate hedging, no marketing fluff. The full final copy for every page is in `copy_deck.md`.
