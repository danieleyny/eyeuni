import { Link } from 'react-router-dom'
import { FileText, Code, Rocket, ArrowRight } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'

const steps = [
  { icon: FileText, title: 'Tell us about your business', desc: 'Answer a few quick questions so we understand your vision & goals.' },
  { icon: Code, title: 'We design & build your website', desc: 'Our team creates a fully customized demo tailored to you.' },
  { icon: Rocket, title: 'Review, refine & launch', desc: "Give feedback, request changes, and go live when you're ready." },
]

export default function DemoCTAV3() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--hairline-color)] px-6 py-16 text-center shadow-[var(--shadow-lg)] sm:px-12 md:py-20"
            style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f3f1fe 55%, #eef6fe 100%)' }}>
            {/* soft accent aura */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-25" style={{ backgroundImage: 'var(--grad-accent)', filter: 'blur(90px)' }} aria-hidden />

            <div className="relative">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">Free demo</div>
              <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">
                Have a free demo website <span className="v3-grad-text">built for you</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#4b5568]">
                We'll create a custom website tailored to your business, so you can see exactly what
                you're getting — before making any commitment.
              </p>

              <div className="mx-auto mt-12 grid max-w-4xl gap-5 text-left md:grid-cols-3">
                {steps.map((step, i) => (
                  <div key={step.title} className="v3-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-2xl font-black text-[#cdd5e3]">0{i + 1}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0fe] text-[#4f46e5]">
                        <step.icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mb-1.5 font-bold text-[#0a0e27]">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#4b5568]">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/intake" className="v3-btn-primary inline-flex items-center gap-2 px-9 py-5 text-lg font-bold">
                  Get Your Free Demo Website <ArrowRight className="h-5 w-5" />
                </Link>
                <p className="mt-4 text-sm text-[#8a93a6]">If you don't love it, you don't pay — simple as that.</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
