import { useState } from "react"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useStore } from "../core/StoreContext"
import LazyImage from "../core/media.jsx"
import Rating from "../core/Rating.jsx"
import { formatCUP } from "../core/money.js"
import { productImage } from "../data/shop.js"

// SCREAMING ARCHITECTURE: CATALOG MODULE — product card
export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, setDetailProductId } = useStore()
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const img = productImage(product, color.hex)
  const wished = wishlist.includes(product.id)
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null
  const urgent = product.stock <= 3

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Imagen + badges */}
      <div className="relative" onClick={() => setDetailProductId(product.id)} role="button" aria-label={`Ver detalle de ${product.name}`}>
        <LazyImage key={img} src={img} alt={`${product.name} - color ${color.name}`} className="w-full cursor-pointer" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge className="bg-emerald-500 text-white shadow-sm hover:bg-emerald-500">Nuevo</Badge>
          )}
          {discount != null && (
            <Badge className="bg-red-500 text-white shadow-sm hover:bg-red-500">-{discount}%</Badge>
          )}
          {urgent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-stone-900 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
              ¡Solo quedan {product.stock}!
            </span>
          )}
        </div>
        <Button
          size="icon"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label={wished ? "Quitar de deseos" : "Añadir a deseos"}
          className={cn(
            "absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur shadow-sm",
            wished && "text-red-500",
          )}
        >
          <Heart size={16} className={cn(wished && "fill-current")} />
        </Button>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
            {product.category}
          </span>
          <Rating value={product.rating} count={product.reviews} size="sm" />
        </div>

        <h3
          className="mt-1 line-clamp-1 cursor-pointer text-sm font-semibold text-stone-900 hover:underline"
          onClick={() => setDetailProductId(product.id)}
        >
          {product.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-orange-600">{formatCUP(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-stone-400 line-through">
              {formatCUP(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Tallas y colores */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "h-7 min-w-7 rounded-md px-1 text-[11px] font-semibold transition-colors",
                size === s
                  ? "bg-stone-900 text-white"
                  : "border border-stone-200 text-stone-500 hover:border-stone-400",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="mr-0.5 text-[11px] font-semibold text-stone-500">Color:</span>
          {product.colors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => setColor(c)}
              className={cn(
                "h-5 w-5 rounded-full border-2 border-white transition-transform",
                color.hex === c.hex ? "scale-110 ring-2 ring-orange-500" : "ring-1 ring-stone-200",
              )}
              style={{ backgroundColor: c.hex }}
              aria-label={`Color ${c.name}`}
            />
          ))}
          <span className="ml-auto text-[11px] text-stone-400">{color.name}</span>
        </div>

        <div className="mt-4 flex-1" />
        <Button
          onClick={() => addToCart(product, size, color.hex)}
          className="w-full bg-orange-500 text-white shadow-sm hover:bg-orange-600"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Lo quiero
        </Button>
      </div>
    </article>
  )
}