import { Reveal, Icon, useLang } from '../ui'
import { Pic, Clip } from '../../media'
import { CtaBand } from '../sections'

const SERVICE_MEDIA = {
  cleaning: { type: 'clip', name: 'field-team-operating' },
  maintenance: { type: 'clip', name: 'robot-brush-closeup' },
  installation: { type: 'pic', name: 'utility-field-wide' },
}

export default function Services({ go }) {
  const { t } = useLang()
  return (
    <div>
      <section className="section">
        <div className="wrap text-center max-w-3xl mx-auto">
          <Reveal><div className="eyebrow justify-center">{t.services.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="lead-h mx-auto mt-3">{t.services.title}</h1></Reveal>
          <Reveal delay={0.12}><p className="muted mt-4 text-[16px]">{t.services.sub}</p></Reveal>
        </div>
      </section>

      {/* alternating service blocks */}
      <section className="section section-sand">
        <div className="wrap flex flex-col gap-7">
          {t.services.items.map((svc, i) => {
            const m = SERVICE_MEDIA[svc.key]
            const flip = i % 2 === 1
            return (
              <Reveal key={svc.key}>
                <div className={`split items-center card p-5 lg:p-7 ${flip ? '[&>*:first-child]:lg:order-2' : ''}`}>
                  <div className="figure" style={{ aspectRatio: '16 / 10' }}>
                    {i === 0 && <span className="tag y">{svc.tag}</span>}
                    {m.type === 'clip'
                      ? <Clip name={m.name} videoClassName="w-full h-full object-cover" />
                      : <Pic name={m.name} imgClassName="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[clamp(1.3rem,3vw,1.7rem)]">{svc.title}</h3>
                    <p className="muted mt-3 leading-relaxed">{svc.text}</p>
                    <div className="bul mt-5">{svc.bullets.map((b) => <span key={b}>{b}</span>)}</div>
                    <button className="btn btn-blue mt-7" onClick={() => go('contact')}>{t.common.getQuote}</button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* process */}
      <section className="section">
        <div className="wrap">
          <Reveal><div className="eyebrow">{t.process.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h2 className="lead-h mt-3">{t.process.title}</h2></Reveal>
          <div className="mods" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
            {t.process.steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="mod h-full">
                  <div className="n">{s.n}</div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* modules */}
      <section className="section section-sand">
        <div className="wrap">
          <Reveal><h2 className="lead-h">{t.services.moduleTitle}</h2></Reveal>
          <div className="mods">
            {t.services.modules.map((m, i) => {
              const cats = ['rooftop', 'ground', 'floating']
              const media = ['robot-on-array-angled', 'utility-field-wide', 'floating-pv-02']
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="card overflow-hidden h-full card-hover" style={{ padding: 0 }}>
                    <div style={{ height: 150, overflow: 'hidden' }}>
                      <Pic name={media[i]} imgClassName="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="n font-display font-bold text-sm" style={{ color: 'var(--color-blue)' }}>{String(i + 1).padStart(2, '0')}</div>
                      <h4 className="font-display font-semibold text-[19px] mt-1 flex items-center gap-2"><Icon.panel className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />{m.title}</h4>
                      <p className="muted text-sm mt-2">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}
