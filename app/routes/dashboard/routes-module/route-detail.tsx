import { Link, useNavigate, useParams } from "react-router";
import SearchHeader from "../components/search-header";

const IMG = "/images/image_home";

export function meta() {
  return [{ title: "Detalle de pedido | BANEY RD" }];
}

export default function RouteDetail() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-[calc(100vh-3rem)] flex-col space-y-6">
      <SearchHeader />

      {/* Título + volver */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-900">
          Pedido #{pedidoId}
        </h1>
        <Link
          to="/dashboard/rutas"
          className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
        >
          Volver Atras
        </Link>
      </div>

      {/* Tarjeta del mapa con la ruta + pedido; se estira hasta el fondo de la página */}
      <section className="flex flex-1 flex-col rounded-3xl bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-[1.25rem] bg-neutral-200">
          <iframe
            title="Ruta del pedido: Haina a Av. 27 de Febrero, Santo Domingo"
            src="https://maps.google.com/maps?saddr=Haina%2C%20San%20Crist%C3%B3bal&daddr=Av.%2027%20de%20Febrero%2C%20Santo%20Domingo&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Chip de destino */}
          <div className="pointer-events-none absolute left-8 top-1/4 flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white">
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

          {/* Panel de la ruta, como la referencia */}
          <div className="absolute bottom-10 right-8 w-[340px] rounded-[1.75rem] bg-white p-6 font-sans shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
            {/* Manija superior */}
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-neutral-300" />

            <p className="text-[22px] font-bold text-primary-600">
              25 min <span className="ml-1">(15 km)</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Ruta más rápida ahora debido a las condiciones del tráfico.
            </p>

            {/* Recorrido: flecha (liner) sobre la pista */}
            <div className="relative mt-6 flex items-center">
              <div className="h-3 w-full rounded-full bg-[#dfe3d3]" />
              <div className="absolute left-0 h-3 w-16 rounded-full bg-primary-600" />
              <img
                src="/images/image_rutas/liner.png"
                alt=""
                aria-hidden
                className="absolute left-7 h-11 w-auto drop-shadow-md"
              />
            </div>

            <div className="my-6 h-px bg-neutral-200" />

            {/* Paradas */}
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <img
                  src="/images/image_rutas/from_icon.png"
                  alt=""
                  aria-hidden
                  className="h-10 w-10 shrink-0"
                />
                <div className="flex-1 rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-primary-600">
                  Haina, San Cristóbal
                </div>
              </div>
              <div className="ml-[19px] flex h-5 flex-col justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-primary-700" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/images/image_rutas/where_icon.png"
                  alt=""
                  aria-hidden
                  className="h-10 w-10 shrink-0"
                />
                <div className="flex-1 rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-primary-600">
                  Av. 27 de feb, Santo Domingo
                </div>
              </div>
            </div>
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
              onClick={() => navigate(`/dashboard/bandeja/pedidos/${pedidoId}`)}
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
    </div>
  );
}
