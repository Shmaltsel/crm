#!/usr/bin/env bash
set -euo pipefail
FILE="${1:?Usage: restore.sh <path-to-dump>}"
pg_restore --clean --if-exists --no-owner --no-privileges -d "$DIRECT_URL" "$FILE"
echo "Restore completed from $FILE"