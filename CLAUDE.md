# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PM portfolio for Shubham Arora (SDE → Product Manager pivot). Target audience: big-tech and high-growth startup recruiters.

## Current phase

**Phases 0–3.5 ✓ complete** — foundation, MVP, content engine, Thoughts + Projects, serif editorial rebrand.  
**Phase 4 → next** — motion/a11y polish.  
See build plan: `~/.claude/plans/logical-gliding-metcalfe.md`

## Issue tracking (GitHub Issues + Projects)

**Labels** — always apply one of each:
- Type: `type:feature` · `type:bug` · `type:chore` · `type:docs`
- Priority: `priority:P0` · `priority:P1` · `priority:P2` · `priority:P3`
- Phase: `phase:2` … `phase:5` · `phase:3.5`

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
- **next-themes** — installed but toggle hidden; light-only until dark palette designed
- **Playfair Display + Source Sans 3 + IBM Plex Mono** via `next/font/google`
- **motion** (Phase 4+) — lazy-load: `dynamic(() => import('motion/react'), { ssr: false })`
- **lucide-react** icons · **clsx + tailwind-merge** via `lib/utils.ts`

## Component index

| File | What it does | Key props/API |
|---|---|---|
| `components/ui/Container.tsx` | max-width wrapper | `size?: sm\|md\|lg`, `as?` |
| `components/ui/Section.tsx` | vertical padding block | `as?` |
| `components/ui/Button.tsx` | CTA button | `variant?: primary\|secondary\|ghost`, `size?: sm\|md`, `as?` |
| `components/ui/Card.tsx` | editorial card | `accentTop?`, `hoverEffect?` |
| `components/ui/SectionLabel.tsx` | small-caps label flanked by rule lines | `align?: center\|start` |
| `components/ui/RuleDivider.tsx` | thin 1px horizontal rule | `className?` |
| `components/site/Header.tsx` | sticky nav | edit `navLinks[]` to add routes |
| `components/site/Footer.tsx` | footer + socials | reads `siteConfig` |
| `components/site/ThemeToggle.tsx` | sun/moon toggle (not rendered) | client component — kept for future dark mode |
| `components/providers/ThemeProvider.tsx` | next-themes wrapper | client boundary |
| `lib/config.ts` | **single source of truth** for name, email, social URLs | update here first |
| `lib/utils.ts` | `cn(...classes)` helper | clsx + twMerge |

## Design tokens (globals.css — do not re-read file, use table)

**Design language: Serif Editorial** — warm ivory + rich black + burnished gold. Playfair Display headlines, Source Sans 3 body, IBM Plex Mono small caps. Rule-line dividers and generous whitespace.

| Tailwind class | Value |
|---|---|
| `bg-background` | `#FAFAF8` (warm ivory) |
| `text-foreground` | `#1A1A1A` (rich black) |
| `text-foreground-muted` | `#6B6B6B` (warm gray) |
| `bg-muted` | `#F5F3F0` (secondary surface) |
| `bg-card` | `#FFFFFF` (pure white for lift) |
| `border-border` | `#E8E4DF` (warm rule-line gray) |
| `border-border-strong` | `#D4CFC7` |
| `bg-accent` | `#B8860B` (burnished gold) |
| `bg-accent-secondary` | `#D4A84B` (lighter gold for hover) |
| `text-accent-foreground` | `#FFFFFF` |
| `bg-accent-subtle` | `rgba(184, 134, 11, 0.06)` |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |

**CSS utilities:**
- `className="small-caps"` — IBM Plex Mono, 0.75rem, 0.15em tracking, uppercase. Use for section labels, meta info, eyebrows.
- `font-serif` — applies Playfair Display (set globally on h1/h2/h3/h4; use explicitly on italic taglines etc.)
- `font-mono` — applies IBM Plex Mono

Dark mode: `next-themes` installed but `.dark` block removed from globals.css. Toggle hidden from Header. Light-only until a future phase designs warm dark tokens.

## Where to add things

| Task | File(s) to edit |
|---|---|
| Change site name / email / social links | `lib/config.ts` only |
| Add a nav link | `components/site/Header.tsx` → `navLinks[]` |
| Add a new color token | `app/globals.css` `:root` + `@theme inline` |
| Add a new page | `app/(route)/page.tsx` + route group if needed |
| Add a Sanity schema (Phase 2+) | `sanity/schemas/` + export from `sanity/schemas/index.ts` |

## Next.js 16 rules

- `params` is `Promise<{slug: string}>` in dynamic routes — always `await params`.
- Always `next/image` with explicit `sizes` prop.
- No global state lib — RSC + URL search params + local `useState`.
- `npm run build` passes = the only required check before raising a PR.
