import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2 group">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
        <rect width="36" height="36" rx="8" fill="#0f31b8"/>
        <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="#b3c8f4" strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="18" r="3" fill="#b3c8f4"/>
        <circle cx="18" cy="18" r="1.2" fill="#0f31b8"/>
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-primary">EYE</span>
        <span className="text-white">uni</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-300 hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/intake"
            className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/80 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Get Free Demo
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 bg-dark/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-300 hover:text-primary transition-colors py-2 border-b border-dark-border"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/intake"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-3 bg-accent text-white text-center font-semibold rounded-lg hover:bg-accent/80 transition-all duration-300"
          >
            Get Free Demo
          </Link>
        </div>
      </div>
    </header>
  )
}
