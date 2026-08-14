# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

BANEY_RD (marca "BANEY"; el diseño Figma usa el nombre antiguo "CANEY" — en el código y la UI siempre se escribe BANEY) — frontend de un marketplace agropecuario y de logística de República Dominicana. React Router v8 en modo framework (SSR activado), React 19, TypeScript, Tailwind CSS v4, Vite 8. Toda la UI y sus textos están en español (con tildes correctas); el código (nombres de variables, componentes, archivos) mezcla inglés en rutas/archivos y español en variables locales.

El diseño de referencia vive en Figma: https://www.figma.com/design/WPvFMZrfTAAe81yXKnWdLu/UI-UX-CANEY-RD — las vistas se implementan **una por una** a partir de imágenes exportadas de ese archivo. Hay una skill de React Router en `.agents/skills/react-router/`.

### Método de trabajo

El usuario pasa una imagen de referencia, se analiza y se implementa la vista buscando **fidelidad exacta**: colores, tipografía, dimensiones, formas e íconos. Reglas que se repiten en cada vista:

- Usar los **assets oficiales de `public/`** (logos, fotos, íconos, "manchas"/blobs) en lugar de dibujar SVGs equivalentes.
- Lo que parece negro en las referencias casi nunca lo es: los textos del dashboard son `#3F443D`, algunos títulos `#415936`, los bordes de input `#9EAA31`, y el splash/carrusel móvil usa `#2E320E`.
- Al terminar una vista, **verificarla en el navegador** antes de darla por hecha (ver "Verificación").

## Comandos

```bash
npm run dev        # servidor de desarrollo con HMR en http://localhost:5173
npm run typecheck  # react-router typegen && tsc (ejecutar tras cambiar rutas o tipos)
npm run build      # build de producción
npm run start      # sirve el build (react-router-serve)
```

No hay tests ni linter configurados. `typecheck` es la verificación principal; regenera los tipos de rutas (`.react-router/types`), así que debe correrse después de tocar `app/routes.ts`.

### Verificación

El dev server se arranca con `preview_start({ name: "baney-dev" })` (configurado en `~/.claude/launch.json`, puerto 5173) — nunca con Bash. Las capturas fallan cuando el panel del navegador está oculto, así que la comprobación fiable es `javascript_tool` leyendo el DOM (`getComputedStyle`, `getBoundingClientRect`, `naturalWidth` de las imágenes) para confirmar colores, tamaños y que los assets cargan. Avisos de consola tipo `[react-router:hmr] No module update found for route ...` son ruido del recargado en caliente, no errores.

## Arquitectura

### Rutas

`app/routes.ts` define TODAS las rutas explícitamente (no hay file-based routing). Cada archivo bajo `app/routes/` debe estar registrado ahí. Grupos:

- `/` → `routes/home.tsx` (vista por defecto: home CON sesión — hero "Fortalece tus conocimientos", carruseles, ecosistema, productos; usa `Navbar session`) y `/landing` → `routes/landing.tsx` (home SIN login: hero "Vender, mover y cumplir"; "Cerrar Sección" navega aquí)
- `/login`, `/register` → `routes/auth/` bajo `auth/layout.tsx`
- `/marketplace` → catálogo y `producto/:id`
- `/checkout/*` → carrito, método de pago, agregar tarjeta, confirmación
- `/dashboard/*` → área privada del usuario/proveedor bajo `dashboard/layout.tsx` (sidebar + panel derecho): bandeja, finanzas, productos, clientes, rutas logísticas (`routes-module/` — llamado así para no chocar con el concepto de rutas del router), favoritos, pedidos, perfil, configuración
- `/mobile` → `routes/mobile.tsx`, prototipo móvil (ver abajo)

Las vistas del diseño Figma están numeradas 00–08 y mapean a esos grupos (00 landing, 01 auth, 02 home, 03 marketplace, 04–06 checkout, 07 dashboard, 08 finanzas).

### Prototipo móvil (`app/routes/mobile.tsx`)

Una sola ruta que simula la app móvil de la Fase 1 completa. **Todas las pantallas viven en ese archivo** como una máquina de estados (`type Vista = "carga" | "onboarding" | "rol" | ...`), renderizadas dentro de un marco de teléfono; no se crean rutas nuevas para cada pantalla. Se llega desde el ítem "Mobile" del sidebar. La ruta correcta al añadir una pantalla es agregar un valor a `Vista` y su bloque `{vista === "..." && (...)}`, no un archivo en `app/routes/`.

### Componentes

- `app/components/` — globales reutilizables (navbar, footer, product-card, product-carousel, testimonial-carousel, search-bar, loading-screen)
- `app/components/ui/` — primitivas (`button` con variantes `primary`/`outline`/`soft`, `input`, `google-button`)
- `app/routes/dashboard/components/` — exclusivos del dashboard: `sidebar`, `profile-panel`, `search-header` (exporta además `CalendarioFiltro` con nombre) y `filtro-periodo` (exporta `FACTORES_PERIODO` y `formatearPeriodo`)

Los estados de una misma vista (cargando, error, tab activa, método de pago elegido) se manejan con estado dentro del componente, NO como rutas separadas. Ejemplo: `home.tsx` muestra `<LoadingScreen />` mientras `loading` es true.

### Convenciones de UI

- **Botones**: todos comparten el efecto definido en `components/ui/button.tsx` — `hover:scale-105 hover:shadow-lg` y clic con **colores invertidos** (`active:bg-transparent` + `ring`, nunca fondo blanco). Los botones escritos a mano fuera de ese componente deben replicar el mismo efecto.
- **Cards del dashboard**: patrón `sombraCard` (`rounded-[2rem] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1`). El fondo de página es blanco; lo que separa los elementos son las sombras, no bordes ni grises.
- **Tipografía**: `font-sans` (Poppins) en el sitio público, `font-inter` (Inter) en el dashboard. Ambas se cargan desde Google Fonts en `app/root.tsx`.
- **Gráficos**: se dibujan a mano en SVG, sin librería de charts — dona con `stroke-dasharray` sobre `<circle strokeLinecap="round">`, áreas con `<polygon>` + `<linearGradient>`, líneas con `<polyline>`. Cada gráfico lleva hover y su propio `FiltroPeriodo`.
- **Carruseles infinitos**: clones al final + `transform: translateX` con `transition`, y reset silencioso por `setTimeout` (no `onTransitionEnd`, que no dispara en pestañas en segundo plano; y el scroll suave programático no funciona dentro de `overflow-hidden` en Chrome).

### Datos y tipos

- `app/types/` — interfaces compartidas (ej. `Product` en `types/product.ts`, consumida por `ProductCard`)
- Aún no hay backend: las vistas usan datos de ejemplo locales y timers para simular carga. Al conectar la API, reemplazar esos datos manteniendo las interfaces.
- **Simulación determinista**: los gráficos deben reaccionar a los filtros y fechas. El patrón usado es derivar los valores de una semilla (la fecha/periodo seleccionado) con algo como `Math.sin(seed * 3.7 + i * 1.93) * 0.5`, de modo que cambiar el filtro cambie visiblemente todas las cifras pero el resultado sea estable entre renders.
- `app/lib/` y `app/hooks/` están reservadas para helpers/API y custom hooks.

### Estilos y paleta

La paleta oficial está en `app/app.css` como tokens `@theme` de Tailwind v4 (no hay `tailwind.config`): `primary` (verde), `secondary` (beige), `secondary2` (marrón), `secondary3` (naranja), `secondary4` (verde lima), `success`, `warning`, `error`, `dark`, cada una en escala 50–900, más `caney-dark` (#2e320e, fondo del splash) y `caney-sky` (#63b3ff, panel azul del login). Usar siempre estos tokens (`bg-primary-600`, `text-secondary2-300`…), nunca hex sueltos en los componentes salvo los grises de marca citados arriba.

Ojo: en el frame "Colores" del Figma varias etiquetas hex están mal; los valores marcados "confirmado en Figma" en `app.css` provienen de las variables reales del archivo. Ante dudas de color, leer variables del nodo Figma, no las etiquetas.

`app.css` también fuerza `-webkit-text-fill-color` en el autocompletado de Chrome, para que el relleno amarillo/gris no oculte el texto de los inputs del login.

### Assets

`public/` se sirve por URL directa: `public/logos/Logotipo_BANEY_SVG.svg` → `/logos/Logotipo_BANEY_SVG.svg`. El alias `~` importa desde `app/` (ej. `~/components/ui/button`).

- `public/logos/` — `Logotipo_BANEY_SVG.svg` (hoja, sin fondo), `Logo_Horizontal_baney_png.png` (sidebar), `Baney_logo_png.png`, `BANEY_TITULO.png`
- `public/images/` — fotos y recursos del login: `Fondo_login.jpg`, `Image_login.png`, `granjero.png`, `BlobsVector_01_login.png` (mancha crema) y `BlobsVector_02_login.png` (mancha marrón), más los íconos PNG del sidebar (`home.png`, `direct-inbox.png`, `folder-open.png`, `task-square.png`, `people.png`)
- `public/images/image_home/`, `image_inicio/`, `image_mobile/` (incluye `baney_white.png`, el logotipo blanco del splash, y las fotos del onboarding), `image_rutas/`
- `public/icons/` — `btn_pedido.png`, `icon_01/02/03.png`

Advertencia: algunos PNG exportados traen franjas transparentes (p. ej. `Image_login.png` tiene ~9.4% transparente abajo); si una imagen "no cuadra" con su contenedor, medir el alpha por filas antes de ajustar el layout.

## Notas de entorno

- Requiere **Node ≥ 22** (React Router 8). Con Node 20 `npm install` falla con `EBADENGINE`.
- Editar archivos desde aquí mientras VS Code tiene pestañas abiertas provoca "Failed to save: content is newer". La solución es **revertir el archivo en VS Code** (`Ctrl+Shift+P` → "Revert File") o cerrar la pestaña sin guardar — nunca "Overwrite", que descartaría los cambios en disco.
