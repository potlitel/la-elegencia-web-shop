// SCREAMING ARCHITECTURE: CURRENCY MODULE
const formatter = new Intl.NumberFormat("es-CU")

export function formatCUP(value) {
  return `$${formatter.format(Math.round(value))}`
}