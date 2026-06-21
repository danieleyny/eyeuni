import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

// Initializes Lenis momentum scrolling on the window. Framer Motion's
// useScroll reads window scroll, which Lenis updates — so scrubbed sections
// need no manual sync. Returns the live Lenis instance (or null when disabled,
// e.g. prefers-reduced-motion).
//
// Clean teardown (destroy + cancelAnimationFrame) makes StrictMode's
// double-mount in dev safe.
export function useSmoothScroll({ enabled = true } = {}) {
  const [lenis, setLenis] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Let native touch scrolling drive on mobile; Lenis still smooths it.
      wheelMultiplier: 1,
    })
    lenisRef.current = instance
    setLenis(instance)
    // Dev affordance: drive scroll in automated checks via window.__lenis.
    if (import.meta.env.DEV) window.__lenis = instance

    let rafId
    const raf = (time) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [enabled])

  return lenis
}

export default useSmoothScroll
