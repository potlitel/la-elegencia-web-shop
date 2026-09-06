import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

// SCREAMING ARCHITECTURE: SOCIAL PROOF MODULE (rating stars)
export default function Rating({ value, count, size = "sm", className }) {
  const full = Math.floor(value)
  const hasHalf = value % 1 >= 0.5
  const dim = { xs: 12, sm: 14, md: 18, lg: 22 }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex" aria-label={`Calificación ${value} de 5`}>
        {[...Array(5)].map((_, i) => {
          const filled = i < full
          const half = i === full && hasHalf
          return (
            <span key={i} className="relative flex h-[18px] w-[16px] items-center justify-center">
              <Star
                size={dim[size]}
                className={cn("text-amber-400", !filled && !half && "opacity-25")}
                fill={filled ? "currentColor" : "none"}
                strokeWidth={half ? 0 : 1.5}
              />
              {half && (
                <StarHalf
                  size={dim[size]}
                  className="absolute inset-0 m-auto text-amber-400"
                  fill="currentColor"
                />
              )}
            </span>
          )
        })}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-muted-foreground">
          {value.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}