import { useState } from "react";
import { Link } from "react-router";
import SearchHeader from "../components/search-header";
import FiltroPeriodo, {
  formatearPeriodo as formatear,
} from "../components/filtro-periodo";

const tarjetas = [
  {
    label: "Total Ventas",
    valor: "$250,000",
    cambio: "20%",
    sube: true,
    chip: "bg-success-100 text-success-700",
    icono: "/icons/icon_01.png",
  },
  {
    label: "Total Producto",
    valor: "500",
    cambio: "15%",
    sube: true,
    chip: "bg-warning-200 text-warning-800",
    icono: "/icons/icon_02.png",
  },
  {
    label: "Total Clientes",
    valor: "2,512",
    cambio: "10%",
    sube: false,
    chip: "bg-error-200 text-error-700",
    icono: "/icons/icon_03.png",
  },
];

const barrasVentas = [35, 55, 75, 45, 30, 42, 60, 72, 50, 28, 46, 68, 74, 48, 32, 44, 58, 73, 46, 40];

const seriesPedidos = [
  { nombre: "Actuales", color: "#e0b84a", puntos: [35, 42, 48, 55, 66, 60] },
  { nombre: "En tiempo", color: "#9eaa31", puntos: [25, 32, 40, 46, 52, 58] },
  { nombre: "Atrasados", color: "#6b4926", puntos: [45, 50, 46, 58, 64, 55] },
];
const meses = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];

const areaVentas = [180, 260, 300, 240, 176, 210, 320, 410, 400, 300, 260, 290];
const diasSemana = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Flecha({ sube }: { sube: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      {sube ? <path d="M4 17l6-6 4 3 6-7M14 7h6v6" /> : <path d="M4 7l6 6 4-3 6 7M14 17h6v-6" />}
    </svg>
  );
}

const sombraCard =
  "rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.24)]";

export function meta() {
  return [{ title: "Finanzas | BANEY RD" }];
}

export default function Finances() {
  const [perVentas, setPerVentas] = useState("Mes");
  const [perPedidos, setPerPedidos] = useState("Mes");
  const [perArea, setPerArea] = useState("Mes");
  const [perStatus, setPerStatus] = useState("Mes");

  const anchoLinea = 340;
  const altoLinea = 130;
  const pasoLinea = anchoLinea / (meses.length - 1);
  const yLinea = (v: number) => altoLinea - (v / 100) * altoLinea;

  const anchoArea = 420;
  const altoArea = 180;
  const pasoArea = anchoArea / (areaVentas.length - 1);
  const yArea = (v: number) => altoArea - (v / 500) * altoArea;
  const puntosArea = areaVentas.map((v, i) => `${i * pasoArea},${yArea(v)}`).join(" ");

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Tarjetas de totales */}
      <div className="grid gap-6 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <div
            key={t.label}
            className="rounded-[1.5rem] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.24)]"
          >
            <div className="flex items-center gap-3">
              <img src={t.icono} alt="" aria-hidden className="h-10 w-10 shrink-0" />
              <p className="flex-1 text-sm text-neutral-700">{t.label}</p>
              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${t.chip}`}
              >
                {t.cambio} <Flecha sube={t.sube} />
              </span>
            </div>
            <p className="mt-4 font-sans text-4xl font-medium text-neutral-900">
              {t.valor}
            </p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Ventas registradas */}
          <div className={sombraCard}>
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Ventas Registradas
              </h3>
              <FiltroPeriodo valor={perVentas} onCambio={setPerVentas} />
            </div>
            <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
              {formatear(95000, perVentas)}
            </p>
            <p className="text-sm text-neutral-600">50 Ordenes</p>

            <div className="mt-6 flex gap-3">
              <div className="flex flex-col justify-between pb-5 text-[10px] text-neutral-500">
                {["60", "20", "-20", "-60"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <div className="flex-1">
                <div
                  className="flex items-end gap-1.5 border-b border-dashed border-neutral-200"
                  style={{ height: 130 }}
                >
                  {barrasVentas.map((h, i) => (
                    <div key={i} className="group relative flex-1">
                      <div
                        className="w-full rounded-t-sm bg-secondary4-400 transition-colors duration-150 group-hover:bg-secondary4-600"
                        style={{ height: `${(h * 130) / 100}px` }}
                      />
                      <div className="pointer-events-none absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-lg group-hover:block">
                        ${formatear(h * 1000, perVentas)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between px-4 text-[10px] text-neutral-500">
                  {["q1", "q2", "q3", "q4"].map((q) => (
                    <span key={q}>{q}</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
              <span className="h-2 w-2 rounded-full bg-secondary4-400" /> Ventas
              registradas
            </span>
          </div>

          {/* Total Real de Ventas */}
          <div className={sombraCard}>
            <div className="flex items-center justify-between">
              <h3 className="text-base text-neutral-500">Total Real de Ventas</h3>
              <FiltroPeriodo valor={perArea} onCambio={setPerArea} />
            </div>
            <p className="mt-2 flex items-center gap-3">
              <span className="font-sans text-3xl font-medium text-primary-600">
                ${formatear(624000, perArea)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-success-100 px-2.5 py-1 text-xs font-medium text-success-700">
                16% <Flecha sube />
              </span>
            </p>

            <div className="mt-6 flex gap-3">
              <div className="flex flex-col justify-between pb-6 text-[10px] text-neutral-500">
                {["$500", "$400", "$300", "$200", "$100", "$0"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <div className="relative flex-1">
                <svg
                  viewBox={`0 0 ${anchoArea} ${altoArea}`}
                  preserveAspectRatio="none"
                  className="h-44 w-full"
                  role="img"
                  aria-label="Total real de ventas"
                >
                  <defs>
                    <linearGradient id="fin-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5a45c" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#f5a45c" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,${altoArea} ${puntosArea} ${anchoArea},${altoArea}`}
                    fill="url(#fin-area)"
                  />
                  <polyline
                    points={puntosArea}
                    fill="none"
                    stroke="#ec8a3c"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {areaVentas.map((v, i) => (
                    <circle
                      key={i}
                      cx={i * pasoArea}
                      cy={yArea(v)}
                      r="4"
                      fill="transparent"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      className="cursor-pointer transition-all duration-150 hover:fill-[#ec8a3c]"
                    >
                      <title>{`$${v}`}</title>
                    </circle>
                  ))}
                </svg>
                <div className="pointer-events-none absolute left-[30%] top-[55%]">
                  <span className="rounded-lg bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white shadow-md">
                    $176
                  </span>
                  <span className="mx-auto mt-1 block h-2.5 w-2.5 rounded-full border-2 border-white bg-secondary2-500 shadow" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-neutral-500">
                  {diasSemana.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accesos a indicadores */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard/finanzas/economicos"
              className="flex items-center gap-2 rounded-2xl bg-primary-200 px-6 py-3 font-sans text-sm font-semibold text-primary-800 transition-all duration-200 hover:scale-105 hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white"
            >
              Indicadores económicos <span aria-hidden>$</span>
            </Link>
            <Link
              to="/dashboard/finanzas/indicadores"
              className="flex items-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 font-sans text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-md active:bg-transparent active:text-primary-800 active:ring-2 active:ring-primary-800"
            >
              Indicadores Producto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M5 20V10M12 20V4M19 20v-7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Pedidos */}
          <div className={sombraCard}>
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Pedidos
              </h3>
              <FiltroPeriodo valor={perPedidos} onCambio={setPerPedidos} />
            </div>
            <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
              {formatear(196000, perPedidos)}
            </p>
            <p className="text-sm text-neutral-600">50 Ordenes</p>

            <svg
              viewBox={`0 0 ${anchoLinea} ${altoLinea + 22}`}
              className="mt-6 w-full"
              role="img"
              aria-label="Pedidos por mes"
            >
              {[0, 33, 66, 100].map((v) => (
                <line
                  key={v}
                  x1="0"
                  x2={anchoLinea}
                  y1={yLinea(v)}
                  y2={yLinea(v)}
                  stroke="#e5e7e5"
                  strokeDasharray="3 4"
                />
              ))}
              {seriesPedidos.map((s) => (
                <g key={s.nombre}>
                  <polyline
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1.8"
                    points={s.puntos
                      .map((v, j) => `${j * pasoLinea},${yLinea(v)}`)
                      .join(" ")}
                  />
                  {s.puntos.map((v, j) => (
                    <circle
                      key={j}
                      cx={j * pasoLinea}
                      cy={yLinea(v)}
                      r="3"
                      fill={s.color}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      className="cursor-pointer transition-transform duration-150 hover:scale-150"
                    >
                      <title>{`${s.nombre} · ${meses[j]}: ${formatear(v * 1000, perPedidos)}`}</title>
                    </circle>
                  ))}
                </g>
              ))}
              {meses.map((m, j) => (
                <text
                  key={m}
                  x={j * pasoLinea}
                  y={altoLinea + 16}
                  textAnchor="middle"
                  className="fill-neutral-500 text-[9px]"
                >
                  {m}
                </text>
              ))}
            </svg>
            <div className="mt-3 flex gap-5">
              {seriesPedidos.map((s) => (
                <span
                  key={s.nombre}
                  className="flex items-center gap-1.5 text-xs text-neutral-600"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.nombre}
                </span>
              ))}
            </div>
          </div>

          {/* Status de pedido */}
          <div className={sombraCard}>
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Status De Pedido
              </h3>
              <FiltroPeriodo valor={perStatus} onCambio={setPerStatus} />
            </div>
            <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
              {formatear(328, perStatus)}
            </p>
            <p className="text-sm text-neutral-600">50 Ordenes</p>

            <div className="mt-4 flex items-center gap-8">
              <div className="relative">
                <svg
                  viewBox="0 0 42 42"
                  className="h-48 w-48 -rotate-90"
                  role="img"
                  aria-label="Distribución del status de pedidos"
                >
                  {[
                    { color: "#9eaa31", dash: "50 50", offset: "0", titulo: "Completado: 50%" },
                    { color: "#e0b84a", dash: "35 65", offset: "-50", titulo: "En proceso: 35%" },
                    { color: "#6b4926", dash: "15 85", offset: "-85", titulo: "Incompleto: 15%" },
                  ].map((seg) => (
                    <circle
                      key={seg.color}
                      cx="21"
                      cy="21"
                      r="15.9"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="7"
                      strokeDasharray={seg.dash}
                      strokeDashoffset={seg.offset}
                      className="cursor-pointer transition-all duration-150 hover:opacity-80 hover:[stroke-width:9]"
                    >
                      <title>{seg.titulo}</title>
                    </circle>
                  ))}
                </svg>
                <span className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 text-[10px] font-medium text-white">
                  35%
                </span>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white">
                  50%
                </span>
                <span className="pointer-events-none absolute bottom-6 left-2 text-[10px] font-medium text-white">
                  15%
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { nombre: "Completado", color: "#9eaa31" },
                  { nombre: "En proceso", color: "#e0b84a" },
                  { nombre: "Incompleto", color: "#6b4926" },
                ].map((l) => (
                  <span
                    key={l.nombre}
                    className="flex items-center gap-1.5 text-xs text-neutral-600"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: l.color }}
                    />
                    {l.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
