import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LangProvider, useLang, Icon, Magnetic } from './ui'
import { AmbientBackground, LionSun } from './SolarScene'
import { NAV_PAGES, CONTACT } from './i18n'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

const PAGES = { home: Home, about: About, services: Services, portfolio: Portfolio, contact: Contact }

function Logo({ onClick }) {
  const { t } = useLang()
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group" aria-label={t.brand}>
      <span className="relative h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-12">
        <LionSun className="h-full w-full drop-shadow-[0_2px_10px_rgba(255,140,50,0.5)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold text-[1.05rem] tracking-tight">{t.brand}</span>
        <span className="text-[0.58rem] uppercase tracking-[0.22em] text-gold/80 font-medium mt-0.5">Desert Solar</span>
      </span>
    </button>
  )
}

function LangToggle() {
  const { t, toggle } = useLang()
  return (
    <button onClick={toggle} className="btn btn-ghost !px-3.5 !py-2 !text-sm" aria-label="Switch language">
      <Icon.globe className="h-4 w-4" />
      {t.langLabel}
    </button>
  )
}

function Header({ page, go }) {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      >
        <div className={`transition-all duration-500 ${scrolled ? 'glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]' : ''}`}>
          <div className="container-x flex items-center justify-between h-16">
            <Logo onClick={() => go('home')} />

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_PAGES.map((p) => (
                <button
                  key={p}
                  onClick={() => go(p)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${page === p ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {t.nav[p]}
                  {page === p && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full" style={{ background: 'rgba(47,107,255,0.16)', border: '1px solid rgba(47,107,255,0.3)' }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <LangToggle />
              <Magnetic strength={0.25}>
                <button onClick={() => go('contact')} className="btn btn-primary !py-2.5">
                  <Icon.bolt className="h-4 w-4" />
                  {t.nav.cta}
                </button>
              </Magnetic>
            </div>

            <button onClick={() => setOpen(true)} className="lg:hidden btn btn-ghost !p-2.5" aria-label="Open menu">
              <Icon.menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-[#060912]/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-0 inset-x-0 glass-strong border-b border-white/10 p-6 pt-5"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-6">
                <Logo onClick={() => { go('home'); setOpen(false) }} />
                <button onClick={() => setOpen(false)} className="btn btn-ghost !p-2.5" aria-label="Close menu">
                  <Icon.close className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_PAGES.map((p, i) => (
                  <motion.button
                    key={p}
                    onClick={() => { go(p); setOpen(false) }}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className={`text-start text-lg font-display font-semibold py-3 border-b border-white/5 ${page === p ? 'text-gradient' : 'text-ink'}`}
                  >
                    {t.nav[p]}
                  </motion.button>
                ))}
              </nav>
              <div className="flex items-center gap-3 mt-6">
                <LangToggle />
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-gold flex-1">
                  <Icon.phone className="h-4 w-4" />
                  {t.common.callUs}
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
  const { t } = useLang()
  return (
    <footer className="relative border-t border-white/10 mt-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(10,15,30,0.7))' }}>
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onClick={() => go('home')} />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">{t.footer.blurb}</p>
            <div className="flex gap-2.5 mt-5">
              {['instagram', 'facebook', 'linkedin', 'youtube'].map((s) => (
                <a key={s} href="#" onClick={(e) => e.preventDefault()} className="grid place-items-center h-9 w-9 rounded-lg glass text-muted hover:text-ink card-hover" aria-label={s}>
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {NAV_PAGES.map((p) => (
                <li key={p}><button onClick={() => go(p)} className="hover:text-ink transition-colors">{t.nav[p]}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.services}</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {t.footer.servicesList.map((s) => <li key={s}><button onClick={() => go('services')} className="hover:text-ink transition-colors text-start">{s}</button></li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-2.5 hover:text-ink transition-colors"><Icon.phone className="h-4 w-4 text-blue-bright shrink-0" />{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 hover:text-ink transition-colors"><Icon.mail className="h-4 w-4 text-blue-bright shrink-0" />{CONTACT.email}</a></li>
              <li className="flex items-center gap-2.5"><Icon.sun className="h-4 w-4 text-gold-warm shrink-0" />{CONTACT.name}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</span>
          <span className="opacity-70">{t.footer.builtBy}</span>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const common = { className: 'h-4 w-4', viewBox: '0 0 24 24', fill: 'currentColor' }
  if (name === 'instagram')
    return <svg {...common}><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.42 8.86 3.42 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.96a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>
  if (name === 'facebook')
    return <svg {...common}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
  if (name === 'linkedin')
    return <svg {...common}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.76V1.74C24 .78 23.2 0 22.22 0Z" /></svg>
  return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>
}

function StickyCallBar({ go }) {
  const { t } = useLang()
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
      <div className="glass-strong rounded-2xl p-2 flex gap-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.7)]">
        <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-gold flex-1 !py-3">
          <Icon.phone className="h-4 w-4" />{t.common.callUs}
        </a>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary flex-1 !py-3">
          <Icon.whatsapp className="h-4 w-4" />{t.common.whatsapp}
        </a>
      </div>
    </div>
  )
}

function Shell() {
  const [page, setPage] = useState('home')
  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const PageComp = PAGES[page] || Home

  return (
    <>
      <AmbientBackground />
      <Header page={page} go={go} />
      <main className="relative pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <PageComp go={go} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
      <StickyCallBar go={go} />
      <div className="h-20 lg:hidden" />
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
