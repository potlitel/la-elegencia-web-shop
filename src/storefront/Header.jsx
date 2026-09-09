import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "../core/StoreContext"

// SCREAMING ARCHITECTURE: STOREFRONT MODULE — header with live badges
export default function Header() {
  const { cartCount, wishlist, setCartOpen, setWishlistOpen } = useStore()

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-violet-600 font-serif text-lg font-bold text-white shadow-sm">
            ◆
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-lg font-bold tracking-tight text-stone-900">
              Feria Paris-Vienan
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">
              Moda femenina
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          <a href="#catalog" className="transition-colors hover:text-orange-600">Catálogo</a>
          <a href="#tiendas" className="transition-colors hover:text-orange-600">Recoge en tienda</a>
          <a href="#beneficios" className="transition-colors hover:text-orange-600">Beneficios</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative text-stone-600"
            onClick={() => setWishlistOpen(true)}
            aria-label="Lista de deseos"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative text-stone-600"
            onClick={() => setCartOpen(true)}
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}