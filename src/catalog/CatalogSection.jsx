import { useMemo, useState } from "react"
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CATEGORIES, PRODUCTS, getProductById } from "../data/shop.js"
import ProductCard from "./ProductCard.jsx"
import ProductDetailDialog from "./ProductDetailDialog.jsx"
import { useStore } from "../core/StoreContext"

const ALL_SIZES = ["XS", "S", "M", "L", "XL"]
const SORT_OPTIONS = [
  { id: "recomendados", label: "Recomendados" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
  { id: "nuevos", label: "Más nuevos" },
]

// SCREAMING ARCHITECTURE: CATALOG MODULE — listing with search, sort & filters
export default function CatalogSection() {
  const { detailProductId } = useStore()
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("recomendados")
  const [sizeFilter, setSizeFilter] = useState([])
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const products = useMemo(() => {
    let list = category === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === category)

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
    }

    if (sizeFilter.length) {
      list = list.filter((p) => p.sizes.some((s) => sizeFilter.includes(s)))
    }

    const min = priceMin !== "" ? Number(priceMin) : null
    const max = priceMax !== "" ? Number(priceMax) : null
    if (min != null) list = list.filter((p) => p.price >= min)
    if (max != null) list = list.filter((p) => p.price <= max)

    switch (sort) {
      case "precio-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "precio-desc":
        list.sort((a, b) => b.price - a.price)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating)
        break
      case "nuevos":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.id - b.id)
        break
    }
    return list
  }, [category, query, sort, sizeFilter, priceMin, priceMax])

  const toggleSize = (s) =>
    setSizeFilter((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const resetFilters = () => {
    setSizeFilter([])
    setPriceMin("")
    setPriceMax("")
  }

  return (
    <section id="catalog" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
          La colección
        </span>
        <h2 className="mt-1 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Encuentra tu prenda
        </h2>
      </div>

      {/* Búsqueda */}
      <div className="mx-auto mb-6 flex max-w-md items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar vestido, blusa, bolso…"
            className="pl-9"
            aria-label="Buscar productos"
          />
        </div>
        <Button
          variant="outline"
          className={cn(filtersOpen && "border-orange-500 text-orange-600")}
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Panel de filtros */}
      {filtersOpen && (
        <div className="mx-auto mb-6 max-w-2xl rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-900">Filtros avanzados</span>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2 text-xs">
              <X className="mr-1 h-3.5 w-3.5" /> Limpiar
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                Talla
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={cn(
                      "h-8 w-9 rounded-md text-xs font-semibold transition-colors",
                      sizeFilter.includes(s)
                        ? "bg-stone-900 text-white"
                        : "border border-stone-200 text-stone-500 hover:border-stone-400",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                Precio (CUP)
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Mín"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
                <span className="text-stone-400">—</span>
                <Input
                  type="number"
                  placeholder="Máx"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pills de categoría */}
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === c.id
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50",
            )}
          >
            <span className="mr-1">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-stone-500">
          <span className="font-semibold text-stone-900">{products.length}</span>{" "}
          {products.length === 1 ? "producto" : "productos"}
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar productos"
            className="cursor-pointer appearance-none rounded-lg border border-stone-200 bg-white py-1.5 pr-8 pl-3 text-sm text-stone-600 focus:border-orange-500 focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <p className="text-4xl">🛍️</p>
          <p className="mt-3 font-medium text-stone-500">No encontramos resultados</p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {detailProductId && (
        <ProductDetailDialog product={getProductById(detailProductId)} />
      )}
    </section>
  )
}