#!/usr/bin/env bash
set -euo pipefail
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"
pg_dump -F c -f "$BACKUP_DIR/backup_${TIMESTAMP}.dump" "$DIRECT_URL"
find "$BACKUP_DIR" -name "backup_*.dump" -mtime +14 -delete
echo "Backup saved: $BACKUP_DIR/backup_${TIMESTAMP}.dump"