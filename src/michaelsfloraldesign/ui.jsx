import { createContext, createElement, useCallback, useContext, useEffect, useState, useRef } from 'react'
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
 * sweep and a late timer are belt-and-suspenders backstops so an in-view
 * element can never stay hidden even if the observer misfires.
 */

const RevealCtx = createContext(null)

export function RevealRoot({ children }) {
  const [observer] = useState(() => {
    const enabled =
      typeof window !== 'undefined' &&
      document.documentElement.classList.contains('js-motion')
    if (!enabled) return null // fail-open: content is already visible via CSS
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
    // Reveal anything at/near the viewport the observer may have missed
    // (fast scroll, anchor jump). Direct call — not rAF — so it still fires
    // in backgrounded/headless tabs where rAF is throttled.
    const sweep = () => {
      const vh = window.innerHeight
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (el.getBoundingClientRect().top < vh) el.classList.add('is-in')
      })
    }
    window.addEventListener('scroll', sweep, { passive: true })
    window.addEventListener('resize', sweep, { passive: true })
    sweep() // catch above-the-fold immediately
    const t = setTimeout(sweep, 1500)
    return () => {
      window.removeEventListener('scroll', sweep)
      window.removeEventListener('resize', sweep)
      clearTimeout(t)
    }
  }, [observer])

  return <RevealCtx.Provider value={observer}>{children}</RevealCtx.Provider>
}

function useCallbackRef(obs) {
  return useCallback(
    (node) => {
      if (node && obs) obs.observe(node)
    },
    [obs],
  )
}

/** Fade + rise once when scrolled into view. Visible by default (fail-open). */
export function Reveal({ children, delay = 0, as = 'div', className = '', style, ...rest }) {
  const obs = useContext(RevealCtx)
  const setRef = useCallbackRef(obs)
  const d = Math.min(delay, 0.3) // cap stagger so fast scrollers never outrun it
  const mergedStyle = d ? { ...style, '--rd': `${Math.round(d * 1000)}ms` } : style
  return createElement(
    as,
    { ref: setRef, className: `reveal ${className}`.trim(), style: mergedStyle, ...rest },
    children,
  )
}

/** Line-masked headline rise. Fails open: resting state is fully visible. */
export function MaskedLines({ lines, className = '', delay = 0, stagger = 0.07 }) {
  const obs = useContext(RevealCtx)
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

/* ---- Media ---------------------------------------------------------------- */

const REDUCED = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** Self-hosted looping video that pauses off-screen and lazy-loads below the
 * fold. Under reduced motion the video never mounts — the poster still shows. */
export function LoopVideo({ name, className, eager = false }) {
  const ref = useRef(null)
  const [reduced] = useState(REDUCED)

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
  }, [eager, reduced])

  if (reduced) {
    return (
      <picture className={className}>
        <source srcSet={`${MEDIA_BASE}/${name}-poster.webp`} type="image/webp" />
        <img src={`${MEDIA_BASE}/${name}-poster.jpg`} alt="" className={className} />
      </picture>
    )
  }

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

/** Still image from the media directory (webp with jpg fallback). */
export function Still({ name, alt = '', loading = 'lazy', ...rest }) {
  return (
    <picture>
      <source srcSet={`${MEDIA_BASE}/${name}.webp`} type="image/webp" />
      <img src={`${MEDIA_BASE}/${name}.jpg`} alt={alt} loading={loading} decoding="async" {...rest} />
    </picture>
  )
}

/* ---- Marks ------------------------------------------------------------------ */

/** Single-stem mark — one line, two leaves, in the accent gold. */
export function StemMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 58V14"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M32 30C32 30 30 18 18 16c0 12 10 15 14 14ZM32 42c0 0 2-12 14-14 0 12-10 15-14 14Z"
        fill="var(--accent)"
      />
      <circle cx="32" cy="10" r="4.5" fill="var(--accent)" />
    </svg>
  )
}
