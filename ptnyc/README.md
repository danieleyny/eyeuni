# PTNYC — Private Training. New York.

A self-contained static landing site (plain HTML/CSS/JS, no build step) served at
**https://eye-uni.com/ptnyc/**. Drop-in folder; every path is relative so it works
under the `/ptnyc/` sub-path.

```
ptnyc/
  index.html
  assets/
    css/styles.css      # all styling + the colorway (:root custom properties)
    js/main.js          # loader, nav, menu, reveals, form
    img/                # hero, about, studio, band, detail, og, favicon
  CREDITS.md            # image/font licenses
  README.md
```

## How the owner edits things

**Prices** — in `index.html`, in the "Sessions" section. Each tier's number is inside
`<p class="tier__price"> … <b>$175</b> …`. Change the `<b>` value and the `tier__unit`
(`/ hour`, `/ week`, `/ month`). Three tiers: Single Session, The Program, Habit + Nutrition.

**Text / copy** — all copy is plain text in `index.html`. The name **Marcus Vale**,
address **214 W. 102nd St, New York, NY**, tagline, bio, and testimonials are all in
the markup and safe to edit directly.

**Images** — replace the files in `assets/img/` keeping the same names (`hero`,
`about`, `studio`, `band`, `detail`) and provide both `.webp` and `.jpg` for each,
plus `og.jpg` (1200×630) for social sharing. Photos are auto-desaturated by CSS, so
color originals are fine. See `CREDITS.md`.

**Colors** — `assets/css/styles.css`, the `:root{}` block. `--accent` (`#4F6BFF`) is
the only non-grayscale color; change it once to re-tint the whole site.

**Contact form endpoint** — the form currently opens the visitor's email app
(`mailto:`). To collect submissions properly:
1. In `index.html`, find the `<form id="bookingForm">` and the `TODO` comment above it.
   Set `action="https://formspree.io/f/XXXX"` and `method="POST"` (or a Basin/Getform URL).
2. In `assets/js/main.js`, in the `bookingForm` block, replace the `mailto:` handler
   with a `fetch(form.action, { method:'POST', body:new FormData(form) })`, or simply
   remove the `e.preventDefault()` so the browser posts natively.
   Also update `CONTACT_EMAIL` if you keep the mailto fallback.

## Notes
- Monochrome by design; the electric blue appears only on the primary CTA, active nav
  underline, key numerals, and one or two hairlines.
- Fully responsive & mobile-first; respects `prefers-reduced-motion`; the intro loader
  shows once per browser session (`sessionStorage`).
- No framework, no dependencies, no server needed — static hosting only.
