import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { TrendingUp, PiggyBank, MousePointerClick } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'
import { useInViewPaused } from '../hooks/useInViewPaused'
import CountUp from './effects/CountUp'

// TODO(client): replace all metrics + toasts below with real, verified figures.
const cases = [
  {
    name: 'Birchwood',
    type: 'Luxury short-term rental',
    image: '/portfolio/birchwood-mobile.jpg',
    toasts: ['📅 Booking confirmed — 3 nights', '💰 New reservation $1,260', '⭐ New 5-star review'],
    metrics: [
      { icon: TrendingUp, label: 'Direct bookings', to: 312, prefix: '+', suffix: '%' },
      { icon: PiggyBank, label: 'Airbnb fees saved/yr', to: 10000, prefix: '$' },
      { icon: MousePointerClick, label: 'Bounce rate', to: 47, prefix: '−', suffix: '%' },
    ],
    chart: [22, 30, 41, 55, 70, 88, 100],
  },
  {
    name: 'Laundry Day',
    type: 'On-demand laundry service',
    image: '/portfolio/laundryday-mobile.jpg',
    toasts: ['🧺 New pickup scheduled', '💰 Order paid $48', '🔁 Repeat customer'],
    metrics: [
      { icon: TrendingUp, label: 'Online orders', to: 240, prefix: '+', suffix: '%' },
      { icon: PiggyBank, label: 'Membership saved/yr', to: 1800, prefix: '$' },
      { icon: MousePointerClick, label: 'Checkout drop-off', to: 38, prefix: '−', suffix: '%' },
    ],
    chart: [30, 28, 44, 52, 68, 81, 100],
  },
]

function Chart({ bars, play }) {
  return (
    <div className="flex items-end gap-1.5 h-20">
      {bars.map((v, i) => (
        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent to-primary origin-bottom"
          style={{
            height: play ? `${v}%` : '100%',
            animation: play ? `bar-grow 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : 'none',
            ['--bar-h']: `${v}%`,
          }}
        />
      ))}
    </div>
  )
}

function Phone({ image, toasts, play }) {
  const base = import.meta.env.BASE_URL
  return (
    <div className="relative mx-auto w-[220px] sm:w-[240px]">
      <div className="relative rounded-[2rem] border-[6px] border-[#1a1a2e] bg-black overflow-hidden shadow-2xl shadow-accent/10 aspect-[9/18]">
        <img src={`${base}${image.slice(1)}`} alt="" className="w-full h-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        {/* notification toasts loop */}
        {toasts.map((t, i) => (
          <div
            key={i}
            className="absolute left-2 right-2 rounded-lg bg-white/95 text-[11px] text-gray-900 font-medium px-3 py-2 shadow-lg"
            style={{
              top: `${14 + i * 16}%`,
              opacity: play ? 0 : 0.96,
              animation: play ? `toast-pop 6s ease-in-out ${i * 1.6}s infinite` : 'none',
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="absolute -inset-4 -z-10 bg-accent/20 blur-3xl rounded-full" />
    </div>
  )
}

function Case({ data, flip }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInViewPaused(ref, { threshold: 0.25 })
  const play = inView && !reduce

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-center">
      <div className={flip ? 'lg:order-2' : ''}>
        <Phone image={data.image} toasts={data.toasts} play={play} />
      </div>
      <div className={flip ? 'lg:order-1' : ''}>
        <div className="text-sm text-primary tracking-widest uppercase mb-2">{data.type}</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-6">{data.name} — after launch</h3>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {data.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-dark-border bg-dark-card/50 p-4">
              <m.icon className="w-4 h-4 text-primary mb-2" />
              <div className="text-2xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                <CountUp to={m.to} from={m.from || 0} prefix={m.prefix || ''} suffix={m.suffix || ''} decimals={m.decimals || 0} />
              </div>
              <div className="text-[11px] text-gray-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dark-border bg-dark-card/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Monthly growth after launch</span>
          </div>
          <Chart bars={data.chart} play={play} />
        </div>
      </div>
    </div>
  )
}

export default function CaseStudyImpact() {
  return (
    <section id="impact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/40 to-dark" />
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real businesses,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">real results</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A great website isn't decoration — it's a growth engine. Here's the kind of
            impact a rebuild delivers.
          </p>
        </AnimateIn>

        <div className="space-y-20">
          {cases.map((c, i) => (
            <AnimateIn key={c.name} delay={i * 120}>
              <Case data={c} flip={i % 2 === 1} />
            </AnimateIn>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bar-grow { 0% { height: 0%; } 100% { height: var(--bar-h); } }
        @keyframes toast-pop {
          0%, 4% { opacity: 0; transform: translateY(8px) scale(0.96); }
          10%, 26% { opacity: 0.96; transform: translateY(0) scale(1); }
          34%, 100% { opacity: 0; transform: translateY(-6px) scale(0.98); }
        }
      `}</style>
    </section>
  )
}
