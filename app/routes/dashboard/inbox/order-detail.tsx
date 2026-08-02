import { Link, useParams } from "react-router";
import SearchHeader from "../components/search-header";

const IMG = "/images/image_home";

// TODO: reemplazar por la imagen real del producto cuando se exporte del Figma
const IMG_ITEM = `${IMG}/image_home_04.png`;

const items = [
  { nombre: "Lechuga importada", categoria: "Tubérculos", cantidad: "2 libras", precio: "$300.00" },
  { nombre: "Lechuga importada", categoria: "Tubérculos", cantidad: "2 libras", precio: "$300.00" },
  { nombre: "Lechuga importada", categoria: "Tubérculos", cantidad: "2 libras", precio: "$300.00" },
];

const resumen = [
  { label: "ID transacción", valor: "#12345678910" },
  { label: "Lechuga Importada", valor: "$300.00" },
  { label: "Lechuga Importada", valor: "$300.00" },
  { label: "Lechuga Importada", valor: "$300.00" },
  { label: "Costo subtotal", valor: "$900.00" },
  { label: "ITBIS", valor: "$300.00" },
];

export function meta() {
  return [{ title: "Detalles de Pedido | BANEY RD" }];
}

export default function OrderDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Título + volver */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-900">
          Detalles De Pedido
        </h1>
        <Link
          to="/dashboard/rutas"
          className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
        >
          Volver Atras
        </Link>
      </div>

      <section className="rounded-3xl bg-white p-2 pb-8 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        {/* Mapa */}
        <div className="relative h-72 overflow-hidden rounded-[1.25rem] bg-neutral-200">
          <iframe
            title="Ubicación del pedido: Calle Juan Horacio #16, Santo Domingo"
            src="https://maps.google.com/maps?q=Calle%20Juan%20Horacio%20%2316%2C%20Santo%20Domingo%2C%20Republica%20Dominicana&z=15&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute right-6 top-6 rounded-2xl bg-white/75 px-4 py-2 text-right backdrop-blur-sm">
            <p className="text-2xl font-bold text-neutral-900">
              Calle Juan Horacio #16
            </p>
            <p className="text-sm text-neutral-500">
              Santo Domingo, Republica Dominicana
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-wide text-neutral-400">
                Destino
              </span>
              <span className="text-sm font-bold tracking-wide text-neutral-900">
                MELLOS'S COLMADO
              </span>
            </span>
          </div>
        </div>

        {/* Cabecera del pedido */}
        <div className="flex flex-wrap items-start gap-6 px-6 pt-6">
          <div className="min-w-56">
            <h2 className="font-sans text-lg font-semibold text-[#3F443D]">
              Pedido #{id}
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={`${IMG}/image_home_09.png`}
                alt="Cesar Valdez"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-sans text-xl font-semibold text-neutral-900">
                  Cesar Valdez
                </p>
                <p className="text-sm text-neutral-500">ID 123456</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-sm text-neutral-700">
            <p className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-neutral-500"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (809) 000-0000
            </p>
            <p className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-neutral-500"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Barrio Los Minas, San Juan de la Maguana
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <button
              type="button"
              className="rounded-full bg-primary-200 px-7 py-2.5 font-sans text-sm font-semibold text-primary-800 transition-all duration-200 hover:scale-105 hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white active:ring-2 active:ring-primary-700"
            >
              Agregar Ítems
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-error-400 bg-white px-7 py-2.5 font-sans text-sm font-semibold text-error-500 transition-all duration-200 hover:scale-105 hover:bg-error-50 hover:shadow-md active:bg-error-500 active:text-white"
            >
              Cancelar orden
            </button>
          </div>
        </div>

        {/* Ítems + resumen */}
        <div className="mt-8 flex flex-wrap gap-10 px-6">
          {/* Lista de ítems */}
          <div className="min-w-0 flex-1 space-y-5">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl bg-neutral-100 p-3 pr-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={IMG_ITEM}
                  alt={item.nombre}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-lg font-semibold text-neutral-900">
                    {item.nombre}
                  </p>
                  <p className="text-sm font-medium text-primary-500">
                    {item.categoria}
                  </p>
                  <p className="text-xs text-neutral-500">{item.cantidad}</p>
                </div>
                <p className="font-sans text-xl font-bold text-neutral-900">
                  {item.precio}
                </p>
                <button
                  type="button"
                  aria-label={`Opciones de ${item.nombre}`}
                  className="px-1 text-xl leading-none text-neutral-500 transition-colors hover:text-primary-400"
                >
                  ⋯
                </button>
              </div>
            ))}
          </div>

          {/* Resumen de la transacción */}
          <div className="w-full max-w-72 self-center">
            <dl className="space-y-4">
              {resumen.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <dt className="text-xs uppercase tracking-wide text-neutral-500">
                    {r.label}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-900">
                    {r.valor}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t-2 border-neutral-800 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
                  Total
                </span>
                <span className="font-sans text-base font-bold text-neutral-900">
                  $1200.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
