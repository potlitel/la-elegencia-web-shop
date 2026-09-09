import { execSync } from "node:child_process"

// Smoke test SSR: compila la app para servidor y renderiza en Node.
// Detecta errores de runtime (referencias rotas, hooks mal usados, imports inválidos)
// sin necesidad de un navegador.
const build = execSync(
  "npx vite build --ssr scripts/ssr-entry.jsx --outDir .ssr-test",
  { stdio: "pipe" },
).toString()
console.log(build.split("\n").slice(-4).join("\n"))

const { renderApp } = await import("../.ssr-test/ssr-entry.js")
const html = renderApp()

const required = [
  "Feria Paris-Vienan",
  "Encuentra tu prenda",
  "Vestido Floral Campo",
  "Nueva colección 2026",
  "Recoge en tienda",
  "Transfermóvil",
  "EnZona",
  "Lo quiero",
  "Puntos por compra",
  "La Habana",
]

let ok = true
for (const fragment of required) {
  if (!html.includes(fragment)) {
    console.error(`✗ Falta «${fragment}» en el render`)
    ok = false
  }
}

execSync("rm -rf .ssr-test", { stdio: "ignore" })

if (!ok) {
  console.error("SSR SMOKE TEST FAILED")
  process.exit(1)
}
console.log(`SSR SMOKE TEST PASSED — ${html.length} caracteres renderizados`)