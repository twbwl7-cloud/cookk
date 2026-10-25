#!/usr/bin/env bash
# Push LALIBAKERY to https://github.com/twbwl7-cloud/cook-.git
# Requires: GITHUB_TOKEN in the environment (never commit the token).
set -euo pipefail

REPO_URL_NOAUTH="https://github.com/twbwl7-cloud/cook-.git"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "ERROR: GITHUB_TOKEN is not set in this environment." >&2
  exit 1
fi

cd "$ROOT"

if [[ ! -d .git ]]; then
  git init
  git checkout -b main
fi

git add -A
if git diff --cached --quiet; then
  echo "Nothing new to commit."
else
  git -c user.email="orders@lalibakery.co.il" -c user.name="LALIBAKERY Agent" \
    commit -m "LALIBAKERY: haute patisserie e-commerce site"
fi

# Push without echoing the token
git remote remove github 2>/dev/null || true
git remote add github "https://x-access-token:${GITHUB_TOKEN}@github.com/twbwl7-cloud/cook-.git"
git push -u github HEAD:main --force-with-lease 2>&1 | sed -E 's/x-access-token:[^@]+@/x-access-token:***@/g; s/ghp_[A-Za-z0-9]+/***/g'
git remote set-url github "$REPO_URL_NOAUTH"
echo "Done: $REPO_URL_NOAUTH"
