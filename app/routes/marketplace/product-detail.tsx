import { useState } from "react";
import { Link } from "react-router";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import Sidebar from "~/routes/dashboard/components/sidebar";
import {
  BarraCategorias,
  EncabezadoCatalogo,
} from "~/components/catalog-header";
import { GALERIA, RELACIONADOS, LOREM_PRODUCTO } from "~/lib/productos";

export function meta() {
  return [{ title: "Guineos Criollos | BANEY RD" }];
}

const IC = "/images/image_home";

function IconoCarrito({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.6L20 8H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
  );
}

function IconoCorazon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M12 20.5l-1.3-1.2C6 15.2 3 12.4 3 9a4.5 4.5 0 0 1 8.2-2.5L12 7.6l.8-1.1A4.5 4.5 0 0 1 21 9c0 3.4-3 6.2-7.7 10.3L12 20.5z" />
    </svg>
  );
}

export default function ProductDetail() {
  const [categoria, setCategoria] = useState("Todas las áreas");
  const [temporada, setTemporada] = useState(false);
  const [filtro, setFiltro] = useState("Filtrar Por");
  const [principal, setPrincipal] = useState(0);

  // Mismo orden de colores que la referencia
  const acciones = [
    {
      t: "Comprar ahora",
      to: "/checkout/carrito",
      clases:
        "bg-error-500 text-white hover:shadow-lg active:bg-transparent active:text-error-500 active:ring-2 active:ring-error-500",
      icono: null,
    },
    {
      t: "Agregar al Carrito",
      to: "/checkout/carrito",
      clases:
        "bg-secondary4-600 text-white hover:shadow-lg active:bg-transparent active:text-secondary4-600 active:ring-2 active:ring-secondary4-600",
      icono: <IconoCarrito />,
    },
    {
      t: "Agregar a lista de deseos",
      to: "/dashboard/favoritos",
      clases:
        "bg-secondary2-200 text-neutral-900 hover:shadow-lg active:bg-transparent active:text-secondary2-600 active:ring-2 active:ring-secondary2-400",
      icono: null,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar session />

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 items-start gap-6 px-5 pt-24 sm:px-8 2xl:px-16">
        <Sidebar />

        <section className="min-w-0 flex-1">
          <BarraCategorias activa={categoria} onCambio={setCategoria} />
          <EncabezadoCatalogo
            temporada={temporada}
            onTemporada={setTemporada}
            filtro={filtro}
            onFiltro={setFiltro}
          />

          {/* Ficha del producto */}
          <div className="mx-auto mt-10 w-full max-w-[1100px]">
          <h2 className="text-2xl font-bold text-neutral-900">
            Guineos Criollos
          </h2>

          {/* En teléfono los botones van debajo de la foto para no taparla;
              desde sm vuelven a superponerse a la derecha como en el diseño */}
          <div className="relative mt-5">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-neutral-400/40">
              <img
                src={GALERIA[principal]}
                alt="Guineos Criollos"
                className="h-[240px] w-full object-cover sm:h-[360px]"
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:items-end sm:justify-center sm:p-8">
              {acciones.map((a) => (
                <Link
                  key={a.t}
                  to={a.to}
                  className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-center text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105 sm:w-[230px] sm:py-2.5 ${a.clases}`}
                >
                  {a.icono}
                  {a.t}
                </Link>
              ))}
            </div>
          </div>

          {/* Miniaturas */}
          <div className="sin-barra-scroll mt-5 flex gap-5 overflow-x-auto">
            {GALERIA.map((g, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={principal === i}
                onClick={() => setPrincipal(i)}
                className={`h-[105px] w-[150px] shrink-0 overflow-hidden rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  principal === i ? "ring-2 ring-primary-600" : ""
                }`}
              >
                <img src={g} alt="" aria-hidden className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Productos relacionados */}
          <h3 className="mt-10 text-lg font-bold text-neutral-900">
            Productos relacionados
          </h3>
          <div className="mt-5 space-y-5 pb-24">
            {RELACIONADOS.map((r) => (
              <article
                key={r.id}
                className="group overflow-hidden rounded-2xl bg-secondary-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[140px]">
                  <img
                    src={r.img}
                    alt={r.nombre}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    4.5
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-3 w-3">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  </span>
                  <div className="absolute right-3 top-3 flex items-center gap-3 text-white">
                    <button
                      type="button"
                      aria-label={`Agregar ${r.nombre} a favoritos`}
                      className="transition-transform hover:scale-125"
                    >
                      <IconoCorazon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Agregar ${r.nombre} al carrito`}
                      className="transition-transform hover:scale-125"
                    >
                      <IconoCarrito className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Botones al pasar el mouse, como en el resto del sitio */}
                  <div className="absolute inset-0 flex translate-y-2 flex-col items-center justify-center gap-3 bg-black/35 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                      to="/checkout/carrito"
                      className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-secondary-50 shadow-md transition-all duration-200 hover:scale-105 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
                    >
                      <img src={`${IC}/Icono_01.png`} alt="" aria-hidden className="h-5 w-5" />
                      Comprar Ahora
                    </Link>
                    <Link
                      to={`/marketplace/producto/${r.id}`}
                      className="flex items-center gap-2 rounded-full bg-primary-400/90 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
                    >
                      <img src={`${IC}/Icono_02.png`} alt="" aria-hidden className="h-5 w-5" />
                      Ver mas detalles
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-neutral-900">
                      {r.nombre}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-neutral-600">
                      {LOREM_PRODUCTO}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="hidden shrink-0 items-center gap-2 rounded-full border border-neutral-400 bg-white/70 px-4 py-2 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:scale-105 hover:shadow-md group-hover:flex"
                  >
                    <IconoCarrito />
                    Añadir al Carrito
                  </button>
                  <p className="shrink-0 text-base font-semibold text-neutral-900">
                    $100
                  </p>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
