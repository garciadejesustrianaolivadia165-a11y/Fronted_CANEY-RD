import { useState } from "react";
import { CATEGORIAS } from "~/lib/productos";

/** Barra de áreas del marketplace (pastilla con divisores verdes + menú) */
export function BarraCategorias({
  activa,
  onCambio,
}: {
  activa: string;
  onCambio: (c: string) => void;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-stretch overflow-hidden rounded-[2rem] border border-primary-400">
        <div className="flex flex-1 items-stretch overflow-x-auto sin-barra-scroll">
          {CATEGORIAS.map((c, i) => (
            <button
              key={c}
              type="button"
              onClick={() => onCambio(c)}
              className={`flex-1 whitespace-nowrap px-4 py-3.5 text-sm transition-colors sm:px-6 ${
                i > 0 ? "border-l border-primary-400" : ""
              } ${
                activa === c
                  ? "bg-primary-50 font-bold text-primary-600"
                  : "font-medium text-primary-500 hover:bg-primary-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Más áreas"
          aria-expanded={abierto}
          onClick={() => setAbierto((a) => !a)}
          className="flex w-14 shrink-0 items-center justify-center border-l border-primary-400 text-primary-600 transition-colors hover:bg-primary-50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="h-5 w-5"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {abierto && (
        <ul className="absolute right-0 top-full z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          {["Lácteos", "Carnes y Reces", "Apicultura", "Veterinaria"].map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  onCambio(c);
                  setAbierto(false);
                }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Título + interruptor de temporada + desplegable de filtro */
export function EncabezadoCatalogo({
  temporada,
  onTemporada,
  filtro,
  onFiltro,
}: {
  temporada: boolean;
  onTemporada: (v: boolean) => void;
  filtro: string;
  onFiltro: (v: string) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const opciones = ["Filtrar Por", "Menor precio", "Mayor precio", "Mejor valorados"];

  return (
    <>
      <h1 className="mt-8 text-2xl font-bold text-neutral-900 sm:text-[26px]">
        Catalogo de Productos BANEY
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-8">
        <button
          type="button"
          role="switch"
          aria-checked={temporada}
          aria-label="Productos de temporada"
          onClick={() => onTemporada(!temporada)}
          className={`flex h-7 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${
            temporada ? "bg-primary-600" : "bg-primary-100"
          }`}
        >
          <span
            className={`h-5 w-5 rounded-full bg-primary-700 shadow transition-transform duration-200 ${
              temporada ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm text-neutral-800">Productos&nbsp; de temporada</span>

        <div className="relative">
          <button
            type="button"
            aria-expanded={abierto}
            onClick={() => setAbierto((a) => !a)}
            className="flex w-56 items-center justify-between gap-3 rounded-full border border-primary-400 px-6 py-3 text-sm font-medium text-neutral-800 transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            {filtro}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={`h-4 w-4 transition-transform ${abierto ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {abierto && (
            <ul className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
              {opciones.map((o) => (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => {
                      onFiltro(o);
                      setAbierto(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-sm transition-colors hover:bg-primary-50 ${
                      filtro === o ? "font-bold text-primary-600" : "text-neutral-700"
                    }`}
                  >
                    {o}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
