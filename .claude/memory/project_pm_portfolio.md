---
name: project-pm-portfolio
description: "PM portfolio website — stack, style decisions, Redesign 2.0 status, open issues"
metadata: 
  node_type: memory
  type: project
  originSessionId: 50bd98db-d6e2-47b1-b1da-2476351953f4
---

Personal portfolio to showcase PM work, thoughts, and projects. Target: big-tech / high-growth startup recruiters + fellow builders.

**Stack:** Next.js 16 App Router + TypeScript · Tailwind CSS v4 · Sanity CMS v5 (Studio at `/studio`) · next-sanity@12 · next-themes (dark-first) · Space Grotesk + Geist Sans + Geist Mono · motion/react · lucide-react · Vercel

**Route structure:** Site pages live in `app/(site)/` route group (Header/Footer/ThemeProvider applied there). Root layout is minimal shell. Studio at `app/studio/[[...tool]]/` inherits only root layout — must stay outside `(site)/` so it gets a clean full-height viewport. Never add Header/Footer to the root layout.

**Design language:** Product Dark — Tangerine (Redesign 2.0, June 2026). Dark-first (`#0a0a0b`), cool-zinc neutrals, tangerine accent (#fb923c dark / #ea580c light) + sunny-yellow edge (--accent-2), glassy surfaces, glow shadows, Space Grotesk headlines, mono tabular numerals. Tokens in `app/globals.css` only — full table in CLAUDE.md. History: Bento Violet (phases 0–5) → Editorial Ink + Amber (units 1–8, #54–#70) → read "like a journal", replaced.

**Live URL:** https://pm-portfolio-mu-two.vercel.app  
**Sanity project ID:** df9yxi9z · dataset: production  
**Build plan:** `~/.claude/plans/snoopy-toasting-salamander.md` (Redesign 2.0, 6 phases)

**Redesign 2.0 status (2026-06-12):** milestone "Redesign 2.0", issues #74–#89, label `phase:redesign`.
- Phase 1 design language: #74 ✓ tokens/fonts/chrome · #75 ✓ dashboard hero shell · #76 cleanup + docs (in PR)
- Phase 2 live GitHub hero: #77 stats lib (GraphQL + GITHUB_TOKEN PAT, ISR 3600, null→fallback) · #78 contribution graph
- Phase 3 Now feed (Sanity `now` schema): #79, #80
- Phase 4 PM-grade case studies: #81 schema fields · #82 /work index · #83 detail narrative
- Phase 5 motion: #84 magnetic · #85 scroll-linked · #86 page fade (no experimental viewTransition)
- Phase 6 sweep: #87 projects/thoughts · #88 about/resume (removes temp font-serif→sans mapping) · #89 OG + a11y QA
User approves each PR manually before next task — never start the next task unprompted. Hero placeholder stats ("1,108 contributions", "3h ago") are intentionally fake until #77/#78.

**Issue tracking:** GitHub Issues. Labels: type/priority/phase (+ status:blocked). Branch pattern: `{type}/GH-{N}-{slug}`. PR title must include `closes #N`. Squash merge only. `public/static/create-manifest.json` is build-regenerated noise — never commit it.

**Pre-redesign open issues:** #10 P1 (replace resume.pdf — user action), #8 P2 (Sanity webhook), #19 P2 (cover image bug — parked)

**Why:** SDE→PM pivot; site must convince recruiters of PM thinking while not hiding engineering depth. Redesign 2.0 repositions as "builder, not just engineer".

**How to apply:** Favor recruiter-readability. PM-first content framing. Never commit directly to main — always PR + squash merge. GitHub username is `hitawall` (login email differs from git email).
