# MEDIA — Jose Aguirre V2 (light editorial)

Imagery is chosen by **meaning**, not just identity: Jose's own photos anchor the personal
moments; warm, human, free-license (Unsplash) photography carries the conceptual sections
(the method steps, the journey, nutrition, lifestyle). Every image shares **one warm
editorial grade** and every frame is **cover-cropped** (no letterboxing).

## Jose (real photos — identity/story)
| File | Section | Why |
| --- | --- | --- |
| `hero.*` | Hero (00) | smiling gym portrait — the face of the brand |
| `feature.*` | Filosofía (01) | white "VISION" tee — quiet confidence |
| `results.*` | Sobre Jose (03) | lean physique — who he is today |
| `then.*` | Sobre Jose keepsake | childhood Lima, 2013 — the origin |
| `hoy.*` | Timeline "Hoy" | present-day mirror portrait |
| `before.* / after.*` | Resultados (04) | client transformation slider (matched 4/5) |

## Sourced — warm, human, conceptual (graded via `.stock` / `.film--stock`)
| File | Section | Concept |
| --- | --- | --- |
| `metodo-1.*` | Método 01 · Evaluamos | planning with a notebook + coffee — *understand you first* |
| `metodo-2.*` | Método 02 · Entrenas | man training in a warm, moody gym — *focused, efficient* |
| `metodo-3.*` | Método 03 · Comes | salmon plate + wine, warm light — *flexible, enjoyable* |
| `metodo-4.*` | Método 04 · Lo sostienes | watch + shoes ready — *the daily habit that lasts* |
| `break-gym.*` | Full-bleed break | battle ropes in golden rooftop light — *constancia* |
| `tl-2016.*` | Timeline 2016 | push-up, determination — the early years |
| `tl-2020.*` | Timeline 2020 | coaching a client — the online pivot |
| `film-1.*` | Filmstrip 01 | strength training with a spotter (effort/community) |
| `film-2.*` | Filmstrip 02 | balanced plate in natural light (nutrition) |
| `film-3.*` | Filmstrip 03 | running outdoors (lifestyle/vitality) |
| `film-4.*` | Filmstrip 04 | planning the week (behind the scenes) |
| `film-5.*` | Filmstrip 05 | fresh, colorful meal (nutrition sin sufrir) |

## Grade
Jose's photos keep their native warm grade. Sourced photos get a touch more warmth via
`.stock` / `.film--stock` (`saturate(1.03) contrast(1.03) brightness(1.03) sepia(.08)`),
so the whole page reads as if shot by one photographer. The `<picture>` wrappers are set to
`display:block; width/height:100%` so `object-fit:cover` fills every frame (no empty space).
`../img/og.jpg` = light 1200×630 social card featuring Jose.
