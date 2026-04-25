import { AnimateIn } from './useScrollAnimation'
import { ExternalLink } from 'lucide-react'

const projects = [
  { title: 'Birchwood', category: 'Short-Term Rental Platform for Property Owners', color: 'from-violet-600 to-indigo-600', image: '/portfolio/birchwood.jpg', url: 'https://birchwoodny.com/' },
  { title: 'Fleur Fund', category: 'Real Estate Investment Platform for Investors', color: 'from-cyan-600 to-blue-600', image: '/portfolio/fleurfund.jpg', url: 'https://fleurfund.com/' },
  { title: 'Laundry Day', category: 'On-Demand Laundry Service Website', color: 'from-emerald-600 to-teal-600', image: '/portfolio/laundryday.jpg', url: 'https://laundryday.nyc/' },
  { title: 'NY Apts', category: 'Property Management Website for NYC Rentals', color: 'from-amber-600 to-orange-600', image: '/portfolio/nyapts.jpg', url: 'https://ny-apts.com/' },
  { title: 'Rent Overcharge', category: 'Automated Platform for Tenant Rent Disputes', color: 'from-pink-600 to-rose-600', image: '/portfolio/rentovercharge.jpg', url: 'https://www.rentoverchargenyc.com/' },
  { title: 'Safe Consulting', category: 'Custom Merchandise & Swag Store', color: 'from-blue-600 to-accent', image: '/portfolio/safeconsulting.jpg', url: 'https://safeconsulting.shop' },
  { title: 'ContractorCo', category: 'Operations Platform for Contractors', color: 'from-slate-600 to-zinc-700', image: '/portfolio/contractorco.jpg', url: 'https://contractorco-ops-demo.vercel.app/' },
  { title: 'PropertyOS', category: 'All-in-One Property Management Dashboard', color: 'from-indigo-600 to-purple-700', image: '/portfolio/propertyos.jpg', url: 'https://propertyos-ashy.vercel.app/dashboard' },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">See What We've Built</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See how we turn ideas into clean, modern, high-performing websites.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimateIn key={project.title + i} delay={i * 100}>
              <a
                href={project.url || undefined}
                target={project.url ? '_blank' : undefined}
                rel={project.url ? 'noopener noreferrer' : undefined}
                className={`group relative rounded-2xl overflow-hidden block aspect-[4/3] ${project.url ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`} />

                {/* Screenshot or placeholder */}
                {project.image ? (
                  <div className="absolute inset-0">
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.slice(1)}`}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                    <div className="absolute inset-6 md:inset-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                      <div className="text-white/40 text-sm font-medium">Coming Soon</div>
                    </div>
                  </>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                  <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                  <span className="text-primary text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.category}</span>
                  {project.url && (
                    <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:bg-primary/10">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              </a>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
