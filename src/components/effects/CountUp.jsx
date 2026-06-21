import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useInViewPaused } from '../../hooks/useInViewPaused'

// Counts from `from` to `to` when scrolled into view. Time-based (real ms) so
// it completes even under rAF throttling, with a safety snap. Reduced motion →
// final value immediately.
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
  const inView = useInViewPaused(ref, { threshold: 0.4 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (reduce) {
      setVal(to)
      return
    }
    if (!inView) return
    const startT = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - startT) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    const safety = setTimeout(() => setVal(to), duration + 500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
  }, [inView, to, from, duration, reduce])

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
