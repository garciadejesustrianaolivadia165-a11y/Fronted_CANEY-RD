import { Link, useNavigate } from "react-router";
import SearchHeader from "../components/search-header";

const IMG = "/images/image_home";

const pedidos = [
  {
    id: "00242772362",
    cliente: "Cesar Valdez",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_09.png`,
    status: "COMPLETADO",
    descripcion: "Plátanos Banilejos 12 Dz",
    precio: "$ 135,000.00",
  },
  {
    id: "00242772363",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    status: "EN PROCESO",
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
  {
    id: "00242772364",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    status: "COMPLETADO",
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
  {
    id: "00242772365",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    status: "EN PROCESO",
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
];

function StatusChip({ status }: { status: string }) {
  const completado = status === "COMPLETADO";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        completado
          ? "bg-success-100 text-success-700"
          : "bg-warning-200 text-warning-800"
      }`}
    >
      {status}
    </span>
  );
}

export function meta() {
  return [{ title: "Rutas | BANEY RD" }];
}

export default function RoutesList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Título + volver */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-900">
          Detalles De Pedido
        </h1>
        <Link
          to="/"
          className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
        >
          Volver Atras
        </Link>
      </div>

      {/* Tarjeta del mapa + pedido */}
      <section className="rounded-3xl bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        {/* Mapa interactivo con la ubicación del pedido */}
        <div className="relative h-[480px] overflow-hidden rounded-[1.25rem] bg-neutral-200">
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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-wide text-neutral-400">
                Destination
              </span>
              <span className="text-sm font-bold tracking-wide text-neutral-900">
                WAYNE MANOR
              </span>
            </span>
          </div>
        </div>

        {/* Datos del pedido */}
        <div className="flex flex-wrap items-center gap-6 px-5 py-6">
          <div className="min-w-52">
            <h2 className="text-2xl font-bold text-neutral-900">Pedido de</h2>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={`${IMG}/image_home_09.png`}
                alt="Cesar Valdez"
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-xl font-semibold text-neutral-900">
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

          {/* Botones en línea */}
          <div className="flex w-full flex-wrap items-center justify-end gap-3 lg:w-auto">
            <button
              type="button"
              onClick={() => navigate("/dashboard/bandeja/pedidos/00242772362")}
              className="rounded-full bg-primary-200/70 px-7 py-2.5 text-sm font-semibold text-primary-800 transition-all duration-200 hover:scale-105 hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white active:ring-2 active:ring-primary-700"
            >
              Ver detalles
            </button>
            <button
              type="button"
              className="rounded-full bg-success-600 px-7 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-success-500 hover:shadow-md active:bg-white active:text-success-700 active:ring-2 active:ring-success-600"
            >
              Aceptar orden
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-error-400 bg-white px-7 py-2.5 text-sm font-semibold text-error-500 transition-all duration-200 hover:scale-105 hover:bg-error-50 hover:shadow-md active:bg-error-500 active:text-white"
            >
              Rechaza orden
            </button>
          </div>
        </div>
      </section>

      {/* Tabla de pedidos */}
      <section className="overflow-x-auto rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-neutral-400">
              <th className="pb-3 pl-4 font-medium">Cliente</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Descripcion</th>
              <th className="pb-3 pr-4 text-right font-medium">Precio Pedido</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pedidos.map((p, i) => (
              <tr
                key={i}
                onClick={() => navigate(`/dashboard/rutas/${p.id}`)}
                className="group relative cursor-pointer border-t border-neutral-100 transition-transform duration-200 hover:z-10 hover:-translate-y-1"
              >
                <td className="rounded-l-2xl py-3 pl-4 transition-colors duration-200 group-hover:bg-primary-400/20">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.img}
                      alt={p.cliente}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {p.cliente}
                      </p>
                      <p className="text-xs text-neutral-500">{p.fecha}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 transition-colors duration-200 group-hover:bg-primary-400/20">
                  <StatusChip status={p.status} />
                </td>
                <td className="py-3 text-neutral-700 transition-colors duration-200 group-hover:bg-primary-400/20">
                  {p.descripcion}
                </td>
                <td className="rounded-r-2xl py-3 pr-4 text-right font-semibold text-neutral-900 transition-colors duration-200 group-hover:bg-primary-400/20">
                  {p.precio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
