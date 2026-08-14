import { useState } from "react";
import { Link } from "react-router";
import SearchHeader, { CalendarioFiltro } from "../components/search-header";
import FiltroPeriodo from "../components/filtro-periodo";

// ==== Datos de ejemplo (se conectarán a la API real) ====

const mesesCortos = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];

// Ventas por producto: valores positivos y negativos por mes
const ventasProducto = [
  { nombre: "Zanahorias", color: "#e0b84a", valores: [8, 18, -35, -18, 25, -30] },
  { nombre: "Plátanos", color: "#6b4926", valores: [-15, 22, -8, -12, 20, -20] },
  { nombre: "Peras", color: "#3f5233", valores: [45, 48, -10, -8, 18, 40] },
];

// Ventas VS Realidad: pares de barras (real vs objetivo)
const mesesVs = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
const ventasVs = [
  [55, 75],
  [60, 70],
  [45, 82],
  [58, 65],
  [78, 92],
  [80, 95],
  [76, 93],
];

// Entregas VS Pendientes (en miles)
const mesesLargos = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
const entregasVs = [
  [14, 12],
  [17, 11],
  [6, 23],
  [16, 7],
  [11, 11],
  [17, 13],
  [21, 10],
];

const sombraCard =
  "rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.24)]";

export function meta() {
  return [{ title: "Indicadores económicos | BANEY RD" }];
}

export default function EconomicIndicators() {
  const [perProducto, setPerProducto] = useState("Semana");
  const [perStatus, setPerStatus] = useState("Mes");
  const [calAbierto, setCalAbierto] = useState(false);

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Encabezado + filtro de períodos */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="max-w-56 font-sans text-xl leading-snug text-neutral-500">
          Detalles de indicadores económicos
        </h1>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCalAbierto((o) => !o)}
            className="flex items-center gap-3 rounded-2xl bg-primary-200/70 px-5 py-3 text-left transition-all duration-200 hover:scale-[1.02] hover:bg-primary-300 hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 text-primary-800">
              <rect x="3" y="5" width="18" height="17" rx="3" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            <span>
              <span className="block font-sans text-sm font-semibold text-primary-800">
                Filtrar periodos
              </span>
              <span className="block text-xs text-primary-800/80">
                12 de julio 2025 - 12 de julio 2026
              </span>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-2 h-4 w-4 text-primary-800 transition-transform ${calAbierto ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {calAbierto && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setCalAbierto(false)} />
              <CalendarioFiltro onSeleccion={() => setCalAbierto(false)} />
            </>
          )}
        </div>
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
                {/* línea cero */}
                <div className="absolute left-0 right-0 top-1/2 border-t border-neutral-200" />
                <div className="flex h-full">
                  {mesesCortos.map((m, mi) => (
                    <div key={m} className="relative flex flex-1 items-stretch justify-center gap-1 border-l border-neutral-100 first:border-0">
                      {ventasProducto.map((s) => {
                        const v = s.valores[mi];
                        const alto = (Math.abs(v) / 60) * 85;
                        return (
                          <div key={s.nombre} className="relative w-2.5 self-center" style={{ height: 170 }}>
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
              <span key={s.nombre} className="flex items-center gap-1.5 text-xs text-neutral-600">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.nombre}
              </span>
            ))}
          </div>
        </div>

        {/* Ventas VS Realidad */}
        <div className={sombraCard}>
          <h3 className="font-sans text-lg font-semibold uppercase tracking-wide text-neutral-900">
            Ventas VS REALIDAD
          </h3>

          <div className="mt-6 flex items-end justify-between gap-2" style={{ height: 150 }}>
            {ventasVs.map(([real, meta2], i) => (
              <div key={i} className="flex flex-1 items-end justify-center gap-1">
                <div
                  className="w-3.5 cursor-pointer rounded-sm bg-[#3f5233] transition-opacity hover:opacity-75"
                  title={`${mesesVs[i]} · Real: ${real}%`}
                  style={{ height: `${(real / 100) * 150}px` }}
                />
                <div
                  className="w-3.5 cursor-pointer rounded-sm bg-secondary4-400 transition-opacity hover:opacity-75"
                  title={`${mesesVs[i]} · Objetivo: ${meta2}%`}
                  style={{ height: `${(meta2 / 100) * 150}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-caney-sky">
            {mesesVs.map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-100 text-success-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M6 7l1-3h10l1 3M4 7h16l-1.5 13h-13L4 7z" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-caney-sky">Ventas reales</p>
                <p className="text-xs text-neutral-500">Global</p>
              </div>
              <p className="font-sans text-lg font-medium text-success-600">356,005.56</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-200 text-warning-800">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-caney-sky">Objetivo de ventas</p>
                <p className="text-xs text-neutral-500">Comercial</p>
              </div>
              <p className="font-sans text-lg font-medium text-warning-500">500,000.00</p>
            </div>
          </div>
        </div>

        {/* Resumen de pedidos */}
        <div className={sombraCard}>
          <h3 className="font-sans text-lg font-semibold text-neutral-900">
            Resumen de pedidos
          </h3>

          <div className="mt-6 flex flex-wrap items-center gap-8">
            {/* Medidor 85% */}
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 42 42" className="h-full w-full -rotate-[220deg]">
                <circle cx="21" cy="21" r="17" fill="none" stroke="#e9e9e9" strokeWidth="5" strokeLinecap="round" strokeDasharray="85 107" />
                <circle cx="21" cy="21" r="17" fill="none" stroke="#9eaa31" strokeWidth="5" strokeLinecap="round" strokeDasharray="72 107" />
              </svg>
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
                <span className="font-sans text-2xl font-semibold text-neutral-900">85%</span>
              </div>
            </div>

            <div>
              <p className="font-sans text-2xl font-semibold text-neutral-900">
                $356,005.56
              </p>
              <p className="text-sm text-neutral-500">meta $500,000.00</p>
              <Link
                to="/dashboard/finanzas/economicos/resumen"
                className="mt-4 inline-block rounded-2xl bg-primary-200/70 px-8 py-3 font-sans text-sm font-semibold text-primary-800 transition-all duration-200 hover:scale-105 hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white"
              >
                Mas detalles
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { n: "15", t: "Pendientes" },
              { n: "50", t: "Entregadas" },
              { n: "5", t: "Canceladas" },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl border border-neutral-200 px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
              >
                <p className="font-sans text-lg font-semibold text-neutral-900">{c.n}</p>
                <p className="text-xs text-neutral-500">{c.t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status de pedidos */}
        <div className={sombraCard}>
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-lg font-semibold text-neutral-900">
              Status de pedidos
            </h3>
            <FiltroPeriodo valor={perStatus} onCambio={setPerStatus} />
          </div>
          <p className="mt-3 font-sans text-3xl font-medium text-primary-600">328</p>
          <p className="text-sm text-neutral-600">50 Ordenes</p>

          <div className="mt-4 flex items-center gap-8">
            <div className="relative">
              <svg viewBox="0 0 42 42" className="h-44 w-44 -rotate-90" role="img" aria-label="Status de pedidos">
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
              <span className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 text-[10px] font-medium text-white">35%</span>
              <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white">50%</span>
              <span className="pointer-events-none absolute bottom-5 left-2 text-[10px] font-medium text-white">15%</span>
            </div>
            <div className="space-y-2">
              {[
                { nombre: "Completado", color: "#9eaa31" },
                { nombre: "En proceso", color: "#e0b84a" },
                { nombre: "Incompleto", color: "#6b4926" },
              ].map((l) => (
                <span key={l.nombre} className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.nombre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Entregas VS Pendientes */}
        <div className={`${sombraCard} xl:col-span-2`}>
          <h3 className="font-sans text-lg font-semibold text-neutral-900">
            Entregas VS Pendientes
          </h3>

          <div className="mt-6 flex gap-3">
            <div className="flex flex-col justify-between pb-5 text-[10px] text-neutral-500">
              {["25k", "20k", "15k", "10k", "5k", "0"].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex items-end justify-between gap-4 border-b border-neutral-200" style={{ height: 160 }}>
                {entregasVs.map(([ent, pen], i) => (
                  <div key={i} className="flex flex-1 items-end justify-center gap-1.5">
                    <div
                      className="w-4 cursor-pointer rounded-sm bg-secondary4-400 transition-opacity hover:opacity-75"
                      title={`${mesesLargos[i]} · Entregados: ${ent}k`}
                      style={{ height: `${(ent / 25) * 160}px` }}
                    />
                    <div
                      className="w-4 cursor-pointer rounded-sm bg-[#3f5233] transition-opacity hover:opacity-75"
                      title={`${mesesLargos[i]} · Pendientes: ${pen}k`}
                      style={{ height: `${(pen / 25) * 160}px` }}
                    />
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
            <span className="flex items-center gap-1.5 text-xs text-neutral-600">
              <span className="h-2 w-2 rounded-full bg-secondary4-400" /> Entregados
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-600">
              <span className="h-2 w-2 rounded-full bg-[#3f5233]" /> Pendientes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
