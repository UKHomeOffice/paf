#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"

REPORT_FILE="${REPORT_FILE:-allure-report/index.html}"
REPORT_URL_FILE="${REPORT_URL_FILE:-/root/.dockersock/playwright-report-url.txt}"
if [ ! -s "$REPORT_FILE" ]; then
  echo "Missing single-file Allure report: ${REPORT_FILE}"
  exit 1
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  ASSET_PREFIX="paf-allure-report-pr-${DRONE_PULL_REQUEST}-"
  TAG_NAME="pr-${DRONE_PULL_REQUEST}-allure-report"
  RELEASE_NAME="Allure Report PR #${DRONE_PULL_REQUEST}"
else
  ASSET_PREFIX="paf-allure-report-nightly-"
  TAG_NAME="nightly-allure-report"
  RELEASE_NAME="PAF Nightly Allure Report"
fi
ASSET_NAME="${ASSET_PREFIX}${DRONE_BUILD_NUMBER}.html"

GH_API="https://api.github.com/repos/${DRONE_REPO}"
RELEASE_RESPONSE_FILE="$(mktemp)"
ASSET_RESPONSE_FILE="$(mktemp)"
COMMENT_RESPONSE_FILE=""
cleanup() {
  rm -f "$RELEASE_RESPONSE_FILE" "$ASSET_RESPONSE_FILE"
  if [ -n "$COMMENT_RESPONSE_FILE" ]; then
    rm -f "$COMMENT_RESPONSE_FILE"
  fi
}
trap cleanup EXIT

RELEASE_HTTP_CODE="$(curl -sS -o "$RELEASE_RESPONSE_FILE" -w "%{http_code}" \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "${GH_API}/releases/tags/${TAG_NAME}")"

if [ "$RELEASE_HTTP_CODE" = "404" ]; then
  RELEASE_HTTP_CODE="$(curl -sS -o "$RELEASE_RESPONSE_FILE" -w "%{http_code}" -X POST \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases" \
    -d "$(jq -n --arg tag "$TAG_NAME" --arg name "$RELEASE_NAME" '{tag_name:$tag,name:$name,prerelease:true,draft:false}')")"
fi

if ! [[ "$RELEASE_HTTP_CODE" =~ ^2 ]] || ! jq -e . "$RELEASE_RESPONSE_FILE" >/dev/null 2>&1; then
  echo "Failed to fetch/create release (HTTP ${RELEASE_HTTP_CODE})"
  sed -n '1,30p' "$RELEASE_RESPONSE_FILE"
  exit 1
fi

RELEASE_ID="$(jq -r '.id // empty' "$RELEASE_RESPONSE_FILE")"
if [ -z "$RELEASE_ID" ]; then
  echo "Release response is missing its id"
  exit 1
fi
UPLOAD_URL="https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets"

for ASSET_ID in $(jq -r --arg prefix "$ASSET_PREFIX" '.assets[]? | select(.name | startswith($prefix)) | .id' "$RELEASE_RESPONSE_FILE"); do
  curl --fail-with-body -sS -X DELETE \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases/assets/${ASSET_ID}" >/dev/null
done

UPLOAD_HTTP_CODE="$(curl -sS -o "$ASSET_RESPONSE_FILE" -w "%{http_code}" -X POST \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Content-Type: text/html" \
  --data-binary @"${REPORT_FILE}" \
  "${UPLOAD_URL}?name=${ASSET_NAME}")"

if ! [[ "$UPLOAD_HTTP_CODE" =~ ^2 ]] || ! jq -e . "$ASSET_RESPONSE_FILE" >/dev/null 2>&1; then
  echo "Failed to upload Allure report asset (HTTP ${UPLOAD_HTTP_CODE})"
  sed -n '1,30p' "$ASSET_RESPONSE_FILE"
  exit 1
fi

DOWNLOAD_URL="$(jq -r '.browser_download_url // empty' "$ASSET_RESPONSE_FILE")"
if [ -z "$DOWNLOAD_URL" ]; then
  echo "Upload succeeded but browser_download_url is missing"
  exit 1
fi
mkdir -p "$(dirname "$REPORT_URL_FILE")"
printf '%s\n' "$DOWNLOAD_URL" > "$REPORT_URL_FILE"

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  COMMENT_BODY="$(printf 'Single-file Allure report (downloads as HTML):\n\n* %s\n\nDrone build: %s' "$DOWNLOAD_URL" "$DRONE_BUILD_LINK")"
  COMMENT_RESPONSE_FILE="$(mktemp)"
  COMMENT_HTTP_CODE="$(curl -sS -o "$COMMENT_RESPONSE_FILE" -w "%{http_code}" -X POST \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" \
    -d "$(jq -n --arg body "$COMMENT_BODY" '{body:$body}')")"
  if ! [[ "$COMMENT_HTTP_CODE" =~ ^2 ]] || ! jq -e '.html_url' "$COMMENT_RESPONSE_FILE" >/dev/null 2>&1; then
    echo "Failed to create GitHub PR comment (HTTP ${COMMENT_HTTP_CODE})"
    sed -n '1,30p' "$COMMENT_RESPONSE_FILE"
    exit 1
  fi
  rm -f "$COMMENT_RESPONSE_FILE"
  COMMENT_RESPONSE_FILE=""
fi

echo "Uploaded single-file Allure report asset: ${DOWNLOAD_URL}"
