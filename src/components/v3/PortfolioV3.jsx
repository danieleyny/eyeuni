import { ArrowUpRight } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'

const projects = [
  { title: 'Birchwood', category: 'Short-Term Rental Platform', image: '/portfolio/birchwood.jpg', url: 'https://birchwoodny.com/' },
  { title: 'Fleur Fund', category: 'Real Estate Investment Platform', image: '/portfolio/fleurfund.jpg', url: 'https://fleurfund.com/' },
  { title: 'Laundry Day', category: 'On-Demand Laundry Service', image: '/portfolio/laundryday.jpg', url: 'https://laundryday.nyc/' },
  { title: 'Laundry Day App', category: 'On-Demand Laundry Booking App', image: '/portfolio/laundrydayapp.jpg', url: 'https://app.laundryday.app/' },
  { title: 'NY Apts', category: 'Property Management for NYC Rentals', image: '/portfolio/nyapts.jpg', url: 'https://ny-apts.com/' },
  { title: 'Rent Overcharge', category: 'Automated Tenant Dispute Platform', image: '/portfolio/rentovercharge.jpg', url: 'https://www.rentoverchargenyc.com/' },
  { title: 'Safe Consulting', category: 'Custom Merchandise & Swag Store', image: '/portfolio/safeconsulting.jpg', url: 'https://safeconsulting.shop' },
  { title: 'ContractorCo', category: 'Operations Platform for Contractors', image: '/portfolio/contractorco.jpg', url: 'https://contractorco-ops-demo.vercel.app/' },
  { title: 'PropertyOS', category: 'All-in-One Property Dashboard', image: '/portfolio/propertyos.jpg', url: 'https://propertyos-ashy.vercel.app/dashboard' },
  { title: 'Boaz Studios', category: 'Members-Only Fitness Studio', image: '/portfolio/boazfitness.jpg', url: 'https://danieleyny.github.io/boaz-fitness-studios/' },
]

function ProjectCard({ project }) {
  const base = import.meta.env.BASE_URL
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.category}`}
      className="v3-card group block overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-[color:var(--hairline-color)] bg-[#f6f8fc] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
      </div>
      {/* screenshot */}
      <div className="aspect-[16/11] w-full overflow-hidden bg-[#f6f8fc]">
        <img
          src={`${base}${project.image.slice(1)}`}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {/* label */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <div className="truncate font-bold text-[#0a0e27]">{project.title}</div>
          <div className="truncate text-sm text-[#8a93a6]">{project.category}</div>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef0fe] text-[#4f46e5] transition-colors duration-300 group-hover:bg-[#4f46e5] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  )
}

export default function PortfolioV3() {
  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">Our work</div>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">See what we've built</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5568]">
            Real, modern, high-performing websites — turning ideas into clean, fast experiences.
          </p>
        </AnimateIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={(i % 3) * 90}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
