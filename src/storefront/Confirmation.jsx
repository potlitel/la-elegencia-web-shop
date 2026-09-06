import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, PackageCheck } from "lucide-react"
import { useStore } from "../core/StoreContext"
import { formatCUP } from "../core/money.js"
import { toast } from "sonner"

// SCREAMING ARCHITECTURE: ORDER MODULE — confirmation screen after payment
export default function Confirmation() {
  const { lastOrder, resetOrder } = useStore()
  const [copied, setCopied] = useState(false)
  const order = lastOrder ?? { orderId: "PED-00000000", count: 0, subtotal: 0, tax: 0, total: 0, discount: 0 }

  const copyOrder = () => {
    navigator.clipboard?.writeText(order.orderId).then(() => {
      setCopied(true)
      toast.success("N° de pedido copiado")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <PackageCheck className="h-10 w-10" />
      </div>

      <h1 className="mt-6 font-serif text-3xl font-bold text-stone-900">
        ¡Pedido confirmado!
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
        Recibirás un SMS con el comprobante de pago y los detalles de la entrega en las próximas
        horas.
      </p>

      <div className="mt-6 w-full rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-stone-400">Número de pedido</p>
            <p className="font-mono text-sm font-bold text-stone-900">{order.orderId}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copyOrder} className="text-xs">
            {copied ? <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
        <div className="mt-4 space-y-1.5 border-t border-dashed border-stone-200 pt-4 text-sm">
          <div className="flex justify-between text-stone-500">
            <span>Artículos</span>
            <span>{order.count}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Subtotal</span>
            <span>{formatCUP(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Impuestos (10%)</span>
            <span>{formatCUP(order.tax)}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold text-stone-900">
            <span>Total pagado</span>
            <span>{formatCUP(order.total)}</span>
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-6 w-full bg-stone-900 hover:bg-stone-800" onClick={resetOrder}>
        Seguir comprando
      </Button>
    </div>
  )
}