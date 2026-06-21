import { useEffect, useRef } from 'react'

// Runs `callback(dtSeconds)` on requestAnimationFrame, but ONLY while
// `active` and the tab is visible. This is the single enforcement point for
// "pause offscreen + tab hidden" across every animated surface.
//
// callback is held in a ref so the loop never restarts when it changes
// identity — only `active` toggles the loop.
export function useRafLoop(callback, { active = true } = {}) {
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    if (!active) return

    let rafId = null
    let last = null

    const frame = (now) => {
      // visibilitychange also cancels, but guard here too for safety.
      if (document.visibilityState === 'hidden') return
      const dt = last == null ? 0 : (now - last) / 1000
      last = now
      cbRef.current(dt)
      rafId = requestAnimationFrame(frame)
    }

    const start = () => {
      if (rafId == null) {
        last = null
        rafId = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }

    document.addEventListener('visibilitychange', onVisibility)
    if (document.visibilityState === 'visible') start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active])
}

export default useRafLoop
