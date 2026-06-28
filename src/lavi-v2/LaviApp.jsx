import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LangProvider, useLang, Icon } from './ui'
import { LaviMark, Wordmark } from './LaviMark'
import { NAV_PAGES, CONTACT } from './i18n'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

const PAGES = { home: Home, about: About, services: Services, portfolio: Portfolio, contact: Contact }

function wordmarkText(lang) {
  return lang === 'he' ? { main: 'לביא', sub: 'אנרגיה' } : { main: 'LAVI', sub: 'ENERGY' }
}

function Brand({ go }) {
  const { t, lang } = useLang()
  const wm = wordmarkText(lang)
  return (
    <button className="brand" onClick={() => go('home')} aria-label={t.brand}>
      <LaviMark className="mark" />
      <Wordmark main={wm.main} sub={wm.sub} />
    </button>
  )
}

function LangToggle({ className = '' }) {
  const { lang, toggle } = useLang()
  return (
    <button className={`lang ${className}`} onClick={toggle} aria-label="Switch language">
      {lang === 'en' ? 'EN · עב' : 'עב · EN'}
    </button>
  )
}

function Header({ page, go }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="lavi-header">
        <div className="wrap nav">
          <Brand go={go} />
          <nav className="menu">
            {NAV_PAGES.map((p) => (
              <button key={p} className={page === p ? 'active' : ''} onClick={() => go(p)}>
                {t.nav[p]}
              </button>
            ))}
          </nav>
          <div className="navright">
            <div className="nav-desktop">
              <LangToggle />
              <button className="btn btn-blue !py-2.5 !px-4" onClick={() => go('contact')}>
                {t.nav.cta}
              </button>
            </div>
            <button className="nav-mobile lang !p-2" onClick={() => setOpen(true)} aria-label="Open menu">
              <Icon.menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-0 inset-x-0 p-6 pt-5"
              style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-line)' }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-5">
                <Brand go={(p) => { go(p); setOpen(false) }} />
                <button className="lang !p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                  <Icon.close className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col">
                {NAV_PAGES.map((p) => (
                  <button
                    key={p}
                    onClick={() => { go(p); setOpen(false) }}
                    className="text-start text-lg font-display font-semibold py-3 border-b"
                    style={{ borderColor: 'var(--color-line)', color: page === p ? 'var(--color-blue)' : 'var(--color-ink)' }}
                  >
                    {t.nav[p]}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3 mt-5">
                <LangToggle />
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-blue flex-1">
                  <Icon.phone className="h-4 w-4" />{t.common.callUs}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer({ go }) {
  const { t, lang } = useLang()
  const wm = wordmarkText(lang)
  return (
    <footer className="lavi-footer">
      <div className="wrap">
        <div className="fgrid">
          <div style={{ color: '#fff' }}>
            <button className="brand" onClick={() => go('home')} style={{ marginBottom: 14 }}>
              <span className="mark" style={{ color: '#cdd0da', display: 'inline-flex' }}><LaviMark className="w-full h-full" /></span>
              <Wordmark main={wm.main} sub={wm.sub} />
            </button>
            <p style={{ maxWidth: 260 }}>{t.footer.blurb}</p>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost mt-5" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.22)' }}>
              <Icon.whatsapp className="h-4 w-4" />{t.footer.whatsappCta}
            </a>
          </div>
          <div>
            <h5>{t.footer.services}</h5>
            {t.footer.servicesList.map((s) => (
              <a key={s} href="#" onClick={(e) => { e.preventDefault(); go('services') }} className="block mb-2.5 text-start">{s}</a>
            ))}
          </div>
          <div>
            <h5>{t.footer.quickLinks}</h5>
            {['about', 'portfolio', 'contact'].map((p) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} className="block mb-2.5 text-start">{t.nav[p]}</a>
            ))}
          </div>
          <div>
            <h5>{t.footer.contact}</h5>
            <p style={{ marginBottom: 9 }}>{CONTACT.name}</p>
            <a href={`tel:${CONTACT.phoneHref}`} className="block mb-2.5" dir="ltr">{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="block mb-2.5 break-all">{CONTACT.email}</a>
            <p>{t.contact.hours}</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</span>
          <span>{t.footer.builtBy}</span>
        </div>
      </div>
    </footer>
  )
}

function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className="scroll-progress" style={{ width: '100%', transform: `scaleX(${p})` }} />
}

/* The new sunrise mark, drawn stroke-by-stroke for the load-in screen. */
function DrawMark({ reduce }) {
  const C = '#f6f7fb'
  const draw = (delay, dur = 0.55) =>
    reduce
      ? { initial: false }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: dur, delay, ease: 'easeInOut' }, opacity: { duration: 0.15, delay } },
        }
  const rays = [
    ['50', '9', '50', '21'],
    ['26', '19', '33', '29'],
    ['74', '19', '67', '29'],
    ['11', '41', '23', '45'],
    ['89', '41', '77', '45'],
  ]
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none" aria-hidden>
      {/* horizon + disc */}
      <motion.path d="M31 60 A19 19 0 0 1 69 60" stroke={C} strokeWidth="6" strokeLinecap="round" {...draw(0.1, 0.6)} />
      <motion.line x1="17" y1="60" x2="83" y2="60" stroke={C} strokeWidth="6" strokeLinecap="round" {...draw(0.2, 0.5)} />
      {/* rays, outward */}
      {rays.map((r, i) => (
        <motion.line key={i} x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} stroke={i === 0 ? '#e0a400' : C} strokeWidth="6" strokeLinecap="round" {...draw(0.45 + i * 0.07, 0.4)} />
      ))}
      {/* panel ticks */}
      <motion.line x1="32" y1="60" x2="29" y2="73" stroke={C} strokeWidth="4" strokeLinecap="round" {...draw(0.85, 0.3)} />
      <motion.line x1="50" y1="60" x2="50" y2="75" stroke={C} strokeWidth="4" strokeLinecap="round" {...draw(0.9, 0.3)} />
      <motion.line x1="68" y1="60" x2="71" y2="73" stroke={C} strokeWidth="4" strokeLinecap="round" {...draw(0.95, 0.3)} />
      {/* core dot pops in */}
      <motion.circle cx="50" cy="55" r="5.5" fill="#2a4ea0"
        initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.05, duration: 0.45, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: '50px 55px' }} />
    </svg>
  )
}

/* Animated load-in screen — the sunrise mark draws itself, the wordmark rises
   and a yellow underline sweeps, then the overlay fades. Shown once on load. */
function Preloader() {
  const reduce = useReducedMotion()
  const rtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
  const [done, setDone] = useState(false)
  useEffect(() => {
    const tt = setTimeout(() => setDone(true), reduce ? 320 : 1950)
    return () => clearTimeout(tt)
  }, [reduce])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center"
          style={{ background: 'var(--color-base)', color: '#fff' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* deep-blue radial glow so the dark screen isn't flat */}
          <div className="absolute h-[26rem] w-[26rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(42,78,160,0.18), transparent 60%)', filter: 'blur(20px)' }} />
          <div className="relative flex flex-col items-center">
            <DrawMark reduce={reduce} />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-4 font-display font-semibold tracking-[0.22em] text-[15px]"
            >
              LAVI ENERGY
            </motion.div>
            <div className="mt-3 h-[2px] w-44 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="h-full"
                style={{ background: 'var(--color-yellow)', transformOrigin: rtl ? '100% 50%' : '0 50%' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0.2 : 1, delay: reduce ? 0 : 0.95, ease: [0.22, 0.61, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const validPage = (p) => (PAGES[p] ? p : 'home')

/* Slim sticky Call / WhatsApp bar — mobile only (see .mobile-cta in CSS). */
function StickyMobileBar() {
  const { t } = useLang()
  return (
    <div className="mobile-cta">
      <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-blue"><Icon.phone className="h-4 w-4" />{t.common.callUs}</a>
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="btn" style={{ background: '#1faa52', color: '#fff' }}><Icon.whatsapp className="h-4 w-4" />{t.common.whatsapp}</a>
    </div>
  )
}

function Shell() {
  const { t } = useLang()
  const [page, setPage] = useState(() => validPage(window.location.hash.replace('#', '')))

  // per-page document title + meta description (SPA SEO)
  useEffect(() => {
    const label = page === 'home' ? '' : `${t.nav[page]} · `
    document.title = `${label}${t.brand} — ${t.tagline}`
    const descMap = {
      home: t.hero.sub, about: t.about.lead, services: t.services.sub,
      portfolio: t.portfolio.sub, contact: t.contact.sub,
    }
    const m = document.querySelector('meta[name="description"]')
    if (m && descMap[page]) m.setAttribute('content', descMap[page])
  }, [page, t])

  useEffect(() => {
    // seed the current history entry so back/forward restore in-site pages
    window.history.replaceState({ laviPage: page }, '')
    const onPop = (e) => {
      const p = validPage(e.state?.laviPage || window.location.hash.replace('#', ''))
      setPage(p)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const go = (p) => {
    if (p === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setPage(p)
    window.history.pushState({ laviPage: p }, '', '#' + p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const PageComp = PAGES[page] || Home

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header page={page} go={go} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <PageComp go={go} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
      <StickyMobileBar />
    </>
  )
}

export default function LaviApp() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  )
}
