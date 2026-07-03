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


## Training energy (added)
| File | Use / source |
| --- | --- |
| `train-loop.mp4` + `train-poster.*` | 04.5 "El entrenamiento" — cinematic training video, navy-graded via CSS. Desktop autoplays (muted, loop, lazy-loaded on scroll); mobile / reduced-motion show the poster only (no video download). Source: Pexels (JULLIAN PRODUCTION), free for commercial use. |
| `entrenar.*` | Método·02 Entrenar — real barbell lift in progress (replaces the static pose). Source: Unsplash, free license. Navy-graded. |

The training video and the deadlift still are graded to the same navy duotone as the photos.
Swap `train-loop.mp4` for Jose's own footage anytime (keep the name); update `train-poster.*`
to a matching still.
