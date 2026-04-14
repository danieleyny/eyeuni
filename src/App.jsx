import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import DemoWebsiteCTA from './components/DemoWebsiteCTA'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import IntakePage from './components/intake/IntakePage'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <DemoWebsiteCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/intake" element={<IntakePage />} />
    </Routes>
  )
}
