import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useStore } from "../core/StoreContext"
import { formatCUP } from "../core/money.js"
import { PAYMENT_METHODS } from "../payments/PaymentLogos.jsx"
import { toast } from "sonner"

// SCREAMING ARCHITECTURE: CHECKOUT MODULE — one-step checkout
export default function CheckoutDialog() {
  const { checkoutOpen, setCheckoutOpen, setQrOpen, totals, paymentMethod, setPaymentMethod, coupon } =
    useStore()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Completa todos los campos")
      return
    }
    if (!/^5\d{7}$/.test(phone.replace(/\s/g, ""))) {
      toast.error("Teléfono inválido. Formato: 5XXXXXXX")
      return
    }
    // Pasa al modal QR de la pasarela seleccionada
    setCheckoutOpen(false)
    setQrOpen(true)
  }

  const inputClass =
    "h-11 rounded-lg border-stone-200 bg-stone-50 text-sm focus:border-orange-500 focus:ring-orange-500/20"

  return (
    <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
      <DialogContent className="max-w-lg overflow-y-auto max-h-[92vh]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Checkout rápido</DialogTitle>
          <DialogDescription>
            Solo 3 datos y elige cómo pagar. Sin registro.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Nombre completo
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: María López"
              className={inputClass}
              autoComplete="name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Teléfono (Transfermóvil)
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="5XXXXXXX"
              inputMode="numeric"
              maxLength={8}
              className={inputClass}
              autoComplete="tel"
            />
            <p className="text-[11px] text-stone-400">
              Te llegará el SMS de confirmación del pago.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Dirección de entrega
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, número, reparto, provincia"
              className={inputClass}
              autoComplete="street-address"
            />
          </div>

          {/* Método de pago */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Método de pago
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(PAYMENT_METHODS).map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-all",
                    paymentMethod === m.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-stone-200 hover:border-stone-300",
                  )}
                >
                  <div
                    className="mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-[9px] font-extrabold text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.short}
                  </div>
                  <p className="text-sm font-bold text-stone-900">{m.name}</p>
                  <p className="text-[11px] leading-tight text-stone-500">{m.description}</p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Resumen */}
          <div className="space-y-1.5 rounded-xl bg-stone-50 p-4 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{formatCUP(totals.subtotal)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-emerald-600">
                <span>Descuento ({coupon.percent}%)</span>
                <span>−{formatCUP(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Impuestos (10%)</span>
              <span>{formatCUP(totals.tax)}</span>
            </div>
            <Separator className="my-1.5" />
            <div className="flex justify-between text-base font-bold text-stone-900">
              <span>Total</span>
              <span>{formatCUP(totals.total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-500 text-base hover:bg-emerald-600"
          >
            Pagar {formatCUP(totals.total)} ahora
          </Button>
          <p className="text-center text-[11px] text-stone-400">
            Compra protegida · Envío a todo el país
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}