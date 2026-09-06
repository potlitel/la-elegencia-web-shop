import { useMemo, useState } from "react"
import { Store, Clock, MapPin, SearchX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { STORES } from "../data/shop.js"
import { cn } from "@/lib/utils"

function stockBadge(stock) {
  if (stock <= 2) return { label: "Agotado", cls: "bg-red-100 text-red-600 hover:bg-red-100" }
  if (stock <= 5) return { label: `¡Quedan ${stock}!`, cls: "bg-amber-100 text-amber-600 hover:bg-amber-100" }
  return { label: `${stock} prendas`, cls: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" }
}

function StoreCard({ store }) {
  const badge = stockBadge(store.stock)
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-white">
        <Store className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-stone-900">{store.name}</p>
        </div>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
          <MapPin className="h-3 w-3" /> {store.address}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
          <Clock className="h-3 w-3" /> {store.hours}
        </p>
      </div>
      <Badge className={cn("shrink-0", badge.cls)}>{badge.label}</Badge>
    </div>
  )
}

// SCREAMING ARCHITECTURE: INVENTORY MODULE — omnichannel store pickup
export default function PickupSection() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return STORES
    const q = query.trim().toLowerCase()
    return STORES.filter(
      (s) =>
        s.province.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section id="tiendas" className="bg-stone-900 py-14 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Store className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Compra online, recoge en tienda
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Sin costo de envío. Tu pedido listo en 24 horas en el punto que elijas.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-md">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca tu provincia: La Habana, Villa Clara, Santiago…"
            className="h-12 rounded-xl border-stone-700 bg-white pl-9 shadow-lg focus:border-orange-500 focus:ring-orange-500/30"
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {results.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-2 rounded-2xl border border-dashed border-stone-700 py-10 text-center">
              <SearchX className="h-8 w-8 text-stone-500" />
              <p className="text-sm text-stone-400">
                Sin tiendas en «{query}». Probá con otra provincia.
              </p>
            </div>
          ) : (
            results.map((s) => <StoreCard key={s.id} store={s} />)
          )}
        </div>

        <p className="mt-6 text-center text-xs text-stone-500">
          Disponibilidad simulada con fines demostrativos · Stock actualizado en tienda
        </p>
      </div>
    </section>
  )
}