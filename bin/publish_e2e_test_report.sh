#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_PULL_REQUEST:?Missing DRONE_PULL_REQUEST}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
test -d playwright-report || { echo 'Missing playwright-report directory'; exit 1; }

archive="playwright-report-pr-${DRONE_PULL_REQUEST}-${DRONE_BUILD_NUMBER}.zip"
tag="pr-${DRONE_PULL_REQUEST}-playwright-report"
api="https://api.github.com/repos/${DRONE_REPO}"
zip -r "$archive" playwright-report
release=$(curl -sS -H "Authorization: Bearer $GITHUB_APP_TOKEN" -H 'Accept: application/vnd.github+json' "$api/releases/tags/$tag")
release_id=$(printf '%s' "$release" | jq -r '.id // empty')
if [ -z "$release_id" ]; then
  release=$(curl -sS -X POST -H "Authorization: Bearer $GITHUB_APP_TOKEN" -H 'Accept: application/vnd.github+json' "$api/releases" -d "$(jq -n --arg tag "$tag" --arg name "Playwright Report PR #${DRONE_PULL_REQUEST}" '{tag_name:$tag,name:$name,prerelease:true,draft:false}')")
  release_id=$(printf '%s' "$release" | jq -r '.id // empty')
fi
test -n "$release_id" || { echo 'Failed to fetch/create report release'; exit 1; }
asset=$(curl -sS -X POST -H "Authorization: Bearer $GITHUB_APP_TOKEN" -H 'Content-Type: application/zip' --data-binary @"$archive" "https://uploads.github.com/repos/${DRONE_REPO}/releases/${release_id}/assets?name=${archive}")
url=$(printf '%s' "$asset" | jq -r '.browser_download_url // empty')
test -n "$url" || { echo 'Failed to upload report asset'; exit 1; }
body="Playwright HTML report for this PR build is available here:\n* $url\n\nDrone build: $DRONE_BUILD_LINK"
curl -fsS -X POST -H "Authorization: Bearer $GITHUB_APP_TOKEN" -H 'Accept: application/vnd.github+json' "$api/issues/${DRONE_PULL_REQUEST}/comments" -d "$(jq -n --arg body "$body" '{body:$body}')" >/dev/null
echo "Uploaded report asset: $url"