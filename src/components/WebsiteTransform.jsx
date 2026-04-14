import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimateIn } from './useScrollAnimation'

// Animation phases
const PHASE_UGLY = 0      // Show ugly site
const PHASE_RUN = 1       // Character runs in
const PHASE_SMASH = 2     // Character smashes screen
const PHASE_SHATTER = 3   // Screen shatters
const PHASE_REVEAL = 4    // Beautiful site reveals
const PHASE_DISPLAY = 5   // Show beautiful site
const PHASE_RESET = 6     // Fade back

// Timing (ms)
const TIMING = {
  [PHASE_UGLY]: 1200,
  [PHASE_RUN]: 1400,
  [PHASE_SMASH]: 600,
  [PHASE_SHATTER]: 1000,
  [PHASE_REVEAL]: 1000,
  [PHASE_DISPLAY]: 2500,
  [PHASE_RESET]: 800,
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
          <span className="text-white underline cursor-pointer">Home</span>
          <span className="text-[#ffff00] underline cursor-pointer">About</span>
          <span className="text-[#00ffff] underline cursor-pointer">Links</span>
          <span className="text-white underline cursor-pointer">Guestbook</span>
        </div>
      </div>

      {/* Marquee banner */}
      <div className="bg-[#ff0000] text-white text-[8px] sm:text-[10px] py-0.5 overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_8s_linear_infinite] inline-block">
          ⚠️ UNDER CONSTRUCTION ⚠️ &nbsp;&nbsp;&nbsp; Welcome to my website!!! Please sign my guestbook!!! &nbsp;&nbsp;&nbsp; ⚠️ UNDER CONSTRUCTION ⚠️ &nbsp;&nbsp;&nbsp; Best viewed in Internet Explorer 6.0 &nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* Main content */}
      <div className="p-2 sm:p-3">
        <div className="text-center">
          <h1 className="text-[#0000ff] text-sm sm:text-lg font-bold animate-[blink_1s_step-end_infinite]">
            Welcome To My WebSite!!!
          </h1>
          <div className="text-[#ff0000] text-[8px] sm:text-[10px] mt-1">
            You are visitor #: <span className="bg-black text-[#00ff00] px-1 font-mono">004,721</span>
          </div>
        </div>

        {/* Ugly table layout */}
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

        {/* Hit counter & badges */}
        <div className="flex items-center justify-center gap-2 mt-2 text-[7px] sm:text-[8px]">
          <div className="bg-[#000080] text-[#00ff00] px-1 py-0.5 border border-[#808080]">Made with Notepad</div>
          <div className="bg-[#000080] text-[#ffff00] px-1 py-0.5 border border-[#808080]">Best viewed 800x600</div>
        </div>
      </div>
    </div>
  )
}

// ─── Beautiful Website Mockup ───────────────────────────
function BeautifulWebsite() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0f] overflow-hidden text-white">
      {/* Modern nav */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
          <span className="font-semibold text-[10px] sm:text-xs">Luxe Brand</span>
        </div>
        <div className="flex gap-2 sm:gap-3 text-[7px] sm:text-[9px] text-gray-400">
          <span>Home</span>
          <span>Services</span>
          <span>About</span>
          <span className="hidden sm:inline">Contact</span>
        </div>
        <div className="px-2 py-0.5 bg-blue-600 rounded text-[7px] sm:text-[8px] font-medium">Get Started</div>
      </div>

      {/* Hero */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-5">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[6px] sm:text-[8px] text-blue-400 font-medium tracking-wider uppercase mb-1">Premium Solutions</div>
            <div className="text-xs sm:text-base font-bold leading-tight mb-1.5 sm:mb-2">
              Elevate Your
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Digital Presence</span>
            </div>
            <div className="text-[7px] sm:text-[9px] text-gray-400 leading-relaxed mb-2">
              Beautiful, high-performance websites that convert visitors into customers.
            </div>
            <div className="flex gap-1.5">
              <div className="px-2 py-1 bg-blue-600 rounded text-[6px] sm:text-[8px] font-medium">Learn More</div>
              <div className="px-2 py-1 border border-white/20 rounded text-[6px] sm:text-[8px]">View Work</div>
            </div>
          </div>
          <div className="w-16 h-14 sm:w-24 sm:h-20 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 border border-white/10" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 sm:mt-4">
          {[
            { num: '500+', label: 'Projects' },
            { num: '98%', label: 'Satisfaction' },
            { num: '24/7', label: 'Support' },
          ].map((s) => (
            <div key={s.label} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
              <div className="text-[9px] sm:text-xs font-bold text-blue-400">{s.num}</div>
              <div className="text-[6px] sm:text-[8px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SVG Running Character ──────────────────────────────
function RunningCharacter({ phase }) {
  const isRunning = phase === PHASE_RUN
  const isSmashing = phase === PHASE_SMASH

  // Position: runs from -60px to ~65% of screen width
  const getTransform = () => {
    if (phase < PHASE_RUN) return 'translateX(-60px)'
    if (isRunning) return 'translateX(calc(65% - 20px))'
    if (isSmashing) return 'translateX(calc(65% - 20px)) translateY(-20px)'
    return 'translateX(calc(65% - 20px)) translateY(-20px) scale(0)'
  }

  return (
    <div
      className="absolute bottom-2 left-0 z-20"
      style={{
        transform: getTransform(),
        transition: isRunning
          ? 'transform 1.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
          : isSmashing
            ? 'transform 0.3s cubic-bezier(0.6, -0.28, 0.74, 0.05)'
            : 'transform 0.3s ease',
        opacity: phase > PHASE_SHATTER ? 0 : 1,
      }}
    >
      <svg
        width="36"
        height="40"
        viewBox="0 0 36 40"
        className={isRunning ? 'animate-[characterBounce_0.35s_ease-in-out_infinite]' : ''}
      >
        {/* Head */}
        <circle cx="18" cy="8" r="6" fill="#b3c8f4" />
        {/* Eyes */}
        <circle cx="16" cy="7" r="1" fill="#0a0a0f" />
        <circle cx="20" cy="7" r="1" fill="#0a0a0f" />
        {/* Determined mouth */}
        <line x1="15" y1="10" x2="21" y2="10" stroke="#0a0a0f" strokeWidth="1.2" strokeLinecap="round" />
        {/* Body */}
        <rect x="14" y="14" width="8" height="10" rx="2" fill="#0f31b8" />
        {/* Belt */}
        <rect x="14" y="19" width="8" height="2" fill="#b3c8f4" />
        {/* Arms */}
        {isSmashing ? (
          <>
            {/* Smashing pose - arms raised with hammer */}
            <line x1="14" y1="16" x2="6" y2="8" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="16" x2="30" y2="8" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
            {/* Hammer */}
            <rect x="26" y="2" width="8" height="6" rx="1" fill="#888" />
            <line x1="30" y1="8" x2="30" y2="3" stroke="#a0522d" strokeWidth="2" />
          </>
        ) : (
          <>
            {/* Running arms */}
            <g className={isRunning ? 'animate-[armSwing_0.35s_ease-in-out_infinite]' : ''} style={{ transformOrigin: '14px 16px' }}>
              <line x1="14" y1="16" x2="6" y2="22" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <g className={isRunning ? 'animate-[armSwingAlt_0.35s_ease-in-out_infinite]' : ''} style={{ transformOrigin: '22px 16px' }}>
              <line x1="22" y1="16" x2="30" y2="22" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </>
        )}
        {/* Legs */}
        <g className={isRunning ? 'animate-[legRun_0.35s_ease-in-out_infinite]' : ''} style={{ transformOrigin: '16px 24px' }}>
          <line x1="16" y1="24" x2="12" y2="36" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="36" x2="10" y2="38" stroke="#0f31b8" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className={isRunning ? 'animate-[legRunAlt_0.35s_ease-in-out_infinite]' : ''} style={{ transformOrigin: '20px 24px' }}>
          <line x1="20" y1="24" x2="24" y2="36" stroke="#b3c8f4" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="36" x2="26" y2="38" stroke="#0f31b8" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}

// ─── Shatter Pieces ─────────────────────────────────────
function ShatterOverlay({ active }) {
  const pieces = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (i % 4) * 25 + Math.random() * 10,
      y: Math.floor(i / 4) * 33 + Math.random() * 10,
      w: 25 + Math.random() * 10,
      h: 33 + Math.random() * 10,
      rotation: (Math.random() - 0.5) * 120,
      tx: (Math.random() - 0.5) * 300,
      ty: (Math.random() - 0.5) * 200 - 100,
      delay: Math.random() * 0.15,
    }))
  ).current

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: active
              ? `translate(${p.tx}px, ${p.ty}px) rotate(${p.rotation}deg) scale(0.3)`
              : 'translate(0, 0) rotate(0deg) scale(1)',
            opacity: active ? 0 : 1,
            transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Crack Lines SVG ────────────────────────────────────
function CrackLines({ visible }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-25 pointer-events-none"
      viewBox="0 0 400 300"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      {/* Impact point at ~65%, 50% */}
      <g stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8">
        {/* Main cracks radiating from impact */}
        <path d="M260,150 L200,80 L180,20" className={visible ? 'animate-[crackDraw_0.3s_ease-out_forwards]' : ''} />
        <path d="M260,150 L310,90 L350,30" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.05s_forwards]' : ''} />
        <path d="M260,150 L340,170 L400,160" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.1s_forwards]' : ''} />
        <path d="M260,150 L300,230 L320,280" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.08s_forwards]' : ''} />
        <path d="M260,150 L200,200 L150,260" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.12s_forwards]' : ''} />
        <path d="M260,150 L160,130 L80,100" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.06s_forwards]' : ''} />
        <path d="M260,150 L220,220 L200,290" className={visible ? 'animate-[crackDraw_0.3s_ease-out_0.1s_forwards]' : ''} />
        {/* Secondary branching cracks */}
        <path d="M200,80 L150,60" strokeWidth="1" opacity="0.5" className={visible ? 'animate-[crackDraw_0.2s_ease-out_0.2s_forwards]' : ''} />
        <path d="M310,90 L330,50" strokeWidth="1" opacity="0.5" className={visible ? 'animate-[crackDraw_0.2s_ease-out_0.2s_forwards]' : ''} />
        <path d="M300,230 L260,260" strokeWidth="1" opacity="0.5" className={visible ? 'animate-[crackDraw_0.2s_ease-out_0.22s_forwards]' : ''} />
      </g>
    </svg>
  )
}

// ─── Spark Particles (Canvas) ───────────────────────────
function SparkCanvas({ active }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)

  const createParticles = useCallback(() => {
    const particles = []
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 6
      particles.push({
        x: 0.65,  // 65% from left (impact point)
        y: 0.5,   // center
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 1 + Math.random() * 3,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        color: Math.random() > 0.5
          ? `rgba(179, 200, 244, `    // primary blue
          : `rgba(15, 49, 184, `,      // accent blue
      })
    }
    return particles
  }, [])

  useEffect(() => {
    if (!active || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    particlesRef.current = createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      let alive = false
      particlesRef.current.forEach((p) => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx / canvas.offsetWidth * 10
        p.y += p.vy / canvas.offsetHeight * 10
        p.vy += 0.15 // gravity
        p.life -= p.decay

        const px = p.x * canvas.offsetWidth
        const py = p.y * canvas.offsetHeight

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + (p.life * 0.8) + ')'
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(px, py, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = p.color + (p.life * 0.2) + ')'
        ctx.fill()
      })

      if (alive) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [active, createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-35 pointer-events-none"
      style={{ opacity: active ? 1 : 0 }}
    />
  )
}

// ─── Flash Effect ───────────────────────────────────────
function ImpactFlash({ visible }) {
  return (
    <div
      className="absolute inset-0 z-40 pointer-events-none bg-white"
      style={{
        opacity: visible ? 0.7 : 0,
        transition: visible ? 'opacity 0.05s ease' : 'opacity 0.3s ease',
      }}
    />
  )
}

// ─── Main Component ─────────────────────────────────────
export default function WebsiteTransform() {
  const [phase, setPhase] = useState(PHASE_UGLY)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)

  // Intersection observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [inView])

  // Animation loop
  useEffect(() => {
    if (!inView) return

    const advancePhase = () => {
      setPhase((prev) => {
        const next = prev >= PHASE_RESET ? PHASE_UGLY : prev + 1
        timeoutRef.current = setTimeout(advancePhase, TIMING[next] || TIMING[PHASE_UGLY])
        return next
      })
    }

    timeoutRef.current = setTimeout(advancePhase, TIMING[PHASE_UGLY])

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [inView])

  const showUgly = phase <= PHASE_SMASH
  const showCracks = phase === PHASE_SMASH || phase === PHASE_SHATTER
  const showShatter = phase >= PHASE_SHATTER && phase <= PHASE_REVEAL
  const showSparks = phase === PHASE_SMASH || phase === PHASE_SHATTER
  const showFlash = phase === PHASE_SMASH
  const showBeautiful = phase >= PHASE_REVEAL && phase <= PHASE_DISPLAY
  const showCharacter = phase >= PHASE_RUN && phase <= PHASE_SHATTER

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
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
            {/* Laptop frame */}
            <div className="relative">
              {/* Screen bezel */}
              <div className="bg-[#1a1a2e] rounded-t-2xl p-2 sm:p-3 pb-0 border border-dark-border border-b-0">
                {/* Camera notch */}
                <div className="flex justify-center mb-1.5 sm:mb-2">
                  <div className="w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-600" />
                </div>

                {/* Screen area */}
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#0a0a0f]">
                  {/* Ugly website layer */}
                  <div
                    style={{
                      opacity: showUgly ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <UglyWebsite />
                  </div>

                  {/* Beautiful website layer */}
                  <div
                    style={{
                      opacity: showBeautiful ? 1 : 0,
                      transform: showBeautiful ? 'scale(1)' : 'scale(1.1)',
                      transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <BeautifulWebsite />
                  </div>

                  {/* Crack lines */}
                  <CrackLines visible={showCracks} />

                  {/* Shatter pieces */}
                  <ShatterOverlay active={showShatter} />

                  {/* Spark particles */}
                  <SparkCanvas active={showSparks} />

                  {/* Impact flash */}
                  <ImpactFlash visible={showFlash} />

                  {/* Screen glitch effect during smash */}
                  {(phase === PHASE_SMASH || phase === PHASE_SHATTER) && (
                    <div className="absolute inset-0 z-20 pointer-events-none animate-[glitch_0.3s_ease_infinite]">
                      <div className="absolute inset-0 bg-[#ff000010]" style={{ clipPath: 'inset(10% 0 80% 0)' }} />
                      <div className="absolute inset-0 bg-[#00ff0010]" style={{ clipPath: 'inset(40% 0 40% 0)', transform: 'translateX(3px)' }} />
                      <div className="absolute inset-0 bg-[#0000ff10]" style={{ clipPath: 'inset(70% 0 10% 0)', transform: 'translateX(-3px)' }} />
                    </div>
                  )}

                  {/* Running character */}
                  {showCharacter && <RunningCharacter phase={phase} />}

                  {/* Screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-50" />
                </div>
              </div>

              {/* Laptop base / keyboard */}
              <div className="bg-[#1a1a2e] border border-dark-border border-t-[#2a2a3e] rounded-b-lg h-3 sm:h-4 flex items-center justify-center">
                <div className="w-16 sm:w-24 h-1 rounded-full bg-gray-700" />
              </div>

              {/* Laptop shadow */}
              <div className="mx-8 h-2 bg-black/40 rounded-full blur-md -mt-1" />
            </div>

            {/* Before/After labels */}
            <div className="flex justify-center gap-8 mt-8">
              <div className={`flex items-center gap-2 transition-all duration-500 ${showUgly ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="text-sm text-gray-400 font-medium">Before</span>
              </div>
              <div className={`flex items-center gap-2 transition-all duration-500 ${showBeautiful ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-sm text-gray-400 font-medium">After</span>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes characterBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes armSwing {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes armSwingAlt {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes legRun {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes legRunAlt {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes crackDraw {
          0% { stroke-dasharray: 0 500; }
          100% { stroke-dasharray: 500 0; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </section>
  )
}
