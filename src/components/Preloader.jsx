import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { emitIntroDone } from '../hooks/useIntroHandoff'
import { useAppReady } from '../hooks/useAppReady'

const WORDMARK = ['E', 'Y', 'E', 'u', 'n', 'i']
const TAGLINE = ['You', 'Dream', 'It,', 'We', 'Build', 'It.']

// ---- Tunables --------------------------------------------------------------
const MIN_INTRO = 2200 // ms — never cut the brand moment short
const MIN_INTRO_RM = 900 // ms — reduced-motion minimum
const MAX_CAP = 5000 // ms — proceed even if readiness never fires (no hang)
const METER_RAMP = 1600 // ms — phase-1 climb toward ~85%
const DIVE_MS = 700 // ms — eye flies into the pupil before the settle cross-fade
const EYE_SCALE = 34 // how far we dive into the pupil

export default function Preloader() {
  const reduceMotion = useReducedMotion()
  const appReady = useAppReady()
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [diving, setDiving] = useState(false)

  const startRef = useRef(0)
  const appReadyRef = useRef(false)
  const divingRef = useRef(false)
  useEffect(() => {
    appReadyRef.current = appReady
  }, [appReady])

  // Decide on mount. ?nointro skips straight to the site.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('nointro')
    ) {
      emitIntroDone()
      return
    }
    setShow(true)
    document.body.style.overflow = 'hidden'
    startRef.current = performance.now()
  }, [])

  // Drive the meter, hold at ~85% until the readiness gate clears, then dive.
  useEffect(() => {
    if (!show) return
    const MIN = reduceMotion ? MIN_INTRO_RM : MIN_INTRO
    let raf

    const tick = (now) => {
      const el = now - startRef.current
      const gated = (appReadyRef.current && el >= MIN) || el >= MAX_CAP
      if (gated) {
        setProgress(100)
        if (!divingRef.current) {
          divingRef.current = true
          startDive()
        }
        return
      }
      // easeOutCubic climb to ~85% during phase 1
      const t = Math.min(1, el / METER_RAMP)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 85))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reduceMotion])

  const startDive = () => {
    if (reduceMotion) {
      // Calm path: emit + a quick fade (no scale/dive).
      emitIntroDone()
      setShow(false)
      return
    }
    setDiving(true)
    // Emit at the start of the settle so the hero decode/scale plays as we land,
    // and drop the overlay so its cross-fade reveals the (already dark) site.
    setTimeout(() => {
      emitIntroDone()
      setShow(false)
    }, DIVE_MS)
  }

  const handleExitComplete = () => {
    document.body.style.overflow = ''
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: reduceMotion ? 0.4 : 0.45, ease: 'easeInOut' },
          }}
          style={{ willChange: 'opacity' }}
        >
          {/* Ambient glow + drifting grid — fades out as the dive begins */}
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            animate={diving ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
              animate={reduceMotion ? {} : { scale: [0.8, 1.1, 0.95], opacity: [0.4, 0.7, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(179,200,244,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(179,200,244,0.6) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Blue bloom rush — sells the speed of the dive */}
          {diving && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(15,49,184,0.55), rgba(179,200,244,0.15) 45%, transparent 70%)',
              }}
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 9, opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />
          )}

          {/* The eye — draws itself (phase 1), then dives into the pupil */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={diving ? { opacity: 0, scale: EYE_SCALE } : { opacity: 1, scale: 1 }}
            transition={
              diving
                ? { duration: 0.85, ease: [0.42, 0, 1, 1] }
                : { duration: 0.6, ease: 'easeOut' }
            }
            style={{ transformOrigin: '60px 60px', willChange: 'transform, opacity' }}
          >
            {/* soft glow disc behind the iris */}
            <motion.circle
              cx="60"
              cy="60"
              r="14"
              fill="#0f31b8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.35] }}
              transition={{ duration: 1.6, delay: 0.6, ease: 'easeOut' }}
              style={{ filter: 'blur(8px)' }}
            />

            {/* eye outline */}
            <motion.path
              d="M16 60C16 60 34 32 60 32C86 32 104 60 104 60C104 60 86 88 60 88C34 88 16 60 16 60Z"
              stroke="#b3c8f4"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0.4 : 1.3, ease: 'easeInOut' }}
            />

            {/* iris ring */}
            <motion.circle
              cx="60"
              cy="60"
              r="18"
              stroke="#b3c8f4"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0.4 : 1, delay: 0.5, ease: 'easeInOut' }}
            />

            {/* pupil */}
            <motion.circle
              cx="60"
              cy="60"
              r="7"
              fill="#b3c8f4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.05 }}
              style={{ transformOrigin: '60px 60px' }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="2.5"
              fill="#0a0a0f"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
              style={{ transformOrigin: '60px 60px' }}
            />
          </motion.svg>

          {/* Brand (wordmark + tagline + meter) — fades as we dive in */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={diving ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Wordmark */}
            <div className="mt-8 flex text-4xl font-black tracking-tight md:text-5xl">
              {WORDMARK.map((ch, i) => (
                <motion.span
                  key={i}
                  className={i < 3 ? 'text-primary' : 'text-white'}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.9 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-2 text-sm font-medium text-gray-400 md:text-base">
              {TAGLINE.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.08, duration: 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Progress meter */}
            <motion.div
              className="mt-10 flex w-56 flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-primary via-blue-400 to-accent"
                  style={{ width: `${progress}%`, transition: 'width 120ms linear' }}
                />
              </div>
              <span className="font-mono text-[11px] tracking-widest text-gray-500">
                {String(progress).padStart(3, '0')}%
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
