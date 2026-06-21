import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { emitIntroDone } from '../hooks/useIntroHandoff'

const WORDMARK = ['E', 'Y', 'E', 'u', 'n', 'i']
const TAGLINE = ['You', 'Dream', 'It,', 'We', 'Build', 'It.']

export default function Preloader() {
  const reduceMotion = useReducedMotion()
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  // Play the intro on every load (including hard refresh).
  useEffect(() => {
    // ?nointro skips the intro (useful for shared links / previews).
    if (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('nointro')
    ) {
      emitIntroDone()
      return
    }

    setShow(true)
    document.body.style.overflow = 'hidden'
  }, [])

  // Drive the progress meter, then dismiss.
  useEffect(() => {
    if (!show) return

    const total = reduceMotion ? 900 : 6200
    const start = performance.now()
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / total)
      // easeOutCubic for a meter that races ahead then settles.
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        // Fire the hero headline decode as the aperture begins to open.
        emitIntroDone()
        setShow(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show, reduceMotion])

  // Restore scrolling once the curtain is gone.
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
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.4 } }
              : {
                  // The overlay closes like a camera aperture, revealing the site.
                  clipPath: 'circle(0% at 50% 50%)',
                  transition: { duration: 1.5, ease: [0.83, 0, 0.17, 1] },
                }
          }
          style={{ willChange: 'clip-path, opacity' }}
        >
          {/* Ambient glow + drifting grid */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
          </div>

          {/* The eye — draws itself, then the iris locks in */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            {/* soft glow disc behind the iris */}
            <motion.circle
              cx="60"
              cy="60"
              r="14"
              fill="#0f31b8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.35] }}
              transition={{ duration: 3, delay: 1.4, ease: 'easeOut' }}
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
              transition={{ duration: reduceMotion ? 0.5 : 2.8, ease: 'easeInOut' }}
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
              transition={{ duration: reduceMotion ? 0.5 : 2.2, delay: 1.6, ease: 'easeInOut' }}
            />

            {/* pupil */}
            <motion.circle
              cx="60"
              cy="60"
              r="7"
              fill="#b3c8f4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 3.4 }}
              style={{ transformOrigin: '60px 60px' }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="2.5"
              fill="#0a0a0f"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.8, duration: 0.5 }}
              style={{ transformOrigin: '60px 60px' }}
            />
          </motion.svg>

          {/* Wordmark */}
          <div className="relative z-10 mt-8 flex text-4xl font-black tracking-tight md:text-5xl">
            {WORDMARK.map((ch, i) => (
              <motion.span
                key={i}
                className={i < 3 ? 'text-primary' : 'text-white'}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 2.6 + i * 0.16, duration: 0.7, ease: 'easeOut' }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-x-2 text-sm font-medium text-gray-400 md:text-base">
            {TAGLINE.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.0 + i * 0.16, duration: 0.6 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Progress meter */}
          <motion.div
            className="relative z-10 mt-10 flex w-56 flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.6, duration: 0.6 }}
          >
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-primary via-blue-400 to-accent"
                style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-widest text-gray-500">
              {String(progress).padStart(3, '0')}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
