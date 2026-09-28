import { useState } from "react";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import ProductCard from "~/components/product-card";
import Sidebar from "~/routes/dashboard/components/sidebar";
import {
  BarraCategorias,
  EncabezadoCatalogo,
} from "~/components/catalog-header";
import { CATALOGO, SUGERENCIAS } from "~/lib/productos";

export function meta() {
  return [
    { title: "Mis Productos | BANEY RD" },
    {
      name: "description",
      content: "Catálogo de productos agropecuarios de BANEY RD.",
    },
  ];
}

const POR_PAGINA = 16;
const TOTAL_PAGINAS = 12;

export default function Marketplace() {
  const [categoria, setCategoria] = useState("Todas las áreas");
  const [temporada, setTemporada] = useState(false);
  const [filtro, setFiltro] = useState("Filtrar Por");
  const [pagina, setPagina] = useState(1);

  // Filtrado y orden: la vista reacciona a los controles de arriba
  let visibles =
    categoria === "Todas las áreas"
      ? CATALOGO
      : CATALOGO.filter((p) => p.categoria === categoria);
  if (temporada) visibles = visibles.filter((p) => p.rating === 5);
  if (filtro === "Menor precio")
    visibles = [...visibles].sort((a, b) => a.price - b.price);
  if (filtro === "Mayor precio")
    visibles = [...visibles].sort((a, b) => b.price - a.price);
  if (filtro === "Mejor valorados")
    visibles = [...visibles].sort((a, b) => b.rating - a.rating);
  visibles = visibles.slice(0, POR_PAGINA);

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

          {/* Paginación */}
          <nav
            aria-label="Paginación del catálogo"
            className="mt-12 flex items-center justify-center gap-2"
          >
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPagina(n)}
                aria-current={pagina === n}
                className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-sm transition-all duration-200 hover:scale-110 ${
                  pagina === n
                    ? "bg-primary-600 font-bold text-white"
                    : "text-neutral-700 hover:text-primary-600"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-sm text-neutral-500">…</span>
            <button
              type="button"
              onClick={() => setPagina(TOTAL_PAGINAS)}
              aria-current={pagina === TOTAL_PAGINAS}
              className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-sm transition-all duration-200 hover:scale-110 ${
                pagina === TOTAL_PAGINAS
                  ? "bg-primary-600 font-bold text-white"
                  : "text-neutral-700 hover:text-primary-600"
              }`}
            >
              {TOTAL_PAGINAS}
            </button>
          </nav>

          {/* Catálogo */}
          {visibles.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibles.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-sm text-neutral-500">
              No hay productos en esta área con los filtros seleccionados.
            </p>
          )}

          {/* Sugerencias */}
          <h2 className="mt-24 text-2xl font-bold text-neutral-900">
            Mas Productos como estos
          </h2>
          <div className="mt-6 flex flex-wrap gap-4 pb-24">
            {SUGERENCIAS.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-medium text-secondary-50 transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-primary-800 active:ring-2 active:ring-primary-800"
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
