#!/usr/bin/env bash
# Lavi media pipeline: rename + optimize raw WhatsApp media into public/media/.
# Images -> .webp (q80) + .jpg fallback (cwebp available).
# Videos -> copied + renamed (ffmpeg unavailable in this env, so no re-encode;
#           posters are mapped to representative photos in media.js, not extracted).
set -euo pipefail
SRC="lavi/img"
OUT="public/media"
mkdir -p "$OUT"

# newname|||oldfilename  (photos)
photos=(
"field-arrival-atv|||WhatsApp Image 2026-06-27 at 1.21.23 PM (1).jpeg"
"array-panorama|||WhatsApp Image 2026-06-27 at 1.21.23 PM (2).jpeg"
"array-with-robot|||WhatsApp Image 2026-06-27 at 1.21.23 PM (3).jpeg"
"utility-field-wide|||WhatsApp Image 2026-06-27 at 1.21.23 PM.jpeg"
"array-rows-hillside|||WhatsApp Image 2026-06-27 at 1.21.24 PM (1).jpeg"
"array-field-dry|||WhatsApp Image 2026-06-27 at 1.21.24 PM (2).jpeg"
"robot-action-valley|||WhatsApp Image 2026-06-27 at 1.21.24 PM (3).jpeg"
"robot-closeup-sky|||WhatsApp Image 2026-06-27 at 1.21.24 PM (4).jpeg"
"robot-cleaning-wide|||WhatsApp Image 2026-06-27 at 1.21.24 PM (5).jpeg"
"robot-cleaning-lowangle|||WhatsApp Image 2026-06-27 at 1.21.24 PM (6).jpeg"
"array-dust-atmospheric|||WhatsApp Image 2026-06-27 at 1.21.24 PM (7).jpeg"
"robot-on-array-angled|||WhatsApp Image 2026-06-27 at 1.21.24 PM (8).jpeg"
"robot-flag-hero|||WhatsApp Image 2026-06-27 at 1.21.24 PM (9).jpeg"
"transport-atv-robot|||WhatsApp Image 2026-06-27 at 1.21.24 PM.jpeg"
"robots-pair-ground|||WhatsApp Image 2026-06-27 at 1.21.25 PM (1).jpeg"
"robot-setup-ground|||WhatsApp Image 2026-06-27 at 1.21.25 PM.jpeg"
)

# newname|||oldfilename  (videos)
videos=(
"showreel-clean-run-01|||WhatsApp Video 2026-06-27 at 1.21.24 PM (2).mp4"
"showreel-clean-run-02|||WhatsApp Video 2026-06-27 at 1.21.24 PM (3).mp4"
"robot-brush-closeup|||WhatsApp Video 2026-06-27 at 1.21.24 PM (4).mp4"
"field-team-operating|||WhatsApp Video 2026-06-27 at 1.21.24 PM (6).mp4"
"robot-vertical-mobile|||WhatsApp Video 2026-06-27 at 1.21.24 PM.mp4"
"robot-run-trees|||WhatsApp Video 2026-06-27 at 1.21.24 PM (7).mp4"
"robot-array-wide|||WhatsApp Video 2026-06-27 at 1.21.24 PM (5).mp4"
"panels-reflection-scenic-clip|||WhatsApp Video 2026-06-27 at 1.21.25 PM (1).mp4"
"array-pan-short|||WhatsApp Video 2026-06-27 at 1.21.24 PM (1).mp4"
"robot-quick-clip|||WhatsApp Video 2026-06-27 at 1.21.25 PM.mp4"
)

for row in "${photos[@]}"; do
  new="${row%%|||*}"; old="${row##*|||}"
  cp "$SRC/$old" "$OUT/$new.jpg"
  cwebp -quiet -q 80 "$SRC/$old" -o "$OUT/$new.webp"
done

for row in "${videos[@]}"; do
  new="${row%%|||*}"; old="${row##*|||}"
  cp "$SRC/$old" "$OUT/$new.mp4"
done

echo "Done. $(ls "$OUT" | wc -l | tr -d ' ') files in $OUT"
ls -la "$OUT" | awk '{print $5, $9}' | sort
