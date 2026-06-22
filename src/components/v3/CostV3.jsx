import { Clock, Eye, TrendingDown } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'
import CountUp from '../effects/CountUp'

// TODO(client): verify these statistics + add real source citations before launch.
const stats = [
  { icon: Clock, to: 53, suffix: '%', label: 'of visitors leave a site that takes over 3 seconds to load.' },
  { icon: Eye, to: 75, suffix: '%', label: "judge a company's credibility on website design alone." },
  { icon: TrendingDown, to: 7, prefix: '−', suffix: '%', label: 'drop in conversions from just a 1-second delay in load time.' },
]

export default function CostV3() {
  return (
    <section id="cost" className="bg-[#f6f8fc] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">
            A weak website is quietly{' '}
            <span className="text-[#d97706]">costing you</span> customers.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5568]">
            Every second of load time and every dated design choice sends potential clients to
            your competitors. The numbers are hard to ignore.
          </p>
        </AnimateIn>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="v3-card h-full p-8 text-center transition-shadow duration-500 hover:shadow-[var(--shadow-md)]">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff7ed] text-[#d97706]">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mb-3 text-6xl font-black tracking-tight text-[#0a0e27]">
                  <CountUp to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                </div>
                <p className="leading-relaxed text-[#4b5568]">{s.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={200} className="mt-12 text-center">
          <p className="font-medium text-[#4f46e5]">The good news? Every one of these is fixable. ↓</p>
        </AnimateIn>
      </div>
    </section>
  )
}
