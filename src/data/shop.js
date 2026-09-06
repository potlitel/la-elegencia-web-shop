import productsData from './products.json'
import reviewsData from './reviews.json'

export const PRODUCTS = productsData

export const CATEGORIES = [
  { id: "all", label: "Todo", icon: "✨" },
  { id: "vestidos", label: "Vestidos", icon: "👗" },
  { id: "blusas", label: "Blusas", icon: "👚" },
  { id: "pantalones", label: "Pantalones", icon: "👖" },
  { id: "faldas", label: "Faldas", icon: "💃" },
  { id: "accesorios", label: "Accesorios", icon: "👜" },
]

export const STORES = [
  {
    id: 1,
    name: "La Elegancia Centro Habana",
    address: "Obispo 256 e/ Mercaderes y San Ignacio",
    province: "La Habana",
    stock: 45,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 2,
    name: "La Elegancia Vedado",
    address: "Línea 812, esq. 2, Vedado",
    province: "La Habana",
    stock: 32,
    hours: "Lun–Sáb 9:30–19:00",
  },
  {
    id: 3,
    name: "La Elegancia Santa Clara",
    address: "Máximo Gómez 14, Santa Clara",
    province: "Villa Clara",
    stock: 28,
    hours: "Lun–Vie 9:00–17:30",
  },
  {
    id: 4,
    name: "La Elegancia Santiago",
    address: "Agostino Neto 45, Santiago de Cuba",
    province: "Santiago de Cuba",
    stock: 19,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 5,
    name: "La Elegancia Camagüey",
    address: "San José 302, Camagüey",
    province: "Camagüey",
    stock: 15,
    hours: "Lun–Vie 9:00–17:00",
  },
  {
    id: 6,
    name: "La Elegancia Holguín",
    address: "García Lorca 78, Holguín",
    province: "Holguín",
    stock: 22,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 7,
    name: "La Elegancia Trinidad",
    address: "Real del Jigüe 12, Trinidad",
    province: "Sancti Spíritus",
    stock: 11,
    hours: "Mar–Dom 9:30–17:00",
  },
]

export const COUPONS = {
  BIENVENIDA20: { percent: 20, code: "BIENVENIDA20" },
  ELEGANCIA15: { percent: 15, code: "ELEGANCIA15" },
  LAELEGANCIA10: { percent: 10, code: "LAELEGANCIA10" },
}

export const REVIEWS_BY_PRODUCT = reviewsData

export const TAX_RATE = 0.1
export const STORE_PHONE = "5355123456"

// Variante tintada por color: <slug>-<hex>.jpg dentro de /images/colors.
// colors[0] es el color base = imagen original del producto.
export const COLOR_VARIANTS_DIR = "/images/colors"
export const productImage = (product, colorHex) => {
  const base = product.colors[0].hex
  const hex = String(colorHex || base).toLowerCase()
  if (hex === base.toLowerCase()) return product.image
  if (!/^#?[0-9a-f]{6}$/.test(hex)) return product.image
  return `${COLOR_VARIANTS_DIR}/${product.slug}-${hex.replace("#", "").toLowerCase()}.jpg`
}

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id)
