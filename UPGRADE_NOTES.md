# EYEuni "Wow Factor" Upgrade — Notes

A futuristic/sci-fi enhancement pass over the existing React 19 + Vite + Tailwind v4
+ Framer Motion site. Mobile-first, reduced-motion safe, performance-guarded. No
business copy, pricing, portfolio links, or intake logic was changed — only
presentation/animation.

## New dependencies
- `lenis` — momentum smooth scrolling
- `ogl` — lightweight WebGL shader (hero aurora), lazy-loaded
- `canvas-confetti` — intake success celebration

## New shared foundation
- `src/components/motion/constants.js` — single motion language (easings, durations, tilt cap, DPR cap, scrub bands, brand colors).
- `src/hooks/`
  - `useInViewPaused` — IntersectionObserver → boolean.
  - `useRafLoop` — rAF that runs only while active **and** the tab is visible (pause offscreen / hidden).
  - `useSmoothScroll` + `effects/SmoothScroll.jsx` — Lenis init on window; exposes `window.__lenis` in dev; `useLenisScrollTo` for anchor links.
  - `useDeviceTilt` — pointer (desktop) + shared gyroscope subject (mobile) → tilt MotionValues.
  - `useScrollProgress` — element scroll progress (0..1) via rAF; used because framer's `useScroll` stalls under Lenis.
  - `useIntroHandoff` — event bus so the hero headline decode fires as the preloader aperture opens.
- `src/components/effects/`
  - `AuroraBackground.jsx` (lazy, ogl shader) + `AuroraFallback.jsx` (static CSS, paints first → LCP-safe).
  - `MotionPermissionGate.jsx` — iOS-only "Tap to enable motion" pill; result remembered for the session.
  - `TiltCard.jsx`, `CountUp.jsx`, `Magnetic.jsx`, `ScrollProgress.jsx`, `DepthOverlay.jsx`.

## What changed, by tier
**Tier 1 (signature):**
- Hero: WebGL aurora background (pointer/gyro reactive) over a static CSS fallback; headline "decode/scramble" coordinated with the preloader hand-off.
- WebsiteTransform: converted from timer to a **pinned, scroll-scrubbed** ugly→wipe→beautiful→sparkle sequence with a thin progress bar. Reduced motion → one-shot crossfade, no pin.
- Portfolio: 3D tilt + glare cards, always-visible glassy label bar (mobile), in-card screenshot auto-pan.

**Tier 1B (new sections + bento):** `CostOfBadWebsite`, Services **bento** rebuild (looping micro-animation demos + mobile tap-to-expand), `CapabilityConstellation` (interactive node-map + static reduced-motion grid), `SpeedRace`, `CaseStudyImpact` (phone frame, count-ups, climbing chart, looping toasts), `IntegrationsMarquee`. New page order wired in `App.jsx`.

**Tier 2:** Lenis momentum scroll; hero decode (above); `StatsStrip` count-ups; animated route transition (`/`↔`/intake`, aperture-fade, <600ms); sticky mobile CTA bar.

**Tier 3:** `Magnetic` hero CTA (desktop pull / mobile ripple + `navigator.vibrate`); `ScrollProgress` top hairline; `DepthOverlay` grain + vignette; `canvas-confetti` on `IntakeSuccess`; `AnimateIn` now reveals immediately under reduced motion.

## Performance
- ogl hero shader is a lazy chunk; `AuroraFallback` paints first (no LCP block / CLS).
- Intake flow lazy-loaded → main bundle ~89 KB gzip (was ~157 KB).
- WebGL DPR capped at 1.5; all rAF loops pause offscreen + on hidden tab.
- Reduced motion disables Lenis, WebGL, tilt, scrubbing, count-ups, marquees, confetti.

## Deliberately omitted
- **Global velocity scroll-skew** (Tier 2 #4): a page-wide transform breaks `position: sticky`/`fixed`, which would break the pinned WebsiteTransform scrub and the fixed header/CTA. Lenis momentum already provides the premium scroll feel.

## Dev affordances (safe to keep)
- `?nointro` — skip the preloader (also good for shared links).
- `?reveal` — reveal all `AnimateIn` sections immediately (used for automated screenshots).
- `window.__lenis` — Lenis instance in dev.

## TODO before launch (client)
- Verify + cite sources for all stats: `CostOfBadWebsite` (53% / 75% / −7%), `StatsStrip` (200+ / ~0.8s / 3× / 100%), `SpeedRace` times (4.1s vs 0.7s, ~6×).
- Replace `CaseStudyImpact` metrics/toasts (Birchwood, Laundry Day) with real figures.
- Swap `IntegrationsMarquee` text wordmarks for real monochrome SVG brand logos.
- Confirm iOS device-motion permission UX wording ("Tap to enable motion").

## Verification notes
The preview tool throttles `requestAnimationFrame` (background tab) and can't capture
WebGL, so rAF/WebGL motion was verified via headless Chrome (`?nointro`) and DOM
assertions; layout/static via the preview. `npm run build` passes clean.

---

# Pass 2 — "The EYEuni Lens" + "Into the Eye" intro

Mobile-first, touch + auto-play, reduced-motion fallbacks, RAF paused
offscreen/tab-hidden, zero layout shift.

## Part A — "The EYEuni Lens" (replaces the capabilities section)
Replaces the old `CapabilityConstellation` (read as an empty black box on mobile)
with a dormant mock business site + a glowing **eye-shaped lens** that reveals
live capability widgets only where it passes. Demos itself (auto-drift) so a phone
visitor sees value with zero interaction.

**New files**
- `src/components/CapabilityLens.jsx` — `<section id="capabilities">`: heading,
  screen-reader capability list, picks interactive panel vs. static grid.
- `src/components/effects/LensReveal.jsx` — interactive panel: dormant base + live
  (revealed) layers, the lens, the single RAF loop, drag/tap/auto-drift, and the
  "Reveal everything" climax.
- `src/components/effects/lens/LensWidgets.jsx` — 6 widgets (Booking, AI
  Assistant, Payments, Live Analytics, Storefront, Notifications), `MockSite`
  (base/live), `StaticLensGrid` (reduced-motion fallback).

**Removed:** `<CapabilityConstellation />` usage + import in `App.jsx` (swapped
for `<CapabilityLens />` in the same slot). `CapabilityConstellation.jsx` left on
disk, now unused.

**How:** live layer masked via `clip-path: circle()` driven by a ref in one RAF
loop (no per-frame React state); widget activation flips state only on change.
Lens eases toward the pointer (desktop), the drag point (touch — the lens is the
only `touch-action:none` handle, no scroll-jacking), a panel tap, or an auto-drift
tour of the hotspots when idle. RAF gated by `useInViewPaused`. Reduced motion /
no pointer → `StaticLensGrid` (all six lit, no masking/loops).

**Tunables** (top of `LensReveal.jsx`): `LENS_R`, `LENS_BOX`, `PROX`, `SMOOTH`,
`R_SMOOTH`, `DWELL`, `RESUME_DELAY`, `TAP_SLOP`, `HOTSPOTS`.

## Part B — "Into the Eye" cinematic intro + readiness gate
The preloader's flat aperture wipe is replaced by a dive **into the pupil** that
lands inside the site; the slow load is hidden behind the animation.

**New file:** `src/hooks/useAppReady.js` — resolves when the fold is paintable:
`document.fonts.ready` **and** the Hero's `eyeuni:hero-ready` event (with a
`HERO_FALLBACK_MS` grace timeout).

**Changed**
- `src/components/Preloader.jsx` — meter climbs to ~85%, holds until the gate
  (`appReady && elapsed ≥ MIN_INTRO`, hard `MAX_CAP` backstop), snaps to 100%,
  then dives: brand/grid/glow fade, eye SVG scales ~34× into the pupil (easeIn)
  with a blue bloom rush, overlay cross-fades to the (already-dark) site.
  `emitIntroDone()` fires at the start of the settle. Tunables: `MIN_INTRO`,
  `MIN_INTRO_RM`, `MAX_CAP`, `METER_RAMP`, `DIVE_MS`, `EYE_SCALE`.
- `src/components/Hero.jsx` — dispatches `eyeuni:hero-ready` after first paint
  (double-rAF); scales `1.05 → 1` + fades in on intro handoff ("land and settle").

**New signal:** `eyeuni:hero-ready` (window event) → consumed by `useAppReady`.
`?nointro` and reduced-motion paths preserved (calm quick fade, shorter gate).

**CSS:** added `.lens-pulse` keyframe (lens ring shimmer) to `src/index.css`.

---

# Pass 3 — Lens redesign + count-up bug fix

## Lens redesign (replaces the X-ray dark-interior version)
The lens now reveals the *same beautiful site coming alive* instead of a dark
interior. The base is a genuinely attractive, **full-color luxury restaurant
("Maison")** — serif wordmark, gold (`#c8a97e`) Reserve buttons, a real hero
photo (`mockup/hotel-hero.jpg`), "Fine dining, reimagined", and a 3-dish menu
with prices. The lens reveals that page **humming with six labeled, concrete
capability widgets** pinned to real elements, with a blue "scanner" tint and
glowing halos on the elements they power.

- `src/components/effects/lens/LensWidgets.jsx` — rewritten: `MaisonSite`
  (full-color, responsive), the six widgets (`AnalyticsWidget`, `BookingWidget`,
  `PaymentsWidget`, `ConciergeWidget`, `NotificationsWidget`, `OrderingWidget`),
  the exported `ANCHORS` (single source of truth for positions + labels + source
  elements), and `StaticLensReveal` (reduced-motion: site + all six labeled).
  Capabilities: Live analytics, Booking system, Secure payments, AI concierge,
  Instant notifications, Online ordering.
- `src/components/effects/LensReveal.jsx` — base layer is the full-color
  `MaisonSite` (no grayscale/opacity dim), shown OUTSIDE the lens. The reveal
  layer (clipped to the lens) is an X-ray view BEHIND the front: an OPAQUE dark
  interior (so the site never shows through / overlaps where the lens passes) +
  tech grid + scanner glow + source halos + the labeled widgets. Uses `ANCHORS`.
  Tunables at
  top: `LENS_R`, `LENS_BOX`, `PROX`, `SMOOTH`, `R_SMOOTH`, `DWELL`,
  `RESUME_DELAY`, `TAP_SLOP`.
- `src/components/CapabilityLens.jsx` — new copy ("Your site, but alive."),
  imports `StaticLensReveal` for the reduced-motion / no-pointer fallback.
- `src/index.css` — added `.lens-halo` keyframe (pulsing element highlight).
- TODO(client): swap `mockup/room-*.jpg` for real food photography in the menu.

Auto-drift visits all six anchors; "Reveal everything" lights all six (verified
zero overlap, a clean 2×3 grid); reduced motion shows them statically; RAF
paused offscreen via `useInViewPaused`.

## Count-up bug fix
`src/components/effects/CountUp.jsx` froze near zero because it was tied to a
pause-on-exit IntersectionObserver — scrolling past quickly cancelled the rAF
**and** the safety timeout. Rewritten to trigger ONCE via a
`getBoundingClientRect` poll (scroll + resize + interval — the same robust
pattern as `useScrollAnimation`, reliable under Lenis where IO / native scroll
events don't fire), then run to completion uncancelled, with a safety timeout
that always lands on the exact target. Reduced motion shows the final value.
Verified: Cost of a Bad Website → 53% / 75% / −7%; Stats strip → 200+ / ~0.8s /
3× / 100%.

---

# Pass 4 — V3 (light, Stripe/Apple-grade site at /V3.html)

A new private build served at `/V3.html` (mirrors `/V2.html`): the trimmed
section set in a polished LIGHT theme. The public dark site and V2 are untouched.

## Entry / wiring
- `V3.html` (root, `noindex`, `data-theme="light"`, inline dark bg so the dark
  intro doesn't flash white) → `src/main-v3.jsx` → `<App trimmed theme="light"
  wildcardHome />`.
- `vite.config.js` — added `v3` input.
- `src/App.jsx` — `theme` prop (default `dark`, dark site identical). When light:
  wraps in `data-theme="light"`, renders `HomeV3`, passes `theme` to Preloader /
  ScrollProgress / DepthOverlay.

## Light design system (`src/index.css`, scoped to `[data-theme="light"]`)
Semantic tokens (`--bg`, `--bg-subtle`, `--ink`/`--ink-muted`/`--ink-faint`,
`--accent`, `--grad-accent` indigo→violet→cyan, hairlines, layered soft shadows)
+ helper classes (`.v3-grad-text`, `.v3-grad-bg`, `.v3-card`, `.v3-btn-primary`,
`.v3-btn-ghost`, `.v3-ribbon`) + light overrides for the headline `.hh-*` classes.

## Light sections (`src/components/v3/`)
`HomeV3` composes: `HeaderV3` (transparent→white-on-scroll, gradient pill),
`HeroV3` (white hero, drifting gradient ribbon, decoded headline, two CTAs,
floating browser mockup with `portfolio/birchwood.jpg`, dispatches
`eyeuni:hero-ready`), `CostV3` (CountUp 53/75/−7, amber accent), `ServicesV3`
(refined feature cards), `PortfolioV3` (browser-framed screenshots),
`LogoCloudV3` (greyscale marquee), `TestimonialsV3` (editorial quote),
`DemoCTAV3` (gradient-tinted CTA band), `FAQV3` (hairline accordion), `ContactV3`
(light form, accent focus ring), `FooterV3`, `StickyMobileCTAV3`. Reuses the dark
sections' data + `AnimateIn` + `CountUp` + `HeroHeadline`.

## Theme-aware shared infra
- `Preloader` — same dark into-the-eye intro; on light, a soft white bloom
  expands from center at the end of the dive so we "step into the light."
- `ScrollProgress` — `--grad-accent` bar on light. `DepthOverlay` — skipped on
  light (its dark grain/vignette is wrong for a bright page).
- `HeroHeadline` — added `hh-grad`/`hh-fallback` hook classes so light overrides
  can repaint the gradient/fallback; timing/logic unchanged.

## Tunables
`HeroV3` (`MOCKUP_IMG`, `MOCKUP_TILT`), `index.css` (`--grad-accent`, shadow
vars, `.v3-ribbon` drift speed). Preloader bloom timing in `Preloader.jsx`.

## Known limitation
`/intake` from V3 still uses the existing dark intake (functional, not yet
light-skinned) — a follow-up.
