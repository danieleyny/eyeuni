import { useEffect, useState } from 'react'

// Resolves true once the above-the-fold is genuinely paintable, so the intro
// can hide a slow load behind the animation. We combine two signals:
//   • document.fonts.ready  — avoids a font-swap flash on the hero headline
//   • the Hero's `eyeuni:hero-ready` event (dispatched after first paint), with
//     a short grace-timeout fallback in case it never fires.
// The Preloader layers a minimum intro time and a hard max cap on top of this.
const HERO_FALLBACK_MS = 1500

export function useAppReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    const state = { fonts: false, hero: false }

    const finish = () => {
      if (done) return
      done = true
      setReady(true)
    }
    const check = () => {
      if (state.fonts && state.hero) finish()
    }

    // Fonts
    const fontsReady =
      typeof document !== 'undefined' && document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve()
    fontsReady.then(() => {
      state.fonts = true
      check()
    })

    // Hero paint signal (or fallback if it never arrives)
    const onHero = () => {
      state.hero = true
      check()
    }
    window.addEventListener('eyeuni:hero-ready', onHero, { once: true })
    const heroFallback = setTimeout(() => {
      state.hero = true
      check()
    }, HERO_FALLBACK_MS)

    return () => {
      window.removeEventListener('eyeuni:hero-ready', onHero)
      clearTimeout(heroFallback)
    }
  }, [])

  return ready
}

export default useAppReady
