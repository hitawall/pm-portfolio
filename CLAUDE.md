# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PM portfolio for Shubham Arora (SDE → Product Manager pivot). Target audience: big-tech and high-growth startup recruiters.

## Commands

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run format       # Prettier (auto-sorts Tailwind classes)
```

## Stack

- **Next.js 16** (App Router, RSC-first) + TypeScript
- **Tailwind CSS v4** — design tokens live in `app/globals.css` via `@theme inline`; no `tailwind.config.ts` color overrides
- **Sanity CMS** (Phase 2+) — embedded Studio at `/studio`
- **next-themes** — class-based dark mode (`attribute="class"`)
- **Geist Sans + Geist Mono** via `next/font/google`
- **motion** (Framer Motion v11+, Phase 4+) — lazy-loaded with `dynamic`
- **lucide-react** for icons; **clsx + tailwind-merge** via `lib/utils.ts`

## Architecture

- `app/` — App Router; all components are RSC unless they need interactivity (`"use client"`).
- `components/ui/` — layout primitives: `Container` (size sm/md/lg), `Section`.
- `components/site/` — site chrome: `Header`, `Footer`, `ThemeToggle` (client).
- `components/providers/` — client wrappers: `ThemeProvider`.
- `components/content/` — (Phase 2+) PortableText renderers, code blocks, callouts.
- `sanity/` — (Phase 2+) schemas, typed GROQ queries, Sanity client.
- `lib/config.ts` — site-wide constants (name, URL, social links). **Update this first** when personalizing.
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).

## Design tokens

All tokens in `app/globals.css`. CSS vars on `:root` / `.dark`, aliased via `@theme inline`:

| Token class | CSS var |
|---|---|
| `bg-background` | `--background` |
| `text-foreground` | `--foreground` |
| `text-foreground-muted` | `--foreground-muted` |
| `border-border` | `--border` |
| `bg-surface` | `--surface` |
| `bg-accent` / `text-accent-foreground` | `--accent` / `--accent-fg` |

Dark mode is class-based (next-themes sets `.dark` on `<html>`).

## Next.js 16 notes

- `params` in dynamic routes is `Promise<>` — always `await params` in page components.
- `suppressHydrationWarning` on `<html>` is required for next-themes — do not remove.
- Motion: lazy-load via `dynamic(() => import('motion/react').then(m => m.motion), { ssr: false })`.
- No global state library — RSC + URL search params + local `useState` only.
- Always `next/image` for images with explicit `sizes` prop.
