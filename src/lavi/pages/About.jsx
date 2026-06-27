import { Reveal, CountUp, Icon, SectionHeading, useLang } from '../ui'
import { CtaBand, SolarImage } from '../sections'

const VALUE_ICONS = [Icon.trend, Icon.drop, Icon.bolt, Icon.shield]

export default function About({ go }) {
  const { t } = useLang()

  return (
    <div>
      {/* hero */}
      <section className="section pb-0">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
            <Reveal delay={0.12}><p className="mt-6 text-[1.06rem] leading-relaxed text-muted">{t.about.lead}</p></Reveal>
            <Reveal delay={0.18}><p className="mt-4 text-muted leading-relaxed">{t.about.body}</p></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => go('services')} className="btn btn-primary">{t.common.viewServices}<Icon.arrow className="h-4 w-4 rtl:rotate-180" /></button>
                <button onClick={() => go('contact')} className="btn btn-ghost">{t.common.talkToExpert}</button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="rounded-[1.75rem] overflow-hidden glass-strong">
                <SolarImage cat="ground" idx={2} w={1000} className="w-full aspect-[4/3]" />
              </div>
              <div className="absolute -bottom-5 start-5 glass-strong rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-10 w-10 rounded-xl" style={{ background: 'linear-gradient(135deg,#2f6bff,#ffd60a)' }}><Icon.sun className="h-5 w-5 text-[#060912]" /></div>
                  <div>
                    <div className="font-display font-bold leading-tight">{t.brand}</div>
                    <div className="text-xs text-muted">{t.tagline}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="section">
        <div className="container-x grid sm:grid-cols-3 gap-4">
          {t.about.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass rounded-2xl p-7 text-center card-hover">
                <div className="font-display text-[2.6rem] font-extrabold leading-none text-gradient"><CountUp value={s.value} suffix={s.suffix} /></div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* mission */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 glass-strong">
              <div className="absolute -top-20 -start-10 h-56 w-56 rounded-full animate-drift" style={{ background: 'radial-gradient(circle, rgba(47,107,255,0.3), transparent 65%)', filter: 'blur(30px)' }} />
              <div className="relative max-w-3xl">
                <span className="eyebrow"><Icon.leaf className="h-3.5 w-3.5" />{t.about.missionTitle}</span>
                <p className="mt-6 headline text-[clamp(1.5rem,3.5vw,2.3rem)] leading-snug text-balance">{t.about.mission}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.about.values.map((v, i) => {
              const I = VALUE_ICONS[i] || Icon.check
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full card-hover">
                    <div className="grid place-items-center h-12 w-12 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, rgba(47,107,255,0.25), rgba(255,179,0,0.2))' }}><I className="h-6 w-6 text-blue-bright" /></div>
                    <h3 className="font-display font-semibold">{v.title}</h3>
                    <p className="text-sm text-muted mt-2 leading-relaxed">{v.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* audience */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading center title={t.about.audienceTitle} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {t.about.audience.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="glass rounded-full px-5 py-3 flex items-center gap-2.5 card-hover">
                  <Icon.check className="h-4 w-4 text-gold-warm" />
                  <span className="text-sm font-medium">{a}</span>
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
