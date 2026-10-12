// ============================================================
// ALMA MÍA — Contenido centralizado
// ============================================================

export const WHATSAPP_NUMBER = "5574096632"

// ── VIDEOS ───────────────────────────────────────────────────
// 🎥 Reemplaza con tus videos reales de YouTube o Vimeo
export const VIDEOS = {
  origin:   "https://www.youtube.com/embed/ie-prxXbIFY", // Origen del café
  roast:    "https://www.youtube.com/embed/4mLud9E3KKQ", // Proceso de tueste
  grind:    "https://www.youtube.com/embed/PZm6sweglZ4", // Métodos de preparación
  quantity: "https://www.youtube.com/embed/st571DYYTR8", // Almacenamiento y frescura
}

// ── BIENVENIDA ────────────────────────────────────────────────
export const WELCOME = {
  eyebrow: "La experiencia",
  headline: "Del grano a tu taza",
  subtitle: "Cada café tiene una historia. En tres sencillos pasos, descubre cuál conecta contigo.",
  steps: [
    {
      number: "01",
      title: "Elige tu origen",
      description: "Cada región de México produce un café único. Te contamos la historia detrás de cada grano.",
      icon: "🌱",
    },
    {
      number: "02",
      title: "Descubre tu tostado",
      description: "Del más suave y aromático al más intenso. Encuentra el nivel que va con tu paladar.",
      icon: "🔥",
    },
    {
      number: "03",
      title: "Cómo lo preparas",
      description: "Dinos con qué cafetera haces tu café y nosotros elegimos el molido perfecto para ti.",
      icon: "☕",
    },
  ],
}

export const BRAND = {
  name: "Alma Mía",
  tagline: "Tostadora de Café",
  primaryColor: "#3b51a0",   // Chambray
  secondaryColor: "#e3b759", // Equator (dorado)
  accentColor: "#d86a4b",    // Red Damask
  lightColor: "#a6b1d8",     // Pigeon Post
  midColor: "#5d6fb1",       // Scampi
}

// ── HERO ────────────────────────────────────────────────────
export const HERO = {
  headline: "Diseña tu",
  headlineItalic: "café ideal",
  subtitle: "Cada taza es un ritual. Elige tu origen, tu proceso, tu momento.",
  cta: "Comenzar experiencia",
  backgroundImage: "/bg.png",
  stats: [
    { value: "3",    label: "Orígenes"     },
    { value: "100%", label: "Arábica"      },
    { value: "Mx",   label: "Tostado aquí" },
  ],
}

// ── ORÍGENES ─────────────────────────────────────────────────
export const ORIGINS = [
  {
    id: "chiapas",
    name: "Chiapas",
    region: "Tenejapa, Chiapas",
    producer: "Pedro Méndez Girón",
    variety: "Arábiga",
    process: "Lavado",
    altitude: "1,500 – 1,600 msnm",
    // Precio en MXN por presentación (llaves = id de QUANTITIES)
    prices: { "250": 120, "500": 220, "1000": 420 },
    notes: ["Chocolate oscuro", "Frutos rojos", "Caramelo"],
    description: "Cultivado entre niebla y selva. Cuerpo pleno con acidez brillante que evoca la tierra húmeda del sureste.",
    image: "/grano-tostado.png",
    bgImage: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=1400&q=80&fit=crop",
    bgColor: "#f0f4f0",
    accentColor: "#3b51a0",
    textDark: true,
  },
  // {
  //   id: "oaxaca",
  //     name: "Oaxaca",
  //     region: "Sierra Juárez",
  //     altitude: "1,200 – 1,700 msnm",
  //     notes: ["Cítrico", "Floral", "Miel de agave"],
  //     description: "Crecido bajo sombra de encinos. Perfil floral único con dulzura natural que recuerda a la milpa oaxaqueña.",
  //     image: "/grano-tostado.png",
  //     bgImage: "https://images.unsplash.com/photo-1518983498539-c6e145e4e498?w=1400&q=80&fit=crop",
  //     bgColor: "#f5f2ec",
  //     accentColor: "#e3b759",
  //     textDark: true,
  //   },
  {
    id: "veracruz",
    name: "Veracruz",
    region: "Cosautlan, Veracruz",
    producer: "Eric Ortiz Hernández",
    farm: "La Higuera",
    variety: "Sarchimor",
    process: "Lavado",
    altitude: "1,200 – 1,300 msnm",
    prices: { "250": 130, "500": 240, "1000": 450 },
    notes: ["Nueces", "Dulzor natural", "Toques afrutados"],
    description: "Entre las montañas y la neblina de Veracruz nace un café de personalidad cálida y equilibrada. Su delicado dulzor, notas de nueces y sutiles matices afrutados crean una experiencia suave y envolvente, que invita a disfrutar cada sorbo.",
    image: "/grano-tostado.png",
    bgColor: "#f2f0ed",
    accentColor: "#d86a4b",
    textDark: true,
  },
  {
    id: "veracruz-honey",
    name: "Veracruz Honey",
    region: "Cosautlan, Veracruz",
    producer: "Eric Ortiz Hernández",
    farm: "La Higuera",
    variety: "Sarchimor",
    process: "Honey",
    altitude: "1,200 – 1,300 msnm",
    prices: { "250": 140, "500": 260, "1000": 500 },
    notes: ["Dulzor pronunciado", "Sensación sedosa", "Matices frutales"],
    description: "Una expresión diferente de las montañas de Veracruz, donde el proceso Honey aporta una personalidad especial a cada grano. Un café que invita a descubrir una experiencia dulce y aromática, con una textura envolvente y un carácter que se disfruta lentamente.",
    image: "/grano-tostado.png",
    bgColor: "#f5f2ec",
    accentColor: "#e3b759",
    textDark: true,
  },
]

// ── TOSTADOS ─────────────────────────────────────────────────
// 🖼 Reemplaza cada image: con tu render de Midjourney del nivel de tueste correspondiente
export const ROASTS = [
  {
    id: "light",
    name: "Light / Claro",
    temp: "205°C",
    notes: ["Frutal", "Cítrico", "Alta acidez"],
    description: "Tostado claro que preserva los sabores de origen. Ideal para métodos de filtro donde cada nota del terroir florece libre.",
    image: "/grano-tostado.png",
    bgColor: "#f7f2eb",
    accentColor: "#b8845a",
    textDark: true,
  },
  {
    id: "city",
    name: "City / Medio",
    temp: "210°C",
    notes: ["Equilibrado", "Caramelo", "Nuez"],
    description: "El punto de encuentro entre origen y proceso. Dulzura que persiste, cuerpo que abraza. El favorito de los conocedores.",
    image: "/grano-tostado.png",
    bgColor: "#f2ece3",
    accentColor: "#9c7040",
    textDark: true,
  },
  {
    id: "full-city",
    name: "Full City / Medio Oscuro",
    temp: "219°C",
    notes: ["Chocolate", "Caramelo oscuro", "Cuerpo pleno"],
    description: "Justo antes del segundo crack. Sabores más profundos y complejos con dulzura de chocolate y un final largo.",
    image: "/grano-tostado.png",
    bgColor: "#ede4d8",
    accentColor: "#8a5e30",
    textDark: true,
  },
  {
    id: "dark",
    name: "Viena / Oscuro",
    temp: "224°C",
    notes: ["Chocolate oscuro", "Humo", "Intenso"],
    description: "Intenso y profundo. El origen cede protagonismo al proceso. Para los que buscan una taza que despierte todos los sentidos.",
    image: "/grano-tostado.png",
    bgColor: "#e8ddd0",
    accentColor: "#6b3d1e",
    textDark: true,
  },
  {
    id: "french",
    name: "Francés / Oscuro Intenso",
    temp: "230°C",
    notes: ["Ahumado", "Amargo suave", "Aceites visibles"],
    description: "El grano comienza a brillar con sus aceites naturales. Sabor intenso y ahumado con un cuerpo pesado y sensual.",
    image: "/grano-tostado.png",
    bgColor: "#e0d4c4",
    accentColor: "#5a3015",
    textDark: true,
  },
]

// ── MÉTODO DE PREPARACIÓN (mapea a molido) ──────────────────
export const BREW_METHODS = [
  {
    id: "drip",
    name: "Cafetera de goteo",
    subtitle: "Tipo Oster · 3–5 min",
    description: "La más común en casa. Fácil, automática y consistente. Produce un café limpio y balanceado, perfecto para el día a día.",
    methods: ["Molienda: Medio"],
    grindIcon: "drip",
    recommendedGrind: "Molido Medio",
    grindDetail: "Como arena gruesa",
    result: "Limpio · Balanceado · Fácil de tomar",
    image: "/grano-tostado.png",
    bgColor: "#eee8de", accentColor: "#6b3d1e", textDark: true,
  },
  {
    id: "pot",
    name: "Café de olla",
    subtitle: "Tradicional · 8–10 min",
    description: "El café mexicano por excelencia. Se hierve con canela y piloncillo. Sencillo, aromático y lleno de historia.",
    methods: ["Molienda: Medio-Grueso"],
    grindIcon: "pot",
    recommendedGrind: "Molido Medio-Grueso",
    grindDetail: "Entre medio y grueso",
    result: "Tradicional · Especiado · Cuerpo medio",
    image: "/grano-tostado.png",
    bgColor: "#f2ece3", accentColor: "#8B5E3C", textDark: true,
  },
  {
    id: "espresso",
    name: "Espresso",
    subtitle: "Máquina · 25–30 seg",
    description: "Agua a presión que pasa rápido por café muy fino. El resultado es intenso, concentrado y con crema. Base de lattes y cappuccinos.",
    methods: ["Molienda: Fino"],
    grindIcon: "espresso",
    recommendedGrind: "Molido Fino",
    grindDetail: "Como azúcar",
    result: "Intenso · Concentrado · Con crema",
    image: "/grano-tostado.png",
    bgColor: "#e8e0d4", accentColor: "#5a3015", textDark: true,
  },
  {
    id: "v60",
    name: "V60",
    subtitle: "Filtro manual · 2–3 min",
    description: "Método artesanal con un dripper cónico. Produce un café limpio, aromático y con buena acidez. Para los que disfrutan el proceso.",
    methods: ["Molienda: Medio"],
    grindIcon: "v60",
    recommendedGrind: "Molido Medio",
    grindDetail: "Como arena gruesa",
    result: "Limpio · Aromático · Buena acidez",
    image: "/grano-tostado.png",
    bgColor: "#eae4dc", accentColor: "#7a5030", textDark: true,
  },
  {
    id: "frenchpress",
    name: "Prensa francesa",
    subtitle: "Inmersión · 4–5 min",
    description: "El café se sumerge en agua caliente y se filtra con un émbolo. Produce un café con cuerpo alto, más aceites y textura densa.",
    methods: ["Molienda: Grueso"],
    grindIcon: "frenchpress",
    recommendedGrind: "Molido Grueso",
    grindDetail: "Como sal gruesa",
    result: "Cuerpo alto · Más aceites · Textura densa",
    image: "/grano-tostado.png",
    bgColor: "#f2ece3", accentColor: "#7a4e2d", textDark: true,
  },
  {
    id: "chemex",
    name: "Chemex",
    subtitle: "Filtro grueso · 3.5–5 min",
    description: "Usa un filtro de papel grueso que retiene más aceites. El resultado es muy limpio, brillante y elegante. Ideal para cafés de origen.",
    methods: ["Molienda: Medio-Grueso"],
    grindIcon: "chemex",
    recommendedGrind: "Molido Medio-Grueso",
    grindDetail: "Un poco más grueso que medio",
    result: "Muy limpio · Brillante · Elegante",
    image: "/grano-tostado.png",
    bgColor: "#ede8e2", accentColor: "#6b3d1e", textDark: true,
  },
  {
    id: "aeropress",
    name: "AeroPress",
    subtitle: "Presión manual · 1–2 min",
    description: "El método más versátil. Rápido, fácil de limpiar y muy consistente. Produce un café balanceado o intenso según la receta.",
    methods: ["Molienda: Medio a Medio-Fino"],
    grindIcon: "aeropress",
    recommendedGrind: "Molido Medio-Fino",
    grindDetail: "Entre medio y fino",
    result: "Versátil · Balanceado o intenso",
    image: "/grano-tostado.png",
    bgColor: "#eae4dc", accentColor: "#7a5030", textDark: true,
  },
  {
    id: "moka",
    name: "Moka italiana",
    subtitle: "Presión de vapor · 3–5 min",
    description: "La cafetera de la abuela. Produce un café fuerte y aromático, parecido al espresso pero menos denso. Muy popular en México.",
    methods: ["Molienda: Medio-Fino"],
    grindIcon: "moka",
    recommendedGrind: "Molido Medio-Fino",
    grindDetail: "Entre medio y fino",
    result: "Fuerte · Parecido al espresso",
    image: "/grano-tostado.png",
    bgColor: "#ede8e2", accentColor: "#6b3d1e", textDark: true,
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    subtitle: "Frío · 12–24 horas",
    description: "Café molido grueso en agua fría por muchas horas. Suave, con baja acidez y muy refrescante. Perfecto para climas calurosos.",
    methods: ["Molienda: Grueso"],
    grindIcon: "coldbrew",
    recommendedGrind: "Molido Grueso",
    grindDetail: "Como sal gruesa",
    result: "Suave · Baja acidez · Refrescante",
    image: "/grano-tostado.png",
    bgColor: "#f0ece4", accentColor: "#7a4e2d", textDark: true,
  },
  {
    id: "whole",
    name: "Sin cafetera aún",
    subtitle: "Te ayudamos a elegir",
    description: "Sin problema — te enviamos el grano entero para que lo muelas cuando consigas tu método. Máxima frescura garantizada.",
    methods: ["Sin moler · Grano entero"],
    grindIcon: "whole",
    recommendedGrind: "Grano Entero",
    grindDetail: "Sin moler",
    result: "Máxima frescura garantizada",
    image: "/grano-tostado.png",
    bgColor: "#f5f0ea", accentColor: "#8B5E3C", textDark: true,
  },
]

// Mantener GRINDS para referencia interna
export const GRINDS = BREW_METHODS

// ── MOLIDOS TÉCNICOS ─────────────────────────────────────────
export const GRINDS_TECH = [
  {
    id: "whole",
    name: "Entero",
    texture: "Sin moler",
    description: "Máxima frescura. Muele justo antes de preparar para capturar cada aroma en su plenitud.",
    methods: ["Muele en casa"],
    grindIcon: "whole",
    recommendedGrind: "Grano Entero",
    grindDetail: "Sin moler",
    result: "Máxima frescura",
    image: "/grano-tostado.png",
    bgColor: "#f5f0ea", accentColor: "#8B5E3C", textDark: true,
  },
  {
    id: "coarse",
    name: "Grueso",
    texture: "Como sal gruesa",
    description: "Partículas grandes que infusionan lento. Extrae cuerpo y suavidad sin amargor.",
    methods: ["Prensa francesa", "Cold brew", "Café de olla"],
    grindIcon: "frenchpress",
    recommendedGrind: "Molido Grueso",
    grindDetail: "Como sal gruesa",
    result: "Cuerpo alto · Suave",
    image: "/grano-tostado.png",
    bgColor: "#f2ece3", accentColor: "#7a4e2d", textDark: true,
  },
  {
    id: "medium",
    name: "Medio",
    texture: "Como arena fina",
    description: "El molido más versátil. Perfecto para goteo, V60 y AeroPress. Balance entre extracción y claridad.",
    methods: ["Cafetera de goteo", "V60", "Chemex", "AeroPress"],
    grindIcon: "drip",
    recommendedGrind: "Molido Medio",
    grindDetail: "Como arena fina",
    result: "Balanceado · Versátil",
    image: "/grano-tostado.png",
    bgColor: "#eee8de", accentColor: "#6b3d1e", textDark: true,
  },
  {
    id: "fine",
    name: "Fino",
    texture: "Como azúcar",
    description: "Polvo denso para extracciones cortas a alta presión. El lenguaje del espresso.",
    methods: ["Espresso", "Moka italiana"],
    grindIcon: "espresso",
    recommendedGrind: "Molido Fino",
    grindDetail: "Como azúcar",
    result: "Intenso · Con crema",
    image: "/grano-tostado.png",
    bgColor: "#e8e0d4", accentColor: "#5a3015", textDark: true,
  },
]

// ── CANTIDADES ───────────────────────────────────────────────
export const QUANTITIES = [
  {
    id: "250", label: "250g", price: 180, servings: "~16 tazas",
    description: "Perfecta para explorar. Una bolsa que dura dos semanas de buenos momentos.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=85&fit=crop",
    bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&q=80&fit=crop",
    bgColor: "#eef5f0", accentColor: "#4a7c59",
  },
  {
    id: "500", label: "500g", price: 320, servings: "~33 tazas",
    description: "El favorito de los devotos. Un mes completo de ritual matutino.",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=900&q=85&fit=crop",
    bgImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&fit=crop",
    bgColor: "#f5f0eb", accentColor: "#9c7c38",
  },
  {
    id: "1000", label: "1 kg", price: 580, servings: "~66 tazas",
    description: "Para los que no conciben un día sin su Alma Mía. El compromiso total.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=85&fit=crop",
    bgImage: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=1400&q=80&fit=crop",
    bgColor: "#f2ede8", accentColor: "#8c5e2a",
  },
]

// ── WHATSAPP ─────────────────────────────────────────────────
export function buildWhatsAppMessage(order: {
  origin: string; roast: string; grind: string; quantity: string; price: number
  extras?: { id: string; name: string; price: number }[]
}) {
  const extrasTotal = order.extras?.reduce((a, e) => a + e.price, 0) ?? 0
  const total = order.price + extrasTotal
  const extrasLines = order.extras && order.extras.length > 0
    ? "\n*Accesorios:*\n" + order.extras.map(e => `  - ${e.name}: $${e.price} MXN`).join("\n")
    : ""
  const msg = [
    "¡Hola! Quiero hacer un pedido en Alma Mía ☕",
    "",
    "*Café:*",
    `  Origen: ${order.origin}`,
    `  Tostado: ${order.roast}`,
    `  Molido: ${order.grind}`,
    `  Cantidad: ${order.quantity}`,
    extrasLines,
    "",
    `*Total:* $${total} MXN`,
    "",
    "¿Cómo procedo?",
  ].join("\n")
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

// ── PRODUCTOS TIENDA ─────────────────────────────────────────
export type ProductCategory = "cafetera" | "accesorio" | "taza" | "consumible"

export interface Product {
  id: string
  name: string
  category: ProductCategory
  categoryLabel: string
  price: number
  description: string
  longDescription: string
  image: string
  featured: boolean
  relatedGrinds?: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "chemex-6",
    name: "Chemex 800 ml",
    category: "cafetera",
    categoryLabel: "Cafetera",
    price: 600,
    description: "Filtrado limpio y aromático, sin filtros de papel.",
    longDescription: "Jarra de vidrio con collar de madera y cordón de piel. Incluye filtro reutilizable de acero inoxidable que deja pasar los aceites naturales del café. Capacidad 800 ml. Ideal con molido medio.",
    image: "/productos/chemex.png",
    featured: true,
    relatedGrinds: ["medium"],
  },
  {
    id: "molino-manual",
    name: "Molino manual",
    category: "accesorio",
    categoryLabel: "Accesorio",
    price: 500,
    description: "Muele en casa justo antes de preparar.",
    longDescription: "Diseño compacto con manivela de madera y molienda ajustable, del grueso para prensa al fino para espresso. Muele solo lo que vas a preparar y conserva toda la frescura del grano entero.",
    image: "/productos/molino-manual.png",
    featured: true,
    relatedGrinds: ["whole"],
  },
  {
    id: "filtros-v60",
    name: "Filtros V60 ×40",
    category: "consumible",
    categoryLabel: "Consumible",
    price: 180,
    description: "Filtros de papel sin blanquear para Hario V60.",
    longDescription: "Tamaño 02, compatibles con Hario V60 y otros dripper estándar. Sin blanquear para no alterar el sabor. Paquete de 40 unidades.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    featured: false,
    relatedGrinds: ["medium"],
  },
  {
    id: "frasco-hermetico",
    name: "Frasco hermético",
    category: "accesorio",
    categoryLabel: "Accesorio",
    price: 240,
    description: "Conserva la frescura del café hasta 4 semanas.",
    longDescription: "500ml con válvula de desgasificación unidireccional. Mantiene el café fresco expulsando CO₂ sin dejar entrar oxígeno. Vidrio y acero inoxidable.",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&q=80",
    featured: false,
    relatedGrinds: [],
  },
  {
    id: "termometro",
    name: "Termómetro digital",
    category: "accesorio",
    categoryLabel: "Accesorio",
    price: 350,
    description: "Temperatura exacta para cada método.",
    longDescription: "90°C para filtro, 93°C para espresso. Respuesta instantánea, pantalla retroiluminada, sonda de acero inoxidable.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    featured: false,
    relatedGrinds: [],
  },
  {
    id: "prensa-francesa",
    name: "Prensa francesa",
    category: "cafetera",
    categoryLabel: "Cafetera",
    price: 800,
    description: "El método más sencillo para un café con cuerpo.",
    longDescription: "Acero inoxidable de doble pared que mantiene tu café caliente por más tiempo y no se rompe. Filtro de malla de acero desmontable, fácil de limpiar. Perfecta para molido grueso; sin filtros de papel, captura los aceites naturales del café.",
    image: "/productos/prensa-francesa.png",
    featured: true,
    relatedGrinds: ["coarse"],
  },
  {
    id: "cafetera-italiana",
    name: "Cafetera italiana",
    category: "cafetera",
    categoryLabel: "Cafetera",
    price: 300,
    description: "Café intenso y concentrado, directo en la estufa.",
    longDescription: "Cafetera tipo moka de aluminio en color blanco, con mango y perilla con acabado de madera. Capacidad 150 ml. Prepara un café con cuerpo, cercano al espresso. Ideal con molido fino.",
    image: "/productos/cafetera-italiana.png",
    featured: true,
    relatedGrinds: ["fine"],
  },
]
