import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MEDIA_BASE } from './content.js'

/* ---- Language ------------------------------------------------------------ */

export const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}

/** Resolve a { en, es } pair (or plain string) against the active language. */
export function useT() {
  const { lang } = useLang()
  return (pair) => (typeof pair === 'string' ? pair : pair?.[lang] ?? pair?.en ?? '')
}

/* ---- Motion primitives ----------------------------------------------------- */

const EASE_OUT = [0.16, 1, 0.3, 1]

/** Fade + rise once when scrolled into view, with optional stagger delay. */
export function Reveal({ children, delay = 0, y = 20, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Line-masked rise for headlines: each child renders inside an overflow mask.
 * The in-view trigger lives on the (static) mask — the moving span starts fully
 * clipped, so observing it directly would never fire. */
export function MaskedLines({ lines, className, delay = 0, stagger = 0.08 }) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <motion.span
          className="mask-line"
          key={i}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: 0,
                transition: { duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

/** Animated stat counter — counts up in view; renders final value when reduced motion. */
export function Counter({ value, suffix = '', duration = 1.6 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / (duration * 1000))
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(Math.round(value * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration, reduce])

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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.1 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

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
