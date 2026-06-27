import { motion } from 'framer-motion'
import { Reveal, CountUp, Magnetic, Icon, SectionHeading, useLang } from '../ui'
import { HeroArt } from '../SolarScene'
import { CtaBand, SolarTile } from '../sections'
import { CONTACT } from '../i18n'

const SERVICE_ICONS = { cleaning: Icon.robot, maintenance: Icon.wrench, installation: Icon.panel }
const MODULE_ICONS = [Icon.panel, Icon.bolt, Icon.drop]

export default function Home({ go }) {
  const { t } = useLang()

  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div>
            <Reveal>
              <span className="eyebrow"><Icon.robot className="h-3.5 w-3.5" />{t.hero.eyebrow}</span>
            </Reveal>
            <h1 className="headline mt-6 text-[clamp(2.6rem,7.5vw,4.7rem)]">
              <Reveal as="span" className="block">{t.hero.titleA}</Reveal>
              <Reveal as="span" delay={0.08} className="block text-gradient">{t.hero.titleB}</Reveal>
              <Reveal as="span" delay={0.16} className="block">{t.hero.titleC}</Reveal>
            </h1>
            <Reveal delay={0.24}>
              <p className="mt-6 text-[1.08rem] leading-relaxed text-muted max-w-xl">{t.hero.sub}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic strength={0.25}>
                  <button onClick={() => go('contact')} className="btn btn-primary !px-6 !py-3.5">
                    <Icon.bolt className="h-4 w-4 text-gold" />{t.common.getQuote}
                  </button>
                </Magnetic>
                <button onClick={() => go('services')} className="btn btn-ghost !px-6 !py-3.5">
                  {t.common.viewServices}<Icon.arrow className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
                {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((st, i) => (
                  <div key={i}>
                    <div className="font-display text-[2rem] font-extrabold leading-none text-gradient">
                      <CountUp value={st.value} suffix={st.suffix} />
                    </div>
                    <div className="mt-1.5 text-xs text-muted max-w-[10rem] leading-snug">{st.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <HeroArt />
          </Reveal>
        </div>

        {/* scroll cue */}
        <div className="hidden lg:flex justify-center pb-6">
          <motion.div className="flex flex-col items-center gap-2 text-muted text-xs" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="uppercase tracking-[0.2em]">{t.hero.scroll}</span>
            <Icon.arrow className="h-4 w-4 rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* ===================== TRUST MARQUEE ===================== */}
      <section className="py-6 border-y border-white/10 overflow-hidden" style={{ background: 'rgba(10,15,30,0.5)' }}>
        <div className="container-x mb-3">
          <p className="text-center text-xs uppercase tracking-[0.22em] text-muted">{t.trust.title}</p>
        </div>
        <div className="relative">
          <div className="marquee-track gap-3">
            {[...t.trust.items, ...t.trust.items].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm whitespace-nowrap mx-1.5">
                <Icon.check className="h-3.5 w-3.5 text-blue-bright" />{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY / INTRO ===================== */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow={t.intro.eyebrow} title={t.intro.title} sub={t.intro.body} />
            <div className="mt-8 space-y-4">
              {t.intro.points.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-4 glass rounded-2xl p-4 card-hover">
                    <div className="grid place-items-center h-11 w-11 rounded-xl shrink-0" style={{ background: 'linear-gradient(135deg, rgba(47,107,255,0.25), rgba(255,179,0,0.2))' }}>
                      <Icon.check className="h-5 w-5 text-blue-bright" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted mt-1 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Soiling loss visual */}
          <Reveal delay={0.15}>
            <div className="relative glass-strong rounded-[1.75rem] p-7 overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,179,0,0.3), transparent 70%)', filter: 'blur(20px)' }} />
              <div className="relative">
                <div className="flex items-center gap-2 text-sm text-muted"><Icon.trend className="h-4 w-4 text-gold-warm" />Output recovery</div>
                <div className="mt-5 space-y-4">
                  <BarRow label="Soiled panel" pct={70} color="#7c4a12" />
                  <BarRow label="After Lavi clean" pct={100} color="linear-gradient(90deg,#2f6bff,#ffd60a)" highlight />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { v: 30, s: '%', l: 'recovered' },
                    { v: 10, s: '×', l: 'faster' },
                    { v: 100, s: '%', l: 'PV types' },
                  ].map((m, i) => (
                    <div key={i} className="rounded-xl glass p-3 text-center">
                      <div className="font-display text-xl font-extrabold text-gradient"><CountUp value={m.v} suffix={m.s} /></div>
                      <div className="text-[0.65rem] text-muted uppercase tracking-wide mt-0.5">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICES PREVIEW ===================== */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading center eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {t.services.items.map((svc, i) => {
              const I = SERVICE_ICONS[svc.key] || Icon.sun
              return (
                <Reveal key={svc.key} delay={i * 0.1}>
                  <button onClick={() => go('services')} className="group text-start w-full h-full glass rounded-2xl p-7 card-hover relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg,#2f6bff,#ffd60a)' }} />
                    <div className="flex items-center justify-between">
                      <div className="grid place-items-center h-13 w-13 rounded-2xl p-3.5" style={{ background: 'linear-gradient(135deg, #16306e, #0c1c45)', border: '1px solid rgba(120,160,255,0.25)' }}>
                        <I className="h-6 w-6 text-blue-bright" />
                      </div>
                      <span className="text-[0.65rem] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,214,10,0.15)', color: '#ffd60a' }}>{svc.tag}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mt-5">{svc.title}</h3>
                    <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-3">{svc.text}</p>
                    <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-blue-bright group-hover:gap-2.5 transition-all">
                      {t.common.learnMore}<Icon.arrow className="h-4 w-4 rtl:rotate-180" />
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== MODULE TYPES ===================== */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal><h2 className="headline text-center text-[clamp(1.6rem,4vw,2.5rem)]">{t.services.moduleTitle}</h2></Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {t.services.modules.map((m, i) => {
              const I = MODULE_ICONS[i]
              const cats = ['rooftop', 'ground', 'floating']
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="relative rounded-2xl overflow-hidden card-hover glass">
                    <div className="h-40 overflow-hidden">
                      <SolarTile cat={cats[i]} className="w-full h-full" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2.5">
                        <I className="h-5 w-5 text-gold-warm" />
                        <h3 className="font-display font-semibold">{m.title}</h3>
                      </div>
                      <p className="text-sm text-muted mt-2 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY TEASER ===================== */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeading eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} />
            <Reveal>
              <button onClick={() => go('portfolio')} className="btn btn-ghost">{t.common.viewGallery}<Icon.arrow className="h-4 w-4 rtl:rotate-180" /></button>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {t.portfolio.items.slice(0, 4).map((it, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <button onClick={() => go('portfolio')} className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden card-hover">
                  <SolarTile cat={it.cat} className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/85 to-transparent" />
                  <span className="absolute bottom-3 start-3 text-xs font-medium text-white/95 text-start">{it.title}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </div>
  )
}

function BarRow({ label, pct, color, highlight }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted mb-1.5">
        <span>{label}</span>
        <span className={highlight ? 'text-gold font-semibold' : ''}>{pct}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color.startsWith('linear') ? color : color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
