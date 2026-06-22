import { Link } from 'react-router-dom'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Design & UX', href: '#services' },
      { label: 'Infrastructure', href: '#services' },
      { label: 'E-Commerce', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Free Demo Website', href: '/intake', isRoute: true },
      { label: 'Contact', href: '#contact' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
]

export default function FooterV3() {
  return (
    <footer className="border-t border-[color:var(--hairline-color)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* logo + tagline */}
          <div>
            <a href="#hero" className="mb-4 flex items-center gap-2">
              <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="9" fill="#0f31b8" />
                <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="#b3c8f4" strokeWidth="1.5" fill="none" />
                <circle cx="18" cy="18" r="3" fill="#b3c8f4" />
                <circle cx="18" cy="18" r="1.2" fill="#0f31b8" />
              </svg>
              <span className="text-lg font-bold">
                <span className="v3-grad-text">EYE</span>
                <span className="text-[#0a0e27]">uni</span>
              </span>
            </a>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#4b5568]">
              You Dream It, We Build It. Fast, affordable, and stunning websites for modern businesses.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'instagram', 'github'].map((s) => (
                <a key={s} href="#" aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--hairline-color)] text-[#8a93a6] transition-colors duration-300 hover:border-[#4f46e5]/40 hover:text-[#4f46e5]">
                  <span className="text-xs font-bold uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0a0e27]">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link to={link.href} className="text-sm text-[#4b5568] transition-colors duration-300 hover:text-[#4f46e5]">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-[#4b5568] transition-colors duration-300 hover:text-[#4f46e5]">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--hairline-color)] pt-8 md:flex-row">
          <p className="text-sm text-[#8a93a6]">&copy; {new Date().getFullYear()} EYEuni. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-[#8a93a6]">
            <a href="#" className="transition-colors hover:text-[#4f46e5]">Privacy</a>
            <a href="#" className="transition-colors hover:text-[#4f46e5]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
