# Jose Aguirre — V2 "Light Luxe"

A second, **light editorial** variation of the coaching site, served at
**https://eye-uni.com/joseaguirre-v2/** (V1 stays at `/joseaguirre/`). Self-contained
static (HTML/CSS/vanilla JS); all paths relative so it works under the sub-path.

```
joseaguirre-v2/
  index.html
  assets/{css/styles.css, js/main.js, media/ (+MEDIA.md), img/ (og, favicon)}
  README.md
```

- **Copy / i18n:** Spanish is the visible HTML (each translatable node has `data-i18n`);
  English lives in the `EN = {}` object in `assets/js/main.js`. The ES/EN nav toggle persists
  (`localStorage`); `?lang=en` forces English.
- **Calendly:** one constant at the top of `main.js` (`CAL_URL`), used by every CTA (light-
  themed popup) and the inline embed. If Calendly is blocked/unavailable, a clean fallback CTA
  shows instead of an endless spinner.
- **Media:** see `assets/media/MEDIA.md`. Replace files keeping the same names.
- **Design tokens:** `styles.css` `:root{}` — `--paper`, `--ink`, `--bronze` (the single accent),
  serif = Fraunces, body = Inter. Radii/easing reused throughout.
- Mobile-first; sticky booking bar on phones; respects `prefers-reduced-motion`; loader once/session.
