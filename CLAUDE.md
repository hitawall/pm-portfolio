# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PM portfolio for Shubham Arora (SDE → Product Manager pivot). Target audience: big-tech and high-growth startup recruiters.

## Current phase

**Phase 0 ✓ complete** — scaffold, design system, site chrome deployed.  
**Phase 1 → next** — Home hero, About page, Resume route.  
See build plan: `~/.claude/plans/logical-gliding-metcalfe.md`

## Issue tracking (GitHub Issues + Projects)

**Labels** — always apply one of each:
- Type: `type:feature` · `type:bug` · `type:chore` · `type:docs`
- Priority: `priority:P0` · `priority:P1` · `priority:P2` · `priority:P3`
- Phase: `phase:2` … `phase:5`

**Milestones** = phases. Assign every issue to its milestone.

**Minimum required fields on an issue:** title (imperative), type label, priority label, milestone, "Done when" checklist.

## Git workflow

**Branch naming:** `{type}/GH-{issue_number}-{short-slug}`
Examples: `feat/GH-11-thoughts-index` · `fix/GH-15-og-image` · `chore/GH-8-webhook`

**PR title:** `{type}: short description (closes #N)`
Example: `feat: Thoughts index page (closes #11)`

**PR body must include** `Closes #N` — GitHub auto-closes the issue on squash merge.

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
| `components/ui/BentoCard.tsx` | bento grid card with glow-on-hover | `span?: "1"\|"2"\|"3"` (maps to `md:col-span-N`) |
| `components/site/Header.tsx` | sticky nav | edit `navLinks[]` to add routes |
| `components/site/Footer.tsx` | footer + socials | reads `siteConfig` |
| `components/site/ThemeToggle.tsx` | sun/moon toggle | client component |
| `components/providers/ThemeProvider.tsx` | next-themes wrapper | client boundary |
| `lib/config.ts` | **single source of truth** for name, email, social URLs | update here first |
| `lib/utils.ts` | `cn(...classes)` helper | clsx + twMerge |

## Design tokens (globals.css — do not re-read file, use table)

**Design language: Bento Violet** — zinc neutrals + violet accent (#7c3aed light / #a78bfa dark). Bento grid layout. Geist Sans throughout.

| Tailwind class | Light | Dark |
|---|---|---|
| `bg-background` | `#ffffff` | `#09090b` |
| `text-foreground` | `#09090b` | `#fafafa` |
| `text-foreground-muted` | `#71717a` | `#a1a1aa` |
| `border-border` | `#e4e4e7` | `#27272a` |
| `border-border-strong` | `#d4d4d8` | `#3f3f46` |
| `bg-surface` | `#f4f4f5` | `#18181b` |
| `bg-accent` | `#7c3aed` (violet-600) | `#a78bfa` (violet-400) |
| `hover:bg-accent-hover` | `#6d28d9` (violet-700) | `#8b5cf6` (violet-500) |
| `text-accent-foreground` | `#ffffff` | `#ffffff` |
| `bg-accent-subtle` | `#f5f3ff` (violet-50) | `#1e1b4b` (violet-950) |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | same |

**CSS utilities:**
- `className="gradient-heading"` — violet→foreground gradient text, use on hero `<h1>` only.
- `className="bento-glow"` — on hover: violet border tint + `box-shadow` glow. Applied via `BentoCard`.

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
