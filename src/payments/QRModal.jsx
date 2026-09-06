import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Smartphone, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PAYMENT_METHODS } from "./PaymentLogos.jsx"
import { useStore } from "../core/StoreContext"
import { formatCUP } from "../core/money.js"
import { STORE_PHONE } from "../data/shop.js"
import { useState } from "react"

// SCREAMING ARCHITECTURE: PAYMENT GATEWAYS MODULE — dynamic QR modal
// Genera un QR real por cada método con el monto exacto del carrito.
export default function QRModal() {
  const { qrOpen, setQrOpen, paymentMethod, setPaymentMethod, totals, completeOrder } = useStore()
  const [step, setStep] = useState("scan")
  const [generating, setGenerating] = useState(false)

  const method = PAYMENT_METHODS[paymentMethod]
  const qrPayload =
    paymentMethod === "transfermovil"
      ? `${STORE_PHONE}|${Math.round(totals.total)}|CUP|LaElegancia`
      : `https://laelegancia.cu/pagar?monto=${Math.round(totals.total)}&moneda=CUP`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    qrPayload,
  )}&bgcolor=FFFFFF&color=1C1917&margin=12`

  const confirmPayment = () => {
    setGenerating(true)
    // Simula la confirmacion de la pasarela (aprobacion en ~1.5s)
    setTimeout(() => {
      setGenerating(false)
      setStep("done")
    }, 1500)
  }

  const finish = () => {
    setQrOpen(false)
    completeOrder()
    setStep("scan")
  }

  return (
    <Dialog
      open={qrOpen}
      onOpenChange={(open) => {
        if (!open && step === "done") {
          finish()
        } else {
          setQrOpen(open)
        }
      }}
    >
      <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
        <div className="bg-stone-900 p-6 text-center text-white">
          <DialogHeader className="items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: method.color }}>
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="font-serif text-xl">{method.name}</DialogTitle>
            <DialogDescription className="text-stone-300">
              Escanea con tu aplicación móvil
            </DialogDescription>
          </DialogHeader>

          {/* Tabs método */}
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-white/10 p-1">
            {Object.values(PAYMENT_METHODS).map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setPaymentMethod(m.id)
                  if (step === "done") setStep("scan")
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                  paymentMethod === m.id ? "bg-white text-stone-900" : "text-white/70 hover:text-white",
                )}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 text-center">
          {step === "done" ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">¡Pago confirmado!</h3>
              <p className="mt-1 text-sm text-stone-500">
                Recibirás un SMS con el comprobante y los detalles de la entrega.
              </p>
              <Button size="lg" className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600" onClick={finish}>
                Ver mi pedido
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto w-fit rounded-2xl border-4 border-stone-100 p-3">
                <img
                  src={qrUrl}
                  alt={`Código QR ${method.name} por ${formatCUP(totals.total)}`}
                  className="h-44 w-44 rounded-lg bg-white"
                  width={176}
                  height={176}
                />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-stone-900">{formatCUP(totals.total)}</p>
              <p className="text-xs uppercase tracking-widest text-stone-400">Peso cubano · CUP</p>

              <ol className="mx-auto mt-4 max-w-[260px] space-y-1.5 text-left text-xs text-stone-600">
                <li className="flex gap-2"><span className="font-bold text-orange-600">1.</span> Abre la app {method.name} en tu móvil.</li>
                <li className="flex gap-2"><span className="font-bold text-orange-600">2.</span> Escanea el código QR de arriba.</li>
                <li className="flex gap-2"><span className="font-bold text-orange-600">3.</span> Verifica el monto y confirma el pago.</li>
                <li className="flex gap-2"><span className="font-bold text-orange-600">4.</span> Envíanos el comprobante por WhatsApp al {STORE_PHONE}.</li>
              </ol>

              <Button
                size="lg"
                className="mt-5 w-full"
                style={{ backgroundColor: method.color }}
                onClick={confirmPayment}
                disabled={generating}
              >
                {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {generating ? "Confirmando pago…" : "Ya pagué · Confirmar"}
              </Button>
              <p className="mt-3 text-[11px] text-stone-400">
                Demo: no se realizan cargos reales. Simulación para el examen.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}