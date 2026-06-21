import { useEffect, useState } from 'react'

// Tiny module-level event bus so the Hero headline "decode" can fire exactly
// when the Preloader's aperture opens. Survives unrelated re-renders.
const STORAGE_KEY = 'eyeuni_intro_seen'
let introDone = false
const listeners = new Set()

export function emitIntroDone() {
  introDone = true
  listeners.forEach((fn) => fn())
}

// Returns true once the intro is done — OR immediately for returning visitors
// (who never see the Preloader, so it never emits).
export function useIntroDone() {
  const [done, setDone] = useState(() => {
    if (introDone) return true
    try {
      // Returning visitor: Preloader returns null and won't emit, so unblock now.
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (done) return
    const fn = () => setDone(true)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [done])

  return done
}
