---
name: project-pm-portfolio
description: "PM portfolio website — stack, style decisions, phase status, open issues"
metadata: 
  node_type: memory
  type: project
  originSessionId: 50bd98db-d6e2-47b1-b1da-2476351953f4
---

Personal portfolio to showcase PM work, thoughts, and projects. Target: big-tech / high-growth startup recruiters.

**Stack:** Next.js 16 App Router + TypeScript · Tailwind CSS v4 · Sanity CMS v5 (Studio at `/studio`) · next-sanity@12 · next-themes · Geist Sans · lucide-react · Vercel

**Route structure:** Site pages live in `app/(site)/` route group (Header/Footer/ThemeProvider applied there). Root layout is minimal shell. Studio at `app/studio/[[...tool]]/` inherits only root layout — must stay outside `(site)/` so it gets a clean full-height viewport. Never add Header/Footer to the root layout.

**Design language:** Bento Violet — zinc neutrals + violet accent (#7c3aed light / #a78bfa dark). Bento grid homepage. Tokens in `app/globals.css` only.

**Live URL:** https://pm-portfolio-mu-two.vercel.app  
**Sanity project ID:** df9yxi9z · dataset: production  
**Build plan:** `~/.claude/plans/logical-gliding-metcalfe.md`

**Phase status (2026-05-15):**
- Phase 0 ✓ Foundation — scaffold, design system, site chrome
- Phase 1 ✓ MVP — Home, About, Resume routes
- Phase 2 ✓ Content Engine — Sanity setup, /work index + detail, Studio embed
- Phase 3 ✓ Thoughts + Projects — /thoughts, /thoughts/[slug], /projects with kind filter
- Phase 3.5 ✗ BLOCKED — Serif editorial UI refresh (PR #23, issue #22). Parked: serif style too hard to scan for recruiter context. Bento Violet kept.
- Phase 4 ✓ Polish + Motion — hero animation (#14), a11y audit (#15), skip-to-content, focus rings
- Phase 5 ✓ SEO + Analytics — OG images (#16), sitemap/robots/RSS (#17), Vercel Analytics (#18)

**Issue tracking:** GitHub Issues + Projects board. Labels: type/priority/phase (+ status:blocked). Branch pattern: `feat/GH-{N}-{slug}`. PR title must include `closes #N`.

**Open issues:** #10 P1 (replace resume.pdf — user action), #8 P2 (Sanity webhook), #19 P2 (cover image bug — parked with Phase 3.5), #22 blocked (serif refresh)

**Why:** SDE→PM pivot; site must convince recruiters of PM thinking while not hiding engineering depth.

**How to apply:** Favor recruiter-readability. PM-first content framing. Never commit directly to main — always PR + squash merge.
