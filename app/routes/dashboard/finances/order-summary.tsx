import { useState } from "react";
import { Link } from "react-router";
import SearchHeader from "../components/search-header";
import FiltroPeriodo from "../components/filtro-periodo";

// ==== Datos de ejemplo (se conectarán a la API real) ====

const tarjetas = [
  {
    label: "Pedidos Pendientes",
    valor: "15",
    chip: "bg-warning-200 text-warning-800",
    icono: "M3 7h18v13H3zM3 7l2-4h14l2 4M16 13h3",
  },
  {
    label: "Pedidos Entregados",
    valor: "50",
    chip: "bg-success-100 text-success-700",
    icono: "M6 7l1-3h10l1 3M4 7h16l-1.5 13h-13L4 7z",
  },
  {
    label: "Pedidos Cancelados",
    valor: "5",
    chip: "bg-error-200 text-error-700",
    icono: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
];

const mesesCortos = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];
const ventasProducto = [
  { nombre: "Zanahorias", color: "#e0b84a", valores: [8, 18, -35, -18, 25, -30] },
  { nombre: "Plátanos", color: "#6b4926", valores: [-15, 22, -8, -12, 20, -20] },
  { nombre: "Peras", color: "#3f5233", valores: [45, 48, -10, -8, 18, 40] },
];

const leyendaOrdenes = [
  { nombre: "Pendientes", color: "#e0b84a" },
  { nombre: "Entregados", color: "#9eaa31" },
  { nombre: "Cancelados", color: "#6b4926" },
];

// Resumen mensual: [entregados, pendientes, cancelados] en miles
const mesesLargos = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
const resumenMensual = [
  [20, 14, 6],
  [17, 11, 16],
  [6, 23, 15],
  [18, 13, 6],
  [12, 14, 11],
  [16, 9, 13],
  [11, 21, 14],
];
const seriesMensual = [
  { nombre: "Entregados", color: "#ec8a3c" },
  { nombre: "Pendientes", color: "#747d24" },
  { nombre: "Cancelados", color: "#dc2626" },
];

const sombraCard =
  "rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.24)]";

export function meta() {
  return [{ title: "Resumen General De Pedidos | BANEY RD" }];
}

export default function OrderSummary() {
  const [perProducto, setPerProducto] = useState("Semana");
  const [perOrdenes, setPerOrdenes] = useState("Mes");

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Título + volver */}
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-lg font-semibold text-neutral-900">
          Resumen General De Pedidos
        </h1>
        <Link
          to="/dashboard/finanzas/economicos"
          className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
        >
          Volver Atrás
        </Link>
      </div>

      {/* Tarjetas de totales */}
      <div className="grid gap-6 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <div
            key={t.label}
            className="rounded-[1.5rem] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.24)]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.chip}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d={t.icono} />
                </svg>
              </span>
              <p className="flex-1 text-sm text-neutral-700">{t.label}</p>
            </div>
            <p className="mt-4 font-sans text-4xl font-medium text-neutral-900">
              {t.valor}
            </p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        {/* Ventas por producto */}
        <div className={sombraCard}>
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-lg font-semibold text-neutral-900">
              Ventas por producto
            </h3>
            <FiltroPeriodo valor={perProducto} onCambio={setPerProducto} />
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex flex-col justify-between pb-5 text-[10px] text-neutral-500">
              {["60", "20", "-20", "-60"].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div className="flex-1">
              <div className="relative" style={{ height: 170 }}>
                <div className="absolute left-0 right-0 top-1/2 border-t border-neutral-200" />
                <div className="flex h-full">
                  {mesesCortos.map((m, mi) => (
                    <div
                      key={m}
                      className="relative flex flex-1 items-stretch justify-center gap-1 border-l border-neutral-100 first:border-0"
                    >
                      {ventasProducto.map((s) => {
                        const v = s.valores[mi];
                        const alto = (Math.abs(v) / 60) * 85;
                        return (
                          <div
                            key={s.nombre}
                            className="relative w-2.5 self-center"
                            style={{ height: 170 }}
                          >
                            <div
                              className="absolute w-full cursor-pointer rounded-sm transition-opacity hover:opacity-75"
                              title={`${s.nombre} · ${m}: ${v}`}
                              style={{
                                backgroundColor: s.color,
                                height: `${alto}px`,
                                ...(v >= 0 ? { bottom: "50%" } : { top: "50%" }),
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-neutral-500">
                {mesesCortos.map((m) => (
                  <span key={m} className="flex-1 text-center">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-5">
            {ventasProducto.map((s) => (
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

        {/* Status de Ordenes */}
        <div className={sombraCard}>
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-lg font-semibold text-neutral-900">
              Status de Ordenes
            </h3>
            <FiltroPeriodo valor={perOrdenes} onCambio={setPerOrdenes} />
          </div>
          <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
            102
          </p>
          <p className="text-sm text-neutral-600">70 ordenes activas</p>

          <div className="mt-4 flex items-center gap-8">
            <div className="relative">
              <svg
                viewBox="0 0 42 42"
                className="h-44 w-44 -rotate-90"
                role="img"
                aria-label="Status de las órdenes"
              >
                {[
                  { color: "#9eaa31", dash: "50 50", offset: "0", titulo: "Entregados: 50%" },
                  { color: "#e0b84a", dash: "35 65", offset: "-50", titulo: "Pendientes: 35%" },
                  { color: "#6b4926", dash: "15 85", offset: "-85", titulo: "Cancelados: 15%" },
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
              <span className="pointer-events-none absolute bottom-5 left-2 text-[10px] font-medium text-white">
                15%
              </span>
            </div>
            <div className="space-y-2">
              {leyendaOrdenes.map((l) => (
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

        {/* Resumen mensual de pedidos */}
        <div className={`${sombraCard} xl:col-span-2`}>
          <h3 className="font-sans text-lg font-semibold text-neutral-900">
            Resumen mensual de pedidos
          </h3>

          <div className="mt-6 flex gap-3">
            <div className="flex flex-col justify-between pb-5 text-[10px] text-neutral-500">
              {["25k", "20k", "15k", "10k", "5k", "0"].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div className="flex-1">
              <div
                className="flex items-end justify-between gap-4 border-b border-neutral-200"
                style={{ height: 160 }}
              >
                {resumenMensual.map((valores, i) => (
                  <div
                    key={i}
                    className="flex flex-1 items-end justify-center gap-1.5"
                  >
                    {valores.map((v, j) => (
                      <div
                        key={j}
                        className="w-3.5 cursor-pointer rounded-sm transition-opacity hover:opacity-75"
                        title={`${mesesLargos[i]} · ${seriesMensual[j].nombre}: ${v}k`}
                        style={{
                          backgroundColor: seriesMensual[j].color,
                          height: `${(v / 25) * 160}px`,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-neutral-500">
                {mesesLargos.map((m) => (
                  <span key={m} className="flex-1 text-center">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-6">
            {seriesMensual.map((s) => (
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
      </div>
    </div>
  );
}
