# Jose Aguirre — "Deep Focus" · Cinematic Navy (Option A)

Calm, premium, photography-led brand film in midnight navy — the counterpoint to the light
editorial Option B at `/joseaguirre-v2/`. Plain HTML + CSS + vanilla JS, served statically at
`https://eye-uni.com/joseaguirre/`. Mobile-first. Nine cinematic scenes.

## Editing
- **Copy / i18n:** Spanish is the default text in `index.html` (`data-i18n` elements).
  English lives in the `EN` object in `assets/js/main.js`. Toggle persists in `localStorage`
  (`ja1_lang`) and honours `?lang=en`.
- **Media:** see `assets/media/MEDIA.md`. All photos are graded to one cool **navy duotone**
  at runtime via the SVG `#navyduo` filter (in `index.html`) — swap any file keeping its name.
  `object-fit:cover` everywhere; navy scrims keep text legible.
- **Calendly:** the booking URL is the single constant `CAL` at the top of `main.js`.
  Buttons with `data-cal` open the navy+ice popup; the inline embed in Scene 07 is themed
  via colour params (`background_color`/`text_color`/`primary_color`).
- **Accent (ice/moonlight):** `--ice` in `assets/css/styles.css`. Used sparingly — CTA,
  active nav, one hairline/accent per scene. Keep it rare.

## Deploy
From the repo root: `npm run build` then `npx gh-pages -d dist --dotfiles`.
Vite copies `public/` → `dist/`. Do not touch `/joseaguirre-v2/`.
