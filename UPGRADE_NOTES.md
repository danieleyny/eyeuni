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
