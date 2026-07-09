// ---------------------------------------------------------------------------
// Michael's Floral Design NYC — all copy lives here. Single language (EN).
// Body copy is Michael's OWN writing, taken verbatim from michaelsfloraldesignnyc.com
// (only edits: "over 18 years" → "over two decades" so it doesn't date, and the
// "flowery" typo fixed to "flower"). Section labels and short supporting lines
// that don't exist on his site are ours and marked with an OWN COPY note.
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

export const PLACEHOLDERS = {
  // Gallery photography and the two band videos are curated stock until real
  // portfolio footage arrives (see public/michaelsfloraldesign/media/README.md).
}

export const NAV = [
  ['arrangements', 'Arrangements'],
  ['occasions', 'What We Do'],
  ['events', 'Events'],
  ['story', 'Our Story'],
  ['visit', 'Visit'],
]

export const T = {
  brand: "Michael's Floral Design",
  brandSuffix: 'NYC',

  nav: {
    order: 'Order by Phone',
  },

  // ---- Hero — his tagline + his delivery promise -------------------------------
  hero: {
    overline: 'Serving New York City since 2002',
    h1a: 'The best, little florist shop',
    h1b: 'in the Upper East Side.', // gold italic emphasis
    // His words: "we happily provide flower delivery in the Upper East Side,
    // Yorkville and all of New York City."
    sub: 'Flower delivery in the Upper East Side, Yorkville, and all of New York City.',
    ctaPrimary: 'Request a Delivery',
    ctaSecondary: 'What We Do',
    // OWN COPY — short supporting chips derived from his facts.
    proof: ['Hand-selected at the greenhouses', 'Custom arrangements for any occasion', 'Delivery across Manhattan'],
  },

  // ---- Stats strip — OWN COPY, grounded in his facts ---------------------------
  stats: [
    { value: 'Since 2002', label: 'On the Upper East Side' },
    { value: 'Personal · Custom · Events', label: 'Arrangements for any occasion', wide: true },
    { value: 'Same-day', label: 'Delivery across Manhattan' },
  ],

  // ---- Gallery — his heading "The best things come in small packages" ----------
  gallery: {
    overline: 'Signature work',
    title: 'The best things come in small packages.',
    // OWN COPY — short supporting line.
    sub: 'Every arrangement is composed by hand, stem by stem, for the room it will live in.',
    items: [
      { img: 'gallery-01', caption: 'Garden roses & ranunculus', alt: 'Hand-tied bouquet of red and blush garden roses and ranunculus', tall: true },
      { img: 'gallery-02', caption: 'Peonies at first light', alt: 'Close-up of blush peonies in deep, moody light', tall: true },
      { img: 'gallery-03', caption: 'Composed in the atelier', alt: 'Florist tying a fresh bouquet with ribbon at the workbench' },
      { img: 'gallery-04', caption: 'An autumn table', alt: 'Moody autumn centerpiece on a candlelit dinner table', tall: true },
      { img: 'gallery-05', caption: 'Hydrangea & garden roses', alt: 'Hydrangea and garden rose arrangement beside a gilt mirror' },
      { img: 'gallery-06', caption: 'The morning bench', alt: 'Florist trimming stems for a fresh bouquet at the bench' },
      { img: 'gallery-07', caption: 'A reception in bloom', alt: 'Rows of pink hydrangea arrangements down a long reception table' },
    ],
  },

  // ---- Atelier band — near-verbatim his "select simply the best" ---------------
  bandAtelier: {
    name: 'band-atelier',
    quote: 'We visit the greenhouses to select simply the best.',
  },

  // ---- What we do — his heading + his verbatim paragraph -----------------------
  occasions: {
    overline: 'What we do',
    title: 'Beautiful custom arrangements for any occasion.',
    // His words, verbatim.
    body: 'We create beautiful custom flower arrangements for any occasion and have worked with many corporate offices, community events, galas, as well as countless weddings and anniversaries.',
    // Card titles are his service names; the one-liners are OWN COPY.
    items: [
      {
        img: 'occasion-weddings',
        title: 'Weddings & Anniversaries',
        body: 'From the first consultation to the last centerpiece — flowers composed around your day.',
        alt: 'Blush garden-rose centerpiece on white linen',
      },
      {
        img: 'occasion-events',
        title: 'Events & Corporate Offices',
        body: 'Galas, openings, community events, and offices — installed on time, styled to the room.',
        alt: 'Large-scale floral styling at an event table',
      },
      {
        img: 'occasion-sympathy',
        title: 'Personal & Customized',
        body: 'A single stem or a custom arrangement — made for the person, and the moment.',
        alt: 'Soft white personal arrangement',
      },
      {
        img: 'occasion-holidays',
        title: 'Holidays & Seasonal',
        body: 'The best of every season, from spring branches to winter greens — for homes and tables.',
        alt: 'Seasonal holiday arrangement with rich winter tones',
      },
    ],
    link: 'Order by phone',
  },

  // ---- Events we arrange — his section, revamped as a logo wall ----------------
  events: {
    overline: 'Events we arrange',
    // OWN COPY — supporting line for the revamped section.
    title: 'In good company.',
    sub: 'A few of the institutions and organizations we’ve arranged flowers for over the years.',
    logos: [
      { file: 'logo-carl.png', name: 'Carl Schurz Park Conservancy' },
      { file: 'logo-lotos.png', name: 'The Lotos Club' },
      { file: 'logo-friends.png', name: 'Friends of the Children' },
      { file: 'logo-skidmore.png', name: 'Skidmore College' },
      { file: 'logo-nyu.png', name: 'NYU College of Dentistry' },
      { file: 'logo-prairie.png', name: 'American Prairie Reserve' },
    ],
    coda: '…and countless Upper East Side homes.',
  },

  // ---- Our story — his verbatim about copy -------------------------------------
  story: {
    overline: 'Our story',
    // Pulled from his own line: "the highest quality you can find" / "select simply the best".
    title: 'Simply the best you can find.',
    paragraphs: [
      'We have hand selected our flowers and plants for over two decades. Grown locally and internationally, when they arrive in the city, we visit various greenhouses to select simply the best. We guarantee what you choose from our store is the highest quality you can find.',
      'If you see something you love or would like a custom flower arrangement, we happily provide flower delivery in the Upper East Side, Yorkville and all of New York City. Our florist shop is nestled in the Upper East Side of Manhattan on East 85th Street, between 1st and 2nd avenue.',
    ],
    quote:
      'I always believed in making everyone that visits my shop feel better than before they walked in. You never know what someone else is going through.',
    quoteAttr: 'Michael Perez Lumanglas, owner',
    portraitAlt: 'Inside the flower shop — stems, vessels, and morning light',
  },

  // ---- Testimonial — his, verbatim ---------------------------------------------
  testimonial: {
    overline: 'Testimonials',
    quote:
      'You are the talk of the neighborhood! We were all hugely thrilled! You definitely outdid yourself.',
    attribution: 'Patricia',
  },

  // ---- Delivery band — his heading ---------------------------------------------
  bandDelivery: {
    name: 'band-delivery',
    quote: 'Need it delivered? We’ve got you covered.',
    cta: 'Request a Delivery',
  },

  // ---- Visit / contact ---------------------------------------------------------
  visit: {
    overline: 'Visit',
    title: 'The shop on 85th.',
    // OWN COPY — short supporting line.
    sub: 'This is a business that runs on conversations, not carts. Call the shop and Michael will take care of the rest.',
    phoneLabel: 'Order by phone',
    addressLabel: 'The shop',
    emailLabel: 'Email',
    directions: 'Get directions',
    // His gift-card copy, trimmed.
    giftNote: 'Give the gift of greenery — gift cards are available in any denomination, and we’ll be happy to mail it for you.',
    mapAlt: 'The florist shop on East 85th Street',
  },

  footer: {
    tagline: 'The best, little florist shop in the Upper East Side.',
    rights: '© 2026 Michael’s Floral Design NYC. All rights reserved.',
  },
}
