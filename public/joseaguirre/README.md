# Jose Aguirre — "Athletic Performance System" (Option A)

Bold, cool, structural performance-lab site — the counterpoint to the light editorial
Option B at `/joseaguirre-v2/`. Plain HTML + CSS + vanilla JS, served statically at
`https://eye-uni.com/joseaguirre/`. Mobile-first.

## Editing
- **Copy / i18n:** Spanish is the default text in `index.html` (in `data-i18n` elements).
  English lives in the `EN` object in `assets/js/main.js`. To change ES, edit the HTML.
  To change EN, edit `EN`. The hero ticker phrases live in the `TICKER` object (both langs).
  Language toggle persists in `localStorage` (`ja1_lang`) and honours `?lang=en`.
- **Media:** see `assets/media/MEDIA.md`. All photos are graded to one cool charcoal
  **duotone** at runtime via the SVG `#duotone` filter (in `index.html`) — swap any file
  keeping the same name; the duotone applies automatically. `object-fit:cover` everywhere.
- **Calendly:** the booking URL is the single constant `CAL` at the top of `main.js`
  (`.../onlinecoaching`). Buttons with `data-cal` open the themed popup; the inline embed
  in "El Programa" is themed dark + volt via colour params.
- **Accent colour:** `--volt` (electric lime) in `assets/css/styles.css`. Swap it there to
  retint every accent (CTAs, active states, ticks). Keep it a single accent.

## Deploy
From the repo root: `npm run build` then `npx gh-pages -d dist --dotfiles`.
Vite copies `public/` → `dist/`. Do not touch `/joseaguirre-v2/`.
