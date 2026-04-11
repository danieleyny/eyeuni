const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Front End', href: '#services' },
      { label: 'Back End', href: '#services' },
      { label: 'E-Commerce', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Book a Call', href: '#booking' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & tagline */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="8" fill="#0f31b8"/>
                <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="#b3c8f4" strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="18" r="3" fill="#b3c8f4"/>
                <circle cx="18" cy="18" r="1.2" fill="#0f31b8"/>
              </svg>
              <span className="text-lg font-bold">
                <span className="text-primary">EYE</span>
                <span className="text-white">uni</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              You Dream It, We Build It. Fast, affordable, and stunning websites for modern businesses.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'instagram', 'github'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center hover:border-primary/30 hover:text-primary text-gray-400 transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-gray-300">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EYEuni. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
