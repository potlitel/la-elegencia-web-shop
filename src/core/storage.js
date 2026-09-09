// SCREAMING ARCHITECTURE: PERSISTENCE MODULE
const CART_KEY = "feria_paris_vienan_cart_v2"
const WISHLIST_KEY = "feria_paris_vienan_wishlist_v2"

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    /* almacenamiento no disponible */
  }
}

export function loadWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  } catch {
    /* almacenamiento no disponible */
  }
}