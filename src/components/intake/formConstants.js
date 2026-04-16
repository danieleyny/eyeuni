import { Building2, Globe, Target, Layout, Palette, Wrench, Clock, ClipboardCheck } from 'lucide-react'

export const STEPS = [
  { title: 'Contact Info', icon: Building2, description: 'Your details' },
  { title: 'Current Site', icon: Globe, description: 'Your existing website' },
  { title: 'Goals', icon: Target, description: 'What you want to achieve' },
  { title: 'Pages', icon: Layout, description: 'Content & structure' },
  { title: 'Design', icon: Palette, description: 'Look & feel' },
  { title: 'Features', icon: Wrench, description: 'Functionality needs' },
  { title: 'Timeline', icon: Clock, description: 'Timeline & notes' },
  { title: 'Review', icon: ClipboardCheck, description: 'Review & submit' },
]

export const BIGGEST_PROBLEMS = [
  'Looks outdated',
  'Not mobile-friendly',
  'Hard to navigate',
  'Slow loading',
  'Poor SEO',
  'No calls to action',
  'Content is stale',
  "Doesn't reflect brand",
]

export const WEBSITE_GOALS = [
  { label: 'Generate Leads', icon: '🎯' },
  { label: 'Sell Products', icon: '🛒' },
  { label: 'Provide Information', icon: 'ℹ️' },
  { label: 'Accept Bookings', icon: '📅' },
  { label: 'Build Brand Awareness', icon: '📢' },
  { label: 'Showcase Portfolio', icon: '💼' },
]

export const VISITOR_ACTIONS = [
  'Fill out a contact form',
  'Call or message the business',
  'Book an appointment',
  'Make a purchase',
  'Sign up / Create an account',
  'Request a quote',
  'Download a resource',
  'Browse and learn',
]

export const PAGES_OPTIONS = [
  'Home', 'About Us', 'Services', 'Products',
  'Portfolio / Gallery', 'Testimonials', 'Blog', 'Contact',
  'FAQ', 'Pricing', 'Team', 'Booking',
]

export const EXISTING_CONTENT_OPTIONS = [
  'Keep most of it',
  'Keep some, rewrite rest',
  'Start completely fresh',
]

export const DESIGN_STYLES = [
  { label: 'Modern & Clean', desc: 'Minimalist with bold typography' },
  { label: 'Bold & Vibrant', desc: 'Eye-catching colors and energy' },
  { label: 'Classic & Elegant', desc: 'Timeless sophistication' },
  { label: 'Minimal & Simple', desc: 'Less is more approach' },
  { label: 'Playful & Creative', desc: 'Fun and expressive' },
  { label: 'Corporate', desc: 'Professional and trustworthy' },
]

export const LOGO_OPTIONS = [
  'Yes, keep it as is',
  'Yes, but refresh it',
  'No, I need a new one',
]

export const FEATURES_OPTIONS = [
  'Photo Gallery',
  'Social Media Integration',
  'Online Booking',
  'Live Chat',
  'Newsletter Signup',
  'Google Maps',
  'Video Integration',
  'E-commerce / Shop',
  'Client Portal',
  'Search Functionality',
  'Multi-language Support',
]

export const TIMELINE_OPTIONS = [
  'ASAP',
  '1 - 2 weeks',
  '1 month',
  '2 - 3 months',
  'No rush',
]

export const INITIAL_FORM_DATA = {
  // Step 1 — Contact & Business Info
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  businessName: '',
  industry: '',
  tagline: '',
  targetAudience: '',
  // Step 2 — Current Website (Optional)
  currentWebsiteUrl: '',
  whatYouLike: '',
  whatYouDislike: '',
  biggestProblems: [],
  // Step 3 — Goals
  websiteGoals: [],
  desiredActions: [],
  competitors: '',
  websitesYouLike: '',
  whatYouLikeAboutThem: '',
  otherGoals: '',
  // Step 4 — Content & Pages
  pagesNeeded: [],
  otherPages: '',
  businessDescription: '',
  existingContent: '',
  // Step 5 — Design
  designStyles: [],
  primaryColor: '#b3c8f4',
  secondaryColor: '#0f31b8',
  accentColor: '#10b981',
  logoStatus: '',
  // Step 6 — Features
  featuresNeeded: [],
  otherFeatures: '',
  // Step 7 — Timeline
  timeline: '',
  anythingElse: '',
}

export const REQUIRED_FIELDS_PER_STEP = [
  ['contactName', 'contactEmail', 'businessName', 'industry', 'targetAudience'],
  [],
  ['websiteGoals', 'desiredActions'],
  ['pagesNeeded', 'businessDescription'],
  ['designStyles'],
  ['featuresNeeded'],
  [],
  [], // Review step — no validation
]
