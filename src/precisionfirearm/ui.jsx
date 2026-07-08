import { createContext, createElement, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MEDIA_BASE } from './content.js'

/* ---- Reveal system (fail-open) --------------------------------------------
 *
 * Content is ALWAYS visible in its resting CSS state. Reveal animation is a
 * progressive enhancement that only engages when `<html>` carries `js-motion`
 * — a class the inline head script adds ONLY after confirming an
 * IntersectionObserver can be constructed. If anything about the JS path is
 * off (no IO support, script error, JS disabled), `js-motion` is absent and
 * every `.reveal` simply renders visible. Nothing can get stuck hidden.
 *
 * A shared observer adds `.is-in` as elements enter view; a scroll and resize
 * sweep and a 1200ms timer are belt-and-suspenders backstops so an in-view
 * element can never stay hidden even if the observer misfires.
 */

const RevealCtx = createContext(null)

function useRevealObserver() {
  return useContext(RevealCtx)
}

export function RevealRoot({ children }) {
  // Lazy init once — a stable value usable during render (no ref read).
  const [observer] = useState(() => {
    const enabled =
      typeof window !== 'undefined' &&
      document.documentElement.classList.contains('js-motion')
    if (!enabled) return null // fail-open: content is already visible via CSS
    // rootMargin 0 (no bottom inset) so elements at the very bottom of the page
    // — which can never scroll above a negative bottom margin — still reveal.
    return new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            obs.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px', threshold: 0.01 },
    )
  })

  useEffect(() => {
    if (!observer) return
    // Belt-and-suspenders sweep: reveal anything at/near the viewport the observer
    // may have missed (fast scroll, anchor jump). Called directly — not via rAF —
    // so it still fires in backgrounded/headless tabs where rAF is throttled.
    const sweep = () => {
      const vh = window.innerHeight
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (el.getBoundingClientRect().top < vh) el.classList.add('is-in')
      })
    }
    window.addEventListener('scroll', sweep, { passive: true })
    window.addEventListener('resize', sweep, { passive: true })
    sweep() // catch above-the-fold immediately
    // Hard backstop: re-sweep shortly after load in case the first paint's
    // measurements were premature. In-view only, so below-fold reveals still animate.
    const t = setTimeout(sweep, 1500)
    return () => {
      window.removeEventListener('scroll', sweep)
      window.removeEventListener('resize', sweep)
      clearTimeout(t)
    }
  }, [observer])

  return <RevealCtx.Provider value={observer}>{children}</RevealCtx.Provider>
}

/** Fade + rise once when scrolled into view. Visible by default (fail-open). */
export function Reveal({ children, delay = 0, as = 'div', className = '', style, ...rest }) {
  const obs = useRevealObserver()
  const setRef = useCallbackRef(obs)
  const d = Math.min(delay, 0.3) // cap stagger so fast scrollers never outrun it
  const mergedStyle = d ? { ...style, '--rd': `${Math.round(d * 1000)}ms` } : style
  return createElement(
    as,
    { ref: setRef, className: `reveal ${className}`.trim(), style: mergedStyle, ...rest },
    children,
  )
}

/** Line-masked headline rise. Fails open: resting state is fully visible; the
 * clip is only applied (momentarily) once `js-motion` + `.is-in` are present. */
export function MaskedLines({ lines, className = '', delay = 0, stagger = 0.06 }) {
  const obs = useRevealObserver()
  const setRef = useCallbackRef(obs)
  return (
    <span ref={setRef} className={`reveal reveal--mask ${className}`.trim()}>
      {lines.map((line, i) => (
        <span
          className="mask-line"
          key={i}
          style={{ '--ml-d': `${Math.round((Math.min(delay, 0.3) + i * stagger) * 1000)}ms` }}
        >
          <span className="ml-i">{line}</span>
        </span>
      ))}
    </span>
  )
}

// Small helper so Reveal/MaskedLines register their node with the shared observer.
function useCallbackRef(obs) {
  return useCallback(
    (node) => {
      if (node && obs) obs.observe(node)
    },
    [obs],
  )
}

/* ---- Counter --------------------------------------------------------------
 * Renders the FINAL value by default (fail-open — a ghosted "0+" reads broken).
 * Only counts up when the cell is scrolled into view from below the fold.
 */
export function Counter({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Already in view at mount → keep final value, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight) return

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        setDisplay(0)
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / (duration * 1000))
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(Math.round(value * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className="tnum">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

/* ---- Media ------------------------------------------------------------------- */

/** Self-hosted looping video that pauses off-screen and lazy-loads below the fold. */
export function LoopVideo({ name, className, eager = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const play = () => video.play().catch(() => {})
    if (eager) play()
    if (!('IntersectionObserver' in window)) {
      play()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.1 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [eager])

  return (
    <video
      ref={ref}
      className={className}
      src={`${MEDIA_BASE}/${name}.mp4`}
      poster={`${MEDIA_BASE}/${name}-poster.jpg`}
      muted
      playsInline
      loop
      autoPlay={eager}
      preload={eager ? 'auto' : 'metadata'}
      aria-hidden="true"
    />
  )
}

/** Graded still image from the media directory (webp with jpg fallback). */
export function Still({ name, alt = '', loading = 'lazy', ...rest }) {
  return (
    <picture>
      <source srcSet={`${MEDIA_BASE}/${name}.webp`} type="image/webp" />
      <img src={`${MEDIA_BASE}/${name}.jpg`} alt={alt} loading={loading} decoding="async" {...rest} />
    </picture>
  )
}

/* ---- Marks ---------------------------------------------------------------------- */

export function CrosshairMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <g stroke="var(--accent)" strokeWidth="4">
        <circle cx="32" cy="32" r="17" />
        <path d="M32 6v12M32 46v12M6 32h12M46 32h12" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="32" r="3.4" fill="var(--accent)" />
    </svg>
  )
}

/** Faint concentric-rings background ornament (precision-instrument motif). */
export function RingsOrnament({ style, size = 520 }) {
  const rings = [60, 120, 180, 240]
  const c = 260
  return (
    <svg
      className="ornament"
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
    >
      {rings.map((r) => (
        <circle key={r} cx={c} cy={c} r={r} stroke="currentColor" strokeWidth="1" />
      ))}
      <path d={`M${c} 0v520M0 ${c}h520`} stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
