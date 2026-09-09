# ◆ Feria Paris-Vienan

Tienda online de **moda femenina cubana**. Frontend moderno con React 19 + Vite + Tailwind CSS v4 + shadcn/ui, pagos móviles cubanos (Transfermóvil y EnZona) y arquitectura Screaming Architecture.

## ✨ Características

- **Catálogo** con 22 productos reales (vestidos, tops, gorros, sayas), tallas XS–XL, colores y galería fotográfica local.
- **Wish list** ("Mis deseos") sin registro, persistida en `localStorage`.
- **Carrito** con cantidades, cupones de descuento, impuestos (10%) y total.
- **Checkout en 1 paso**: nombre, teléfono y dirección.
- **Pasarelas cubanas**: Transfermóvil y EnZona con **QR dinámico** (api.qrserver.com) por el monto exacto del pedido.
- **Omnicanal**: sección "Recoge en tienda" con búsqueda por provincia y stock por tienda.
- **Prueba social**: rating con estrellas, reseñas y contadores por producto.
- **Rendimiento para redes lentas**: imágenes lazy-loading, assets locales, sin fuentes externas.
- **Mobile First**: 320px → desktop, sin frameworks de CSS pesados.

## 🎟️ Cupones de demostración

| Código | Descuento |
|--------|-----------|
| `BIENVENIDA20` | 20 % |
| `FERIAPARIS15` | 15 % |
| `FERIAVIENAN10` | 10 % |

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

## 🧭 Historia del proyecto

Una primera versión del negocio se desarrolló como **una sola página en HTML/Vanilla JS sin dependencias** y se conserva en [`legacy/index-vanilla.html`](legacy/index-vanilla.html). Esta versión React + shadcn/ui es la evolución profesional de la misma tienda.

> La pasarela de pago funciona con **QR dinámico** para el monto exacto del pedido; procesa la confirmación del cliente de forma inmediata.

## 📄 Licencia

MIT — ver [`LICENSE`](LICENSE).