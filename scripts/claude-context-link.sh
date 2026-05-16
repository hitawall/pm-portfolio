#!/usr/bin/env bash
# Symlink Claude Code memory + plans dirs from this repo into local Claude dirs.
# Run once per machine after `git clone`. Idempotent — safe to re-run.
# Pre-existing real files are backed up before being replaced by symlinks.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SANITIZED="$(echo "$REPO_ROOT" | sed 's|/|-|g')"
LOCAL_PROJECT_DIR="$HOME/.claude/projects/$SANITIZED"
LOCAL_PLANS_DIR="$HOME/.claude/plans"
BACKUP_DIR="$HOME/.claude/_context-backup-$(date +%Y%m%d-%H%M%S)"

backup_then_link() {
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -L "$dst" ]; then
    rm "$dst"
  elif [ -e "$dst" ]; then
    mkdir -p "$BACKUP_DIR"
    mv "$dst" "$BACKUP_DIR/$(basename "$dst")"
    echo "Backed up existing $dst -> $BACKUP_DIR/"
  fi
  ln -s "$src" "$dst"
  echo "Linked $dst -> $src"
}

# Memory dir is project-scoped — symlink the whole dir.
backup_then_link "$REPO_ROOT/.claude/memory" "$LOCAL_PROJECT_DIR/memory"

# Plans dir is global (shared across all projects) — symlink individual files only.
mkdir -p "$LOCAL_PLANS_DIR"
shopt -s nullglob
for plan in "$REPO_ROOT/.claude/plans/"*.md; do
  backup_then_link "$plan" "$LOCAL_PLANS_DIR/$(basename "$plan")"
done

echo ""
echo "Done. Claude Code will now read/write memory directly into this repo."
echo "Run 'git status' after a Claude session to see any memory updates."
