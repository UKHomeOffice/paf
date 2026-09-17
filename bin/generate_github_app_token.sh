#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_ID:?Missing GITHUB_APP_ID}"
: "${GITHUB_APP_PRIVATE_KEY:?Missing GITHUB_APP_PRIVATE_KEY}"
: "${GITHUB_APP_INSTALLATION_ID:?Missing GITHUB_APP_INSTALLATION_ID}"

OUTPUT_TOKEN_FILE="${OUTPUT_TOKEN_FILE:-/root/.dockersock/github_app_token.txt}"
private_key=/tmp/github_app_private_key.pem
trap 'rm -f "$private_key"' EXIT
printf '%b' "$GITHUB_APP_PRIVATE_KEY" > "$private_key"
chmod 600 "$private_key"

b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
app_id="$(printf '%s' "$GITHUB_APP_ID" | tr -d '[:space:]')"
installation_id="$(printf '%s' "$GITHUB_APP_INSTALLATION_ID" | tr -d '[:space:]')"
[[ "$app_id" =~ ^[0-9]+$ ]] || { echo 'GITHUB_APP_ID must be numeric'; exit 1; }
[[ "$installation_id" =~ ^[0-9]+$ ]] || { echo 'GITHUB_APP_INSTALLATION_ID must be numeric'; exit 1; }
now=$(date +%s)
header=$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)
payload=$(printf '{"iat":%s,"exp":%s,"iss":"%s"}' "$now" "$((now + 540))" "$app_id" | b64url)
jwt="$header.$payload"
signature=$(printf '%s' "$jwt" | openssl dgst -binary -sha256 -sign "$private_key" | b64url)
response=$(curl -sS -X POST -H "Authorization: Bearer $jwt.$signature" -H 'Accept: application/vnd.github+json' "https://api.github.com/app/installations/$installation_id/access_tokens")
token=$(printf '%s' "$response" | jq -r '.token // empty')
test -n "$token" || { echo 'Failed to create GitHub App installation token'; exit 1; }
mkdir -p "$(dirname "$OUTPUT_TOKEN_FILE")"
printf '%s' "$token" > "$OUTPUT_TOKEN_FILE"
chmod 600 "$OUTPUT_TOKEN_FILE"