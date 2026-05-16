---
name: feedback-agile-workflow
description: "Always follow full issue → branch → PR flow, even for single-line changes"
metadata:
  type: feedback
---

Always create a GitHub issue before making any change, no matter how small. Then branch, commit, and raise a PR. Never commit directly to main, and never skip the issue step.

**Why:** User explicitly corrected this when a one-line config fix was made without an issue first. Agile practices apply to all changes, not just significant ones.

**How to apply:** For every change — even a one-liner — the sequence is: create issue → create branch → make change → PR. No exceptions.
