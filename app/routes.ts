import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),                          // 02 - Home (vista por defecto)
  route("landing", "routes/landing.tsx"),            // 00 - Landing (home sin login)

  layout("routes/auth/layout.tsx", [                 // 01 - Autenticación
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),

  ...prefix("marketplace", [                         // 03 - Catálogo
    index("routes/marketplace/index.tsx"),
    route("producto/:id", "routes/marketplace/product-detail.tsx"),
  ]),

  ...prefix("checkout", [                            // 04, 05, 06 - Carrito y pagos
    route("carrito", "routes/checkout/cart.tsx"),
    route("metodo-pago", "routes/checkout/payment-method.tsx"),
    route("agregar-tarjeta", "routes/checkout/add-card.tsx"),
    route("confirmacion", "routes/checkout/confirmation.tsx"),
  ]),

  ...prefix("dashboard", [                           // 07, 08 - Perfil de Usuario
    layout("routes/dashboard/layout.tsx", [
      index("routes/dashboard/overview.tsx"),
      route("bandeja", "routes/dashboard/inbox/index.tsx"),
      route("bandeja/pedidos", "routes/dashboard/inbox/orders.tsx"),
      route("bandeja/pedidos/:id", "routes/dashboard/inbox/order-detail.tsx"),
      route("finanzas", "routes/dashboard/finances/index.tsx"),
      route("finanzas/indicadores", "routes/dashboard/finances/indicators.tsx"),
      route("productos", "routes/dashboard/products/index.tsx"),
      route("productos/:id/stock", "routes/dashboard/products/stock.tsx"),
      route("clientes", "routes/dashboard/clients/index.tsx"),
      route("clientes/:id", "routes/dashboard/clients/client-detail.tsx"),
      route("rutas", "routes/dashboard/routes-module/index.tsx"),
      route("rutas/:pedidoId", "routes/dashboard/routes-module/route-detail.tsx"),
      route("favoritos", "routes/dashboard/favorites.tsx"),
      route("mis-pedidos", "routes/dashboard/my-orders.tsx"),
      route("perfil", "routes/dashboard/profile.tsx"),
      route("configuracion", "routes/dashboard/settings.tsx"),
    ]),
  ]),
] satisfies RouteConfig;