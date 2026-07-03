---
name: feedback_pr_discipline
description: "Each distinct feature/change must get its own issue, branch, and PR — never stack unrelated commits onto an existing PR"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d7186303-ef5a-4909-aa8e-7c17918bba8a
---

Every change — even a small one — must follow the full issue → branch → PR flow independently. Do NOT add commits to an already-open PR if the work is a new feature or fix, even if it feels related.

**Why:** The user squash-merges PRs as atomic units. Stacking extra commits onto an open PR loses that atomicity and can cause confusion when the PR is already merged.

**How to apply:** Before committing any new work, check `git log` and the current branch. If the branch's PR has already been merged (or even if it's still open but the new work is a distinct feature), create a new GitHub issue, a new branch off main, and a new PR.
