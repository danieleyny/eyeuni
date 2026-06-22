import { useEffect, useState } from 'react'
import { useInViewPaused } from './useInViewPaused'

// Single source of truth for "should this continuous animation run". Returns
// true only while `ref` is near/in the viewport AND the browser tab is visible.
//
// The 200px rootMargin resumes a loop ~200px BEFORE it scrolls into view, so it
// is already running by the time the user sees it (no visible "pop"). Pausing
// when off-screen or when the tab is hidden cuts idle CPU/battery use.
//
// Pairs with `useRafLoop({ active })` for JS loops, `clearInterval` for
// autoplay timers, and `animation-play-state` for CSS keyframes (toggling
// play-state freezes in place and resumes seamlessly — no restart).
export function useActiveWhenVisible(ref, { rootMargin = '200px 0px' } = {}) {
  const inView = useInViewPaused(ref, { rootMargin })
  const [visible, setVisible] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden
  )

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return inView && visible
}

export default useActiveWhenVisible
