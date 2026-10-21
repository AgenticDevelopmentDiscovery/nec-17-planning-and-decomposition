#!/usr/bin/env bash
set -euo pipefail
ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
RUN=${DEMO_RUN:-"$ROOT/run"}

if [[ -d "$RUN" ]]; then
  ARCHIVE="$HOME/demo-runs/_archive/run-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$(dirname "$ARCHIVE")"
  mv "$RUN" "$ARCHIVE"
  echo "Previous run archived to $ARCHIVE"
fi

mkdir -p "$RUN"
cp "$ROOT/harness/CLAUDE.md" "$RUN/"
# Playwright lives outside the repo so archiving a run cannot break it.
ln -sfn "$HOME/demo-runs/node_modules" "$RUN/node_modules"

cat <<MSG

Harness ready at $RUN

  cd "$RUN" && claude

Then paste what you want built. CLAUDE.md tells it to plan first and stop.

Watch PLAN.md in an editor tab -- it does not exist yet.
MSG
