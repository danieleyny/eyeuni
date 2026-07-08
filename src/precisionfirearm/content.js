// ---------------------------------------------------------------------------
// Precision Firearms Academy — all copy, in { en, es } pairs.
// Every string on the page lives here. The ES ⇄ EN toggle reads this file.
// ---------------------------------------------------------------------------

// PLACEHOLDER — replace with Nick's real numbers before launch.
// These are plausible-but-generic demo values; nothing here is a verified claim.
export const PLACEHOLDERS = {
  yearsInstructing: 20, // "20+"
  studentsTrained: 1000, // "1,000+"
  approvalRate: 98, // "98%"
  reviewCount: 200, // hero micro-proof "trusted by 200+ students"
  testimonial: {
    en: 'I walked in never having held a firearm and walked out licensed, confident, and safer for it. Nick handled every page of my paperwork like it was his own.',
    es: 'Llegué sin haber tocado un arma en mi vida y salí con mi licencia, con confianza y con más seguridad. Nick manejó cada página de mis trámites como si fueran suyos.',
    attribution: 'M. R.',
    course: { en: 'CCW student, Westchester', es: 'Alumno de CCW, Westchester' },
    year: '2026',
  },
}

export const CONTACT = {
  phoneDisplay: '914-522-7147',
  phoneHref: 'tel:+19145227147',
  smsHref: 'sms:+19145227147',
  email: 'nickbrescia@aol.com',
  address: '174 Gramatan Ave, Mount Vernon, NY 10550',
  mapsUrl: 'https://maps.google.com/?q=174+Gramatan+Ave,+Mount+Vernon,+NY+10550',
  formAction: 'FORMSPREE_PLACEHOLDER', // wire to Formspree before launch
}

export const MEDIA_BASE = '/precisionfirearm/media'

// Next N upcoming Saturdays — keeps the demo class list looking current.
// PLACEHOLDER dates: real schedule comes from Nick.
export function upcomingSaturdays(count = 3) {
  const out = []
  const d = new Date()
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7))
  for (let i = 0; i < count; i++) {
    out.push(new Date(d))
    d.setDate(d.getDate() + 7)
  }
  return out
}

export const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
}

export const T = {
  // ---- Nav -----------------------------------------------------------------
  nav: {
    licensing: { en: 'Licensing', es: 'Licencias' },
    courses: { en: 'Courses', es: 'Cursos' },
    instructor: { en: 'Instructor', es: 'Instructor' },
    classes: { en: 'Classes', es: 'Clases' },
    range: { en: 'The Range', es: 'El Campo' },
    faq: { en: 'FAQ', es: 'Preguntas' },
    contact: { en: 'Contact', es: 'Contacto' },
    call: { en: 'Call or Text', es: 'Llama o Escribe' },
  },

  // ---- Hero ------------------------------------------------------------------
  hero: {
    kicker: {
      en: 'Where the strong survive & the courageous triumph',
      es: 'Donde los fuertes sobreviven y los valientes triunfan',
    },
    h1a: { en: 'Get your N.Y.S.', es: 'Obtén tu licencia' },
    h1b: { en: 'carry license.', es: 'de portación de N.Y.' },
    sub: {
      en: 'Certified instruction, a private range, and every page of paperwork handled with you — NYC, Westchester & out-of-state.',
      es: 'Instrucción certificada, campo de tiro privado y cada página del trámite gestionada contigo — NYC, Westchester y otros estados.',
    },
    cta: { en: 'Call or Text 914-522-7147', es: 'Llama o escribe · 914-522-7147' },
    proof: { en: 'trusted by [N]+ students', es: 'la confianza de [N]+ alumnos' },
    scroll: { en: 'Scroll', es: 'Desliza' },
  },

  // ---- Stats -----------------------------------------------------------------
  stats: {
    years: { en: 'Years instructing', es: 'Años instruyendo' },
    students: { en: 'Students trained', es: 'Alumnos formados' },
    approval: { en: 'License approval rate', es: 'Tasa de aprobación' },
    bilingual: { en: 'Bilingual classes', es: 'Clases bilingües' },
    bilingualValue: { en: 'EN · ES', es: 'EN · ES' },
  },

  // ---- How it works ------------------------------------------------------------
  how: {
    kicker: { en: 'The process', es: 'El proceso' },
    title: { en: 'Licensed in three moves.', es: 'Tu licencia en tres pasos.' },
    sub: {
      en: 'New York licensing feels bureaucratic. It isn’t — when someone who has filed hundreds of applications walks you through it.',
      es: 'El trámite en Nueva York parece burocrático. No lo es — cuando te guía alguien que ha presentado cientos de solicitudes.',
    },
    steps: [
      {
        title: { en: 'Call or text', es: 'Llama o escribe' },
        body: {
          en: 'Tell us your county and your goal. We map your exact licensing path the same day — no guesswork, no wasted classes.',
          es: 'Dinos tu condado y tu objetivo. Trazamos tu ruta exacta de licencia el mismo día — sin adivinar, sin clases de más.',
        },
      },
      {
        title: { en: 'Train & certify', es: 'Entrena y certifícate' },
        body: {
          en: 'Complete the 16-hour CCW course with 2 hours of live fire at our private range — small groups, by appointment only.',
          es: 'Completa el curso CCW de 16 horas con 2 horas de tiro en vivo en nuestro campo privado — grupos pequeños, solo con cita.',
        },
      },
      {
        title: { en: 'File & get licensed', es: 'Presenta y recibe tu licencia' },
        body: {
          en: 'We prepare and review every page of your application before it’s submitted. You file with confidence, not crossed fingers.',
          es: 'Preparamos y revisamos cada página de tu solicitud antes de presentarla. La entregas con confianza, no con los dedos cruzados.',
        },
      },
    ],
  },

  // ---- Licensing paths ---------------------------------------------------------
  licensing: {
    kicker: { en: 'Licensing paths', es: 'Rutas de licencia' },
    title: { en: 'Choose your path. We clear it.', es: 'Elige tu ruta. Nosotros la despejamos.' },
    paperwork: {
      en: 'Paperwork handled with you, start to finish.',
      es: 'Trámites gestionados contigo, de inicio a fin.',
    },
    cta: { en: 'Start by phone', es: 'Empieza por teléfono' },
    esBadge: 'TAMBIÉN EN ESPAÑOL', // stays Spanish in both language modes
    cards: [
      {
        title: { en: 'N.Y.S. Full Carry Pistol License', es: 'Licencia completa de portación N.Y.S.' },
        body: {
          en: 'The full journey to a New York State carry permit — NYC, Westchester County, and out-of-state applicants.',
          es: 'El camino completo a tu permiso de portación del estado de Nueva York — NYC, condado de Westchester y solicitantes de otros estados.',
        },
        includes: [
          { en: 'County-specific application strategy', es: 'Estrategia según tu condado' },
          { en: 'Required training certificates', es: 'Certificados de formación requeridos' },
          { en: 'Document prep & final review', es: 'Preparación y revisión de documentos' },
        ],
        img: 'card-carry',
        alt: { en: 'Paper target and magazines on a range bench', es: 'Diana de papel y cargadores en un banco del campo de tiro' },
      },
      {
        title: { en: 'CCW 16-Hour Class + Live Fire', es: 'Curso CCW de 16 horas + tiro en vivo' },
        body: {
          en: 'The state-required concealed carry course: 16 hours of instruction plus 2 hours of live fire — offered in English and Spanish.',
          es: 'El curso de portación oculta exigido por el estado: 16 horas de instrucción más 2 horas de tiro en vivo — impartido en inglés y en español.',
        },
        includes: [
          { en: '16 hours of certified classroom training', es: '16 horas de formación certificada' },
          { en: '2 hours of live fire at our private range', es: '2 horas de tiro en vivo en campo privado' },
          { en: 'Certificate accepted across N.Y.S.', es: 'Certificado válido en todo N.Y.S.' },
        ],
        img: 'card-ccw',
        alt: { en: 'Pistol resting on a wooden range bench', es: 'Pistola sobre un banco de madera del campo de tiro' },
        featured: true,
      },
      {
        title: { en: 'N.Y.S. Armed Guard License', es: 'Licencia de guardia armado N.Y.S.' },
        body: {
          en: 'The professional security track: 47-hour firearms training, 16-hour on-the-job, and 8-hour pre-assignment courses.',
          es: 'La ruta profesional de seguridad: formación de 47 horas, 16 horas en el puesto y 8 horas de pre-asignación.',
        },
        includes: [
          { en: '47-hour firearms training', es: 'Formación de armas de 47 horas' },
          { en: '16-hour on-the-job course', es: 'Curso de 16 horas en el puesto' },
          { en: '8-hour pre-assignment course', es: 'Curso de 8 horas de pre-asignación' },
        ],
        img: 'card-guard',
        alt: { en: 'Training rifles staged on a bench in a dark range hall', es: 'Rifles de entrenamiento sobre un banco en una sala de tiro oscura' },
      },
    ],
  },

  // ---- Full-bleed band -----------------------------------------------------------
  band: {
    quote: { en: 'Precision is a discipline. We teach it.', es: 'La precisión es una disciplina. Nosotros la enseñamos.' },
  },

  // ---- Testimonial (light breather) ----------------------------------------------
  testimonial: {
    kicker: { en: 'From our students', es: 'De nuestros alumnos' },
  },

  // ---- Courses grid ---------------------------------------------------------------
  courses: {
    kicker: { en: 'All training', es: 'Toda la formación' },
    title: { en: 'Every course. One standard.', es: 'Cada curso. Un solo estándar.' },
    filters: {
      all: { en: 'All', es: 'Todos' },
      licensing: { en: 'Licensing', es: 'Licencias' },
      skills: { en: 'Skills', es: 'Habilidades' },
      professional: { en: 'Professional', es: 'Profesional' },
      community: { en: 'Community', es: 'Comunidad' },
    },
    items: [
      {
        cat: 'skills',
        title: { en: 'Rifle & Shotgun Training', es: 'Entrenamiento de rifle y escopeta' },
        body: {
          en: 'Long-gun fundamentals: safe handling, stance, sighting, and live range work.',
          es: 'Fundamentos de armas largas: manejo seguro, postura, puntería y práctica en el campo.',
        },
        img: 'course-rifle',
      },
      {
        cat: 'skills',
        title: { en: 'One-on-One Personal Training', es: 'Entrenamiento personal individual' },
        body: {
          en: 'Private sessions built around your pace, your firearm, and your goals.',
          es: 'Sesiones privadas a tu ritmo, con tu arma y tus objetivos.',
        },
        img: 'course-1on1',
      },
      {
        cat: 'community',
        title: { en: 'Women’s Shooting Classes', es: 'Clases de tiro para mujeres' },
        body: {
          en: 'A supportive, pressure-free environment for every experience level.',
          es: 'Un ambiente de apoyo y sin presión para todos los niveles de experiencia.',
        },
        img: 'women-rifle',
      },
      {
        cat: 'licensing',
        title: { en: 'Connecticut Carry & Other States', es: 'Portación en Connecticut y otros estados' },
        body: {
          en: 'Multi-state carry credentials, mapped and filed the same way we do N.Y.',
          es: 'Credenciales de portación multi-estado, tramitadas igual que en N.Y.',
        },
        img: 'course-ct',
      },
      {
        cat: 'professional',
        title: { en: 'Range Safety Officer Certification', es: 'Certificación de Oficial de Seguridad' },
        body: {
          en: 'Become the person a range trusts to run a safe firing line.',
          es: 'Conviértete en la persona a la que un campo le confía una línea de tiro segura.',
        },
        img: 'how-safety',
      },
      {
        cat: 'professional',
        title: { en: 'Security Officer Track — 47 / 16 / 8 hr', es: 'Ruta de seguridad — 47 / 16 / 8 h' },
        body: {
          en: 'The full N.Y.S. armed-security sequence, from first class to assignment.',
          es: 'La secuencia completa de seguridad armada de N.Y.S., de la primera clase a la asignación.',
        },
        img: 'course-security',
      },
      {
        cat: 'skills',
        title: { en: 'Seminars: Handling, Cleaning & Storage', es: 'Seminarios: manejo, limpieza y almacenamiento' },
        body: {
          en: 'Revolvers and autos — proper handling, maintenance, and safe storage at home.',
          es: 'Revólveres y automáticas — manejo correcto, mantenimiento y almacenamiento seguro en casa.',
        },
        img: 'course-seminars',
      },
      {
        cat: 'community',
        title: { en: 'Special-Audience Training', es: 'Formación para grupos especiales' },
        body: {
          en: 'Programs for law enforcement, seniors, veterans, business owners, synagogues, and realtors.',
          es: 'Programas para policías, adultos mayores, veteranos, dueños de negocios, sinagogas y agentes inmobiliarios.',
        },
        img: 'instructor-target',
      },
    ],
  },

  // ---- Instructor -------------------------------------------------------------------
  instructor: {
    kicker: { en: 'The instructor', es: 'El instructor' },
    name: 'Nick Brescia',
    titles: {
      en: 'Chief Instructor & Chief Range Safety Officer',
      es: 'Instructor en jefe y Oficial en jefe de seguridad del campo',
    },
    body: {
      en: 'Certified in pistol, rifle, and shotgun instruction and NRA-affiliated, Nick has built Precision Firearms Academy on a single conviction: a licensed shooter should also be a disciplined one. Every course is taught personally, every student leaves with habits — not just a certificate.',
      es: 'Certificado en instrucción de pistola, rifle y escopeta y afiliado a la NRA, Nick construyó Precision Firearms Academy sobre una convicción: quien porta un arma con licencia debe también portarla con disciplina. Imparte cada curso personalmente; cada alumno se va con hábitos — no solo con un certificado.',
    },
    pillars: [
      {
        title: { en: 'Safety before everything', es: 'La seguridad ante todo' },
        body: {
          en: 'Every session opens and closes with the same non-negotiable rules.',
          es: 'Cada sesión abre y cierra con las mismas reglas innegociables.',
        },
      },
      {
        title: { en: 'Responsible ownership', es: 'Posesión responsable' },
        body: {
          en: 'Storage, transport, and the law — taught as seriously as marksmanship.',
          es: 'Almacenamiento, transporte y la ley — con la misma seriedad que la puntería.',
        },
      },
      {
        title: { en: 'Continuous improvement', es: 'Mejora continua' },
        body: {
          en: 'Training doesn’t end at the license. Neither does our door.',
          es: 'El entrenamiento no termina con la licencia. Nuestra puerta tampoco se cierra.',
        },
      },
    ],
    nra: { en: 'NRA-affiliated instruction', es: 'Instrucción afiliada a la NRA' },
  },

  // ---- Upcoming classes ---------------------------------------------------------------
  classes: {
    kicker: { en: 'Upcoming classes', es: 'Próximas clases' },
    title: { en: 'Seats are limited. Seriously.', es: 'Los cupos son limitados. En serio.' },
    sub: { en: 'Seats limited — reserve by phone.', es: 'Cupos limitados — reserva por teléfono.' },
    reserve: { en: 'Reserve', es: 'Reservar' },
    // PLACEHOLDER sessions — dates are generated (next Saturdays); swap for Nick's real calendar.
    sessions: [
      {
        title: { en: 'CCW 16-Hour Class + 2-Hour Live Fire', es: 'Curso CCW de 16 horas + 2 horas de tiro en vivo' },
        time: { en: '9:00 AM — Private range, Mount Vernon', es: '9:00 AM — Campo privado, Mount Vernon' },
      },
      {
        // Product name stays Spanish in both languages.
        title: { en: 'Curso CCW en español + tiro en vivo', es: 'Curso CCW en español + tiro en vivo' },
        time: { en: '9:00 AM — Private range, Mount Vernon', es: '9:00 AM — Campo privado, Mount Vernon' },
        badge: 'ES',
      },
      {
        title: { en: '9mm Shootout Night', es: 'Noche de competencia 9mm' },
        time: { en: '6:30 PM — Members & students', es: '6:30 PM — Miembros y alumnos' },
      },
    ],
  },

  // ---- The range -----------------------------------------------------------------------
  range: {
    kicker: { en: 'The private range', es: 'El campo privado' },
    title: { en: 'Train where you can hear yourself think.', es: 'Entrena donde puedas escucharte pensar.' },
    body: {
      en: 'No crowds, no waiting for a lane, no strangers next to you on your first live fire. Our Mount Vernon range is private and by appointment only — your class is the only thing happening on it.',
      es: 'Sin multitudes, sin esperar un carril, sin desconocidos al lado en tu primer tiro en vivo. Nuestro campo en Mount Vernon es privado y solo con cita — tu clase es lo único que ocurre en él.',
    },
    calibers: { en: 'Calibers trained', es: 'Calibres de entrenamiento' },
    appointment: { en: 'By appointment only', es: 'Solo con cita previa' },
    location: { en: 'Location', es: 'Ubicación' },
    directions: { en: 'Get directions', es: 'Cómo llegar' },
  },

  // ---- Women's + community ----------------------------------------------------------------
  women: {
    kicker: { en: 'Women’s training & community', es: 'Formación para mujeres y comunidad' },
    title: { en: 'Your pace. Your class. Your range.', es: 'Tu ritmo. Tu clase. Tu campo.' },
    body: {
      en: 'Our women’s shooting classes are built as a supportive space for every experience level — from never-touched-a-firearm to competition-curious. Small groups, patient instruction, zero bravado.',
      es: 'Nuestras clases de tiro para mujeres son un espacio de apoyo para todos los niveles — desde quien nunca ha tocado un arma hasta quien sueña con competir. Grupos pequeños, instrucción paciente, cero arrogancia.',
    },
    discounts: {
      veterans: {
        title: { en: 'Veterans discount', es: 'Descuento para veteranos' },
        body: { en: 'Thank you for your service — it shows at checkout.', es: 'Gracias por su servicio — se nota en el precio.' },
      },
      groups: {
        title: { en: 'Group discounts', es: 'Descuentos para grupos' },
        body: { en: 'Train with friends, family, or coworkers and save.', es: 'Entrena con amigos, familia o colegas y ahorra.' },
      },
    },
  },

  // ---- FAQ -----------------------------------------------------------------------------------
  faq: {
    kicker: { en: 'Questions, answered', es: 'Preguntas, respondidas' },
    title: { en: 'What everyone asks first.', es: 'Lo que todos preguntan primero.' },
    items: [
      {
        q: { en: 'Do I need a permit to take the class?', es: '¿Necesito un permiso para tomar la clase?' },
        a: {
          en: 'No. The 16-hour CCW course is the step that comes before your permit — it’s the training New York requires as part of your application. You can start with zero paperwork in hand.',
          es: 'No. El curso CCW de 16 horas es el paso previo al permiso — es la formación que Nueva York exige como parte de tu solicitud. Puedes empezar sin ningún trámite en mano.',
        },
      },
      {
        q: { en: 'How long does Westchester or NYC approval take?', es: '¿Cuánto tarda la aprobación en Westchester o NYC?' },
        a: {
          en: 'Timelines vary by county and change often. What we can control is your application being complete, accurate, and well-prepared the first time — which is the best way to avoid delays.',
          es: 'Los plazos varían según el condado y cambian con frecuencia. Lo que sí controlamos es que tu solicitud esté completa, correcta y bien preparada a la primera — la mejor forma de evitar demoras.',
        },
      },
      {
        q: { en: 'What documents do I need?', es: '¿Qué documentos necesito?' },
        a: {
          en: 'It depends on your county and license type. Call or text us with your situation and we’ll give you the exact checklist — then prepare and review every page with you before filing.',
          es: 'Depende de tu condado y del tipo de licencia. Llámanos o escríbenos y te damos la lista exacta — luego preparamos y revisamos cada página contigo antes de presentarla.',
        },
      },
      {
        q: { en: 'I’ve never fired a gun. Can I start here?', es: 'Nunca he disparado un arma. ¿Puedo empezar aquí?' },
        a: {
          en: 'You’re exactly who this academy was built for. Most of our students start from zero. You’ll learn safety and fundamentals before you ever load a round — at your pace, on a private range.',
          es: 'Eres exactamente la persona para quien existe esta academia. La mayoría de nuestros alumnos empieza desde cero. Aprenderás seguridad y fundamentos antes de cargar una sola bala — a tu ritmo y en un campo privado.',
        },
      },
      {
        q: { en: '¿Ofrecen clases en español?', es: '¿Ofrecen clases en español?' },
        a: {
          en: 'Sí. The full 16-hour CCW course with live fire is taught in Spanish — same certification, same range, native-language instruction.',
          es: 'Sí. El curso CCW completo de 16 horas con tiro en vivo se imparte en español — la misma certificación, el mismo campo, instrucción en tu idioma.',
        },
      },
      {
        q: { en: 'Do you offer veterans or group discounts?', es: '¿Ofrecen descuentos para veteranos o grupos?' },
        a: {
          en: 'Both. Veterans train at a discount, always. Groups — friends, coworkers, congregations — get group rates. Mention it when you call.',
          es: 'Ambos. Los veteranos siempre entrenan con descuento. Los grupos — amigos, colegas, congregaciones — tienen tarifas especiales. Menciónalo cuando llames.',
        },
      },
    ],
  },

  // ---- Contact ---------------------------------------------------------------------------------
  contact: {
    kicker: { en: 'Get started', es: 'Empieza hoy' },
    title: { en: 'One call starts everything.', es: 'Todo empieza con una llamada.' },
    sub: {
      en: 'Tell us your county and your goal — we’ll map your licensing path today.',
      es: 'Dinos tu condado y tu objetivo — hoy mismo trazamos tu ruta de licencia.',
    },
    callLabel: { en: 'Call or text', es: 'Llama o escribe' },
    emailLabel: { en: 'Email', es: 'Correo' },
    visitLabel: { en: 'Private range', es: 'Campo privado' },
    hoursLabel: { en: 'Hours', es: 'Horario' },
    hours: { en: 'By appointment only', es: 'Solo con cita previa' },
    form: {
      name: { en: 'Name', es: 'Nombre' },
      email: { en: 'Email', es: 'Correo electrónico' },
      message: { en: 'What are you looking to do?', es: '¿Qué te gustaría lograr?' },
      messagePh: {
        en: 'e.g. “I live in Westchester and want my full carry license.”',
        es: 'p. ej. «Vivo en Westchester y quiero mi licencia completa de portación.»',
      },
      submit: { en: 'Send message', es: 'Enviar mensaje' },
      success: {
        en: 'Message sent. We’ll get back to you within one business day.',
        es: 'Mensaje enviado. Te responderemos en un día hábil.',
      },
    },
  },

  // ---- Footer / sticky --------------------------------------------------------------------------
  footer: {
    tagline: {
      en: 'Where the strong survive & the courageous triumph.',
      es: 'Donde los fuertes sobreviven y los valientes triunfan.',
    },
    rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
    demo: { en: 'Demo site by EyeUni', es: 'Sitio demo por EyeUni' },
  },
  sticky: {
    label: { en: 'Call or Text', es: 'Llama o Escribe' },
  },
}

export const CALIBERS = ['.22', '.380', '.38', '9mm', '.40', '.45']
