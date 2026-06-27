import { Reveal, CountUp, Icon, useLang } from '../ui'
import { Pic } from '../../media'
import { CtaBand } from '../sections'

const VALUE_ICONS = [Icon.trend, Icon.drop, Icon.bolt, Icon.shield]

export default function About({ go }) {
  const { t } = useLang()
  return (
    <div>
      {/* intro split */}
      <section className="section">
        <div className="wrap split">
          <div>
            <Reveal><div className="eyebrow">{t.about.eyebrow}</div></Reveal>
            <Reveal delay={0.06}><h1 className="lead-h mt-4">{t.about.title}</h1></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-[1.05rem] leading-relaxed">{t.about.lead}</p></Reveal>
            <Reveal delay={0.18}><p className="muted mt-4">{t.about.body}</p></Reveal>
            <Reveal delay={0.24}>
              <div className="cta-row mt-7">
                <button className="btn btn-blue" onClick={() => go('services')}>{t.common.viewServices}</button>
                <button className="btn btn-ghost" style={{ color: 'var(--color-ink)' }} onClick={() => go('contact')}>{t.common.talkToExpert}</button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="figure" style={{ aspectRatio: '4 / 3' }}>
              <Pic name="robot-action-valley" imgClassName="w-full h-full object-cover" eager />
            </div>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="section section-sand" style={{ paddingBlock: '3.5rem' }}>
        <div className="wrap grid sm:grid-cols-3 gap-5">
          {t.about.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card p-7 text-center">
                <div className="font-display text-[2.6rem] font-bold leading-none" style={{ color: 'var(--color-blue)' }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="muted mt-2 text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* mission band (dark) */}
      <section className="band" style={{ minHeight: 420 }}>
        <Pic name="robot-cleaning-wide" className="media" imgClassName="media" />
        <div className="scrim" />
        <div className="inner"><div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal><div className="eyebrow" style={{ color: '#cfd6ff' }}>{t.about.missionTitle}</div></Reveal>
          <Reveal delay={0.08}><h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.3rem)] leading-snug text-balance">{t.about.mission}</h2></Reveal>
        </div></div>
      </section>

      {/* values */}
      <section className="section">
        <div className="wrap">
          <Reveal><div className="eyebrow">{t.about.eyebrow}</div></Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {t.about.values.map((v, i) => {
              const I = VALUE_ICONS[i] || Icon.check
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="card p-6 h-full card-hover">
                    <span className="grid place-items-center h-11 w-11 rounded-xl mb-4" style={{ background: 'var(--color-blue-soft)', border: '1px solid #dfe3f3', color: 'var(--color-blue)' }}><I className="h-5 w-5" /></span>
                    <h3 className="font-display font-semibold text-[17px]">{v.title}</h3>
                    <p className="muted text-sm mt-2 leading-relaxed">{v.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* audience + figure */}
      <section className="section section-sand">
        <div className="wrap split">
          <Reveal>
            <div className="figure" style={{ aspectRatio: '4 / 3' }}>
              <Pic name="field-arrival-atv" imgClassName="w-full h-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal><h2 className="lead-h">{t.about.audienceTitle}</h2></Reveal>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {t.about.audience.map((a, i) => (
                <Reveal key={i} delay={i * 0.06}><span className="chip">{a}</span></Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}
