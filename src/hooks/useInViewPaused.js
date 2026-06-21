import { useEffect, useState } from 'react'

// Returns true only while `ref` is intersecting the viewport. Used to pause
// animation loops when their surface scrolls offscreen.
export function useInViewPaused(ref, { threshold = 0, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold, rootMargin])

  return inView
}

export default useInViewPaused
