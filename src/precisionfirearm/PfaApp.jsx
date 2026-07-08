import { useEffect, useMemo, useRef, useState } from 'react'
import { T, CONTACT } from './content.js'
import { LangContext, useLang, useT, CrosshairMark, LoopVideo, Reveal } from './ui.jsx'
import {
  Hero,
  Stats,
  HowItWorks,
  Licensing,
  VideoBand,
  Testimonial,
  Courses,
  Instructor,
  UpcomingClasses,
  Range,
  Women,
  Faq,
  Contact,
} from './sections.jsx'

const NAV_ITEMS = [
  ['licensing', T.nav.licensing],
  ['courses', T.nav.courses],
  ['instructor', T.nav.instructor],
  ['classes', T.nav.classes],
  ['range', T.nav.range],
  ['faq', T.nav.faq],
  ['contact', T.nav.contact],
]

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? doc.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div className="pfa-progress" ref={ref} aria-hidden="true" />
}

function Nav({ scrolled }) {
  const t = useT()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <nav className={`nav${scrolled || open ? ' nav--solid' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
          <CrosshairMark />
          <span>
            PRECISION{' '}
            <span className="nav__brand-rest" style={{ color: 'var(--faint)' }}>
              FIREARMS ACADEMY
            </span>
          </span>
        </a>
        <div className="nav__links">
          {NAV_ITEMS.map(([id, label]) => (
            <a key={id} className="nav__link" href={`#${id}`}>
              {t(label)}
            </a>
          ))}
        </div>
        <div className="nav__right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              EN
            </button>
            <button aria-pressed={lang === 'es'} onClick={() => setLang('es')}>
              ES
            </button>
          </div>
          <a className="btn btn--brass nav__cta" href={CONTACT.phoneHref}>
            {t(T.nav.call)}
          </a>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`nav__mobile${open ? ' nav__mobile--open' : ''}`}>
        {NAV_ITEMS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {t(label)}
          </a>
        ))}
        <a href={CONTACT.phoneHref} style={{ color: 'var(--accent)' }} onClick={() => setOpen(false)}>
          {t(T.nav.call)} · {CONTACT.phoneDisplay}
        </a>
      </div>
    </nav>
  )
}

/* Second full-bleed band — workbench craftsmanship, between courses and instructor. */
function WorkbenchBand() {
  const t = useT()
  return (
    <section
      className="band"
      style={{ height: 'clamp(340px, 55vh, 520px)' }}
      aria-label={t({ en: 'Craftsmanship at the workbench', es: 'Oficio en el banco de trabajo' })}
    >
      <LoopVideo name="workbench-loop" />
      <Reveal as="p" y={26} className="band__quote" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)', maxWidth: '30ch' }}>
        {t({
          en: 'Handling. Cleaning. Storage. The quiet half of marksmanship.',
          es: 'Manejo. Limpieza. Almacenamiento. La mitad silenciosa de la puntería.',
        })}
      </Reveal>
    </section>
  )
}

function StickyCta({ visible }) {
  const t = useT()
  return (
    <div className={`sticky-cta${visible ? ' sticky-cta--visible' : ''}`}>
      <a className="btn btn--brass" href={CONTACT.phoneHref}>
        {t(T.sticky.label)} · {CONTACT.phoneDisplay} <span className="arr">→</span>
      </a>
    </div>
  )
}

function Footer() {
  const t = useT()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">
          <CrosshairMark size={18} />
          PRECISION FIREARMS ACADEMY, LLC
        </span>
        <span className="footer__tag">“{t(T.footer.tagline)}”</span>
        <span className="footer__meta">
          <a className="link-brass tnum" href={CONTACT.phoneHref}>
            {CONTACT.phoneDisplay}
          </a>
          <a className="link-brass" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          <span>© 2026 · {t(T.footer.rights)}</span>
        </span>
      </div>
    </footer>
  )
}

export default function PfaApp() {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('pfa-lang')
      return saved === 'es' ? 'es' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (next) => {
    setLangState(next)
    try {
      localStorage.setItem('pfa-lang', next)
    } catch {
      /* private mode — in-memory state still works */
    }
  }

  const ctx = useMemo(() => ({ lang, setLang }), [lang])

  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 24)
      setPastHero(scrollY > innerHeight * 0.85)
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LangContext.Provider value={ctx}>
      <ScrollProgress />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Licensing />
        <VideoBand />
        <Testimonial />
        <Courses />
        <WorkbenchBand />
        <Instructor />
        <UpcomingClasses />
        <Range />
        <Women />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta visible={pastHero} />
      <div className="pfa-grain" aria-hidden="true" />
    </LangContext.Provider>
  )
}
