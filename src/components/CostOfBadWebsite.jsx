import { AlertTriangle, Clock, Eye, TrendingDown } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'
import CountUp from './effects/CountUp'

// TODO(client): verify these statistics + add real source citations before launch.
const stats = [
  {
    icon: Clock,
    to: 53,
    suffix: '%',
    label: 'of visitors leave a site that takes over 3 seconds to load.',
    source: 'TODO: source',
  },
  {
    icon: Eye,
    to: 75,
    suffix: '%',
    label: "judge a company's credibility on website design alone.",
    source: 'TODO: source',
  },
  {
    icon: TrendingDown,
    to: 7,
    prefix: '−',
    suffix: '%',
    label: 'drop in conversions from just a 1-second delay in load time.',
    source: 'TODO: source',
  },
]

export default function CostOfBadWebsite() {
  return (
    <section id="cost" className="py-24 md:py-32 relative overflow-hidden">
      {/* warning-red glow that cools toward the brand blue lower down */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-dark to-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The cost of a bad website
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A weak website is{' '}
            <span className="text-red-400">quietly costing you</span> customers.
          </h2>
          <p className="text-gray-400 text-lg">
            Every second of load time and every dated design choice sends potential
            clients to your competitors. The numbers are brutal.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="group relative h-full rounded-2xl border border-dark-border bg-dark-card/50 backdrop-blur-sm p-8 text-center transition-colors duration-500 hover:border-primary/30">
                {/* red→blue accent line resolving toward the solution */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-2/3 rounded-full bg-gradient-to-r from-red-500/60 to-accent/60" />
                <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-500">
                  <s.icon className="w-6 h-6 text-red-400 group-hover:text-primary transition-colors duration-500" />
                </div>
                <div className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-br from-red-400 to-red-200 bg-clip-text text-transparent group-hover:from-primary group-hover:to-blue-300 transition-all duration-500">
                  <CountUp to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                </div>
                <p className="text-gray-300 leading-relaxed">{s.label}</p>
                <p className="text-[10px] text-gray-600 mt-3 uppercase tracking-wider">{s.source}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={200} className="text-center mt-12">
          <p className="text-primary font-medium">
            The good news? Every one of these is fixable. ↓
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
