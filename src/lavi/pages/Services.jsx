import { Reveal, Icon, SectionHeading, useLang } from '../ui'
import { CtaBand, SolarTile } from '../sections'

const SERVICE_ICONS = { cleaning: Icon.robot, maintenance: Icon.wrench, installation: Icon.panel }
const SERVICE_CATS = { cleaning: 'cleaning', maintenance: 'rooftop', installation: 'ground' }

export default function Services({ go }) {
  const { t } = useLang()

  return (
    <div>
      <section className="section pb-0">
        <div className="container-x">
          <SectionHeading center eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
        </div>
      </section>

      {/* detailed alternating service blocks */}
      <section className="section">
        <div className="container-x space-y-6">
          {t.services.items.map((svc, i) => {
            const I = SERVICE_ICONS[svc.key] || Icon.sun
            const flip = i % 2 === 1
            return (
              <Reveal key={svc.key}>
                <div className={`grid lg:grid-cols-2 gap-8 items-center glass rounded-[1.75rem] p-6 lg:p-8 card-hover ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden">
                    <SolarTile cat={SERVICE_CATS[svc.key]} className="w-full aspect-[16/10]" />
                    <span className="absolute top-4 start-4 text-[0.65rem] uppercase tracking-wider font-display font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(6,9,18,0.7)', color: '#ffd60a', backdropFilter: 'blur(8px)' }}>{svc.tag}</span>
                  </div>
                  <div>
                    <div className="grid place-items-center h-13 w-13 rounded-2xl p-3.5 mb-5" style={{ background: 'linear-gradient(135deg, #16306e, #0c1c45)', border: '1px solid rgba(120,160,255,0.25)' }}>
                      <I className="h-6 w-6 text-blue-bright" />
                    </div>
                    <h3 className="font-display font-bold text-[clamp(1.3rem,3vw,1.7rem)]">{svc.title}</h3>
                    <p className="text-muted mt-3 leading-relaxed">{svc.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {svc.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm">
                          <span className="grid place-items-center h-5 w-5 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg,#2f6bff,#ffd60a)' }}><Icon.check className="h-3 w-3 text-[#060912]" /></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => go('contact')} className="btn btn-primary mt-7 !py-3">{t.common.getQuote}<Icon.arrow className="h-4 w-4 rtl:rotate-180" /></button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* process */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading center eyebrow={t.process.eyebrow} title={t.process.title} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.process.steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative glass rounded-2xl p-6 h-full card-hover">
                  <div className="font-display text-5xl font-extrabold leading-none" style={{ WebkitTextStroke: '1px rgba(120,160,255,0.4)', color: 'transparent' }}>{s.n}</div>
                  <h3 className="font-display font-semibold mt-4">{s.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{s.text}</p>
                  {i < t.process.steps.length - 1 && (
                    <Icon.arrow className="hidden lg:block absolute top-7 -end-2 h-5 w-5 text-blue-bright/40 rtl:rotate-180" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}
