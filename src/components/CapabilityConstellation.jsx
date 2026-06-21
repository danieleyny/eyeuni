import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { AnimateIn } from './useScrollAnimation'
import { useInViewPaused } from '../hooks/useInViewPaused'
import { useRafLoop } from '../hooks/useRafLoop'

const CAPS = [
  { label: 'E-commerce', desc: 'Sell products with secure checkout & inventory.' },
  { label: 'Booking Systems', desc: 'Let customers schedule and pay in a few taps.' },
  { label: 'Dashboards', desc: 'Real-time operational dashboards & admin panels.' },
  { label: 'AI Features', desc: 'Chatbots, search and smart automations.' },
  { label: 'Stripe', desc: 'Payments, subscriptions and invoicing.' },
  { label: 'Auth', desc: 'Secure logins, roles and member areas.' },
  { label: 'CMS', desc: 'Edit your own content — no developer needed.' },
  { label: 'Analytics', desc: 'Know exactly how visitors use your site.' },
  { label: 'Integrations', desc: 'Connect the tools you already run on.' },
  { label: 'SEO', desc: 'Built to be found on Google.' },
  { label: 'Maps & Geo', desc: 'Location search, store finders and routing.' },
  { label: 'Notifications', desc: 'Email, SMS and push that keep users engaged.' },
]

function Constellation() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const tipRef = useRef(null)
  const stateRef = useRef({ nodes: [], w: 0, h: 0, active: -1, pointer: { x: -1, y: -1 } })
  const inView = useInViewPaused(wrapRef, { threshold: 0.1 })
  const [activeLabel, setActiveLabel] = useState(null)

  // init / resize
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')

    const setup = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = rect.width
      const h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = stateRef.current
      s.w = w
      s.h = h
      if (s.nodes.length === 0) {
        s.nodes = CAPS.map((c, i) => ({
          ...c,
          x: (0.12 + 0.76 * ((i * 0.31) % 1)) * w,
          y: (0.15 + 0.7 * ((i * 0.53) % 1)) * h,
          vx: (((i * 7) % 5) - 2) * 0.06,
          vy: (((i * 3) % 5) - 2) * 0.06,
          r: 4 + (i % 3),
        }))
      }
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  // pointer
  useEffect(() => {
    const canvas = canvasRef.current
    const pick = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const s = stateRef.current
      s.pointer = { x, y }
      let best = -1
      let bestD = 40 * 40
      s.nodes.forEach((n, i) => {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      s.active = best
      setActiveLabel(best >= 0 ? s.nodes[best].label : null)
    }
    const onMove = (e) => pick(e.clientX, e.clientY)
    const onLeave = () => {
      stateRef.current.active = -1
      stateRef.current.pointer = { x: -1, y: -1 }
      setActiveLabel(null)
    }
    const onTouch = (e) => {
      if (e.touches[0]) pick(e.touches[0].clientX, e.touches[0].clientY)
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('touchstart', onTouch, { passive: true })
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('touchstart', onTouch)
      canvas.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useRafLoop(
    () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const s = stateRef.current
      const { w, h, nodes } = s
      ctx.clearRect(0, 0, w, h)

      // drift
      nodes.forEach((n, i) => {
        if (i !== s.active) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 20 || n.x > w - 20) n.vx *= -1
          if (n.y < 20 || n.y > h - 20) n.vy *= -1
        }
      })

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 150) {
            const near = s.active === i || s.active === j
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${near ? '179,200,244' : '15,49,184'}, ${
              (near ? 0.5 : 0.22) * (1 - dist / 150)
            })`
            ctx.lineWidth = near ? 1 : 0.6
            ctx.stroke()
          }
        }
      }

      // nodes
      nodes.forEach((n, i) => {
        const active = i === s.active
        ctx.beginPath()
        ctx.arc(n.x, n.y, active ? n.r + 3 : n.r, 0, Math.PI * 2)
        ctx.fillStyle = active ? '#b3c8f4' : 'rgba(179,200,244,0.85)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, (active ? n.r + 3 : n.r) * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15,49,184,${active ? 0.35 : 0.12})`
        ctx.fill()
        // label text for active or always for larger nodes
        if (active) {
          ctx.fillStyle = 'rgba(255,255,255,0.95)'
          ctx.font = '600 13px Inter, sans-serif'
          ctx.fillText(n.label, n.x + 12, n.y - 8)
        }
      })

      // position the description tooltip near the active node
      const tip = tipRef.current
      if (tip) {
        if (s.active >= 0) {
          const n = nodes[s.active]
          tip.style.opacity = '1'
          tip.style.transform = `translate(${Math.min(w - 180, n.x + 14)}px, ${n.y + 12}px)`
        } else {
          tip.style.opacity = '0'
        }
      }
    },
    { active: inView }
  )

  const activeDesc = activeLabel
    ? CAPS.find((c) => c.label === activeLabel)?.desc
    : null

  return (
    <div ref={wrapRef} className="relative h-[420px] sm:h-[480px] rounded-2xl border border-dark-border bg-dark-card/30 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" />
      <div
        ref={tipRef}
        className="pointer-events-none absolute top-0 left-0 max-w-[170px] rounded-lg bg-dark/90 border border-primary/20 px-3 py-2 text-xs text-gray-300 backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: 0 }}
      >
        {activeDesc}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
        Tap or hover a node to explore
      </div>
    </div>
  )
}

function StaticGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {CAPS.map((c) => (
        <div key={c.label} className="rounded-xl border border-dark-border bg-dark-card/50 p-4">
          <div className="text-sm font-semibold text-primary">{c.label}</div>
          <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default function CapabilityConstellation() {
  const reduce = useReducedMotion()
  return (
    <section id="capabilities" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            One team,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              endless capabilities
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Whatever your business needs to run online, we can design and build it —
            and connect it to the tools you already use.
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>{reduce ? <StaticGrid /> : <Constellation />}</AnimateIn>
      </div>
    </section>
  )
}
