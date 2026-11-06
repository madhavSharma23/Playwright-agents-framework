#!/bin/bash

echo "Running Playwright tests..."

# 1. Run tests (CI=1 prevents the HTML report from pausing the script)
if CI=1 npx playwright test; then
  echo "✅ All tests passed. Nothing to do."
  exit 0
fi

# 2. If tests fail, run the Healer
echo "❌ Tests failed. Triggering OpenCode Healer..."
opencode run "Use the playwright-test-healer prompt to fix the failing tests"

# 3. Check if OpenCode actually modified any files
if [[ -z $(git status --porcelain) ]]; then
  echo "⚠️ Healer finished, but no files were changed. Exiting."
  exit 1
fi

# 4. Commit and push to a new branch
BRANCH_NAME="auto-heal-$(date +%s)"
echo "🌿 Pushing fixes to new branch: $BRANCH_NAME"

git checkout -b "$BRANCH_NAME"
git add .
git commit -m "test: auto-healed broken Playwright tests"
git push -u origin "$BRANCH_NAME"

echo "✅ Fixes successfully pushed to branch: $BRANCH_NAME"