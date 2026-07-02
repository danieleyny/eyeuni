# MEDIA — Jose Aguirre V2 (light editorial)

A mix of **Jose's own photos** (graded to one warm editorial look via CSS `filter:`) and
**free-license gym / lifestyle stock** (Unsplash) that balances the composition around the
gym. Every photo is used **once** — no duplicated crops. Self-hosted, WebP + JPG. Swap any
file keeping the same name.

## Jose (real photos, warm grade)
| File | Source / role |
| --- | --- |
| `hero.*` | 04_31_20 (smiling, black gear) — Hero portrait |
| `feature.*` | 04_31_15 (white "VISION" tee) — Filosofía pinned portrait |
| `results.*` | 04_31_07 (lean) — **Sobre Jose** main portrait |
| `hoy.*` | 04_31_22 (mirror) — Historia timeline "Hoy" node |
| `then.*` | 04_31_10 (childhood, Lima) — **Sobre Jose** keepsake ("Lima, 2013") |
| `gallery-4.*` | Jose training — Contenido/IG filmstrip tile 01 |
| `before.* / after.*` | client transformation pair — before/after slider |

## Gym / lifestyle stock (Unsplash, free license — warmed via `.stock` filter)
| File | Role |
| --- | --- |
| `gym-interior.*` | full-bleed editorial break |
| `gym-tools.*` | timeline 2016 |
| `gym-rack.*` | timeline 2020 |
| `gym-dumbbells.*` | filmstrip 03 |
| `gym-deadlift.*` | filmstrip 04 |
| `gym-ropes.*` | filmstrip 05 |
| `nutrition.*` | filmstrip 02 (nutrition) |

The **Método** panels use inline bronze fine-line SVG diagrams (no photos) on desktop.

Grade lives in `styles.css` (per-image `filter:`). Stock imagery gets a subtle warm
`sepia()` via the `.stock` / `.film--stock` classes so it sits with Jose's photos.
`../img/og.jpg` = light 1200×630 social card featuring Jose.
