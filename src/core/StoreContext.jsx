import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import { COUPONS, TAX_RATE } from "../data/shop"
import { loadCart, saveCart, loadWishlist, saveWishlist } from "./storage"

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(loadCart)
  const [wishlist, setWishlist] = useState(loadWishlist)
  const [coupon, setCoupon] = useState(null)

  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [detailProductId, setDetailProductId] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("transfermovil")

  useEffect(() => saveCart(cart), [cart])
  useEffect(() => saveWishlist(wishlist), [wishlist])

  const addToCart = useCallback((product, size, color) => {
    const lineId = `${product.id}-${size}-${color}`
    setCart((prev) => {
      const found = prev.find((l) => l.lineId === lineId)
      if (found) {
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, qty: l.qty + 1 } : l,
        )
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          colorHex: color,
          qty: 1,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((lineId) => {
    setCart((prev) => prev.filter((l) => l.lineId !== lineId))
  }, [])

  const updateQty = useCallback((lineId, delta) => {
    setCart((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }, [])

  const applyCoupon = useCallback((code) => {
    const couponDef = COUPONS[code?.toUpperCase()]
    if (!couponDef) return { ok: false }
    setCoupon({ ...couponDef, code: code.toUpperCase() })
    return { ok: true }
  }, [])

  const removeCoupon = useCallback(() => setCoupon(null), [])

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, l) => sum + l.price * l.qty, 0)
    const discount = coupon ? Math.round(subtotal * (coupon.percent / 100)) : 0
    const taxable = subtotal - discount
    const tax = Math.round(taxable * TAX_RATE)
    const total = taxable + tax
    return { subtotal, discount, tax, total }
  }, [cart, coupon])

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.qty, 0), [cart])

  const completeOrder = useCallback(() => {
    const orderId = `PED-${Date.now().toString(36).toUpperCase().slice(-8)}`
    setLastOrder({
      orderId,
      count: cart.reduce((s, l) => s + l.qty, 0),
      ...totals,
    })
    setCart([])
    setCoupon(null)
    setOrderPlaced(true)
  }, [cart, totals])

  const resetOrder = useCallback(() => {
    setOrderPlaced(false)
    setCheckoutOpen(false)
    setQrOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      coupon,
      totals,
      cartCount,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      applyCoupon,
      removeCoupon,
      cartOpen,
      wishlistOpen,
      checkoutOpen,
      qrOpen,
      detailProductId,
      orderPlaced,
      lastOrder,
      paymentMethod,
      setCartOpen,
      setWishlistOpen,
      setCheckoutOpen,
      setQrOpen,
      setDetailProductId,
      setPaymentMethod,
      completeOrder,
      resetOrder,
    }),
    [
      cart,
      wishlist,
      coupon,
      totals,
      cartCount,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      applyCoupon,
      removeCoupon,
      cartOpen,
      wishlistOpen,
      checkoutOpen,
      qrOpen,
      detailProductId,
      orderPlaced,
      lastOrder,
      paymentMethod,
      completeOrder,
      resetOrder,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore debe usarse dentro de <StoreProvider>")
  return ctx
}