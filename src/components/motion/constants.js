// Single source of the site's motion language. Reuse these everywhere so the
// upgrade feels designed, not assembled.

// Easing curves (cubic-bezier control points) — usable by Framer Motion and CSS.
export const EASE = {
  soft: [0.65, 0, 0.35, 1], // in/out, general transitions
  aperture: [0.83, 0, 0.17, 1], // matches the Preloader's aperture close
  out: [0.16, 1, 0.3, 1], // expressive ease-out for reveals
}

// CSS-string versions for inline `transition` styles.
export const EASE_CSS = {
  soft: 'cubic-bezier(0.65, 0, 0.35, 1)',
  aperture: 'cubic-bezier(0.83, 0, 0.17, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

// Durations (seconds).
export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 1.2,
}

// 3D tilt cap (degrees) for portfolio cards / tilt surfaces.
export const TILT_MAX_DEG = 8

// Cap WebGL devicePixelRatio on mobile — biggest fill-rate lever.
export const DPR_CAP_MOBILE = 1.5

// Scroll-scrub bands for the pinned WebsiteTransform (scrollYProgress 0..1).
export const SCRUB = {
  ugly: [0, 0.3, 0.4], // visible, hold, fade out
  wipe: [0.28, 0.5], // sweep in
  beautiful: [0.45, 0.58], // reveal
  sparkle: [0.5, 0.85], // active window
}

// Brand colors mirrored from index.css @theme (for canvas/WebGL where CSS vars
// aren't directly readable).
export const BRAND = {
  accent: '#0f31b8',
  primary: '#b3c8f4',
  dark: '#0a0a0f',
}

// Convert a #rrggbb hex to a normalized [r,g,b] triplet for shaders.
export function hexToRgb01(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}
