# Michael's Floral Design — media manifest

All current assets are **curated stock** (Pexels license: free for commercial
use, no attribution required). Every slot keeps its filename when real footage
arrives — drop replacements in with the same names and the site picks them up.

## Video slots (mp4, H.264, ≤ ~6 MB, muted loops)

| File | Currently | Replace with |
| --- | --- | --- |
| `hero.mp4` | Florists composing arrangements at a bench (Pexels 3805783, 720p) | 10–20s of Michael's hands arranging at the 85th St bench, warm light, shallow depth of field |
| `band-atelier.mp4` | Hands selecting/prepping stems (Pexels 5925967, 720p) | Stems being cut / an arrangement being built in the shop |
| `band-delivery.mp4` | Doorstep flower hand-off (Pexels 6667222, 720p) | A delivery leaving the shop / walking a Manhattan block with an arrangement |

Each video has a `-poster.webp/.jpg` pair (first frame). Regenerate posters if
you swap a clip (`qlmanage -t -s 1600 -o . <file>.mp4`, then sips/cwebp).

## Stills (webp + jpg pairs, ≤ 1600px, target < 250 KB webp)

- `gallery-01…07` — signature-work gallery. Captions live in
  `src/michaelsfloraldesign/content.js`; the captions describe *plausible*
  commissions and should be rewritten against Michael's real portfolio.
- `occasion-weddings / -events / -sympathy / -holidays` — occasion cards.
- `story-portrait` — ideally a real photo of Michael Perez Lumanglas in the shop
  (current: stock florist with white peonies, Pexels 5273726).
- `visit-storefront` — ideally the real 347 E 85th St storefront
  (current: stock flower-shop interior, Pexels 12189793).
- `og-michaelsfloraldesign.jpg` — social share image (derived from hero poster).

Pexels source IDs: gallery 931159, 5503330, 5414056, 35001457, 1684232,
5894100, 169190 · occasions 6479566, 1616113, 10363632, 29692594 ·
story 5273726 · storefront 12189793.

## Client logos — "Events we arrange" (`logo-*.png`)

These are the REAL organizations from michaelsfloraldesignnyc.com, pulled from his
Squarespace CDN: Carl Schurz Park Conservancy, The Lotos Club, Friends of the
Children, Skidmore College, NYU College of Dentistry, American Prairie Reserve.
The section renders them monochrome-ivory on the deep green via CSS
`filter: brightness(0) invert(.92)`, so mixed-colour marks read as one quiet
wall instead of a logo dump. Two were pre-processed so the silhouette treatment
works: `logo-lotos.png` had its light seal-fill knocked out to transparent
(kept only the dark navy line-art) and its source was a GIF. If you swap a logo,
give it transparent background + dark artwork (or already-white artwork) so the
filter produces a clean ivory silhouette.
