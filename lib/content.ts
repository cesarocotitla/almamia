// ============================================================
// ALMA MÍA — Contenido centralizado
// ============================================================

export const WHATSAPP_NUMBER = "5574096632"

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
  backgroundImage:
    "/bg.jpg",
  stats: [

    { value: "100%", label: "Arábica"      },
    { value: "Mx",   label: "Tostado aquí" },
  ],
}

// ── ORÍGENES ─────────────────────────────────────────────────
export const ORIGINS = [
  {
    id: "chiapas",
    name: "Chiapas",
    region: "Sierra Madre",
    altitude: "1,400 – 1,900 msnm",
    notes: ["Chocolate oscuro", "Frutos rojos", "Caramelo"],
    description: "Cultivado entre niebla y selva. Cuerpo pleno con acidez brillante que evoca la tierra húmeda del sureste.",
    image: "/grano-tostado.png",
    bgImage: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=1400&q=80&fit=crop",
    bgColor: "#f0f4f0",
    accentColor: "#3b51a0",
    textDark: true,
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    region: "Sierra Juárez",
    altitude: "1,200 – 1,700 msnm",
    notes: ["Cítrico", "Floral", "Miel de agave"],
    description: "Crecido bajo sombra de encinos. Perfil floral único con dulzura natural que recuerda a la milpa oaxaqueña.",
    image: "/grano-tostado.png",
    bgImage: "https://images.unsplash.com/photo-1518983498539-c6e145e4e498?w=1400&q=80&fit=crop",
    bgColor: "#f5f2ec",
    accentColor: "#e3b759",
    textDark: true,
  },
  {
    id: "veracruz",
    name: "Veracruz",
    region: "Coatepec",
    altitude: "1,000 – 1,400 msnm",
    notes: ["Nuez", "Vainilla", "Tabaco suave"],
    description: "El café más histórico de México. Cuerpo cremoso y sedoso con retrogusto largo a vainilla y especias.",
    image: "/grano-tostado.png",
    bgImage: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1400&q=80&fit=crop",
    bgColor: "#f2f0ed",
    accentColor: "#d86a4b",
    textDark: true,
  },
]

// ── TOSTADOS ─────────────────────────────────────────────────
// 🖼 Reemplaza cada image: con tu render de Midjourney del nivel de tueste correspondiente
export const ROASTS = [
  {
    id: "cinnamon",
    name: "Cinnamon",
    temp: "196°C",
    notes: ["Floral", "Herbal", "Muy alta acidez"],
    description: "El nivel más claro. El grano apenas comienza su transformación. Perfil crudo, herbáceo y vibrante con acidez pronunciada.",
    image: "/grano-tostado.png",
    bgColor: "#faf6f0",
    accentColor: "#c4956a",
    textDark: true,
  },
  {
    id: "light",
    name: "Light",
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
    name: "City / Medium",
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
    name: "Full City",
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
    name: "Dark",
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
    name: "French",
    temp: "230°C",
    notes: ["Ahumado", "Amargo suave", "Aceites visibles"],
    description: "El grano comienza a brillar con sus aceites naturales. Sabor intenso y ahumado con un cuerpo pesado y sensual.",
    image: "/grano-tostado.png",
    bgColor: "#e0d4c4",
    accentColor: "#5a3015",
    textDark: true,
  },
  {
    id: "italian",
    name: "Italian",
    temp: "245°C",
    notes: ["Carbonizado", "Muy amargo", "Espresso extremo"],
    description: "Al límite del fuego. Un tostado extremo para espíritus intrépidos. El grano casi carbonizado libera sabores únicos e irrepetibles.",
    image: "/grano-tostado.png",
    bgColor: "#d8ccbc",
    accentColor: "#3d1a08",
    textDark: true,
  },
]

// ── MOLIDO ───────────────────────────────────────────────────
export const GRINDS = [
  {
    id: "whole",
    name: "Grano entero",
    texture: "Sin moler",
    methods: ["Muele en casa", "Máxima frescura"],
    particle: "▓▓▓▓▓▓▓▓",
    grindIcon: "whole",
    description: "La máxima expresión de frescura. Muele justo antes de preparar y captura cada aroma en su plenitud.",
    image: "/grano-tostado.png",
    bgColor: "#f5f0ea", accentColor: "#8B5E3C", textDark: true,
  },
  {
    id: "coarse",
    name: "Grueso",
    texture: "Como sal gruesa",
    methods: ["Prensa francesa", "Cold brew", "Percolador"],
    particle: "▓ ▓ ▓ ▓ ▓",
    grindIcon: "coarse",
    description: "Partículas grandes que infusionan lento. Extrae cuerpo, suavidad y una taza sedosa sin amargor.",
    image: "/grano-tostado.png",
    bgColor: "#f2ece3", accentColor: "#7a4e2d", textDark: true,
  },
  {
    id: "medium",
    name: "Medio",
    texture: "Como arena gruesa",
    methods: ["V60 · Chemex", "Goteo", "Aeropress"],
    particle: "▓▓ ▓▓ ▓▓",
    grindIcon: "medium",
    description: "El molido más versátil. Balance perfecto entre extracción y claridad de taza. Para los métodos de filtro.",
    image: "/grano-tostado.png",
    bgColor: "#eee8de", accentColor: "#6b3d1e", textDark: true,
  },
  {
    id: "fine",
    name: "Fino",
    texture: "Como azúcar glass",
    methods: ["Espresso", "Moka"],
    particle: "▓▓▓▓▓▓▓▓▓▓▓",
    grindIcon: "fine",
    description: "Polvo denso y uniforme para extracciones cortas e intensas. El lenguaje del espresso.",
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
}) {
  const msg =
`¡Hola! Quiero hacer un pedido en Alma Mía ☕

*Origen:* ${order.origin}
*Tostado:* ${order.roast}
*Molido:* ${order.grind}
*Cantidad:* ${order.quantity}
*Total:* $${order.price} MXN

¿Cómo procedo?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
