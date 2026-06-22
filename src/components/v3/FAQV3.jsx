import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimateIn } from '../useScrollAnimation'

const faqs = [
  { q: 'How long does it take to build a website?', a: 'Most projects are completed within 1–3 weeks depending on complexity. A simple landing page can be done in under a week, while a full web application may take 3–4 weeks.' },
  { q: 'What technologies do you use?', a: "We use modern, industry-standard technologies including React, Next.js, Node.js and Tailwind CSS. We choose the best tech stack based on your project's specific needs." },
  { q: 'Do you offer ongoing maintenance?', a: 'Yes! We offer monthly maintenance plans that include updates, security patches, performance monitoring, and content changes to keep your site running smoothly.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely. We specialize in modern redesigns that transform outdated sites into sleek, high-performing websites while preserving your existing content and SEO rankings.' },
  { q: "What's included in the pricing?", a: 'Our pricing includes design, development, responsive optimization, basic SEO setup, and deployment. Hosting and domain registration are handled separately.' },
  { q: 'Do you help with SEO and marketing?', a: 'Every website we build includes foundational SEO best practices. For advanced SEO strategy and ongoing marketing, we can connect you with our partner agencies.' },
  { q: 'How does the booking process work?', a: "Simply book a free demo through our website. We'll discuss your project, provide a detailed quote, and once approved, we begin development immediately." },
  { q: "What if I'm not happy with the design?", a: 'Your satisfaction is our priority. Each plan includes revision rounds, and we work closely with you throughout the process to ensure the final product exceeds expectations.' },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-[color:var(--hairline-color)]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-lg font-semibold text-[#0a0e27]">{faq.q}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0fe] text-[#4f46e5] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 leading-relaxed text-[#4b5568]">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQV3() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <AnimateIn className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f46e5]">FAQ</div>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0e27] md:text-5xl">Frequently asked questions</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5568]">Everything you need to know about working with us.</p>
        </AnimateIn>

        <AnimateIn className="border-t border-[color:var(--hairline-color)]">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </AnimateIn>
      </div>
    </section>
  )
}
