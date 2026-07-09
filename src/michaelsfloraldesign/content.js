// ---------------------------------------------------------------------------
// Michael's Floral Design NYC — all copy lives here. Single language (EN).
// Real business facts (address, phone, founding year, owner, clients, quotes)
// come from the live site; anything plausible-but-unverified is in PLACEHOLDERS.
// ---------------------------------------------------------------------------

export const MEDIA_BASE = '/michaelsfloraldesign/media'

export const CONTACT = {
  phoneDisplay: '212.879.1690',
  phoneHref: 'tel:+12128791690',
  email: 'michaelsfloraldesignnyc@outlook.com',
  address: '347 E 85th St, New York, NY 10028',
  addressShort: '347 E 85th St',
  addressArea: 'Between 1st & 2nd Ave · Yorkville',
  mapsUrl: 'https://maps.google.com/?q=Michael%27s+Floral+Design,+347+E+85th+St,+New+York,+NY+10028',
  // Verified: @michaelsfloraldesignnyc on both platforms.
  instagramUrl: 'https://www.instagram.com/michaelsfloraldesignnyc/',
  facebookUrl: 'https://www.facebook.com/michaelsfloraldesignnyc/',
}

// PLACEHOLDER — swap before launch.
export const PLACEHOLDERS = {
  // Gallery captions describe plausible commissions, not documented ones.
  // The photos and footage are curated stock until real portfolio shots arrive
  // (see public/michaelsfloraldesign/media/README.md).
}

export const NAV = [
  ['arrangements', 'Arrangements'],
  ['occasions', 'Occasions'],
  ['story', 'Our Story'],
  ['testimonials', 'Testimonials'],
  ['visit', 'Visit'],
]

export const T = {
  brand: "Michael's Floral Design",
  brandSuffix: 'NYC',

  nav: {
    order: 'Order by Phone',
  },

  hero: {
    overline: 'Upper East Side · Est. 2002',
    h1a: 'Flowers, arranged',
    h1b: 'like art.',
    sub: 'Hand-selected at the greenhouses every morning, composed in Yorkville, and delivered across Manhattan — often the same day.',
    ctaPrimary: 'Request a Delivery',
    ctaSecondary: 'Explore Arrangements',
    proof: ['Serving NYC since 2002', 'Hand-selected daily', 'Same-day UES delivery'],
  },

  stats: [
    { value: '20+', label: 'Years on the Upper East Side' },
    { value: 'Weddings · Galas · Corporate', label: 'Arrangements for every occasion', wide: true },
    { value: 'Same-day', label: 'Delivery across Manhattan' },
  ],

  gallery: {
    overline: 'Signature work',
    title: 'A standard you can see.',
    sub: 'No two arrangements leave the shop alike. Each one is composed by hand, stem by stem, for the room it will live in.',
    items: [
      { img: 'gallery-01', caption: 'Garden roses & ranunculus — private dinner, E 85th St', alt: 'Hand-tied bouquet of red and blush garden roses and ranunculus', tall: true },
      { img: 'gallery-02', caption: 'Peonies at first light — morning selection', alt: 'Close-up of blush peonies in deep, moody light', tall: true },
      { img: 'gallery-03', caption: 'Composed in the atelier — hand-tied and ribboned', alt: 'Florist tying a fresh bouquet with ribbon at the workbench' },
      { img: 'gallery-04', caption: 'Autumn table study — private dinner, Carnegie Hill', alt: 'Moody autumn centerpiece on a candlelit dinner table', tall: true },
      { img: 'gallery-05', caption: 'Hydrangea & garden roses — an entryway uptown', alt: 'Hydrangea and garden rose arrangement beside a gilt mirror' },
      { img: 'gallery-06', caption: 'On the bench — the day’s first bouquet', alt: 'Florist trimming stems for a fresh bouquet at the bench' },
      { img: 'gallery-07', caption: 'Reception in bloom — hydrangea by the row', alt: 'Rows of pink hydrangea arrangements down a long reception table' },
    ],
  },

  bandAtelier: {
    name: 'band-atelier',
    quote: 'Every stem, chosen by hand — every morning.',
  },

  occasions: {
    overline: 'Occasions',
    title: 'For the days that matter.',
    items: [
      {
        img: 'occasion-weddings',
        title: 'Weddings & Anniversaries',
        body: 'From the first consultation to the last centerpiece — flowers composed around your day, not a catalog.',
        alt: 'Blush garden-rose centerpiece on white linen',
      },
      {
        img: 'occasion-events',
        title: 'Events & Corporate',
        body: 'Galas, openings, and offices that need to make an impression. Installed on time, styled to the room.',
        alt: 'Large-scale floral styling at an event table',
      },
      {
        img: 'occasion-sympathy',
        title: 'Sympathy & Personal',
        body: 'Quiet, dignified arrangements, handled with care — because some flowers have to say what words can’t.',
        alt: 'Soft white sympathy arrangement',
      },
      {
        img: 'occasion-holidays',
        title: 'Holidays & Seasonal',
        body: 'The best of every season, from spring branches to winter greens — for homes, doorways, and tables.',
        alt: 'Seasonal holiday arrangement with rich winter tones',
      },
    ],
    link: 'Order by phone',
  },

  story: {
    overline: 'Our story',
    title: 'Twenty years of mornings at the greenhouse.',
    paragraphs: [
      'Michael’s Floral Design opened its doors on East 85th Street in 2002 — a small shop between First and Second Avenue in Yorkville that quickly became part of the neighborhood’s rhythm.',
      'Owner Michael Perez Lumanglas still selects the flowers himself at the greenhouses each morning, the way he has from the beginning. What comes back to the shop is only what he’d put in his own home.',
    ],
    quote:
      'I always believed in making everyone that visits my shop feel better than before they walked in. You never know what someone else is going through.',
    quoteAttr: 'Michael Perez Lumanglas, owner',
    portraitAlt: 'Inside the flower shop — stems, vessels, and morning light',
  },

  clients: {
    overline: 'Trusted by',
    names: ['The Lotos Club', 'Skidmore College', 'NYU College of Dentistry', 'American Prairie Reserve'],
    coda: '…and countless UES homes',
  },

  testimonial: {
    overline: 'From our clients',
    quote:
      'You are the talk of the neighborhood! We were all hugely thrilled! You definitely outdid yourself.',
    attribution: 'Patricia',
  },

  bandDelivery: {
    name: 'band-delivery',
    quote: 'Same-day delivery, anywhere in Manhattan.',
    cta: 'Request a Delivery',
  },

  visit: {
    overline: 'Visit',
    title: 'The shop on 85th.',
    sub: 'This is a business that runs on conversations, not carts. Call the shop — Michael will make it right.',
    phoneLabel: 'Order by phone',
    addressLabel: 'The shop',
    emailLabel: 'Email',
    directions: 'Get directions',
    giftNote: 'Gift cards are available in the shop — ask when you call.',
    mapAlt: 'The florist shop on East 85th Street',
  },

  footer: {
    tagline: 'Flowers, arranged like art.',
    rights: '© 2026 Michael’s Floral Design NYC. All rights reserved.',
  },
}
