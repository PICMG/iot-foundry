#!/usr/bin/env bash
# Simple helper to produce a 16x16/32x32/48x48 ICO from the project logo
# Requires ImageMagick (`convert`)

set -euo pipefail

SRC="${1:-docs/assets/images/picmg-logo.png}"
OUT="${2:-docs/favicon.ico}"

if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick 'convert' not found. Install with: sudo apt install imagemagick" >&2
  exit 2
fi

if [ ! -f "$SRC" ]; then
  echo "Source logo not found: $SRC" >&2
  exit 3
fi

echo "Generating favicon from $SRC -> $OUT"
convert "$SRC" -resize 64x64 -define icon:auto-resize=64,48,32,16 "$OUT"
echo "Done. Commit $OUT to the repo to publish the favicon."
