# Elm Standard

Custom radiator covers, handbuilt in Milton, MA. Marketing site.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript · CSS variables (no Tailwind). Fonts via `next/font`: Petrona (serif), Geist (sans), JetBrains Mono.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Layout

```
app/                 routes (App Router); each folder = a page
components/          shared UI (Header, Footer, Wordmark, PageStub)
design_handoff_site_update/   design references — copy deck, prototypes, tokens
```

The handoff in `design_handoff_site_update/` is the source of truth for copy, layout, and design tokens. Tokens are ported into `app/globals.css` as CSS custom properties.
