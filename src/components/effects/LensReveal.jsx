import { useEffect, useRef, useState } from 'react'
import { useInViewPaused } from '../../hooks/useInViewPaused'
import { useRafLoop } from '../../hooks/useRafLoop'
import { MockSite, WIDGETS } from './lens/LensWidgets'

// ---- Tunables (easy to adjust) --------------------------------------------
const LENS_R = 84 // lens reveal radius (px) — matches the eye ring below
const LENS_BOX = 190 // size of the lens DOM box (must fit the ring + crosshair)
const PROX = 132 // distance (px) at which a hotspot's widget animates
const SMOOTH = 0.16 // lens easing toward its target (higher = snappier)
const R_SMOOTH = 0.2 // reveal-radius easing (for the "reveal everything" grow)
const DWELL = 0.65 // seconds the auto-drift pauses on each hotspot
const RESUME_DELAY = 2.2 // seconds after release before auto-drift resumes
const TAP_SLOP = 12 // px of movement under which a touch counts as a tap

// Hotspots in panel fractions, ordered so the auto-drift sweeps a clean loop.
// Kept inside ~[0.28, 0.72] × [0.24, 0.78] so the lens ring never clips the edge.
const HOTSPOTS = [
  { id: 'booking', x: 0.28, y: 0.26 },
  { id: 'chat', x: 0.72, y: 0.24 },
  { id: 'pay', x: 0.72, y: 0.54 },
  { id: 'notify', x: 0.71, y: 0.78 },
  { id: 'store', x: 0.29, y: 0.78 },
  { id: 'analytics', x: 0.28, y: 0.55 },
]

// The lens visual: an eye/portal (reveal ring, iris, eyelid arcs, crosshair).
function LensEye() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: '0 0 55px 8px rgba(15,49,184,0.5)' }}
      />
      <svg viewBox="0 0 190 190" className="lens-pulse absolute inset-0 h-full w-full">
        {/* soft accent halo just inside the ring */}
        <circle cx="95" cy="95" r="84" fill="none" stroke="#0f31b8" strokeWidth="7" opacity="0.25" />
        {/* primary reveal ring (radius matches LENS_R) */}
        <circle cx="95" cy="95" r="84" fill="none" stroke="#b3c8f4" strokeWidth="2.5" opacity="0.95" />
        {/* iris ring */}
        <circle cx="95" cy="95" r="56" fill="none" stroke="#b3c8f4" strokeWidth="1.5" opacity="0.4" />
        {/* eyelid arcs → reads as the eye logo, not a magnifier */}
        <path
          d="M17 95 C 17 95, 50 60, 95 60 C 140 60, 173 95, 173 95"
          fill="none"
          stroke="#b3c8f4"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M17 95 C 17 95, 50 130, 95 130 C 140 130, 173 95, 173 95"
          fill="none"
          stroke="#b3c8f4"
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* crosshair + center */}
        <line x1="95" y1="78" x2="95" y2="112" stroke="#b3c8f4" strokeWidth="1" opacity="0.3" />
        <line x1="78" y1="95" x2="112" y2="95" stroke="#b3c8f4" strokeWidth="1" opacity="0.3" />
        <circle cx="95" cy="95" r="2.5" fill="#b3c8f4" opacity="0.7" />
      </svg>
    </div>
  )
}

export default function LensReveal() {
  const panelRef = useRef(null)
  const liveRef = useRef(null)
  const lensRef = useRef(null)
  const inView = useInViewPaused(panelRef, { threshold: 0.15 })
  const [active, setActive] = useState(() => HOTSPOTS.map(() => false))
  const [revealAll, setRevealAll] = useState(false)

  // All per-frame mutable state lives here (no React re-render per frame).
  const S = useRef({
    pos: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    size: { w: 0, h: 0 },
    mode: 'auto', // 'auto' | 'pointer' | 'drag'
    tourIdx: 0,
    dwell: 0,
    resumeAt: 0,
    now: 0,
    R: LENS_R,
    dragging: false,
    revealAll: false,
    active: HOTSPOTS.map(() => false),
    downAt: null,
  })

  // Track panel size; seed the lens at center on first measure.
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      S.current.size = { w: r.width, h: r.height }
      if (S.current.pos.x === 0 && S.current.pos.y === 0) {
        S.current.pos = { x: r.width / 2, y: r.height / 2 }
        S.current.target = { ...S.current.pos }
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Reveal-everything toggle: freeze the lens, light all widgets / resume drift.
  useEffect(() => {
    const s = S.current
    s.revealAll = revealAll
    if (revealAll) {
      s.target = { ...s.pos }
      s.active = HOTSPOTS.map(() => true)
      setActive(HOTSPOTS.map(() => true))
    } else {
      s.mode = 'auto'
      s.dwell = 0
    }
  }, [revealAll])

  const local = (e) => {
    const r = panelRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const scheduleResume = () => {
    S.current.resumeAt = S.current.now + RESUME_DELAY
  }

  // Desktop: lens follows the cursor over the panel.
  const onPanelPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || S.current.dragging || S.current.revealAll) return
    S.current.mode = 'pointer'
    S.current.target = local(e)
    S.current.resumeAt = 0
  }
  const onPanelPointerLeave = (e) => {
    if (e.pointerType === 'mouse') scheduleResume()
  }
  // Touch: a tap on the panel background moves the lens there (no scroll hijack).
  const onPanelPointerDown = (e) => {
    if (e.pointerType === 'mouse') return
    S.current.downAt = { x: e.clientX, y: e.clientY }
  }
  const onPanelPointerUp = (e) => {
    if (e.pointerType === 'mouse' || !S.current.downAt || S.current.revealAll) return
    const dx = e.clientX - S.current.downAt.x
    const dy = e.clientY - S.current.downAt.y
    S.current.downAt = null
    if (Math.hypot(dx, dy) < TAP_SLOP) {
      S.current.mode = 'pointer'
      S.current.target = local(e)
      scheduleResume()
    }
  }

  // The lens itself is the drag handle (touch-action:none lives on it only).
  const onLensPointerDown = (e) => {
    if (S.current.revealAll) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    S.current.dragging = true
    S.current.mode = 'drag'
    S.current.target = local(e)
    S.current.resumeAt = 0
    if (e.cancelable) e.preventDefault()
  }
  const onLensPointerMove = (e) => {
    if (!S.current.dragging) return
    S.current.target = local(e)
    if (e.cancelable) e.preventDefault()
  }
  const onLensPointerUp = (e) => {
    if (!S.current.dragging) return
    S.current.dragging = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    scheduleResume()
  }

  useRafLoop(
    (dt) => {
      const s = S.current
      const { w, h } = s.size
      if (!w || !liveRef.current || !lensRef.current) return
      s.now += dt
      const hp = (i) => ({ x: HOTSPOTS[i].x * w, y: HOTSPOTS[i].y * h })

      // Drive the target: auto-drift tour, or resume after interaction.
      if (s.mode === 'auto') {
        const t = hp(s.tourIdx)
        s.target = t
        if (Math.hypot(s.pos.x - t.x, s.pos.y - t.y) < 10) {
          s.dwell += dt
          if (s.dwell > DWELL) {
            s.tourIdx = (s.tourIdx + 1) % HOTSPOTS.length
            s.dwell = 0
          }
        }
      } else if (s.resumeAt && s.now >= s.resumeAt && !s.dragging) {
        s.mode = 'auto'
        s.resumeAt = 0
        s.dwell = 0
        // continue the tour from the nearest hotspot for a smooth handoff
        let best = 0
        let bd = Infinity
        HOTSPOTS.forEach((_, i) => {
          const p = hp(i)
          const d = Math.hypot(p.x - s.pos.x, p.y - s.pos.y)
          if (d < bd) {
            bd = d
            best = i
          }
        })
        s.tourIdx = best
      }

      // Ease position toward target (frame-rate independent).
      const ek = 1 - Math.pow(1 - SMOOTH, dt * 60)
      s.pos.x += (s.target.x - s.pos.x) * ek
      s.pos.y += (s.target.y - s.pos.y) * ek

      // Ease the reveal radius (grows huge for "reveal everything").
      const targetR = s.revealAll ? Math.hypot(w, h) + 40 : LENS_R
      const rk = 1 - Math.pow(1 - R_SMOOTH, dt * 60)
      s.R += (targetR - s.R) * rk

      const clip = `circle(${s.R.toFixed(1)}px at ${s.pos.x.toFixed(1)}px ${s.pos.y.toFixed(1)}px)`
      liveRef.current.style.clipPath = clip
      liveRef.current.style.webkitClipPath = clip

      lensRef.current.style.transform = `translate3d(${(s.pos.x - LENS_BOX / 2).toFixed(1)}px, ${(
        s.pos.y -
        LENS_BOX / 2
      ).toFixed(1)}px, 0)`
      lensRef.current.style.opacity = s.revealAll ? '0' : '1'

      // Proximity → widget activation (only when not fully revealed). Sets React
      // state ONLY when the active set actually changes (not every frame).
      if (!s.revealAll) {
        const next = HOTSPOTS.map((_, i) => {
          const p = hp(i)
          return Math.hypot(p.x - s.pos.x, p.y - s.pos.y) < PROX
        })
        let changed = false
        for (let i = 0; i < next.length; i++) {
          if (next[i] !== s.active[i]) {
            changed = true
            break
          }
        }
        if (changed) {
          s.active = next
          setActive(next)
        }
      }
    },
    { active: inView }
  )

  return (
    <div>
      <div
        ref={panelRef}
        className="relative h-[460px] select-none overflow-hidden rounded-2xl border border-dark-border bg-dark-card/30 sm:h-[520px]"
        onPointerMove={onPanelPointerMove}
        onPointerLeave={onPanelPointerLeave}
        onPointerDown={onPanelPointerDown}
        onPointerUp={onPanelPointerUp}
      >
        {/* Base dormant layer */}
        <div className="absolute inset-0 opacity-60 grayscale-[0.35]">
          <MockSite />
        </div>

        {/* Live layer, clipped to the lens */}
        <div
          ref={liveRef}
          className="absolute inset-0"
          style={{
            clipPath: `circle(${LENS_R}px at 50% 50%)`,
            WebkitClipPath: `circle(${LENS_R}px at 50% 50%)`,
            willChange: 'clip-path',
          }}
        >
          <MockSite live />
          {HOTSPOTS.map((hsp, i) => {
            const W = WIDGETS[hsp.id]
            return (
              <div
                key={hsp.id}
                className="absolute"
                style={{ left: `${hsp.x * 100}%`, top: `${hsp.y * 100}%`, transform: 'translate(-50%, -50%)' }}
              >
                <W active={active[i]} />
              </div>
            )
          })}
        </div>

        {/* The lens (drag handle) */}
        <div
          ref={lensRef}
          className="absolute left-0 top-0"
          style={{
            width: LENS_BOX,
            height: LENS_BOX,
            touchAction: 'none',
            cursor: 'grab',
            willChange: 'transform, opacity',
            transition: 'opacity 0.45s ease',
          }}
          onPointerDown={onLensPointerDown}
          onPointerMove={onLensPointerMove}
          onPointerUp={onLensPointerUp}
          onPointerCancel={onLensPointerUp}
        >
          <LensEye />
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[11px] text-gray-500">
          Drag the lens — or watch it explore
        </div>
      </div>

      {/* Reveal everything */}
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setRevealAll((v) => !v)}
          aria-label={revealAll ? 'Return to lens mode' : 'Reveal every capability at once'}
          className="rounded-xl border border-primary/30 bg-dark-card/60 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          {revealAll ? 'Back to the lens' : 'Reveal everything'}
        </button>
      </div>
    </div>
  )
}
