import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../hooks/useIntroHandoff'

// A curated, techy glyph pool — binary/hex/code symbols rather than random
// garbage, so the pre-lock shimmer reads as "decoding" instead of noise.
const GLYPHS = '01<>/{}[]=+*#$%01ABCDEF01·:•01'.split('')
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] || '0'

// Renders a single highlighted word as a cinematic decode:
//   • characters shimmer through code-glyphs, then lock left-to-right
//   • each lock fires a scale-pop + bloom flash (CSS .is-locked)
//   • once the word is fully locked, a white overlay wipes away L→R to reveal
//     the gradient underneath, which flashes bright as it lands
// The real word is shown statically until the intro hands off (start), so it is
// never missing and degrades gracefully under reduced motion.
function DecodeWord({ text, start, gradientClass, delay = 0 }) {
  const reduce = useReducedMotion()
  const chars = text.split('')
  // `glyphs` holds the current shimmer character per index; `locked` is how many
  // leading characters have settled; `resolved` flips when the word is complete.
  const [glyphs, setGlyphs] = useState(chars)
  const [locked, setLocked] = useState(reduce || !start ? chars.length : 0)
  const [resolved, setResolved] = useState(reduce || !start)
  const rafRef = useRef(null)

  useEffect(() => {
    if (reduce || !start) {
      setGlyphs(chars)
      setLocked(text.length)
      setResolved(true)
      return
    }

    setResolved(false)
    setLocked(0)

    const per = 150 // ms between characters locking in
    const flicker = 55 // ms between shimmer-glyph swaps (calm, not a strobe)
    const settleAt = chars.map((_, i) => delay + i * per)
    const total = Math.max(...settleAt) + 220

    const pool = chars.map(() => rand())
    let lastFlip = -Infinity
    let prevLocked = 0
    const startT = performance.now()

    const tick = (now) => {
      const t = now - startT

      // Refresh shimmer glyphs only on the flicker cadence.
      if (now - lastFlip >= flicker) {
        for (let i = 0; i < chars.length; i++) pool[i] = rand()
        setGlyphs([...pool])
        lastFlip = now
      }

      // Count how many leading characters have settled.
      const lc = settleAt.reduce((n, s) => (t >= s ? n + 1 : n), 0)
      if (lc !== prevLocked) {
        setLocked(lc)
        prevLocked = lc
      }

      if (t < total) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setGlyphs(chars)
        setLocked(text.length)
        setResolved(true)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    // Hard safety: never leave the word unresolved.
    const safety = setTimeout(() => {
      setGlyphs(chars)
      setLocked(text.length)
      setResolved(true)
    }, total + 700)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text, delay, reduce])

  // Three stacked layers share one grid cell (no layout shift):
  //   1. invisible spacer — reserves the final width
  //   2. gradient layer — the payoff, hidden until the word resolves
  //   3. white/shimmer layer on top — carries the per-character decode, then
  //      wipes itself away to unveil the gradient.
  return (
    <span className="relative inline-grid align-baseline">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {text}
      </span>

      <span
        className={`col-start-1 row-start-1 whitespace-pre ${gradientClass} ${
          resolved ? 'hh-word-flash' : ''
        }`}
        style={{ opacity: resolved ? 1 : 0 }}
        aria-hidden
      >
        {text}
      </span>

      <span
        className={`col-start-1 row-start-1 whitespace-pre text-white ${
          resolved ? 'hh-wipe' : ''
        }`}
        aria-hidden
      >
        {chars.map((ch, i) => {
          const isLocked = i < locked
          return (
            <span
              key={i}
              className={`hh-char ${isLocked ? 'is-locked' : 'is-scramble'}`}
            >
              {ch === ' ' ? ' ' : isLocked ? ch : glyphs[i]}
            </span>
          )
        })}
      </span>
    </span>
  )
}

export default function HeroHeadline() {
  const start = useIntroDone()
  const reduce = useReducedMotion()

  return (
    <h1
      className="relative text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight"
      aria-label="You Dream It, We Build It."
    >
      {/* Scanline sweep — runs once across the whole headline as it decodes. */}
      {start && !reduce && <span className="hh-scanline" aria-hidden />}

      <span aria-hidden>
        You{' '}
        <DecodeWord
          text="Dream"
          start={start}
          delay={300}
          gradientClass="bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent"
        />{' '}
        It,
        <br />
        We{' '}
        <DecodeWord
          text="Build"
          start={start}
          delay={1700}
          gradientClass="bg-gradient-to-r from-accent via-blue-400 to-primary bg-clip-text text-transparent"
        />{' '}
        It.
        {/* Blinking typing caret parked at the end. */}
        {start && <span className="hh-caret" aria-hidden />}
      </span>
    </h1>
  )
}
