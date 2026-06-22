import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Preloader from './components/Preloader'
import SmoothScroll from './components/effects/SmoothScroll'
import MotionPermissionGate from './components/effects/MotionPermissionGate'
import StickyMobileCTA from './components/StickyMobileCTA'
import StatsStrip from './components/StatsStrip'
import ScrollProgress from './components/effects/ScrollProgress'
import DepthOverlay from './components/effects/DepthOverlay'
import Header from './components/Header'
import Hero from './components/Hero'
import CostOfBadWebsite from './components/CostOfBadWebsite'
import Services from './components/Services'
import CapabilityLens from './components/CapabilityLens'
import WebsiteTransform from './components/WebsiteTransform'
import SpeedRace from './components/SpeedRace'
import CaseStudyImpact from './components/CaseStudyImpact'
import Portfolio from './components/Portfolio'
import IntegrationsMarquee from './components/IntegrationsMarquee'
import Testimonials from './components/Testimonials'
import DemoWebsiteCTA from './components/DemoWebsiteCTA'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Intake flow (form steps + confetti) is its own chunk — loaded only on /intake.
const IntakePage = lazy(() => import('./components/intake/IntakePage'))

// The public site (main page) is the TRIMMED cut — several heavy sections are
// removed to reduce jank. The full original lives privately at /V2.html.
// Pass `trimmed` to omit those sections.
function HomePage({ trimmed = false }) {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CostOfBadWebsite />
        <Services />
        {!trimmed && <StatsStrip />}
        {!trimmed && <CapabilityLens />}
        {!trimmed && <WebsiteTransform />}
        {!trimmed && <SpeedRace />}
        {!trimmed && <CaseStudyImpact />}
        <Portfolio />
        <IntegrationsMarquee />
        <Testimonials />
        <DemoWebsiteCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  )
}

// Animated route transitions (home ↔ intake). Quick aperture-fade, <600ms.
function AnimatedRoutes({ trimmed = false, wildcardHome = false }) {
  const location = useLocation()
  const reduce = useReducedMotion()

  const routes = (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <Routes location={location}>
        {/* When served from a non-root .html (e.g. /V2.html), home must match any
            non-intake path; the public index is served from "/". */}
        <Route path={wildcardHome ? '*' : '/'} element={<HomePage trimmed={trimmed} />} />
        <Route path="/intake" element={<IntakePage />} />
      </Routes>
    </Suspense>
  )

  if (reduce) return routes

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.99, clipPath: 'circle(0% at 50% 45%)' }}
        animate={{ opacity: 1, scale: 1, clipPath: 'circle(150% at 50% 45%)' }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.45, ease: [0.83, 0, 0.17, 1] }}
      >
        {routes}
      </motion.div>
    </AnimatePresence>
  )
}

export default function App({ trimmed = false, wildcardHome = false }) {
  return (
    <MotionPermissionGate>
      <Preloader />
      <ScrollProgress />
      <DepthOverlay />
      <SmoothScroll>
        <AnimatedRoutes trimmed={trimmed} wildcardHome={wildcardHome} />
      </SmoothScroll>
    </MotionPermissionGate>
  )
}
