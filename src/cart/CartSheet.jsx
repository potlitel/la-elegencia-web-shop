import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ArrowRight, TicketPercent, X } from "lucide-react"
import { useStore } from "../core/StoreContext"
import { formatCUP } from "../core/money.js"
import { toast } from "sonner"
import PaymentLogos from "../payments/PaymentLogos.jsx"

function ColorSwatch({ hex }) {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full ring-1 ring-stone-200"
      style={{ backgroundColor: hex }}
    />
  )
}

function CartLine({ line }) {
  const { updateQty, removeFromCart } = useStore()
  return (
    <div className="flex gap-3 rounded-xl border border-stone-100 bg-white p-3">
      <img
        src={line.image}
        alt={line.name}
        className="h-22 w-16 shrink-0 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stone-900">{line.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500">
              Talla {line.size} · <ColorSwatch hex={line.colorHex} />
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-stone-900">
            {formatCUP(line.price * line.qty)}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-stone-200">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => updateQty(line.lineId, -1)}
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-xs font-semibold">{line.qty}</span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => updateQty(line.lineId, 1)}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <button
            onClick={() => {
              removeFromCart(line.lineId)
              toast("Producto eliminado")
            }}
            className="text-xs text-stone-400 transition-colors hover:text-red-500"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// SCREAMING ARCHITECTURE: CART MODULE — sliding panel
export default function CartSheet() {
  const {
    cartOpen,
    setCartOpen,
    setCheckoutOpen,
    cart,
    totals,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useStore()
  const [code, setCode] = useState("")

  const submitCoupon = () => {
    const res = applyCoupon(code)
    if (res.ok) {
      toast.success("Cupón aplicado")
      setCode("")
    } else {
      toast.error("Código no válido")
    }
  }

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="gap-0 p-0">
        <SheetHeader className="border-b border-stone-100 py-4 pr-14">
          <SheetTitle className="flex items-center gap-2 text-base">
            Mi carrito
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {cart.reduce((s, l) => s + l.qty, 0)}
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <span className="text-5xl">🛒</span>
            <p className="font-medium text-stone-600">Tu carrito está vacío</p>
            <p className="text-sm text-stone-400">
              Explora la colección y encuentra tu próxima prenda favorita.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-2">
                {cart.map((line) => (
                  <CartLine key={line.lineId} line={line} />
                ))}
              </div>
            </ScrollArea>

            {/* Cupones */}
            <div className="border-t border-stone-100 px-4 py-3">
              {coupon ? (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <span className="flex items-center gap-1.5">
                    <TicketPercent className="h-4 w-4" />
                    {coupon.code} ({coupon.percent}% OFF)
                  </span>
                  <button onClick={removeCoupon} aria-label="Quitar cupón">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitCoupon()}
                    placeholder="Código de descuento"
                    className="h-8 text-xs uppercase"
                    maxLength={20}
                  />
                  <Button size="sm" onClick={submitCoupon} className="shrink-0">
                    Aplicar
                  </Button>
                </div>
              )}
            </div>

            {/* Totales */}
            <div className="border-t border-stone-100 px-4 py-3">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatCUP(totals.subtotal)}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Descuento ({coupon.percent}%)</span>
                  <span className="font-medium">−{formatCUP(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-stone-600">
                <span>Impuestos (10%)</span>
                <span className="font-medium">{formatCUP(totals.tax)}</span>
              </div>
              <Separator className="my-2.5" />
              <div className="flex justify-between text-base font-bold text-stone-900">
                <span>Total</span>
                <span>{formatCUP(totals.total)}</span>
              </div>
              <Button
                size="lg"
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setCartOpen(false)
                  setCheckoutOpen(true)
                }}
              >
                Proceder al pago
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <div className="mt-3">
                <PaymentLogos compact />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}