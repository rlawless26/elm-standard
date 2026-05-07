# Elm Standard

Custom radiator covers, handbuilt in Milton, MA. Marketing site.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript · CSS variables (no Tailwind).
Fonts via `next/font`: Petrona local variable TTF (serif), Geist + JetBrains Mono via Google Fonts.

Hosted on Vercel; pushes to `main` auto-deploy to https://elmstandard.com.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Layout

```
app/                    routes (App Router); each folder = a page
components/             shared UI (Header, Footer, Wordmark)
public/                 served as-is — logo SVGs, hero PNG, fonts/, worksheets/
claude_code_handoff/    design source-of-truth — copy deck, prototypes, tokens, brand assets
```

The handoff in `claude_code_handoff/` is the canonical reference for copy, layout, and design tokens. Tokens are ported into `app/globals.css` as CSS custom properties; brand assets are copied into `public/`.
