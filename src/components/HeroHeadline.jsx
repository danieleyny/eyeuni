import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../hooks/useIntroHandoff'

// A curated, techy glyph pool — heavy on binary/hex with code symbols, so the
// pre-lock shimmer reads as fast "decryption" rather than random garbage.
const GLYPHS = '01010110<>/\\|{}[]=+*#$%&01ABCDEF89·:×01101'.split('')
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] || '0'

// Renders a single highlighted word. The decode (shimmer → per-character lock)
// resolves the word in WHITE; it only takes on its gradient when `colorize`
// flips true — which the parent times to the moment the highlight sweep passes
// over it, so the blue lands exactly under the light bar.
function DecodeWord({ text, start, gradientClass, delay = 0, colorize }) {
  const reduce = useReducedMotion()
  const chars = text.split('')
  // `glyphs` = current shimmer char per index; `locked` = how many leading
  // characters have settled into their real (white) letter.
  const [glyphs, setGlyphs] = useState(chars)
  const [locked, setLocked] = useState(reduce || !start ? chars.length : 0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (reduce || !start) {
      setGlyphs(chars)
      setLocked(text.length)
      return
    }

    setLocked(0)

    const per = 90 // ms between characters locking in (cascading decrypt)
    const flicker = 28 // ms between shimmer-glyph swaps (frantic ~35Hz cycle)
    // `hold` keeps EVERY character cycling through code-glyphs for a good while
    // before it locks, so the encryption effect reads for longer.
    const hold = 750
    const settleAt = chars.map((_, i) => delay + hold + i * per)
    const total = Math.max(...settleAt) + 220

    const pool = chars.map(() => rand())
    let lastFlip = -Infinity
    let prevLocked = 0
    const startT = performance.now()

    const tick = (now) => {
      const t = now - startT
      if (now - lastFlip >= flicker) {
        for (let i = 0; i < chars.length; i++) pool[i] = rand()
        setGlyphs([...pool])
        lastFlip = now
      }
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
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    // Hard safety: never leave the word unresolved.
    const safety = setTimeout(() => {
      setGlyphs(chars)
      setLocked(text.length)
    }, total + 700)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text, delay, reduce])

  // Before the intro hands off (or under reduced motion), just show the final
  // gradient word — never missing, no animation.
  if (reduce || !start) {
    return (
      <span className="relative inline-grid align-baseline">
        <span className={`whitespace-pre ${gradientClass}`} aria-hidden>
          {text}
        </span>
      </span>
    )
  }

  // Active path: three stacked layers in one grid cell (no layout shift):
  //   1. invisible spacer — reserves the final width
  //   2. gradient payoff — hidden until the highlight colorizes the word
  //   3. white decode layer on top — carries the shimmer/lock, then wipes away
  //      left→right (in the highlight's wake) to unveil the gradient.
  return (
    <span className="relative inline-grid align-baseline">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {text}
      </span>

      <span
        className={`col-start-1 row-start-1 whitespace-pre ${gradientClass} ${
          colorize ? 'hh-word-flash' : ''
        }`}
        style={{ opacity: colorize ? 1 : 0 }}
        aria-hidden
      >
        {text}
      </span>

      <span
        className={`col-start-1 row-start-1 whitespace-pre text-white ${
          colorize ? 'hh-wipe' : ''
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
              {ch === ' ' ? ' ' : isLocked ? ch : glyphs[i]}
            </span>
          )
        })}
      </span>
    </span>
  )
}

// Choreography (ms from the intro handoff):
//   0 ............. words shimmer + lock into place, in WHITE
//   ~SWEEP_AT ..... a single highlight bar starts sweeping left→right
//   ~COLOR_AT ..... bar reaches the highlighted words → they turn blue together,
//                   each wiping its gradient in under the bar's trailing edge
const SWEEP_AT = 1650
const COLOR_AT = 2200

export default function HeroHeadline() {
  const start = useIntroDone()
  const reduce = useReducedMotion()
  const [sweep, setSweep] = useState(false)
  const [colorize, setColorize] = useState(false)

  useEffect(() => {
    if (!start) return
    if (reduce) {
      setColorize(true)
      return
    }
    setSweep(false)
    setColorize(false)
    const t1 = setTimeout(() => setSweep(true), SWEEP_AT)
    const t2 = setTimeout(() => setColorize(true), COLOR_AT)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [start, reduce])

  return (
    <h1
      className="relative text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight"
      aria-label="You Dream It, We Build It."
    >
      {/* Single highlight bar — sweeps across once and paints the words blue. */}
      {sweep && !reduce && <span className="hh-scanline" aria-hidden />}

      <span aria-hidden>
        You{' '}
        <DecodeWord
          text="Dream"
          start={start}
          delay={200}
          colorize={colorize}
          gradientClass="bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent"
        />{' '}
        It,
        <br />
        We{' '}
        <DecodeWord
          text="Build"
          start={start}
          delay={450}
          colorize={colorize}
          gradientClass="bg-gradient-to-r from-accent via-blue-400 to-primary bg-clip-text text-transparent"
        />{' '}
        It.
        {/* Blinking typing caret parked at the end. */}
        {start && <span className="hh-caret" aria-hidden />}
      </span>
    </h1>
  )
}
