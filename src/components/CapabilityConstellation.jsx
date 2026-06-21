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
  const stateRef = useRef({
    nodes: [],
    w: 0,
    h: 0,
    hover: -1,
    selected: new Set(),
    lastSel: -1,
  })
  const inView = useInViewPaused(wrapRef, { threshold: 0.1 })
  const [selDesc, setSelDesc] = useState(null)

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

  // pointer: hover previews (desktop), tap/click SELECTS a node — its links and
  // label stay lit permanently (building up the map) until the page refreshes.
  useEffect(() => {
    const canvas = canvasRef.current
    const pick = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const s = stateRef.current
      let best = -1
      let bestD = 44 * 44
      s.nodes.forEach((n, i) => {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      return best
    }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const onMove = (e) => {
      if (!fine) return
      stateRef.current.hover = pick(e.clientX, e.clientY)
    }
    const onLeave = () => {
      stateRef.current.hover = -1
    }
    const onClick = (e) => {
      const s = stateRef.current
      const i = pick(e.clientX, e.clientY)
      if (i < 0) return
      if (s.selected.has(i)) {
        s.selected.delete(i)
        if (s.lastSel === i) s.lastSel = -1
      } else {
        s.selected.add(i)
        s.lastSel = i
      }
      const last = s.lastSel >= 0 ? s.nodes[s.lastSel] : null
      setSelDesc(last ? { label: last.label, desc: last.desc } : null)
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)
    return () => {
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
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
      const lit = (i) => s.selected.has(i) || s.hover === i

      // drift — selected nodes freeze so the built map stays stable & readable.
      nodes.forEach((n, i) => {
        if (!s.selected.has(i)) {
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
          if (dist < 160) {
            const near = lit(i) || lit(j)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${near ? '179,200,244' : '15,49,184'}, ${
              (near ? 0.55 : 0.18) * (1 - dist / 160)
            })`
            ctx.lineWidth = near ? 1.2 : 0.6
            ctx.stroke()
          }
        }
      }

      // nodes
      nodes.forEach((n, i) => {
        const on = lit(i)
        ctx.beginPath()
        ctx.arc(n.x, n.y, on ? n.r + 3 : n.r, 0, Math.PI * 2)
        ctx.fillStyle = on ? '#b3c8f4' : 'rgba(179,200,244,0.85)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, (on ? n.r + 3 : n.r) * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15,49,184,${on ? 0.4 : 0.1})`
        ctx.fill()
        // label always shown for selected / hovered nodes
        if (on) {
          const tw = ctx.measureText(n.label).width
          const lx = Math.min(n.x + 12, w - tw - 8)
          ctx.font = '600 13px Inter, sans-serif'
          ctx.fillStyle = 'rgba(10,10,15,0.7)'
          ctx.fillRect(lx - 4, n.y - 20, tw + 8, 16)
          ctx.fillStyle = 'rgba(255,255,255,0.95)'
          ctx.fillText(n.label, lx, n.y - 8)
        }
      })

      // tooltip follows the most-recently selected node
      const tip = tipRef.current
      if (tip) {
        if (s.lastSel >= 0) {
          const n = nodes[s.lastSel]
          tip.style.opacity = '1'
          tip.style.transform = `translate(${Math.min(w - 184, Math.max(8, n.x + 14))}px, ${Math.min(h - 70, n.y + 14)}px)`
        } else {
          tip.style.opacity = '0'
        }
      }
    },
    { active: inView }
  )

  return (
    <div ref={wrapRef} className="relative h-[420px] sm:h-[480px] rounded-2xl border border-dark-border bg-dark-card/30 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" />
      <div
        ref={tipRef}
        className="pointer-events-none absolute top-0 left-0 w-[176px] rounded-lg bg-dark/90 border border-primary/20 px-3 py-2 backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: 0 }}
      >
        {selDesc && (
          <>
            <div className="text-xs font-semibold text-primary mb-0.5">{selDesc.label}</div>
            <div className="text-[11px] text-gray-300 leading-snug">{selDesc.desc}</div>
          </>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
        Tap the nodes to map out what we can build
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
