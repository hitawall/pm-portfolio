# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PM portfolio for Shubham Arora (SDE → Product Manager pivot). Target audience: big-tech and high-growth startup recruiters.

## Current phase

**Phase 0 ✓ complete** — scaffold, design system, site chrome deployed.  
**Phase 1 → next** — Home hero, About page, Resume route.  
See build plan: `~/.claude/plans/logical-gliding-metcalfe.md`

## Git workflow

Branches: `feat/phase1-home-hero`, `feat/phase1-about`, `fix/foo`, `chore/bar`  
Pattern: `feat/phase{N}-{short-description}` — one PR per feature to `main`.  
Never commit directly to `main`. Always raise a PR. Squash merge only.

## Commands

```bash
npm run dev      # dev server → localhost:3000
npm run build    # production build (creates .next/)
npm run lint     # ESLint — auto-allowed, no prompt needed
npm run format   # Prettier + Tailwind class sort
```

## Stack

- **Next.js 16** App Router + TypeScript — RSC by default, `"use client"` only for interactivity
- **Tailwind CSS v4** — tokens in `app/globals.css` only; no `tailwind.config.ts` color overrides
- **Sanity CMS** (Phase 2+) — Studio at `/studio`, same Vercel deploy
- **next-themes** — class-based dark mode; `attribute="class"`
- **Geist Sans + Geist Mono** via `next/font/google`
- **motion** (Phase 4+) — lazy-load: `dynamic(() => import('motion/react'), { ssr: false })`
- **lucide-react** icons · **clsx + tailwind-merge** via `lib/utils.ts`

## Component index

| File | What it does | Key props/API |
|---|---|---|
| `components/ui/Container.tsx` | max-width wrapper | `size?: sm\|md\|lg`, `as?` |
| `components/ui/Section.tsx` | vertical padding block | `as?` |
| `components/ui/Button.tsx` | CTA button | `variant?: primary\|ghost`, `size?: sm\|md`, `as?` (renders as `<a>` for links) |
| `components/site/Header.tsx` | sticky nav | edit `navLinks[]` to add routes |
| `components/site/Footer.tsx` | footer + socials | reads `siteConfig` |
| `components/site/ThemeToggle.tsx` | sun/moon toggle | client component |
| `components/providers/ThemeProvider.tsx` | next-themes wrapper | client boundary |
| `lib/config.ts` | **single source of truth** for name, email, social URLs | update here first |
| `lib/utils.ts` | `cn(...classes)` helper | clsx + twMerge |

## Design tokens (globals.css — do not re-read file, use table)

**Design language: Indigo Tech** — zinc neutrals + indigo accent (#6366f1 light / #818cf8 dark). Geist Sans throughout.

| Tailwind class | Light | Dark |
|---|---|---|
| `bg-background` | `#ffffff` | `#09090b` |
| `text-foreground` | `#09090b` | `#fafafa` |
| `text-foreground-muted` | `#71717a` | `#a1a1aa` |
| `border-border` | `#e4e4e7` | `#27272a` |
| `bg-surface` | `#f4f4f5` | `#18181b` |
| `bg-accent` | `#6366f1` (indigo-500) | `#818cf8` (indigo-400) |
| `hover:bg-accent-hover` | `#4f46e5` (indigo-600) | `#6366f1` (indigo-500) |
| `text-accent-foreground` | `#ffffff` | `#ffffff` |
| `bg-accent-subtle` | `#eef2ff` (indigo-50) | `#1e1b4b` (indigo-950) |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | same |

**CSS utility:** `className="gradient-heading"` — indigo→foreground gradient text, use on hero `<h1>` only.

Dark mode: next-themes sets `.dark` on `<html>`. `suppressHydrationWarning` on `<html>` — never remove.

## Where to add things

| Task | File(s) to edit |
|---|---|
| Change site name / email / social links | `lib/config.ts` only |
| Add a nav link | `components/site/Header.tsx` → `navLinks[]` |
| Add a new color token | `app/globals.css` `:root` + `.dark` + `@theme inline` |
| Add a new page | `app/(route)/page.tsx` + route group if needed |
| Add a Sanity schema (Phase 2+) | `sanity/schemas/` + export from `sanity/schemas/index.ts` |

## Next.js 16 rules

- `params` is `Promise<{slug: string}>` in dynamic routes — always `await params`.
- Always `next/image` with explicit `sizes` prop.
- No global state lib — RSC + URL search params + local `useState`.
- `npm run build` passes = the only required check before raising a PR.
