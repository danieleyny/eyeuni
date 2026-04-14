import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import IntakeForm from './IntakeForm'

export default function IntakePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-dark-border">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
              <rect width="36" height="36" rx="8" fill="#0f31b8"/>
              <path d="M10 18C10 18 14 11 18 11C22 11 26 18 26 18C26 18 22 25 18 25C14 25 10 18 10 18Z" stroke="#b3c8f4" strokeWidth="1.5" fill="none"/>
              <circle cx="18" cy="18" r="3" fill="#b3c8f4"/>
              <circle cx="18" cy="18" r="1.2" fill="#0f31b8"/>
            </svg>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary">EYE</span>
              <span className="text-white">uni</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Form Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Free Demo Website
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Tell Us About Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dream Website
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Fill out this quick questionnaire and we'll build you a free demo website within a few days. No commitment required.
            </p>
          </div>

          <IntakeForm />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-dark-border py-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EYEuni. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
