# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

BANEY_RD (marca "BANEY"; el diseño Figma usa el nombre antiguo "CANEY" — en el código y la UI siempre se escribe BANEY) — frontend de un marketplace agropecuario de República Dominicana. React Router v8 en modo framework (SSR activado), React 19, TypeScript, Tailwind CSS v4, Vite. Toda la UI y sus textos están en español; el código (nombres de variables, componentes, archivos) en inglés.

El diseño de referencia vive en Figma: https://www.figma.com/design/WPvFMZrfTAAe81yXKnWdLu/UI-UX-CANEY-RD — las vistas se implementan una por una a partir de exportaciones de ese archivo. Hay una skill de React Router en `.agents/skills/react-router/`.

## Comandos

```bash
npm run dev        # servidor de desarrollo con HMR en http://localhost:5173
npm run typecheck  # react-router typegen && tsc (ejecutar tras cambiar rutas o tipos)
npm run build      # build de producción
npm run start      # sirve el build (react-router-serve)
```

No hay tests ni linter configurados. `typecheck` es la verificación principal; regenera los tipos de rutas (`.react-router/types`), así que debe correrse después de tocar `app/routes.ts`.

## Arquitectura

### Rutas

`app/routes.ts` define TODAS las rutas explícitamente (no hay file-based routing). Cada archivo bajo `app/routes/` debe estar registrado ahí. Grupos:

- `/` → `routes/home.tsx` (vista por defecto: home CON sesión — hero "Fortalece tus conocimientos", carruseles, ecosistema, productos; usa `Navbar session`) y `/landing` → `routes/landing.tsx` (home SIN login: hero "Vender, mover y cumplir"; "Cerrar Sección" navega aquí)
- `/login`, `/register` → `routes/auth/` bajo `auth/layout.tsx`
- `/marketplace` → catálogo y `producto/:id`
- `/checkout/*` → carrito, método de pago, agregar tarjeta, confirmación
- `/dashboard/*` → área privada del usuario/proveedor bajo `dashboard/layout.tsx` (sidebar + panel derecho): bandeja, finanzas, productos, clientes, rutas logísticas (`routes-module/` — llamado así para no chocar con el concepto de rutas del router), favoritos, pedidos, perfil, configuración

Las vistas del diseño Figma están numeradas 00–08 y mapean a esos grupos (00 landing, 01 auth, 02 home, 03 marketplace, 04–06 checkout, 07 dashboard, 08 finanzas).

### Componentes

- `app/components/` — globales reutilizables (navbar, footer, product-card, search-bar, loading-screen)
- `app/components/ui/` — primitivas (button con variantes `primary`/`outline`/`soft`)
- `app/routes/dashboard/components/` — componentes exclusivos del dashboard

Los estados de una misma vista (cargando, error, tab activa, método de pago elegido) se manejan con estado dentro del componente, NO como rutas separadas. Ejemplo: `home.tsx` muestra `<LoadingScreen />` mientras `loading` es true.

### Estilos y paleta

La paleta oficial CANEY está en `app/app.css` como tokens `@theme` de Tailwind v4: `primary` (verde), `secondary` (beige), `secondary2` (marrón), `secondary3` (naranja), `secondary4` (verde lima), `success`, `warning`, `error`, `dark`, cada una en escala 50–900, más `caney-dark` (#2e320e, fondo del splash). Usar siempre estos tokens (`bg-primary-600`, `text-secondary2-300`…), nunca hex sueltos en los componentes.

Ojo: en el frame "Colores" del Figma varias etiquetas hex están mal; los valores marcados "confirmado en Figma" en `app.css` provienen de las variables reales del archivo. Ante dudas de color, leer variables del nodo Figma, no las etiquetas.

### Datos y tipos

- `app/types/` — interfaces compartidas (ej. `Product` en `types/product.ts`, consumida por `ProductCard`)
- Aún no hay backend: las vistas usan datos de ejemplo locales y timers para simular carga. Al conectar la API, reemplazar esos datos manteniendo las interfaces.
- `app/lib/` y `app/hooks/` están reservadas para helpers/API y custom hooks.

### Assets

`public/` se sirve por URL directa: `public/logos/Logotipo_BANEY_SVG.svg` → `/logos/Logotipo_BANEY_SVG.svg` (logo oficial, sin fondo; existe también `Logotipo_BANEY.jpg` con fondo blanco). Logos en `public/logos/`, fotos en `public/images/`, íconos en `public/icons/`. El alias `~` importa desde `app/` (ej. `~/components/ui/button`).
