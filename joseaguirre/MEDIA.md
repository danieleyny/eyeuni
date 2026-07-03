# MEDIA — Jose Aguirre "Deep Focus" (cinematic navy)

Every photo is rendered through one **cool navy duotone** (SVG `#navyduo` filter:
shadows → navy, cool midtones, warm off-white highlights) so his mixed shots read as one
cinematic brand. Full-bleed, `object-fit:cover`, subject-framed, navy scrim for legibility.
Swap any file keeping the same name — the duotone applies automatically. WebP + JPG.

| File | Scene |
| --- | --- |
| `hero.*` | 01 Hero — **clothed** white-tee portrait (leads; premium, trustworthy) |
| `mirror.*` | 03 ¿Para quién? — moody mirror, full-bleed |
| `train.*` | 04 Método·Entrenar (lean, earned context) + 09 Cierre atmosphere |
| `food.*` | 04 Método·Nutrir — dark, moody, high-end food (sourced) |
| `lifestyle.*` | 04 Método·Sostener — calm lifestyle/vitality |
| `coach.*` | 06 Tu Coach — confident/approachable portrait |
| `child.*` | 06 keepsake only — childhood Lima, kept **small** (bright tone can't lead navy) |
| `before.* / after.*` | 05 Prueba — before/after pair (matched crop) |
| `../img/og.jpg` | social card |

Duotone lives in CSS (`.kb img{ filter:url(#navyduo) }`) with a fallback for browsers
without SVG filter support. The childhood photo is a nostalgic footnote, never a hero.
