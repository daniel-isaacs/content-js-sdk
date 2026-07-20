#!/bin/bash
set -e

# Version only the changesets that touch $TARGET, holding the rest as pending.
# Usage: version-selective.sh [package-name|all]
#   all / empty -> normal `changeset version` (bumps every pending package)
#   a package   -> only changesets naming that package are consumed; others
#                  are moved aside and restored so they stay pending on main.
TARGET="$1"

if [ -z "$TARGET" ] || [ "$TARGET" = "all" ]; then
  pnpm changeset version
  exit 0
fi

HOLD=$(mktemp -d)
shopt -s nullglob
for f in .changeset/*.md; do
  [ "$(basename "$f")" = "README.md" ] && continue
  # changeset frontmatter lists packages as: '@scope/name': bump
  grep -q "'$TARGET'" "$f" || mv "$f" "$HOLD/"
done

pnpm changeset version

# restore held changesets so they remain pending (unchanged in the PR diff)
mv "$HOLD"/*.md .changeset/ 2>/dev/null || true
rmdir "$HOLD"
