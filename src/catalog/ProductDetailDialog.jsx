import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Truck, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "../core/StoreContext"
import LazyImage from "../core/media.jsx"
import Rating from "../core/Rating.jsx"
import { formatCUP } from "../core/money.js"
import { REVIEW_SEEDS } from "../data/shop.js"
import { toast } from "sonner"

// SCREAMING ARCHITECTURE: CATALOG MODULE — product detail dialog
export default function ProductDetailDialog({ product }) {
  const { setDetailProductId, addToCart, toggleWishlist, wishlist } = useStore()
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0])
  const [color, setColor] = useState(product.colors[0])

  if (!product) return null
  const wished = wishlist.includes(product.id)
  const urgent = product.stock <= 3

  return (
    <Dialog open onOpenChange={(open) => !open && setDetailProductId(null)}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto gap-0 p-0 sm:p-0">
        <div className="grid sm:grid-cols-2">
          {/* Imagen */}
          <div className="relative">
            <LazyImage
              src={product.image}
              alt={product.name}
              ratio="aspect-[4/5] sm:h-[520px]" 
              className="sm:rounded-l-lg"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.isNew && (
                <Badge className="bg-emerald-500 text-white shadow hover:bg-emerald-500">Nuevo</Badge>
              )}
              {urgent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-stone-900 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  ¡Solo quedan {product.stock}!
                </span>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col p-6">
            <DialogHeader>
              <span className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
                {product.category}
              </span>
              <DialogTitle className="font-serif text-2xl text-stone-900">{product.name}</DialogTitle>
              <DialogDescription className="text-xs">
                <Rating value={product.rating} count={product.reviews} size="sm" />
              </DialogDescription>
            </DialogHeader>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-orange-600">
                {formatCUP(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-stone-400 line-through">
                  {formatCUP(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-600">{product.description}</p>

            <div className={cn("mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              urgent ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600")}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              {urgent ? `Solo quedan ${product.stock} unidades` : `${product.stock} unidades en stock`}
            </div>

            <Separator className="my-5" />

            {/* Talla */}
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

            {/* Color */}
            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">
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
                    color.hex === c.hex ? "scale-110 ring-2 ring-orange-500" : "ring-1 ring-stone-200",
                  )}
                  style={{ backgroundColor: c.hex }}
                  aria-label={`Color ${c.name}`}
                />
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
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

            <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
              <Truck className="h-4 w-4 text-stone-400" />
              Envío a todo el país · Recoge en tienda sin costo
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <div className="border-t border-stone-100 p-6">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-900">
            Reseñas de clientas{" "}
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              {product.reviews}
            </span>
          </h4>
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-stone-50 p-3">
            <span className="font-serif text-3xl font-bold text-amber-500">{product.rating}</span>
            <div>
              <Rating value={product.rating} size="sm" />
              <p className="text-xs text-stone-500">Basado en {product.reviews} reseñas</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {REVIEW_SEEDS.map((r, i) => (
              <div key={i} className="rounded-xl border border-stone-100 p-3">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-[11px] font-bold text-white">
                    {r.author.charAt(0)}
                  </span>
                  <span className="text-xs font-semibold text-stone-800">{r.author}</span>
                  <span className="ml-auto text-[10px] text-stone-400">{r.date}</span>
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