import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingBag, X } from "lucide-react"
import { useStore } from "../core/StoreContext"
import { getProductById } from "../data/shop.js"
import LazyImage from "../core/media.jsx"
import { formatCUP } from "../core/money.js"
import Rating from "../core/Rating.jsx"
import { toast } from "sonner"

// SCREAMING ARCHITECTURE: WISHLIST MODULE — sliding panel (no registration required)
export default function WishlistSheet() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart } = useStore()

  const items = wishlist.map(getProductById).filter(Boolean)

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent side="right" className="gap-0 p-0">
        <SheetHeader className="border-b border-stone-100 py-4 pr-14">
          <SheetTitle className="flex items-center gap-2 text-base">
            <span className="text-red-500">♥</span> Mis deseos
            {items.length > 0 && (
              <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                {items.length}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <span className="text-5xl">🤍</span>
            <p className="font-medium text-stone-600">Tu lista está vacía</p>
            <p className="text-sm text-stone-400">
              Toca el corazón en un producto para guardarlo aquí.
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-2">
              {items.map((p) => (
                <div key={p.id} className="flex gap-3 rounded-xl border border-stone-100 bg-white p-3">
                  <LazyImage
                    src={p.image}
                    alt={p.name}
                    ratio="aspect-[4/5]"
                    className="h-20 w-16 shrink-0 rounded-lg"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-stone-900">{p.name}</p>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        aria-label="Quitar de deseos"
                        className="text-stone-300 transition-colors hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <Rating value={p.rating} count={p.reviews} size="xs" className="mt-0.5" />
                    <p className="mt-1 text-sm font-bold text-orange-600">{formatCUP(p.price)}</p>
                    <div className="mt-auto">
                      <Button
                        size="sm"
                        className="h-7 bg-orange-500 text-xs hover:bg-orange-600"
                        onClick={() => {
                          addToCart(p, p.sizes[1] ?? p.sizes[0], p.colors[0].hex)
                          toggleWishlist(p.id)
                          toast.success("Movido al carrito")
                        }}
                      >
                        <ShoppingBag className="mr-1 h-3 w-3" />
                        Al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}