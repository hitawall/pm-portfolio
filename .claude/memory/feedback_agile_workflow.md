---
name: feedback-agile-workflow
description: "Always follow full issue → branch → PR flow, even for single-line changes and even for sub-tasks within a larger feature"
metadata:
  type: feedback
---

Always create a GitHub issue before making any change, no matter how small. Then branch, commit, and raise a PR. Never commit directly to main, and never skip the issue step.

For large features broken into phases, create a **separate issue per phase** — not one umbrella issue. Each phase is a trackable unit of work that should have its own issue, label, and milestone so progress is visible on the board.

**Why:** User explicitly corrected this twice — once when a one-line config fix was made without an issue, and again when a 4-phase redesign was tracked under a single umbrella issue (#37) instead of per-phase issues.

**How to apply:** For every change — even a one-liner — the sequence is: create issue → create branch → make change → PR. For multi-phase features, create one issue per phase before starting that phase. No exceptions.
