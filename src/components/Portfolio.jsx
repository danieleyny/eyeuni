import { AnimateIn } from './useScrollAnimation'
import { ExternalLink } from 'lucide-react'
import TiltCard from './effects/TiltCard'

const projects = [
  { title: 'Birchwood', category: 'Short-Term Rental Platform for Property Owners', color: 'from-violet-600 to-indigo-600', image: '/portfolio/birchwood.jpg', url: 'https://birchwoodny.com/' },
  { title: 'Fleur Fund', category: 'Real Estate Investment Platform for Investors', color: 'from-cyan-600 to-blue-600', image: '/portfolio/fleurfund.jpg', url: 'https://fleurfund.com/' },
  { title: 'Laundry Day', category: 'On-Demand Laundry Service Website', color: 'from-emerald-600 to-teal-600', image: '/portfolio/laundryday.jpg', url: 'https://laundryday.nyc/' },
  { title: 'NY Apts', category: 'Property Management Website for NYC Rentals', color: 'from-amber-600 to-orange-600', image: '/portfolio/nyapts.jpg', url: 'https://ny-apts.com/' },
  { title: 'Rent Overcharge', category: 'Automated Platform for Tenant Rent Disputes', color: 'from-pink-600 to-rose-600', image: '/portfolio/rentovercharge.jpg', url: 'https://www.rentoverchargenyc.com/' },
  { title: 'Safe Consulting', category: 'Custom Merchandise & Swag Store', color: 'from-blue-600 to-accent', image: '/portfolio/safeconsulting.jpg', url: 'https://safeconsulting.shop' },
  { title: 'ContractorCo', category: 'Operations Platform for Contractors', color: 'from-slate-600 to-zinc-700', image: '/portfolio/contractorco.jpg', url: 'https://contractorco-ops-demo.vercel.app/' },
  { title: 'PropertyOS', category: 'All-in-One Property Management Dashboard', color: 'from-indigo-600 to-purple-700', image: '/portfolio/propertyos.jpg', url: 'https://propertyos-ashy.vercel.app/dashboard' },
  { title: 'RentGuard for Firms', category: 'Rent Overcharge Case Platform for Law Firms', color: 'from-rose-600 to-pink-600', image: '/portfolio/rentoverchargefirms.jpg', url: 'https://rentoverchargenyc.com/for-firms' },
  { title: 'Boaz Studios', category: 'Members-Only Fitness Studio Website', color: 'from-amber-600 to-yellow-700', image: '/portfolio/boazfitness.jpg', url: 'https://danieleyny.github.io/boaz-fitness-studios/' },
  { title: 'CARRY', category: 'Concealed Carry Licensing & Training Website', color: 'from-yellow-600 to-stone-700', image: '/portfolio/ccw.jpg', url: 'https://ccw-eight.vercel.app/' },
]

function ProjectCard({ project }) {
  const base = import.meta.env.BASE_URL

  return (
    <TiltCard className="h-full">
      <a
        href={project.url || undefined}
        target={project.url ? '_blank' : undefined}
        rel={project.url ? 'noopener noreferrer' : undefined}
        aria-label={`${project.title} — ${project.category}`}
        className={`group relative rounded-2xl overflow-hidden block aspect-[4/3] border border-white/[0.06] ${project.url ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Gradient background (fallback) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

        {/* Static screenshot */}
        {project.image ? (
          <div className="absolute inset-0">
            <img
              src={`${base}${project.image.slice(1)}`}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="absolute inset-6 md:inset-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
            <div className="text-white/40 text-sm font-medium">Coming Soon</div>
          </div>
        )}

        {/* Top sheen for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        {/* Always-visible glassy label bar (mobile-first affordance).
            On desktop it yields to the full hover overlay. */}
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-between gap-2 px-3 py-2.5 bg-dark/60 backdrop-blur-md border-t border-white/10 transition-opacity duration-300 md:group-hover:opacity-0">
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate">{project.title}</div>
            <div className="text-[11px] text-primary/90 truncate">{project.category}</div>
          </div>
          {project.url && <ExternalLink className="w-4 h-4 text-primary shrink-0" />}
        </div>

        {/* Full hover overlay (desktop only) */}
        <div className="absolute inset-0 z-10 hidden md:flex bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex-col items-center justify-center gap-3 text-center px-4">
          <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
          <span className="text-primary text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.category}</span>
          {project.url && (
            <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 group-hover:bg-primary/10">
              <ExternalLink className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      </a>
    </TiltCard>
  )
}

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
            <AnimateIn key={project.title + i} delay={i * 80}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
