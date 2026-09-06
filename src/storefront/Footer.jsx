import { Award, Gift, MapPin, MessageCircleHeart } from "lucide-react"
import PaymentLogos from "../payments/PaymentLogos.jsx"
import { STORE_PHONE } from "../data/shop.js"

const PERKS = [
  {
    icon: Gift,
    title: "Puntos por compra",
    text: "Acumula en cada pedido y canjéalos por descuentos.",
  },
  {
    icon: Award,
    title: "Club La Elegancia",
    text: "Clientas frecuentes con beneficios exclusivos.",
  },
  {
    icon: MessageCircleHeart,
    title: "Asesoría de tallas",
    text: "Te ayudamos por WhatsApp a elegir tu talla ideal.",
  },
]

// SCREAMING ARCHITECTURE: STOREFRONT MODULE — footer with payments & loyalty
export default function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-stone-400">
      {/* Lealtad y beneficios */}
      <div id="beneficios" className="scroll-mt-24 border-b border-stone-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {PERKS.map((perk) => (
            <div key={perk.title} className="text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <perk.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-white">{perk.title}</h3>
              <p className="mt-1 text-xs leading-relaxed">{perk.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Principal */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-violet-600 font-serif text-lg font-bold text-white">
              ◆
            </span>
            <div>
              <p className="font-serif text-lg font-bold text-white">La Elegancia</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Moda femenina cubana
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Tienda online de moda femenina con entrega en toda Cuba. Compra con Transfermóvil o
            EnZona y recoge en cualquiera de nuestras tiendas físicas.
          </p>
          <div className="mt-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">
              Métodos de pago
            </p>
            <PaymentLogos />
            <p className="mt-3 text-xs text-stone-500">
              Pedidos y dudas: <span className="font-semibold text-stone-300">+{STORE_PHONE}</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-white">Categorías</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#catalog" className="transition-colors hover:text-orange-400">Vestidos</a></li>
            <li><a href="#catalog" className="transition-colors hover:text-orange-400">Blusas</a></li>
            <li><a href="#catalog" className="transition-colors hover:text-orange-400">Pantalones</a></li>
            <li><a href="#catalog" className="transition-colors hover:text-orange-400">Faldas</a></li>
            <li><a href="#catalog" className="transition-colors hover:text-orange-400">Accesorios</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-white">Tiendas físicas</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
              Obispo 256, La Habana Vieja
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
              Máximo Gómez 14, Santa Clara
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
              Agostino Neto 45, Santiago
            </li>
            <li className="text-xs text-stone-500">
              <a href="#tiendas" className="underline-offset-2 hover:underline">Ver todas →</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-stone-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 La Elegancia · Todos los derechos reservados</p>
          <p>Servicios de pago · Transfermóvil &amp; EnZona</p>
        </div>
      </div>
    </footer>
  )
}