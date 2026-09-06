import { CATEGORIES } from "../data/shop.js"

function scrollToCatalog(e) {
  e.preventDefault()
  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
}

// SCREAMING ARCHITECTURE: STOREFRONT MODULE — category navigation
export default function NavBar() {
  return (
    <div className="border-b border-stone-200/70 bg-white/60 backdrop-blur">
      <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        <a
          href="#catalog"
          onClick={scrollToCatalog}
          className="shrink-0 rounded-full bg-stone-900 px-4 py-1.5 text-sm font-medium text-white"
        >
          ✨ Todo
        </a>
        {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
          <a
            key={c.id}
            href={`#catalog`}
            className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
            onClick={scrollToCatalog}
          >
            <span className="mr-1">{c.icon}</span>
            {c.label}
          </a>
        ))}
      </div>
    </div>
  )
}