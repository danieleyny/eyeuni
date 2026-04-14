import { Building2, Globe, Target, Layout, Palette, Wrench, DollarSign } from 'lucide-react'

export const STEPS = [
  { title: 'Business Info', icon: Building2, description: 'Tell us about your business' },
  { title: 'Current Site', icon: Globe, description: 'Your existing website' },
  { title: 'Goals', icon: Target, description: 'What you want to achieve' },
  { title: 'Pages', icon: Layout, description: 'Content & structure' },
  { title: 'Design', icon: Palette, description: 'Look & feel' },
  { title: 'Features', icon: Wrench, description: 'Functionality needs' },
  { title: 'Budget', icon: DollarSign, description: 'Budget & timeline' },
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

export const PRIMARY_GOALS = [
  { label: 'Generate Leads', icon: '🎯' },
  { label: 'Sell Products', icon: '🛒' },
  { label: 'Provide Info', icon: 'ℹ️' },
  { label: 'Bookings', icon: '📅' },
  { label: 'Brand Awareness', icon: '📢' },
  { label: 'Portfolio', icon: '💼' },
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
  'Contact Form', 'Photo Gallery', 'Testimonials', 'Social Media Integration',
  'Online Booking', 'Live Chat', 'Blog', 'Newsletter Signup',
  'Google Maps', 'Video Integration', 'E-commerce / Shop', 'Client Portal',
  'Search Functionality', 'Multi-language Support',
]

export const BUDGET_OPTIONS = [
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Not sure yet',
]

export const TIMELINE_OPTIONS = [
  'ASAP',
  '1 - 2 weeks',
  '1 month',
  '2 - 3 months',
  'No rush',
]

export const INITIAL_FORM_DATA = {
  // Step 1
  businessName: '',
  industry: '',
  tagline: '',
  targetAudience: '',
  contactEmail: '',
  contactPhone: '',
  // Step 2
  currentWebsiteUrl: '',
  whatYouLike: '',
  whatYouDislike: '',
  biggestProblems: [],
  // Step 3
  primaryGoal: '',
  desiredAction: '',
  competitors: '',
  websitesYouLike: '',
  whatYouLikeAboutThem: '',
  otherGoals: '',
  // Step 4
  pagesNeeded: [],
  otherPages: '',
  mainServicesProducts: '',
  existingContent: '',
  // Step 5
  designStyle: '',
  primaryColor: '#b3c8f4',
  secondaryColor: '#0f31b8',
  accentColor: '#10b981',
  logoStatus: '',
  // Step 6
  featuresNeeded: [],
  otherFeatures: '',
  // Step 7
  budget: '',
  timeline: '',
  anythingElse: '',
}

export const REQUIRED_FIELDS_PER_STEP = [
  ['businessName', 'industry', 'targetAudience'],
  [],
  ['primaryGoal', 'desiredAction'],
  ['pagesNeeded', 'mainServicesProducts'],
  ['designStyle'],
  ['featuresNeeded'],
  [],
]
