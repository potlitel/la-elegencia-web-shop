import { ArrowDown, Sparkles, Truck, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaymentLogos from "../payments/PaymentLogos.jsx"

// SCREAMING ARCHITECTURE: STOREFRONT MODULE — hero landing
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-stone-950">
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/hero.jpg"
          alt="Colección de moda femenina La Elegancia"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:min-h-[560px] lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange-300">
            <Sparkles className="h-3.5 w-3.5" />
            Nueva colección 2026
          </span>

          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Tu estilo, tu
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent italic">
              {" "}
              poder femenino
            </span>
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-stone-300">
            Vestidos, blusas, pantalones y accesorios con calidad de exportación. Enviamos a toda la
            isla o recoges en tu tienda más cercana.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#catalog" className="inline-flex">
              <Button size="lg" className="h-12 bg-orange-500 px-7 text-base shadow-lg shadow-orange-500/30 hover:bg-orange-600">
                Ver colección
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#tiendas">
              <Button size="lg" variant="outline" className="h-12 border-white/25 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white">
                Recoge en tienda
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-emerald-400" /> Calidad garantizada
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-emerald-400" /> Envío a toda Cuba
            </span>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">
              Paga seguro al instante
            </p>
            <PaymentLogos />
          </div>
        </div>
      </div>
    </section>
  )
}