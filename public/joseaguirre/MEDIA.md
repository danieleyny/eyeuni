# MEDIA — Jose Aguirre

All media lives in `assets/media/` and is **self-hosted** (Instagram CDN URLs expire).
Keep the same filenames (both `.webp` and `.jpg` for each) so nothing else needs editing.
A unified cinematic grade is applied in CSS, so color originals are fine.

## Current state
Now uses **Jose's real photos** (provided), cropped + cohesively graded via CSS to one
cinematic look. The `content-1..4` reels reuse the real gym shots — these can later be
swapped for actual IG reel covers. The `before`/`after` pair is a client-style
transformation (a different person) shown in **Resultados**.

| Slot | File | Recommended source / crop |
| --- | --- | --- |
| Hero | `hero.*` | A cinematic training/physique shot of Jose. **Vertical / portrait** crop (fills full-screen on mobile). His most aspirational, warm-lit clip frame or photo. |
| About | `about.*` | A **portrait of Jose** — warm, confident, looking to camera. Portrait 4:5. |
| Band | `band.*` | An atmospheric wide action shot for the full-bleed divider (heavily darkened by CSS). Landscape. |
| Before / After | `before.*`, `after.*` | A **real client transformation pair** — same person, same framing, "antes" vs "después". Portrait 4:5, matched crop for the slider. |
| Content reels | `content-1…4.*` | Frames/covers from 4 of his best reels. Vertical 9:16-ish. Link already points to his IG. |
| OG image | `../img/og.jpg` | 1200×630 share image (a strong shot of Jose). |

## Video (optional upgrade)
The hero can use a muted looping clip instead of a still. Drop `hero.mp4` (+ `hero.webm`)
and a `hero-poster.jpg`, then swap the hero `<picture>` for a `<video autoplay muted loop
playsinline preload="metadata" poster="…">`. Compress well (≤ ~3 MB) for mobile.

## Optional: live Instagram reels
The **Contenido** section can embed 2–3 live reels via Instagram's official embed
(`instagram.com/p/…/embed`) for always-fresh proof, styled to the dark theme. Currently
each tile is a static cover that links to his profile.
