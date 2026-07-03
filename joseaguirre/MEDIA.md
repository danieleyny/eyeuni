# MEDIA — Jose Aguirre Option A (cool duotone)

Every photo is rendered through one **cool charcoal duotone** (SVG `#duotone` filter:
shadows → #0C0D0F, highlights → #ECEDEA) so mixed sources read as one athletic brand.
Swap any file keeping the same name — the duotone + `object-fit:cover` apply automatically.

| File | Section |
| --- | --- |
| `hero.*` | Stat-hero portrait |
| `phase-1..4.*` | El Sistema protocol (Evaluar / Entrenar / Nutrir / Sostener) |
| `band.*` | Full-bleed break ("Constancia > perfección") |
| `before.* / after.*` | Results scoreboard slider (matched crop) |
| `about.*` | Tu Coach portrait |
| `then.*` | Tu Coach "2013" origin mark |
| `../img/og.jpg` | social card |

Duotone lives in CSS (`.duo img{ filter:url(#duotone) }`) with a `grayscale` fallback for
browsers without SVG filter support. Hover adds a subtle volt colour shift on feature images.
