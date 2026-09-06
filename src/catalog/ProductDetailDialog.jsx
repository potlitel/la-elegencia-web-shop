import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Truck, Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "../core/StoreContext"
import LazyImage from "../core/media.jsx"
import Rating from "../core/Rating.jsx"
import { formatCUP } from "../core/money.js"
import { REVIEWS_BY_PRODUCT, productImage } from "../data/shop.js"
import { toast } from "sonner"

// SCREAMING ARCHITECTURE: CATALOG MODULE — product detail dialog (inmersivo)
export default function ProductDetailDialog({ product }) {
  const { setDetailProductId, addToCart, toggleWishlist, wishlist } = useStore()
  const [size, setSize] = useState(product?.sizes[1] ?? product?.sizes[0] ?? "")
  const [color, setColor] = useState(product?.colors[0] ?? null)
  const img = color ? productImage(product, color.hex) : ""
  const wished = wishlist.includes(product?.id)

  if (!product || !color) return null

  const urgent = product.stock <= 3
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null
  const reviews = REVIEWS_BY_PRODUCT[product.id] ?? []
  const halfValue = Math.round(product.rating * 2) / 2
  const fullStars = Math.floor(halfValue)
  const hasHalf = halfValue % 1 !== 0

  return (
    <Dialog open onOpenChange={(open) => !open && setDetailProductId(null)}>
      <DialogContent className="max-h-[92vh] max-w-md overflow-y-auto rounded-2xl border-0 p-0 shadow-2xl">
        {/* Imagen inmersiva a ancho completo */}
        <div className="relative">
          <LazyImage
            key={img}
            src={img}
            alt={`${product.name} - color ${color.name}`}
            ratio="aspect-[3/4]"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-emerald-500 text-white shadow-sm">Nuevo</Badge>
            )}
            {discount != null && (
              <Badge className="bg-red-500 text-white shadow-sm">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist */}
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
              toast(wished ? "Quitado de deseos" : "Guardado en deseos")
            }}
            className={cn(
              "absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur shadow-sm",
              wished && "text-red-500",
            )}
          >
            <Heart size={16} className={cn(wished && "fill-current")} />
          </Button>

          {/* Rating overlay en la imagen */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
            {[...Array(5)].map((_, i) => {
              const filled = i < fullStars
              const half = i === fullStars && hasHalf
              return half ? (
                <StarHalf key={i} size={12} className="text-amber-400" fill="currentColor" />
              ) : (
                <Star
                  key={i}
                  size={12}
                  className={cn("text-amber-400", !filled && "opacity-40")}
                  fill={filled ? "currentColor" : "none"}
                />
              )
            })}
          </div>
        </div>

        {/* Panel de información */}
        <div className="space-y-4 px-5 pb-5 pt-2">
          {/* Nombre + precio */}
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
              {product.category}
            </span>
            <h2 className="mt-0.5 font-serif text-2xl font-bold text-stone-900">
              {product.name}
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-orange-600">
              {formatCUP(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-stone-400 line-through">
                {formatCUP(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-stone-600">{product.description}</p>

          {/* Stock */}
          <div
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              urgent ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                urgent ? "bg-red-500 animate-pulse" : "bg-emerald-500",
              )}
            />
            {urgent
              ? `Solo quedan ${product.stock} unidades`
              : `${product.stock} unidades en stock`}
          </div>

          <Separator />

          {/* Talla */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Talla: <span className="text-stone-900">{size}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-9 min-w-9 rounded-md px-1 text-xs font-semibold transition-colors",
                    size === s
                      ? "bg-stone-900 text-white"
                      : "border border-stone-200 text-stone-500 hover:border-stone-400",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Color: <span className="text-stone-900">{color.name}</span>
            </p>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 border-white transition-transform",
                    color.hex === c.hex
                      ? "scale-110 ring-2 ring-orange-500"
                      : "ring-1 ring-stone-200",
                  )}
                  style={{ backgroundColor: c.hex }}
                  aria-label={`Color ${c.name}`}
                />
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-orange-500 text-white shadow-sm hover:bg-orange-600"
              onClick={() => {
                addToCart(product, size, color.hex)
                toast.success("Añadido al carrito")
                setDetailProductId(null)
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Lo quiero
            </Button>
            <Button
              size="icon-lg"
              variant={wished ? "secondary" : "outline"}
              onClick={() => {
                toggleWishlist(product.id)
                toast[wished ? "info" : "success"](
                  wished ? "Quitado de deseos" : "Guardado en deseos",
                )
              }}
              className={cn("w-auto px-4", wished && "text-red-500")}
            >
              <Heart size={18} className={cn(wished && "fill-current")} />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Truck className="h-4 w-4 shrink-0 text-stone-400" />
            Envío a todo el país · Recoge en tienda sin costo
          </div>
        </div>

        <Separator />

        {/* Reseñas */}
        <div className="px-5 pb-6 pt-5">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-900">
            Reseñas de clientas{" "}
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              {reviews.length}
            </span>
          </h4>

          <div className="mb-5 flex items-center gap-3 rounded-xl bg-stone-50 p-3">
            <span className="font-serif text-3xl font-bold text-amber-500">
              {product.rating}
            </span>
            <div>
              <Rating value={product.rating} size="sm" />
              <p className="text-xs text-stone-500">
                Basado en {reviews.length} reseñas
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-xl border border-stone-100 p-3">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[11px] font-bold text-white">
                    {r.author.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-stone-800">
                      {r.author}
                    </span>
                  </div>
                  <span className="ml-auto shrink-0 text-[10px] text-stone-400">
                    {r.date}
                  </span>
                </div>
                <Rating value={r.rating} size="xs" />
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
