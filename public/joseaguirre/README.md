# Jose Aguirre — Coach de Pérdida de Grasa

Self-contained static site (HTML/CSS/vanilla JS, no build step) served at
**https://eye-uni.com/joseaguirre/**. Bilingual (Spanish default, ES/EN toggle),
cinematic dark theme, single conversion path to Calendly. All paths are relative,
so it works under the `/joseaguirre/` sub-path.

```
joseaguirre/
  index.html
  assets/
    css/styles.css     # design tokens (:root), all sections, slider, grain
    js/main.js         # i18n, loader, Calendly, slider, counters, interactions
    media/             # his photos/videos (see MEDIA.md)
    img/               # og.jpg, favicon.svg
  MEDIA.md             # which IG post fills each media slot
  README.md
```

## Edit the copy (both languages)
- **Spanish** text lives directly in `index.html` (each translatable element has a
  `data-i18n="key"` attribute; the Spanish is the visible text and the default).
- **English** translations live in `assets/js/main.js` in the `EN = { … }` object —
  edit the value for the matching key. (Spanish is captured automatically from the
  HTML, so you only maintain English in JS.)
- The **ES/EN toggle** is in the nav; the choice persists per visitor (`localStorage`),
  and `?lang=en` forces English.

## Change the Calendly link
One constant at the top of `assets/js/main.js`:
```js
var CAL_URL = 'https://calendly.com/joseaguirrefitness/onlinecoaching';
```
It powers every CTA (themed popup) **and** the inline embed in the Coaching section.
`CAL_THEME` next to it sets the dark/amber colors passed to Calendly.

## Swap the media
See **MEDIA.md**. Replace files in `assets/media/` keeping the same names (`hero`,
`about`, `band`, `before`, `after`, `content-1…4`), each as `.webp` + `.jpg`. Photos
are graded by CSS, so color originals work. Update `assets/img/og.jpg` (1200×630) too.

## Colors / feel
`assets/css/styles.css`, the `:root{}` block. `--accent` (`#E8B33D`, amber) is the only
lead chroma — change it once to re-tint. Radii (`--r-sm/md/lg`) and easing tokens are
reused everywhere; keep them consistent.

## Notes
- Mobile-first; the sticky bottom booking bar appears after the hero on phones.
- Respects `prefers-reduced-motion`; the intro loader shows once per browser session.
- No framework, no dependencies (besides Calendly's widget), no server needed.
