import { useEffect, useState } from 'react'

// Tiny module-level event bus so the Hero headline "decode" can fire exactly
// when the Preloader's aperture opens. Survives unrelated re-renders.
let introDone = false
const listeners = new Set()

export function emitIntroDone() {
  introDone = true
  listeners.forEach((fn) => fn())
}

// Returns true once the intro is done. The Preloader plays on every load and
// emits when its aperture opens — so we start false and wait for that signal
// (the ?nointro path emits immediately on mount, unblocking right away).
export function useIntroDone() {
  const [done, setDone] = useState(() => introDone)

  useEffect(() => {
    if (done) return
    // Close the race where emitIntroDone() fired between our initial render and
    // this effect subscribing (e.g. the ?nointro path emits on mount).
    if (introDone) {
      setDone(true)
      return
    }
    const fn = () => setDone(true)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [done])

  return done
}
