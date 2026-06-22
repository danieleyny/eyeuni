import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Counts from `from` to `to` the first time it scrolls into view, then runs to
// completion. Visibility is detected with a getBoundingClientRect poll (scroll +
// resize + a periodic interval) — the same proven approach as useScrollAnimation
// — because IntersectionObserver and native scroll events are unreliable under
// Lenis smooth-scroll / headless. Once started it is never cancelled by scrolling
// away, and a safety timeout guarantees it lands exactly on the target even if
// rAF is throttled. Reduced motion → final value immediately.
export default function CountUp({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : from)

  useEffect(() => {
    if (reduce) {
      setVal(to)
      return
    }
    const el = ref.current
    if (!el) return

    let raf = null
    let safety = null
    let started = false

    const run = () => {
      if (started) return
      started = true
      const startT = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - startT) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setVal(from + (to - from) * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
        else setVal(to)
      }
      raf = requestAnimationFrame(tick)
      // Lands on the exact target even if rAF never ticks (throttled / hidden).
      safety = setTimeout(() => setVal(to), duration + 600)
    }

    const check = () => {
      if (started) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight - 20 && rect.bottom > 0) run()
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    // Fallback for environments where scroll events don't fire (e.g. Lenis).
    const interval = setInterval(check, 250)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearInterval(interval)
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
  }, [reduce, to, from, duration])

  const formatted = val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
