import { useState, useEffect, useRef } from 'react'
import { AnimateIn } from './useScrollAnimation'

// Animation phases
const PHASE_UGLY = 0
const PHASE_WIPE = 1
const PHASE_BEAUTIFUL = 2
const PHASE_RESET = 3

const TIMING = {
  [PHASE_UGLY]: 2800,
  [PHASE_WIPE]: 1800,
  [PHASE_BEAUTIFUL]: 4000,
  [PHASE_RESET]: 1000,
}

// ─── Ugly Website Mockup ────────────────────────────────
function UglyWebsite() {
  return (
    <div className="absolute inset-0 bg-[#f5e6c8] overflow-hidden" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
      {/* Ugly nav */}
      <div className="bg-[#006400] px-2 py-1 flex items-center justify-between border-b-4 border-[#8B4513]">
        <div className="text-[#ffff00] font-bold text-[10px] sm:text-xs drop-shadow-[1px_1px_0px_#000]">
          🏠 Aurelian Lodge & Cabins 🌲
        </div>
        <div className="flex gap-1 sm:gap-2 text-[7px] sm:text-[9px]">
          <span className="text-white underline">Home</span>
          <span className="text-[#ffff00] underline">Rooms</span>
          <span className="text-[#00ffff] underline">Rates</span>
          <span className="text-white underline">Guestbook</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#8B0000] text-white text-[8px] sm:text-[10px] py-0.5 overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_10s_linear_infinite] inline-block">
          🌟 BOOK NOW FOR SUMMER!! 🌟 &nbsp;&nbsp; Call (845) 555-0199 for reservations!!! &nbsp;&nbsp; 🌟 FREE BREAKFAST INCLUDED!! 🌟 &nbsp;&nbsp; Family owned since 1994 &nbsp;&nbsp;
        </div>
      </div>

      <div className="p-2 sm:p-3">
        <div className="text-center">
          <h1 className="text-[#8B4513] text-[11px] sm:text-base font-bold animate-[blink_1s_step-end_infinite]">
            Welcome to Aurelian Lodge!!!
          </h1>
          <div className="text-[#006400] text-[7px] sm:text-[9px] mt-0.5" style={{ fontFamily: 'Times New Roman, serif' }}>
            ★ Accord, New York's #1 Vacation Spot!!! ★
          </div>
          <div className="text-[#ff0000] text-[7px] sm:text-[9px] mt-0.5">
            You are visitor #: <span className="bg-black text-[#00ff00] px-1 font-mono">002,847</span>
          </div>
        </div>

        <div className="mt-2 sm:mt-2 border-2 border-[#8B4513]">
          <div className="grid grid-cols-3 gap-0 text-[7px] sm:text-[9px]">
            <div className="bg-[#006400] text-white p-1.5 border border-[#000]">
              <div className="font-bold underline mb-1">Our Rooms</div>
              <div className="text-[#ffff00]">→ Cabin A - $89</div>
              <div className="text-[#ffff00]">→ Cabin B - $99</div>
              <div className="text-[#ffff00]">→ Suite - $149</div>
              <div className="text-[#ffff00]">→ Campsite - $39</div>
            </div>
            <div className="col-span-2 p-1.5 border border-[#000] bg-white">
              <div className="text-[#8B4513] font-bold text-[8px] sm:text-[10px]">About Our Lodge</div>
              <div className="text-[#000] mt-1 leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
                Nestled in the beautful Hudson Valley!! Our rustic cabins have been welcoming guests for 30 years!! Pet friendly!! Free WiFi in lobby!!
              </div>
              <div className="mt-1 text-[#ff0000] font-bold animate-[blink_0.5s_step-end_infinite]">
                🔥 LABOR DAY SPECIAL!! 20% OFF!! 🔥
              </div>
            </div>
          </div>
        </div>

        {/* Ugly image placeholder + badges */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex gap-1">
            <div className="w-10 h-7 sm:w-14 sm:h-9 bg-[#556B2F] border-2 border-[#8B4513] flex items-center justify-center">
              <span className="text-white text-[5px] sm:text-[6px]">📷 PHOTO<br/>COMING<br/>SOON</span>
            </div>
            <div className="w-10 h-7 sm:w-14 sm:h-9 bg-[#8FBC8F] border-2 border-[#8B4513] flex items-center justify-center">
              <span className="text-[#000] text-[5px] sm:text-[6px] text-center">🌲 SCENIC<br/>VIEWS!!</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="bg-[#000080] text-[#00ff00] px-1 py-0.5 border border-[#808080] text-[6px] sm:text-[7px]">Made with FrontPage</div>
            <div className="bg-[#000080] text-[#ffff00] px-1 py-0.5 border border-[#808080] text-[6px] sm:text-[7px]">Best viewed 800x600</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Beautiful Website Mockup ───────────────────────────
// Luxury boutique hotel concept — dark with warm gold accents, real photos
function BeautifulWebsite() {
  const base = import.meta.env.BASE_URL
  const rooms = [
    { name: 'The Canopy', price: '$420', img: 'room-1.jpg' },
    { name: 'River Stone', price: '$580', img: 'room-2.jpg' },
    { name: 'Summit View', price: '$750', img: 'room-3.jpg' },
  ]
  return (
    <div className="absolute inset-0 bg-[#0c0c0c] overflow-hidden text-white">
      {/* ── Full-bleed hero with real photo ── */}
      <div className="relative h-[62%]">
        <div className="absolute inset-0">
          <img src={`${base}mockup/hotel-hero.jpg`} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent" />
        </div>

        {/* Transparent nav */}
        <div className="relative z-10 px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between">
          <span className="text-[9px] sm:text-[12px] font-light tracking-[0.25em] uppercase text-white/90" style={{ fontFamily: 'Georgia, serif' }}>
            Aurelian
          </span>
          <div className="flex gap-2 sm:gap-4 text-[6px] sm:text-[8px] text-white/50 tracking-wider uppercase">
            <span className="text-white/90">Home</span>
            <span>Rooms</span>
            <span>Dining</span>
            <span className="hidden sm:inline">Experience</span>
          </div>
          <div className="px-2 sm:px-3 py-0.5 sm:py-1 border border-[#c8a97e]/40 text-[5px] sm:text-[7px] text-[#c8a97e] tracking-wider uppercase">
            Reserve
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-[18%] left-0 right-0 text-center z-10 px-4">
          <div className="text-[5px] sm:text-[7px] text-[#c8a97e] tracking-[0.35em] uppercase mb-1 sm:mb-1.5 font-medium">
            Accord, New York
          </div>
          <div className="text-[14px] sm:text-[20px] font-light leading-[1.1] tracking-wide mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Where Luxury Meets
            <br />
            <span className="italic text-[#c8a97e]/90">Nature</span>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3">
            <div className="px-2.5 sm:px-4 py-0.5 sm:py-1 bg-[#c8a97e] text-[#0c0c0c] text-[5px] sm:text-[7px] font-semibold tracking-wider uppercase">
              Book Your Stay
            </div>
            <div className="px-2.5 sm:px-4 py-0.5 sm:py-1 border border-white/30 text-[5px] sm:text-[7px] tracking-wider uppercase text-white/80">
              View Gallery
            </div>
          </div>
        </div>
      </div>

      {/* ── Content below hero ── */}
      <div className="relative bg-[#0c0c0c] px-3 sm:px-5">
        {/* Overlapping stat cards */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 -mt-3 sm:-mt-4 relative z-20">
          {[
            { value: '24', sub: 'Luxury rooms' },
            { value: '4.9', sub: '500+ reviews' },
            { value: '68', sub: 'Private estate' },
          ].map((item) => (
            <div key={item.sub} className="bg-[#161616] border border-white/[0.06] p-1.5 sm:p-2 text-center">
              <div className="text-[9px] sm:text-[13px] font-light text-[#c8a97e]" style={{ fontFamily: 'Georgia, serif' }}>{item.value}</div>
              <div className="text-[5px] sm:text-[7px] text-white/40 tracking-wider uppercase mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Rooms with real photos */}
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center justify-between mb-1 sm:mb-1.5">
            <div>
              <div className="text-[5px] sm:text-[6px] text-[#c8a97e] tracking-[0.3em] uppercase">Accommodations</div>
              <div className="text-[8px] sm:text-[11px] font-light" style={{ fontFamily: 'Georgia, serif' }}>Our Signature Suites</div>
            </div>
            <div className="text-[5px] sm:text-[7px] text-[#c8a97e]/60 tracking-wider uppercase">View all →</div>
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            {rooms.map((room) => (
              <div key={room.name} className="relative overflow-hidden rounded-sm">
                <div className="aspect-[3/2] relative">
                  <img src={`${base}mockup/${room.img}`} alt="" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 h-[65%] bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="text-[5px] sm:text-[7px] font-medium">{room.name}</div>
                    <div className="text-[4px] sm:text-[6px] text-[#c8a97e]">from {room.price}/night</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Wipe Transition Effect ─────────────────────────────
function WipeTransition({ active, children }) {
  return (
    <div
      className="absolute inset-0 z-[10] pointer-events-none flex items-center justify-center"
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Sweeping gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent"
        style={{
          transform: active ? 'translateX(0)' : 'translateX(-110%)',
          transition: 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      />
      {/* Title text centered */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Sparkle Particles (Canvas) ─────────────────────────
function SparkleCanvas({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    // Create rising sparkle particles
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(1 + Math.random() * 2),
      size: 1 + Math.random() * 2,
      life: 1,
      decay: 0.008 + Math.random() * 0.01,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      let alive = false
      particlesRef.current.forEach(p => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(179, 200, 244, ${p.life * 0.6})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15, 49, 184, ${p.life * 0.15})`
        ctx.fill()
      })
      if (alive) animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[3] pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  )
}

// ─── Main Component ─────────────────────────────────────
export default function WebsiteTransform() {
  const [phase, setPhase] = useState(PHASE_UGLY)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !inView) setInView(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [inView])

  useEffect(() => {
    if (!inView) return
    const advancePhase = () => {
      setPhase(prev => {
        const next = prev >= PHASE_RESET ? PHASE_UGLY : prev + 1
        timeoutRef.current = setTimeout(advancePhase, TIMING[next] || TIMING[PHASE_UGLY])
        return next
      })
    }
    timeoutRef.current = setTimeout(advancePhase, TIMING[PHASE_UGLY])
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [inView])

  const showUgly = phase === PHASE_UGLY
  const showWipe = phase === PHASE_WIPE
  const showBeautiful = phase === PHASE_BEAUTIFUL
  const showSparkles = phase === PHASE_BEAUTIFUL

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/50 to-dark" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-[pulse-glow_8s_ease-in-out_infinite_1s]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Before & After —{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              The EYEuni Effect
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See how we transform outdated websites into high-performing, professional online experiences.
          </p>
        </AnimateIn>

        {/* The Laptop Animation */}
        <AnimateIn delay={200}>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Screen bezel */}
              <div className="bg-[#1a1a2e] rounded-t-2xl p-2 sm:p-3 pb-0 border border-dark-border border-b-0">
                <div className="flex justify-center mb-1.5 sm:mb-2">
                  <div className="w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-600" />
                </div>

                {/* Screen */}
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#0a0a0f]">
                  {/* Ugly website */}
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      opacity: showUgly ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  >
                    <UglyWebsite />
                  </div>

                  {/* Beautiful website */}
                  <div
                    className="absolute inset-0 z-[2]"
                    style={{
                      opacity: showBeautiful ? 1 : 0,
                      transition: 'opacity 0.6s ease 0.8s',
                    }}
                  >
                    <BeautifulWebsite />
                  </div>

                  {/* Sparkle particles on reveal */}
                  <SparkleCanvas active={showSparkles} />

                  {/* Wipe transition with "The EYEuni Effect" */}
                  <WipeTransition active={showWipe}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg width="28" height="28" viewBox="0 0 36 36" fill="none" className="drop-shadow-lg">
                        <rect width="36" height="36" rx="8" fill="white" fillOpacity="0.2"/>
                        <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="18" cy="18" r="3" fill="white"/>
                      </svg>
                      <div>
                        <div className="text-[8px] sm:text-[10px] text-white/60 tracking-[0.3em] uppercase font-medium">Introducing</div>
                        <div className="text-lg sm:text-2xl font-black text-white tracking-tight">
                          The EYE<span className="text-white/80">uni</span> Effect
                        </div>
                      </div>
                    </div>
                  </WipeTransition>

                  {/* Glow ring during beautiful phase */}
                  {showBeautiful && (
                    <div className="absolute inset-0 z-[4] pointer-events-none">
                      <div className="absolute inset-[-2px] rounded-sm ring-1 ring-blue-500/30 animate-[pulse-glow_2s_ease-in-out_infinite]" />
                    </div>
                  )}

                  {/* Screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-[50]" />
                </div>
              </div>

              {/* Laptop base */}
              <div className="bg-[#1a1a2e] border border-dark-border border-t-[#2a2a3e] rounded-b-lg h-3 sm:h-4 flex items-center justify-center">
                <div className="w-16 sm:w-24 h-1 rounded-full bg-gray-700" />
              </div>
              <div className="mx-8 h-2 bg-black/40 rounded-full blur-md -mt-1" />
            </div>

            {/* Before/After labels */}
            <div className="flex justify-center gap-8 mt-8">
              <div className={`flex items-center gap-2 transition-all duration-500 ${showUgly ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="text-sm text-gray-400 font-medium">Before</span>
              </div>
              <div className={`flex items-center gap-2 transition-all duration-500 ${showWipe ? 'opacity-100 scale-110' : showBeautiful ? 'opacity-30 scale-95' : 'opacity-30 scale-95'}`}>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">The EYEuni Effect</span>
              </div>
              <div className={`flex items-center gap-2 transition-all duration-500 ${showBeautiful ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-sm text-gray-400 font-medium">After</span>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
