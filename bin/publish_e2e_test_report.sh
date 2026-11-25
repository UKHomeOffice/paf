#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
: "${DRONE_COMMIT_SHA:?Missing DRONE_COMMIT_SHA}"

REPORT_FILE="${REPORT_FILE:-allure-report/index.html}"
if [ ! -s "$REPORT_FILE" ]; then
  echo "Missing single-file Allure report: ${REPORT_FILE}" >&2
  exit 1
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  REPORT_ID="pr-${DRONE_PULL_REQUEST}"
  RELEASE_NAME="Allure Report PR #${DRONE_PULL_REQUEST}"
else
  REPORT_ID="nightly"
  RELEASE_NAME="PAF Nightly Allure Report"
fi

TAG_NAME="${REPORT_ID}-allure-report"
ASSET_NAME="allure-report-${REPORT_ID}-build-${DRONE_BUILD_NUMBER}.html"
GH_API="https://api.github.com/repos/${DRONE_REPO}"
RESPONSE_FILE="$(mktemp)"
trap 'rm -f "$RESPONSE_FILE"' EXIT

github_request() {
  local method="$1" url="$2" expected="$3"
  shift 3
  HTTP_CODE="$(curl -sS -o "$RESPONSE_FILE" -w "%{http_code}" -X "$method" \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" "$@" "$url")"
  if ! [[ "$HTTP_CODE" =~ $expected ]]; then
    echo "GitHub ${method} failed (HTTP ${HTTP_CODE})" >&2
    sed -n '1,30p' "$RESPONSE_FILE" >&2
    exit 1
  fi
  if ! jq -e . "$RESPONSE_FILE" >/dev/null; then
    echo "GitHub ${method} returned invalid JSON" >&2
    exit 1
  fi
}

github_request GET "${GH_API}/releases/tags/${TAG_NAME}" '^(200|404)$'
if [ "$HTTP_CODE" = "404" ]; then
  github_request POST "${GH_API}/releases" '^201$' \
    -H "Content-Type: application/json" \
    --data "$(jq -n --arg tag "$TAG_NAME" --arg name "$RELEASE_NAME" --arg commit "$DRONE_COMMIT_SHA" \
      '{tag_name:$tag,name:$name,target_commitish:$commit,prerelease:true,draft:false}')"
fi
RELEASE_ID="$(jq -er '.id | numbers' "$RESPONSE_FILE")"

github_request POST \
  "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${ASSET_NAME}" \
  '^201$' -H "Content-Type: text/html" --data-binary @"$REPORT_FILE"
DOWNLOAD_URL="$(jq -er '.browser_download_url | strings | select(length > 0)' "$RESPONSE_FILE")"

if [ -n "${REPORT_URL_FILE:-}" ]; then
  printf '%s\n' "$DOWNLOAD_URL" > "$REPORT_URL_FILE"
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  COMMENT_BODY="$(printf 'Single-file Allure report (download and open in a browser):\n\n* %s\n\nDrone build: %s' \
    "$DOWNLOAD_URL" "$DRONE_BUILD_LINK")"
  github_request POST "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" '^201$' \
    -H "Content-Type: application/json" --data "$(jq -n --arg body "$COMMENT_BODY" '{body:$body}')"
  COMMENT_URL="$(jq -er '.html_url | strings | select(length > 0)' "$RESPONSE_FILE")"
  echo "Posted PR comment: ${COMMENT_URL}"
fi

echo "Uploaded report asset: ${DOWNLOAD_URL}"
