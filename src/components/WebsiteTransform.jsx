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
    <div className="absolute inset-0 bg-[#ffff00] overflow-hidden" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
      {/* Ugly nav */}
      <div className="bg-[#ff00ff] px-2 py-1 flex items-center justify-between border-b-4 border-[#00ff00]">
        <div className="text-[#00ff00] font-bold text-[10px] sm:text-xs drop-shadow-[1px_1px_0px_#000]">
          ★ Bob's Amazing Website ★
        </div>
        <div className="flex gap-1 sm:gap-2 text-[7px] sm:text-[9px]">
          <span className="text-white underline">Home</span>
          <span className="text-[#ffff00] underline">About</span>
          <span className="text-[#00ffff] underline">Links</span>
          <span className="text-white underline">Guestbook</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#ff0000] text-white text-[8px] sm:text-[10px] py-0.5 overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_8s_linear_infinite] inline-block">
          ⚠️ UNDER CONSTRUCTION ⚠️ &nbsp;&nbsp; Welcome to my website!!! &nbsp;&nbsp; Please sign my guestbook!!! &nbsp;&nbsp; ⚠️ UNDER CONSTRUCTION ⚠️ &nbsp;&nbsp; Best viewed in IE 6.0 &nbsp;&nbsp;
        </div>
      </div>

      <div className="p-2 sm:p-3">
        <div className="text-center">
          <h1 className="text-[#0000ff] text-sm sm:text-lg font-bold animate-[blink_1s_step-end_infinite]">
            Welcome To My WebSite!!!
          </h1>
          <div className="text-[#ff0000] text-[8px] sm:text-[10px] mt-1">
            You are visitor #: <span className="bg-black text-[#00ff00] px-1 font-mono">004,721</span>
          </div>
        </div>

        <div className="mt-2 sm:mt-3 border-2 border-[#0000ff]" style={{ background: 'repeating-linear-gradient(45deg, #fff, #fff 5px, #eee 5px, #eee 10px)' }}>
          <div className="grid grid-cols-3 gap-0 text-[7px] sm:text-[9px]">
            <div className="bg-[#008080] text-white p-1.5 border border-[#000]">
              <div className="font-bold underline mb-1">Navigation</div>
              <div className="text-[#ffff00]">→ Home</div>
              <div className="text-[#ffff00]">→ Products</div>
              <div className="text-[#ffff00]">→ Contact</div>
              <div className="text-[#ffff00]">→ Links</div>
            </div>
            <div className="col-span-2 p-1.5 border border-[#000] bg-white">
              <div className="text-[#800080] font-bold text-[8px] sm:text-[10px]">About Us</div>
              <div className="text-[#000] mt-1 leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
                We are the BEST company in the world!! Click here to learn more about our AMAZING products!!!
              </div>
              <div className="mt-1 text-[#ff0000] font-bold animate-[blink_0.5s_step-end_infinite]">
                🔥 HOT DEALS! CLICK NOW!!! 🔥
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2 text-[7px] sm:text-[8px]">
          <div className="bg-[#000080] text-[#00ff00] px-1 py-0.5 border border-[#808080]">Made with Notepad</div>
          <div className="bg-[#000080] text-[#ffff00] px-1 py-0.5 border border-[#808080]">Best viewed 800x600</div>
        </div>
      </div>
    </div>
  )
}

// ─── Beautiful Website Mockup (much richer) ─────────────
function BeautifulWebsite() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0f] overflow-hidden text-white">
      {/* Modern nav */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/80" />
          </div>
          <span className="font-bold text-[10px] sm:text-xs tracking-tight">Luxe<span className="text-blue-400">Brand</span></span>
        </div>
        <div className="flex gap-2 sm:gap-3 text-[7px] sm:text-[9px] text-gray-400">
          <span className="text-white">Home</span>
          <span>Services</span>
          <span>About</span>
          <span className="hidden sm:inline">Contact</span>
        </div>
        <div className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[6px] sm:text-[8px] font-medium shadow-lg shadow-blue-600/20">Get Started</div>
      </div>

      {/* Hero section with background gradient */}
      <div className="relative">
        {/* Background gradient orb */}
        <div className="absolute top-2 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-600/20 rounded-full blur-2xl" />
        <div className="absolute top-8 right-12 w-10 h-10 sm:w-16 sm:h-16 bg-indigo-500/15 rounded-full blur-xl" />

        <div className="px-3 sm:px-4 pt-3 sm:pt-4 relative">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-[5px] sm:text-[7px] text-blue-400 font-semibold tracking-[0.2em] uppercase mb-0.5 sm:mb-1">Premium Solutions</div>
              <div className="text-[11px] sm:text-[15px] font-extrabold leading-[1.1] mb-1 sm:mb-1.5">
                Elevate Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Digital Presence</span>
              </div>
              <div className="text-[6px] sm:text-[8px] text-gray-400 leading-relaxed mb-1.5 sm:mb-2 max-w-[85%]">
                Beautiful, high-performance websites that convert visitors into loyal customers.
              </div>
              <div className="flex gap-1.5">
                <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[5px] sm:text-[7px] font-semibold shadow-lg shadow-blue-600/25 flex items-center gap-0.5">
                  Get Started <span className="text-[8px]">→</span>
                </div>
                <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-white/15 rounded-full text-[5px] sm:text-[7px] text-gray-300 hover:border-white/30">View Work</div>
              </div>
            </div>
            {/* Hero image placeholder */}
            <div className="w-20 h-16 sm:w-28 sm:h-22 rounded-xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-white/10 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20" />
              {/* Browser mockup inside */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-md bg-[#12121a] border border-white/10 overflow-hidden">
                <div className="h-1 sm:h-1.5 bg-[#1a1a2e] flex items-center gap-0.5 px-1">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-red-400/60" />
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-yellow-400/60" />
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-green-400/60" />
                </div>
                <div className="p-1">
                  <div className="h-1 w-8 bg-blue-500/30 rounded-full mb-0.5" />
                  <div className="h-0.5 w-12 bg-white/10 rounded-full mb-0.5" />
                  <div className="h-0.5 w-10 bg-white/10 rounded-full" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/30 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-3 sm:px-4 mt-2 sm:mt-3">
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
          {[
            { num: '500+', label: 'Projects', icon: '📊' },
            { num: '98%', label: 'Satisfaction', icon: '⭐' },
            { num: '24/7', label: 'Support', icon: '🛡️' },
            { num: '50+', label: 'Clients', icon: '🤝' },
          ].map((s) => (
            <div key={s.label} className="text-center py-1 sm:py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[6px] sm:text-[8px] mb-0.5">{s.icon}</div>
              <div className="text-[8px] sm:text-[11px] font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{s.num}</div>
              <div className="text-[5px] sm:text-[7px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service cards */}
      <div className="px-3 sm:px-4 mt-2 sm:mt-3">
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
          {[
            { title: 'Web Design', color: 'from-blue-500/20 to-blue-600/5', icon: '🎨' },
            { title: 'Development', color: 'from-indigo-500/20 to-indigo-600/5', icon: '⚡' },
            { title: 'SEO & Growth', color: 'from-purple-500/20 to-purple-600/5', icon: '📈' },
          ].map((card) => (
            <div key={card.title} className={`rounded-lg bg-gradient-to-br ${card.color} border border-white/[0.06] p-1.5 sm:p-2`}>
              <div className="text-[8px] sm:text-[10px] mb-0.5">{card.icon}</div>
              <div className="text-[6px] sm:text-[8px] font-semibold mb-0.5">{card.title}</div>
              <div className="h-0.5 w-6 bg-white/10 rounded-full mb-0.5" />
              <div className="h-0.5 w-10 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial snippet */}
      <div className="px-3 sm:px-4 mt-2 sm:mt-2.5">
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-1.5 sm:p-2 flex items-start gap-1.5 sm:gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex-shrink-0 flex items-center justify-center text-[6px] sm:text-[8px] font-bold">J</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[6px] sm:text-[8px] font-semibold">Jessica M.</span>
              <div className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[5px] sm:text-[7px] text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <div className="text-[5px] sm:text-[7px] text-gray-400 leading-relaxed italic">
              "Incredible work. Our conversions jumped 340% after the redesign..."
            </div>
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
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Website Upgrades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            We Don't Just Build Websites.{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              We Transform Them.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Got an outdated website that's hurting your business? We'll take it from embarrassing to extraordinary.
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
