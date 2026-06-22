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
    <a href="#hero" className="group flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
        <rect width="36" height="36" rx="9" fill="#0f31b8" />
        <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="#b3c8f4" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="18" r="3" fill="#b3c8f4" />
        <circle cx="18" cy="18" r="1.2" fill="#0f31b8" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="v3-grad-text">EYE</span>
        <span className="text-[#0a0e27]">uni</span>
      </span>
    </a>
  )
}

export default function HeaderV3() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[color:var(--hairline-color)] bg-white/80 shadow-[var(--shadow-sm)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-sm font-medium text-[#4b5568] transition-colors duration-300 hover:text-[#0a0e27]"
            >
              {link.label}
              <span className="v3-grad-bg absolute -bottom-1 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link to="/intake" className="v3-btn-primary px-5 py-2.5 text-sm font-semibold">
            Get Free Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 text-[#0a0e27] md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-[color:var(--hairline-color)] bg-white/95 px-6 pb-6 pt-2 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[color:var(--hairline-color)] py-3 text-[#4b5568] transition-colors hover:text-[#0a0e27]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/intake"
            onClick={() => setMobileOpen(false)}
            className="v3-btn-primary mt-4 px-5 py-3 text-center text-sm font-semibold"
          >
            Get Free Demo
          </Link>
        </div>
      </div>
    </header>
  )
}
