# ◆ La Elegancia

Tienda online de **moda femenina cubana** construida como demostración académica de una solución digital integral basada en los servicios de **ETECSA** (Transfermóvil y EnZona). React + Vite + Tailwind CSS + shadcn/ui.

## ✨ Características

- **Catálogo** con 12 productos reales (vestidos, blusas, pantalones, faldas, accesorios), tallas XS–XL, colores y galería fotográfica local.
- **Wish list** ("Mis deseos") sin registro, persistida en `localStorage`.
- **Carrito** con cantidades, cupones de descuento, impuestos (10%) y total.
- **Checkout en 1 paso**: nombre, teléfono y dirección.
- **Pasarelas cubanas**: Transfermóvil y EnZona con **QR dinámico** (api.qrserver.com) por el monto exacto del pedido.
- **Omnicanal**: sección "Recoge en tienda" con búsqueda por provincia y stock simulado.
- **Prueba social**: rating con estrellas, reseñas y contadores por producto.
- **Rendimiento ETECSA**: imágenes lazy-loading, assets locales, sin fuentes externas.
- **Mobile First**: 320px → desktop, sin frameworks de CSS pesados.

## 🎟️ Cupones de demostración

| Código | Descuento |
|--------|-----------|
| `BIENVENIDA20` | 20 % |
| `ELEGANCIA15` | 15 % |
| `LAELEGANCIA10` | 10 % |

## 🚀 Puesta en marcha

```bash
npm install        # una sola vez
npm run dev        # desarrollo → http://localhost:5173
```

Producción:

```bash
npm run build      # genera /dist
npm run preview    # sirve el build → http://localhost:4173
```

Verificación:

```bash
npm run test:ssr   # renderiza la app en Node y valida el contenido
```

## 🗂️ Arquitectura (Screaming Architecture)

La estructura grita "tienda de ropa" a simple vista:

```
src/
├── catalog/       # tarjetas de producto, búsqueda, filtros, detalle
├── cart/          # panel del carrito, cupones, totales
├── wishlist/      # lista de deseos (sin registro)
├── checkout/      # formulario de pago en 1 paso
├── payments/      # pasarelas Transfermóvil / EnZona + modal QR
├── inventory/     # recoge en tienda, búsqueda por provincia
├── storefront/    # header, navegación, hero, footer, confirmación
├── core/          # estado global, persistencia, moneda, rating, lazy-media
├── components/ui/ # primitivas shadcn/ui
└── data/          # productos, categorías, tiendas, cupones
```

## 🧭 Nota académica

El examen original exigía **una sola página en HTML/Vanilla JS sin dependencias**. Esa versión se conserva en [`legacy/index-vanilla.html`](legacy/index-vanilla.html). Esta versión React+shadcn/ui es la evolución profesional del mismo negocio.

> Demo educativa: **no se realizan cobros reales**. Ambiente de simulación.

## 📄 Licencia

Uso académico/educativo libre.