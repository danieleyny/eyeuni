import { useRef, useState } from 'react'
import { Code2, Layout, Server, Plus, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimateIn } from './useScrollAnimation'
import { useReducedMotion } from 'framer-motion'
import { useActiveWhenVisible } from '../hooks/useActiveWhenVisible'

const services = [
  {
    icon: Code2,
    title: 'Custom Built Websites',
    description: "We don't use templates. Every website is built from scratch — tailored to your business, your goals, and designed to perform.",
    features: ['Fully custom-built websites', 'E-commerce & booking systems', 'Easy content management', 'Seamless tool integrations', 'Built to convert visitors'],
  },
  {
    icon: Layout,
    title: 'Design & User Experience',
    description: 'Every design choice is made to capture attention, build trust, and drive results.',
    features: ['Modern design', 'Mobile-friendly', 'Easy navigation', 'Smooth interactions', 'Conversion-focused'],
  },
  {
    icon: Server,
    title: 'Infrastructure & Reliability',
    description: 'We build websites that are fast, stable, and ready to handle growth as your business expands.',
    features: ['High-speed performance', 'Secure infrastructure', 'Scalable systems', 'Reliable performance', 'Optimized for speed'],
  },
]

// ── Micro-animation demos (CSS-driven; pause offscreen via parent .in-view) ──

// 1. Code types itself out, a mini page renders beside it.
function CodeDemo() {
  const lines = [
    [['<', 'tag'], ['section', 'name'], [' class=', 'attr'], ['"hero"', 'str'], ['>', 'tag']],
    [['  <', 'tag'], ['h1', 'name'], ['>', 'tag'], ['Grow.', 'txt'], ['</', 'tag'], ['h1', 'name'], ['>', 'tag']],
    [['  <', 'tag'], ['p', 'name'], ['>', 'tag'], ['Build better.', 'txt'], ['</', 'tag'], ['p', 'name'], ['>', 'tag']],
    [['  <', 'tag'], ['button', 'name'], ['>', 'tag'], ['Start', 'txt'], ['</', 'tag'], ['button', 'name'], ['>', 'tag']],
    [['</', 'tag'], ['section', 'name'], ['>', 'tag']],
    [['<', 'tag'], ['style', 'name'], ['>', 'tag']],
    [['  .hero', 'name'], [' { ', 'tag'], ['display', 'attr'], [': ', 'tag'], ['grid', 'str'], ['; }', 'tag']],
    [['  button', 'name'], [' { ', 'tag'], ['background', 'attr'], [': ', 'tag'], ['#0f31b8', 'str'], ['; }', 'tag']],
    [['</', 'tag'], ['style', 'name'], ['>', 'tag']],
  ]
  const color = { tag: 'text-primary', name: 'text-blue-400', attr: 'text-secondary', str: 'text-emerald-400', txt: 'text-white/80' }
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      <pre className="text-[10px] sm:text-[11px] leading-snug font-mono overflow-hidden rounded-lg bg-black/40 border border-white/10 p-3">
        {lines.map((line, li) => (
          <div key={li} className="svc-code-line whitespace-pre" style={{ animationDelay: `${li * 0.32}s` }}>
            {line.map(([t, c], ci) => (
              <span key={ci} className={color[c]}>{t}</span>
            ))}
          </div>
        ))}
        <span className="svc-caret inline-block w-1.5 h-3 bg-primary align-middle" />
      </pre>
      {/* Live preview — renders exactly what the code types: a "Grow."
          headline and a "Start" button, each appearing as its line is typed. */}
      <div className="relative rounded-lg bg-gradient-to-br from-dark-card to-black border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-2.5">
        {/* ambient glow + faux browser dots for a "real page" feel */}
        <div className="pointer-events-none absolute -top-8 -right-6 w-24 h-24 rounded-full bg-accent/25 blur-2xl" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
        </div>
        <div
          className="svc-render text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-300 to-accent bg-clip-text text-transparent"
          style={{ animationDelay: '0.6s' }}
        >
          Grow.
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="svc-render px-4 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-accent to-blue-600 shadow-lg shadow-accent/30 ring-1 ring-white/10"
          style={{ animationDelay: '1.1s' }}
        >
          Start
        </button>
      </div>
    </div>
  )
}

// 2. A grey low-fi wireframe morphs into a polished, branded UI. Same layout in
//    both states, so the "level-up" reads clearly.
function DesignDemo() {
  return (
    <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-[#0b0b12]">
      {/* ── Wireframe (before) ── */}
      <div className="svc-wire absolute inset-0 p-3">
        {/* nav */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="h-2.5 w-10 rounded bg-white/25" />
          <div className="flex gap-1.5">
            <div className="h-2 w-6 rounded bg-white/15" />
            <div className="h-2 w-6 rounded bg-white/15" />
            <div className="h-2 w-8 rounded border border-dashed border-white/25" />
          </div>
        </div>
        {/* hero placeholder */}
        <div className="h-16 w-full rounded-md border-2 border-dashed border-white/15 flex items-center justify-center mb-2">
          <span className="text-[8px] text-white/25 tracking-wider">HERO IMAGE</span>
        </div>
        <div className="h-2 w-2/3 rounded bg-white/20 mb-1.5" />
        <div className="h-2 w-1/2 rounded bg-white/12 mb-2.5" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 rounded border border-dashed border-white/25" />
          <div className="h-5 w-12 rounded bg-white/10" />
        </div>
      </div>

      {/* ── Polished UI (after) ── */}
      <div className="svc-ui absolute inset-0 p-3 bg-gradient-to-br from-[#11121d] via-[#0d0e18] to-black">
        {/* nav */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md bg-gradient-to-br from-primary to-accent" />
            <div className="h-2 w-9 rounded bg-white/80" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-5 rounded bg-white/35" />
            <div className="h-1.5 w-5 rounded bg-white/35" />
            <div className="h-4 w-10 rounded-full bg-accent shadow-md shadow-accent/40" />
          </div>
        </div>
        {/* hero with image + glass headline */}
        <div className="relative h-16 w-full rounded-lg overflow-hidden mb-2">
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-blue-600 to-primary/70" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(255,255,255,0.6), transparent 45%)' }} />
          <div className="absolute bottom-1.5 left-2 right-2">
            <div className="h-2 w-2/3 rounded bg-white/95 mb-1" />
            <div className="h-1.5 w-1/2 rounded bg-white/60" />
          </div>
        </div>
        <div className="h-2 w-3/4 rounded bg-white/85 mb-1.5" />
        <div className="h-1.5 w-1/2 rounded bg-white/40 mb-2.5" />
        <div className="flex gap-1.5 items-center">
          <div className="h-5 w-16 rounded-md bg-gradient-to-r from-primary to-accent shadow-md shadow-accent/40" />
          <div className="h-5 w-12 rounded-md border border-white/25" />
          <div className="ml-auto h-6 w-6 rounded-full bg-gradient-to-br from-primary/80 to-accent ring-2 ring-white/10" />
        </div>
      </div>
    </div>
  )
}

// 3. Lighthouse / performance dial sweeps up to 100.
function SpeedDemo() {
  const R = 30
  const C = 2 * Math.PI * R
  return (
    <div className="h-full flex items-center justify-center gap-4">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="40" cy="40" r={R} fill="none" stroke="url(#svc-grad)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} className="svc-dial" style={{ '--dash': C }}
          />
          <defs>
            <linearGradient id="svc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b3c8f4" />
              <stop offset="100%" stopColor="#0f31b8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="svc-score text-2xl font-black text-white">100</span>
          <span className="text-[8px] text-primary tracking-widest uppercase">Score</span>
        </div>
      </div>
      <div className="space-y-1.5 text-[10px]">
        {['Performance', 'Accessibility', 'SEO'].map((m) => (
          <div key={m} className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span className="text-white/70">{m}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const demos = [CodeDemo, DesignDemo, SpeedDemo]

function ServiceTile({ service, index, large }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const Demo = demos[index]

  return (
    <div
      className={`group relative rounded-2xl bg-dark-card/50 border border-dark-border hover:border-primary/30 transition-all duration-500 backdrop-blur-sm overflow-hidden flex flex-col ${large ? 'lg:row-span-2' : ''}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Live demo panel */}
      <div className={`relative p-5 ${large ? 'h-56 lg:h-72' : 'h-40'}`}>
        <Demo />
      </div>

      <div className="relative p-6 pt-2 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 shrink-0">
            <service.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">{service.title}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>

        {/* Mobile: tap to expand. Desktop (md+): always shown. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="md:hidden inline-flex items-center gap-1.5 text-sm text-primary font-medium mt-auto"
        >
          <Plus className={`w-4 h-4 transition-transform ${open ? 'rotate-45' : ''}`} />
          {open ? 'Hide details' : 'See what’s included'}
        </button>

        <ul
          className={`space-y-2.5 overflow-hidden transition-all duration-500 md:max-h-none md:opacity-100 md:mt-2 ${
            open ? 'max-h-72 opacity-100 mt-4' : 'max-h-0 opacity-0 md:opacity-100'
          }`}
        >
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {reduce && (
        <style>{`.svc-code-line,.svc-render,.svc-caret,.svc-wire,.svc-ui,.svc-dial,.svc-score{animation:none!important;opacity:1!important}`}</style>
      )}
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const active = useActiveWhenVisible(sectionRef)
  return (
    <section ref={sectionRef} id="services" className={`py-24 md:py-32 relative ${active ? '' : 'svc-paused'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/50 to-dark" />
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Thoughtfully Designed. Strategically Built. Made to Grow Your Business.
          </p>
        </AnimateIn>

        {/* Bento: one large feature tile + two supporting tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:auto-rows-fr">
          <AnimateIn className="md:row-span-2 lg:row-span-2 h-full" delay={0}>
            <ServiceTile service={services[0]} index={0} large />
          </AnimateIn>
          <AnimateIn delay={120} className="h-full">
            <ServiceTile service={services[1]} index={1} />
          </AnimateIn>
          <AnimateIn delay={240} className="h-full">
            <ServiceTile service={services[2]} index={2} />
          </AnimateIn>
        </div>

        <AnimateIn delay={300} className="text-center mt-16">
          <Link
            to="/intake"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1"
          >
            Start Your Project
          </Link>
        </AnimateIn>
      </div>

      <style>{`
        @keyframes svc-type { 0%,8% { clip-path: inset(0 100% 0 0); } 22%,92% { clip-path: inset(0 0 0 0); } 100% { clip-path: inset(0 0 0 0); } }
        .svc-code-line { animation: svc-type 6s ease-in-out infinite; }
        @keyframes svc-caret-blink { 0%,49% { opacity:1 } 50%,100% { opacity:0 } }
        .svc-caret { animation: svc-caret-blink 1s step-end infinite; }
        @keyframes svc-pop { 0%,30% { opacity:0; transform: translateY(6px) scaleX(0.6); transform-origin:left } 45%,92% { opacity:1; transform:none } 100% { opacity:1 } }
        .svc-render { animation: svc-pop 6s ease-in-out infinite; transform-origin:left; }
        @keyframes svc-wire-fade { 0%,40% { opacity:1 } 55%,95% { opacity:0 } 100% { opacity:1 } }
        @keyframes svc-ui-fade { 0%,40% { opacity:0 } 55%,95% { opacity:1 } 100% { opacity:0 } }
        .svc-wire { animation: svc-wire-fade 7s ease-in-out infinite; }
        .svc-ui { animation: svc-ui-fade 7s ease-in-out infinite; }
        @keyframes svc-sweep { 0% { stroke-dashoffset: var(--dash); } 60%,100% { stroke-dashoffset: calc(var(--dash) * 0.03); } }
        .svc-dial { animation: svc-sweep 5s ease-out infinite; }
        @keyframes svc-score-up { 0% { opacity:0.3 } 60%,100% { opacity:1 } }
        .svc-score { animation: svc-score-up 5s ease-out infinite; }
        /* Freeze the looping demos when the section is off-screen / tab hidden. */
        .svc-paused .svc-code-line, .svc-paused .svc-render, .svc-paused .svc-caret,
        .svc-paused .svc-wire, .svc-paused .svc-ui, .svc-paused .svc-dial, .svc-paused .svc-score {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
