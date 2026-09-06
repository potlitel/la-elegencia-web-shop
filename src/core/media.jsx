import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// SCREAMING ARCHITECTURE: LAZY LOADING MODULE (redes lentas)
// Carga la imagen real solo cuando el elemento se acerca al viewport.
export default function LazyImage({ src, alt, className, ratio = "aspect-[4/5]" }) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-stone-100", ratio, className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100" />
      )}
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          )}
        />
      )}
    </div>
  )
}