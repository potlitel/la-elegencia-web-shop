import { cn } from "@/lib/utils"

// SCREAMING ARCHITECTURE: PAYMENT GATEWAYS MODULE — brand marks
// Logos estilizados de las pasarelas cubanas (sin assets externos).
export const PAYMENT_METHODS = {
  transfermovil: {
    id: "transfermovil",
    name: "Transfermóvil",
    short: "TM",
    color: "#1e3a5f",
    description: "Pago inmediato desde tu móvil Cubacel.",
  },
  enzona: {
    id: "enzona",
    name: "EnZona",
    short: "EZ",
    color: "#e31837",
    description: "Billetera digital de ETECSA.",
  },
}

export default function PaymentLogos({ compact = false }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", compact && "gap-1.5")}>
      {Object.values(PAYMENT_METHODS).map((m) => (
        <span
          key={m.id}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md font-extrabold tracking-wide text-white uppercase",
            compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[11px]",
          )}
          style={{ backgroundColor: m.color }}
          title={m.name}
        >
          {compact && <span className="text-[10px]">✓</span>}
          {m.name}
        </span>
      ))}
    </div>
  )
}