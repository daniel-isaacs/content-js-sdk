#!/bin/bash
set -e

echo "📦 Publishing to NPM..."

# Point @optimizely scope to Public NPM
echo "@optimizely:registry=https://registry.npmjs.org/" > .npmrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

# Changesets automatically uses correct tag:
# - Pre-release mode: publishes with "beta" tag
# - Stable mode: publishes with "latest" tag
pnpm changeset publish

# After stable release, deprecate all beta versions for this release
if [ ! -f .changeset/pre.json ]; then
  echo "🗑️  Deprecating beta versions..."

  for pkg in packages/*/package.json; do
    PKG_NAME=$(node -p "require('./$pkg').name")
    PKG_VERSION=$(node -p "require('./$pkg').version")

    # Deprecate all beta versions matching this major.minor version
    # e.g., if publishing 2.1.0, deprecates 2.1.0-beta.0, 2.1.0-beta.1, etc.
    MAJOR_MINOR=$(echo $PKG_VERSION | cut -d. -f1,2)

    echo "Deprecating ${PKG_NAME}@${MAJOR_MINOR}.*-beta*"
    npm deprecate "${PKG_NAME}@${MAJOR_MINOR}.*-beta*" "Beta versions deprecated. Use stable ${PKG_VERSION}" 2>/dev/null || echo "  No beta versions found or already deprecated"
  done
fi

# After stable release, create Jira release with linked issues
if [ ! -f .changeset/pre.json ] && [ -n "$JIRA_PASSWORD" ]; then
  echo "📋 Creating Jira releases..."

  for pkg in packages/*/package.json; do
    PKG_NAME=$(node -p "require('./$pkg').name")
    PKG_VERSION=$(node -p "require('./$pkg').version")

    # Find previous tag for this package (current tag not pushed yet)
    PREV_TAG=$(git tag --sort=-creatordate | grep "^${PKG_NAME}@" | head -1)

    if [ -z "$PREV_TAG" ]; then
      echo "No previous tag for $PKG_NAME, skipping Jira release"
      continue
    fi

    # Extract Jira IDs from merge commits since previous tag
    JIRA_IDS=$(git log --merges --oneline "$PREV_TAG"..HEAD --format="%s" \
      | grep -oE 'CMS-[0-9]+' | sort -u)

    if [ -z "$JIRA_IDS" ]; then
      echo "No Jira tickets found for $PKG_NAME@$PKG_VERSION"
      continue
    fi

    echo "Found tickets for $PKG_NAME@$PKG_VERSION: $(echo $JIRA_IDS | tr '\n' ' ')"

    # Create release version in Jira
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$JIRA_URL/rest/api/3/version" \
      -H "Content-Type: application/json" \
      -u "$JIRA_USERNAME:$JIRA_PASSWORD" \
      -d "{
        \"name\": \"${PKG_NAME}@${PKG_VERSION}\",
        \"project\": \"CMS\",
        \"released\": true,
        \"releaseDate\": \"$(date +%Y-%m-%d)\"
      }")

    HTTP_CODE=$(echo "$RESPONSE" | tail -1)
    BODY=$(echo "$RESPONSE" | sed '$d')

    if [ "$HTTP_CODE" != "201" ]; then
      echo "::warning::Failed to create Jira release (HTTP $HTTP_CODE): $BODY"
      continue
    fi

    VERSION_ID=$(echo "$BODY" | node -p "JSON.parse(require('fs').readFileSync(0)).id")
    echo "Created Jira release version ID: $VERSION_ID"

    # Link each Jira issue to this release
    for ISSUE in $JIRA_IDS; do
      LINK_RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "$JIRA_URL/rest/api/3/issue/$ISSUE" \
        -H "Content-Type: application/json" \
        -u "$JIRA_USERNAME:$JIRA_PASSWORD" \
        -d "{
          \"update\": {
            \"fixVersions\": [{\"add\": {\"id\": \"$VERSION_ID\"}}]
          }
        }")

      LINK_HTTP_CODE=$(echo "$LINK_RESPONSE" | tail -1)

      if [ "$LINK_HTTP_CODE" = "204" ]; then
        echo "  ✓ Linked $ISSUE"
      else
        echo "  ✗ Failed to link $ISSUE (HTTP $LINK_HTTP_CODE)"
      fi
    done
  done
fi
