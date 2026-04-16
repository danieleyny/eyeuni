import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimateIn } from './useScrollAnimation'

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Most projects are completed within 1-3 weeks depending on complexity. A simple landing page can be done in under a week, while a full web application may take 3-4 weeks.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We use modern, industry-standard technologies including React, Next.js, Node.js, and Tailwind CSS. We choose the best tech stack based on your project\'s specific needs.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes! We offer monthly maintenance plans that include updates, security patches, performance monitoring, and content changes to keep your site running smoothly.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. We specialize in modern redesigns that transform outdated sites into sleek, high-performing websites while preserving your existing content and SEO rankings.',
  },
  {
    q: 'What\'s included in the pricing?',
    a: 'Our pricing includes design, development, responsive optimization, basic SEO setup, and deployment. Hosting and domain registration are handled separately.',
  },
  {
    q: 'Do you help with SEO and marketing?',
    a: 'Every website we build includes foundational SEO best practices. For advanced SEO strategy and ongoing marketing, we can connect you with our partner agencies.',
  },
  {
    q: 'How does the booking process work?',
    a: 'Simply book a free demo call through our website. We\'ll discuss your project, provide a detailed quote, and once approved, we begin development immediately.',
  },
  {
    q: 'What if I\'m not happy with the design?',
    a: 'Your satisfaction is our priority. Each plan includes revision rounds, and we work closely with you throughout the process to ensure the final product exceeds expectations.',
  },
]

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <AnimateIn delay={index * 75}>
      <div className="border border-dark-border rounded-xl overflow-hidden hover:border-primary/20 transition-colors duration-300">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-dark-card/30 transition-colors duration-300"
        >
          <span className="font-semibold pr-4">{faq.q}</span>
          <ChevronDown
            className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </AnimateIn>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about working with us.</p>
        </AnimateIn>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
