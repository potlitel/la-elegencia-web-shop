import productsData from './products.json'
import reviewsData from './reviews.json'

export const PRODUCTS = productsData

export const CATEGORIES = [
  { id: "all", label: "Todo", icon: "✨" },
  { id: "vestidos", label: "Vestidos", icon: "👗" },
  { id: "tops", label: "Tops", icon: "👚" },
  { id: "gorros", label: "Gorros", icon: "🧢" },
  { id: "sayas", label: "Sayas", icon: "💃" },
]

export const STORES = [
  {
    id: 1,
    name: "Feria Paris-Vienan Centro Habana",
    address: "Obispo 256 e/ Mercaderes y San Ignacio",
    province: "La Habana",
    stock: 45,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 2,
    name: "Feria Paris-Vienan Vedado",
    address: "Línea 812, esq. 2, Vedado",
    province: "La Habana",
    stock: 32,
    hours: "Lun–Sáb 9:30–19:00",
  },
  {
    id: 3,
    name: "Feria Paris-Vienan Santa Clara",
    address: "Máximo Gómez 14, Santa Clara",
    province: "Villa Clara",
    stock: 28,
    hours: "Lun–Vie 9:00–17:30",
  },
  {
    id: 4,
    name: "Feria Paris-Vienan Santiago",
    address: "Agostino Neto 45, Santiago de Cuba",
    province: "Santiago de Cuba",
    stock: 19,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 5,
    name: "Feria Paris-Vienan Camagüey",
    address: "San José 302, Camagüey",
    province: "Camagüey",
    stock: 15,
    hours: "Lun–Vie 9:00–17:00",
  },
  {
    id: 6,
    name: "Feria Paris-Vienan Holguín",
    address: "García Lorca 78, Holguín",
    province: "Holguín",
    stock: 22,
    hours: "Lun–Sáb 9:00–18:00",
  },
  {
    id: 7,
    name: "Feria Paris-Vienan Trinidad",
    address: "Real del Jigüe 12, Trinidad",
    province: "Sancti Spíritus",
    stock: 11,
    hours: "Mar–Dom 9:30–17:00",
  },
]

export const COUPONS = {
  BIENVENIDA20: { percent: 20, code: "BIENVENIDA20" },
  FERIAPARIS15: { percent: 15, code: "FERIAPARIS15" },
  FERIAVIENAN10: { percent: 10, code: "FERIAVIENAN10" },
}

export const REVIEWS_BY_PRODUCT = reviewsData

export const TAX_RATE = 0.1
export const STORE_PHONE = "5355123456"

// Las fotos reales del catálogo no disponen de variantes de color tintadas.
// Al seleccionar un color se mantiene siempre la fotografía original de la prenda.
export const productImage = (product) => product.image

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id)
