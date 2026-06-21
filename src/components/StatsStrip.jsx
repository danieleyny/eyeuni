import { AnimateIn } from './useScrollAnimation'
import CountUp from './effects/CountUp'

// TODO(client): replace with real, verified figures.
const stats = [
  { to: 200, suffix: '+', label: 'Custom sites built' },
  { to: 0.8, decimals: 1, prefix: '~', suffix: 's', label: 'Average load time' },
  { to: 3, suffix: '×', label: 'Average conversion lift' },
  { to: 100, suffix: '%', label: 'Built from scratch' },
]

export default function StatsStrip() {
  return (
    <section className="relative py-12">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-dark-border bg-dark-card/40 backdrop-blur-sm p-6 sm:p-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                  <CountUp to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} />
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
