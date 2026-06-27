import { Reveal, CountUp, Icon, useLang } from '../ui'
import { Pic, Clip } from '../../media'

const SERVICE_MEDIA = {
  cleaning: { type: 'clip', name: 'robot-brush-closeup' },
  maintenance: { type: 'pic', name: 'robot-cleaning-wide' },
  installation: { type: 'pic', name: 'utility-field-wide' },
}
const PT_ICONS = [Icon.robot, Icon.panel, Icon.bolt]

export default function Home({ go }) {
  const { t } = useLang()

  return (
    <div>
      {/* ===================== HERO (dark cinematic video) ===================== */}
      <section className="hero">
        <div className="absolute inset-0">
          <Clip name="showreel-clean-run-01" className="hidden sm:block w-full h-full" videoClassName="media" eager />
          <Clip name="robot-vertical-mobile" className="sm:hidden w-full h-full" videoClassName="media" objectPosition="center" eager />
        </div>
        <div className="scrim" />
        <div className="inner">
          <div className="wrap">
            <Reveal><div className="eyebrow">{t.hero.eyebrow}</div></Reveal>
            <Reveal delay={0.08}>
              <h1>
                {t.hero.titleA} {t.hero.titleB} <span className="hl">{t.hero.titleC}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}><p className="sub">{t.hero.sub}</p></Reveal>
            <Reveal delay={0.24}>
              <div className="cta-row">
                <button className="btn btn-blue" onClick={() => go('contact')}>{t.common.getQuote}</button>
                <button className="btn btn-ghost" onClick={() => go('services')}>{t.common.viewServices}</button>
                <button className="play" onClick={() => go('portfolio')}><span className="tri" />{t.portfolio.videoCta}</button>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="stats">
                {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
                  <div className="stat" key={i}>
                    <div className="v"><CountUp value={s.value} /><b>{s.suffix}</b></div>
                    <div className="l">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== TRUST STRIP ===================== */}
      <div className="trust section-sand" style={{ borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap flex items-center gap-3 flex-wrap" style={{ paddingBlock: 18 }}>
          <span className="text-[12px] tracking-[0.16em] uppercase text-muted font-semibold me-2">{t.trust.title}</span>
          {t.trust.items.map((it) => <span key={it} className="chip">{it}</span>)}
        </div>
      </div>

      {/* ===================== INTRO — Dirty panels (light split) ===================== */}
      <section className="section">
        <div className="wrap split">
          <div>
            <Reveal><div className="eyebrow">{t.intro.eyebrow}</div></Reveal>
            <Reveal delay={0.06}><h2 className="lead-h mt-4">{t.intro.title}</h2></Reveal>
            <Reveal delay={0.12}><p className="muted mt-4 text-[16px]">{t.intro.body}</p></Reveal>
            <div className="pts">
              {t.intro.points.map((p, i) => {
                const I = PT_ICONS[i] || Icon.check
                return (
                  <Reveal key={i} delay={0.1 + i * 0.07}>
                    <div className="pt">
                      <span className="ic"><I className="h-5 w-5" /></span>
                      <div><h4>{p.title}</h4><p>{p.text}</p></div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="figure" style={{ aspectRatio: '4 / 3' }}>
              <span className="tag">{t.portfolio.beforeAfter.before} · {t.intro.eyebrow}</span>
              <Pic name="array-dust-atmospheric" imgClassName="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICES (sand) ===================== */}
      <section className="section section-sand">
        <div className="wrap">
          <Reveal><div className="eyebrow">{t.services.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h2 className="lead-h mt-3">{t.services.title}</h2></Reveal>
          <Reveal delay={0.12}><p className="muted mt-3 text-[16px] max-w-[640px]">{t.services.sub}</p></Reveal>
          <div className="svc-grid">
            {t.services.items.map((svc, i) => {
              const m = SERVICE_MEDIA[svc.key]
              return (
                <Reveal key={svc.key} delay={i * 0.08}>
                  <article className="svc-card h-full">
                    <div className="ph">
                      {i === 0 && <span className="flag">{svc.tag}</span>}
                      {m.type === 'clip'
                        ? <Clip name={m.name} videoClassName="w-full h-full object-cover" />
                        : <Pic name={m.name} imgClassName="w-full h-full object-cover" />}
                    </div>
                    <div className="body">
                      <h3>{svc.title}</h3>
                      <p>{svc.text}</p>
                      <div className="bul">{svc.bullets.map((b) => <span key={b}>{b}</span>)}</div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== DARK SHOWREEL BAND ===================== */}
      <section className="band">
        <Pic name="robot-cleaning-lowangle" className="media" imgClassName="media" />
        <div className="scrim" />
        <div className="inner">
          <div className="wrap">
            <Reveal>
              <button className="playbig" onClick={() => go('portfolio')} aria-label={t.portfolio.videoCta} />
            </Reveal>
            <Reveal delay={0.06}><div className="eyebrow" style={{ color: '#cfd6ff' }}>{t.portfolio.eyebrow}</div></Reveal>
            <Reveal delay={0.1}><h2>{t.portfolio.videoTitle}</h2></Reveal>
            <Reveal delay={0.16}><p>{t.portfolio.videoSub}</p></Reveal>
            <Reveal delay={0.2}>
              <button className="btn btn-ghost" onClick={() => go('portfolio')}>{t.common.viewGallery}</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== MODULES (light) ===================== */}
      <section className="section">
        <div className="wrap">
          <Reveal><div className="eyebrow">{t.services.eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h2 className="lead-h mt-3">{t.services.moduleTitle}</h2></Reveal>
          <div className="mods">
            {t.services.modules.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="mod h-full">
                  <div className="n">{String(i + 1).padStart(2, '0')}</div>
                  <h4>{m.title}</h4>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY (sand) ===================== */}
      <section className="section section-sand">
        <div className="wrap">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <Reveal><div className="eyebrow">{t.portfolio.eyebrow}</div></Reveal>
              <Reveal delay={0.06}><h2 className="lead-h mt-3">{t.portfolio.title}</h2></Reveal>
            </div>
            <Reveal><button className="btn btn-dark" onClick={() => go('portfolio')}>{t.common.viewGallery}</button></Reveal>
          </div>
          <div className="gal">
            {[
              { cls: 'g-a', name: 'robot-cleaning-wide', cap: t.portfolio.items[2].title },
              { cls: 'g-b', name: 'utility-field-wide', cap: t.portfolio.items[1].title },
              { cls: 'g-c', name: 'robot-on-array-angled', cap: t.portfolio.items[0].title },
              { cls: 'g-d', name: 'array-rows-hillside', cap: t.portfolio.items[4].title },
              { cls: 'g-e', name: 'array-panorama', cap: t.portfolio.items[5].title },
            ].map((g) => (
              <button key={g.cls} className={`gi ${g.cls}`} onClick={() => go('portfolio')}>
                <Pic name={g.name} imgClassName="w-full h-full object-cover" />
                <span className="cap">{g.cap}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA BAND ===================== */}
      <section className="ctaband">
        <div className="wrap">
          <Reveal><h2>{t.cta.title}</h2></Reveal>
          <Reveal delay={0.06}><p>{t.cta.sub}</p></Reveal>
          <Reveal delay={0.12}><button className="btn btn-y" onClick={() => go('contact')}>{t.cta.button}</button></Reveal>
        </div>
      </section>
    </div>
  )
}
