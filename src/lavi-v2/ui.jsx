import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { DICT } from './i18n'

/* ============================================================
   Language context
   ============================================================ */
const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = DICT[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  const toggle = () => setLang((l) => (l === 'en' ? 'he' : 'en'))
  return <LangCtx.Provider value={{ lang, t, toggle, setLang }}>{children}</LangCtx.Provider>
}

export function useLang() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

/* ============================================================
   Reveal — fade/slide in on scroll
   ============================================================ */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ============================================================
   CountUp — animates a number when scrolled into view
   ============================================================ */
export function CountUp({ value, suffix = '', duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

/* ============================================================
   Magnetic — element drifts toward the cursor
   ============================================================ */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y, display: 'inline-flex' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ============================================================
   SectionHeading
   ============================================================ */
export function SectionHeading({ eyebrow, title, sub, center = false, light = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className={`headline mt-5 text-[clamp(1.9rem,5vw,3.2rem)] ${light ? 'text-[#0a0f1e]' : 'text-ink'}`}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className={`mt-4 text-[1.02rem] leading-relaxed ${light ? 'text-[#42506c]' : 'text-muted'}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ============================================================
   Inline icons (stroke, currentColor)
   ============================================================ */
export const Icon = {
  phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.985-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  ),
  robot: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <path d="M12 8V5M12 5a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 12 5Z" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" />
      <path d="M9.5 16.5h5M2 12v3M22 12v3" />
    </svg>
  ),
  wrench: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.3 5l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6a4 4 0 0 0 5-5.3l-2.5 2.5-2.3-.6-.6-2.3 2.5-2.4Z" />
    </svg>
  ),
  panel: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 14h18l-1.5-9h-15L3 14Z" />
      <path d="M12 5v9M3 14h18M7.5 5l-.8 9M16.5 5l.8 9M12 14v6M9 20h6" />
    </svg>
  ),
  drop: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2.5S6 9 6 13.5a6 6 0 0 0 12 0C18 9 12 2.5 12 2.5Z" />
    </svg>
  ),
  bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 9-12h-6.5L13 2Z" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M3 12h18M12 2.5c2.5 2.6 3.8 6 3.8 9.5S14.5 18.9 12 21.5C9.5 18.9 8.2 15.5 8.2 12S9.5 5.1 12 2.5Z" />
    </svg>
  ),
  leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 8-4 12-9 12Z" />
      <path d="M4 21c3-5 6-7 11-8" />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2.5 4 6v6c0 5 3.4 8.3 8 9.5 4.6-1.2 8-4.5 8-9.5V6l-8-3.5Z" />
    </svg>
  ),
  trend: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17l6-6 4 4 7-7M14 8h5v5" />
    </svg>
  ),
}
