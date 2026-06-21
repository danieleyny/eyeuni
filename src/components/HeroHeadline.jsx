import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIntroDone } from '../hooks/useIntroHandoff'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFGHJKLMNPQRSTUVWXYZ'
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] || 'X'

// Scrambles a word into place: characters resolve from random glyphs to the
// final letters, left-to-right. Reduced motion → renders the word immediately.
function ScrambleWord({ text, start, className, delay = 0 }) {
  const reduce = useReducedMotion()
  // Default to the real word so it is NEVER missing — the scramble is purely an
  // enhancement that plays when the intro hands off.
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(null)

  useEffect(() => {
    if (reduce || !start) {
      setDisplay(text)
      return
    }
    // Time-based scheduling (ms) so it completes in real time even if the tab
    // throttles requestAnimationFrame. Each character resolves in sequence.
    const per = 55 // ms between characters settling
    const scrambleWindow = 360 // ms a character spends scrambling before it locks
    const settleAt = text.split('').map((_, i) => delay + i * per)
    const total = Math.max(...settleAt) + scrambleWindow

    const startT = performance.now()
    const tick = (now) => {
      const t = now - startT
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') out += ' '
        else if (t >= settleAt[i]) out += text[i]
        else out += rand() // always show a glyph while scrambling (never empty)
      }
      setDisplay(out)
      if (t < total) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    // Hard safety: never leave the word unresolved.
    const safety = setTimeout(() => setDisplay(text), total + 500)
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(safety)
    }
  }, [start, text, delay, reduce])

  // Overlapping grid: an invisible spacer holds the final width (no layout
  // shift) while the visible layer carries the gradient + scrambling text.
  // The gradient classes sit directly on the text so bg-clip-text works.
  return (
    <span className="relative inline-grid align-baseline">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {text}
      </span>
      <span
        className={`col-start-1 row-start-1 whitespace-pre ${className}`}
        aria-hidden
      >
        {display}
      </span>
    </span>
  )
}

export default function HeroHeadline() {
  const start = useIntroDone()

  return (
    <h1
      className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight"
      aria-label="You Dream It, We Build It."
    >
      <span aria-hidden>
        You{' '}
        <ScrambleWord
          text="Dream"
          start={start}
          delay={120}
          className="bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent"
        />{' '}
        It,
        <br />
        We{' '}
        <ScrambleWord
          text="Build"
          start={start}
          delay={360}
          className="bg-gradient-to-r from-accent via-blue-400 to-primary bg-clip-text text-transparent"
        />{' '}
        It.
      </span>
    </h1>
  )
}
