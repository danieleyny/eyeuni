import { AnimateIn } from './useScrollAnimation'
import { ExternalLink } from 'lucide-react'

const projects = [
  { title: 'Luxe Restaurant', category: 'Full Stack', color: 'from-violet-600 to-indigo-600' },
  { title: 'FitPro Gym', category: 'Front End', color: 'from-cyan-600 to-blue-600' },
  { title: 'Nova Real Estate', category: 'Full Stack', color: 'from-emerald-600 to-teal-600' },
  { title: 'Artisan Coffee', category: 'E-Commerce', color: 'from-amber-600 to-orange-600' },
  { title: 'Zen Wellness', category: 'Front End', color: 'from-pink-600 to-rose-600' },
  { title: 'TechVault SaaS', category: 'Back End', color: 'from-blue-600 to-accent' },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Portfolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of projects we've brought to life for our clients.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]">
                {/* Gradient placeholder background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`} />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />

                {/* Placeholder device mockup */}
                <div className="absolute inset-6 md:inset-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                  <div className="text-white/40 text-sm font-medium">Preview</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                  <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                  <span className="text-primary text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.category}</span>
                  <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:bg-primary/10">
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
