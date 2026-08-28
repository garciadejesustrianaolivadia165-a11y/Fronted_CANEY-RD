import { useState } from "react";
import SearchHeader, { CalendarioFiltro } from "../components/search-header";
import FiltroPeriodo from "../components/filtro-periodo";

const IMGH = "/images/image_home";
const IMGI = "/images/image_inicio";

// ==== Simulación de datos ====
// Cada combinación de período + fecha produce los mismos números (determinístico),
// como si se consultara un backend real. TODO: reemplazar por la API.

const FACTOR_TAB: Record<string, number> = {
  Mensual: 1,
  Semanal: 0.3,
  Diario: 0.05,
  Monthly: 1,
  Weekly: 0.3,
  Daily: 0.05,
};

// Ruido determinístico en [-0.5, 0.5]
function ruido(seed: number, i: number) {
  return Math.sin(seed * 3.7 + i * 1.93) * 0.5;
}

function variar(base: number, seed: number, i: number, amplitud = 0.35) {
  return base * (1 + ruido(seed, i) * amplitud * 2);
}

function dinero(v: number) {
  return `$${Math.max(1, Math.round(v)).toLocaleString("en-US")}.00`;
}

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// ==== Datos base ====
// TODO: reemplazar las fotos por las reales de cada producto cuando se exporten del Figma

const misProductosBase = [
  { nombre: "Guayaba Fresca", categoria: "Frutas", img: `${IMGH}/image_home_17.png`, ventas: 2441, estrellas: 5, pct: 75 },
  { nombre: "Lechuga importada", categoria: "Tuberculos", img: `${IMGH}/image_home_04.png`, ventas: 3515, estrellas: 3, pct: 21 },
  { nombre: "Naranja Dulce", categoria: "Frutas", img: `${IMGH}/image_home_16.png`, ventas: 3515, estrellas: 4, pct: 85 },
  { nombre: "Zanahoria Criolla", categoria: "Tuberculos", img: `${IMGI}/image_inicio_01.png`, ventas: 3515, estrellas: 3, pct: 45 },
  { nombre: "Tomates cherry", categoria: "Frutas", img: `${IMGI}/image_inicio_02.png`, ventas: 3515, estrellas: 4, pct: 52 },
  { nombre: "Aji Morrón Variado", categoria: "Tuberculos", img: `${IMGI}/image_inicio_03.png`, ventas: 2441, estrellas: 2, pct: 35 },
];

const masVendidosBase = [
  { nombre: "Aji Morrón Variado", precio: 15.6, img: `${IMGI}/image_inicio_02.png` },
  { nombre: "Maiz Dulce", precio: 15.6, img: `${IMGI}/image_inicio_03.png` },
  { nombre: "Papa Criolla", precio: 15.6, img: `${IMGH}/image_home_14.png` },
  { nombre: "Esparrago importado", precio: 5.6, img: `${IMGH}/image_home_04.png` },
  { nombre: "Coliflor", precio: 5.6, img: `${IMGH}/image_home_17.png` },
];

const ventasProductoBase = [
  { nombre: "Lechuga importada", categoria: "Tubérculos", precio: 7999, img: `${IMGH}/image_home_04.png` },
  { nombre: "Papa criolla", categoria: "Frutas", precio: 12500, img: `${IMGH}/image_home_14.png` },
  { nombre: "Repollo importado", categoria: "Tubérculos", precio: 585, img: `${IMGH}/image_home_04.png` },
  { nombre: "Aji picante", categoria: "Tubérculos", precio: 7999, img: `${IMGI}/image_inicio_02.png` },
  { nombre: "Zanahoria Criolla", categoria: "Frutas", precio: 1050, img: `${IMGI}/image_inicio_01.png` },
  { nombre: "Zanahoria Criolla", categoria: "Frutas", precio: 1050, img: `${IMGI}/image_inicio_01.png` },
  { nombre: "Zanahoria Criolla", categoria: "Frutas", precio: 1050, img: `${IMGI}/image_inicio_01.png` },
];

const promedioBase = [
  { nombre: "Tuna soup spinach with himalaya salt", precio: "$12.56", tag: "MAIN COURSE", valor: 524, img: `${IMGH}/image_home_04.png` },
  { nombre: "Chicken curry special with cucumber", precio: "$14.99", tag: "MAIN COURSE", valor: 215, img: `${IMGI}/image_inicio_02.png` },
  { nombre: "Italiano pizza with garlic", precio: "$14.99", tag: "PIZZA", valor: 120, img: `${IMGH}/image_home_14.png` },
  { nombre: "Watermelon juice with ice", precio: "$14.99", tag: "DRINK", valor: 76, img: `${IMGH}/image_home_16.png` },
  { nombre: "Chicken curry special with cucumber", precio: "$14.99", tag: "MAIN COURSE", valor: 215, img: `${IMGH}/image_home_17.png` },
];

const curvaBase = [640, 520, 700, 420, 380, 560, 400, 340, 760, 300, 480];
const ETIQUETAS_CURVA: Record<string, string[]> = {
  Mensual: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  Semanal: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"],
  Diario: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm", "12am", "2am"],
};

function Estrellas({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${s <= n ? "fill-warning-400" : "fill-neutral-200"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function AnilloProgreso({ pct }: { pct: number }) {
  const circ = 2 * Math.PI * 15.9;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#efefef" strokeWidth="4" />
        <circle
          cx="21"
          cy="21"
          r="15.9"
          fill="none"
          stroke="#b1864e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-neutral-700">
        {pct}%
      </span>
    </div>
  );
}

function Tabs({
  opciones,
  activa,
  onCambio,
}: {
  opciones: string[];
  activa: string;
  onCambio: (t: string) => void;
}) {
  return (
    <div className="flex items-center gap-5">
      {opciones.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onCambio(t)}
          className={`border-b-2 pb-1 text-sm transition-colors ${
            activa === t
              ? "border-primary-600 font-semibold text-primary-700"
              : "border-transparent text-neutral-500 hover:text-primary-600"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function Sparkline({ sube }: { sube: boolean }) {
  return (
    <svg viewBox="0 0 48 20" className="h-5 w-12">
      <polyline
        fill="none"
        stroke={sube ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        points={sube ? "2,16 14,12 26,14 38,6 46,3" : "2,4 14,8 26,6 38,14 46,17"}
      />
    </svg>
  );
}

const sombraCard =
  "rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.24)]";

export function meta() {
  return [{ title: "Indicadores de Productos | BANEY RD" }];
}

export default function ProductIndicators() {
  const [calAbierto, setCalAbierto] = useState(false);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [tabProductos, setTabProductos] = useState("Filtar Todo");
  const [tabVentas, setTabVentas] = useState("Semanal");
  const [tabPedidos, setTabPedidos] = useState("Mensual");
  const [perPromedio, setPerPromedio] = useState("Monthly");

  // Semilla de la simulación: cambia con la fecha del calendario
  const semilla = fecha ? fecha.getDate() + (fecha.getMonth() + 1) * 31 : 0;

  const productosFiltrados = (
    tabProductos === "Filtar Todo"
      ? misProductosBase
      : misProductosBase.filter((p) => p.categoria === tabProductos)
  ).map((p, i) => ({
    ...p,
    pct: Math.min(98, Math.max(5, Math.round(variar(p.pct, semilla, i)))),
    ventas: Math.round(variar(p.ventas, semilla, i + 3)),
  }));

  const masVendidos = masVendidosBase.map((p, i) => ({
    ...p,
    orden: Math.max(2, Math.round(10 + ruido(semilla, i + 7) * 10)),
  }));

  const factorVentas = FACTOR_TAB[tabVentas];
  const ventasPorProducto = ventasProductoBase.map((p, i) => ({
    ...p,
    monto: variar(p.precio * factorVentas * 4, semilla, i + 11),
    pedidos: Math.max(1, Math.round(7 + ruido(semilla, i + 5) * 8)),
  }));

  const factorPedidos = FACTOR_TAB[tabPedidos];
  const curva = curvaBase.map((v, i) =>
    Math.max(120, Math.round(variar(v, semilla + FACTOR_TAB[tabPedidos] * 17, i))),
  );
  const etiquetasCurva = ETIQUETAS_CURVA[tabPedidos];
  const totalVentas = Math.round(257 * factorPedidos * (1 + ruido(semilla, 1) * 0.4));
  const totalPedidos = Math.round(1245 * factorPedidos * (1 + ruido(semilla, 2) * 0.4));
  // Punto máximo de la curva para el tooltip
  const iMax = curva.indexOf(Math.max(...curva));
  const gasto = (85.66 * factorPedidos * (1 + ruido(semilla, 3) * 0.5)).toFixed(2);

  const factorPromedio = FACTOR_TAB[perPromedio];
  const promedioVenta = promedioBase.map((p, i) => {
    const cambio = Math.round(ruido(semilla, i + 13) * 24);
    return {
      ...p,
      valor: Math.max(5, Math.round(p.valor * factorPromedio * (1 + ruido(semilla, i + 9) * 0.5))),
      pct: `${cambio}%`,
      sube: cambio >= 0,
    };
  });

  // Rango mostrado en el botón de filtro
  const inicio = fecha ?? new Date(2026, 5, 4);
  const fin = new Date(inicio.getFullYear(), inicio.getMonth() + 1, inicio.getDate());
  const rango = `${inicio.getDate()} de ${MESES_ES[inicio.getMonth()]} ${inicio.getFullYear()} - ${fin.getDate()} de ${MESES_ES[fin.getMonth()]} ${fin.getFullYear()}`;

  // Curva del área
  const anchoCurva = 420;
  const altoCurva = 150;
  const pasoCurva = anchoCurva / (curva.length - 1);
  const yCurva = (v: number) => altoCurva - (v / 800) * altoCurva;
  const puntosCurva = curva.map((v, i) => `${i * pasoCurva},${yCurva(v)}`).join(" ");

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Encabezado + filtro de período */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="max-w-64 font-sans text-xl leading-snug text-neutral-500">
          Resumen de stock por producto registrados
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
                Filter Periode
              </span>
              <span className="block text-xs text-primary-800/80">{rango}</span>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-2 h-4 w-4 text-primary-800 transition-transform ${calAbierto ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {calAbierto && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setCalAbierto(false)} />
              <CalendarioFiltro
                onSeleccion={(f) => {
                  setFecha(f);
                  setCalAbierto(false);
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        {/* Mis Productos */}
        <div className={`${sombraCard} xl:col-span-2`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-sans text-lg font-semibold text-neutral-900">
                Mis Productos
              </h3>
              <p className="text-xs text-neutral-400">
                Resumen del stock y ventas de tus productos
              </p>
            </div>
            <Tabs
              opciones={["Filtar Todo", "Tuberculos", "Frutas"]}
              activa={tabProductos}
              onCambio={setTabProductos}
            />
          </div>

          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {productosFiltrados.map((p, i) => (
              <div key={`${p.nombre}-${i}`} className="flex items-center gap-4">
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-semibold text-neutral-900">
                    {p.nombre}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5 text-neutral-500">
                      <path d="M5 20V10M12 20V4M19 20v-7" />
                    </svg>
                    <span className="font-semibold text-neutral-800">
                      {p.ventas.toLocaleString("en-US")}
                    </span>{" "}
                    Total Sales
                  </p>
                  <p className="mt-1 flex items-center gap-2">
                    <Estrellas n={p.estrellas} />
                    <span className="text-[10px] text-neutral-400">(454 revies)</span>
                  </p>
                </div>
                <AnilloProgreso pct={p.pct} />
              </div>
            ))}
          </div>
        </div>

        {/* Productos mas vendidos */}
        <div className={sombraCard}>
          <h3 className="font-sans text-lg font-semibold text-neutral-900">
            Productos mas vendidos
          </h3>
          <p className="text-xs text-neutral-400">Los favoritos de tus clientes</p>

          <ul className="mt-5 space-y-5">
            {masVendidos.map((p, i) => (
              <li key={`${p.nombre}-${i}`} className="flex items-center gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                <span className="w-7 font-sans text-lg font-semibold text-neutral-400">
                  #{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {p.nombre}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-800">${p.precio}</span>{" "}
                    Orden {p.orden}x
                  </p>
                </div>
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Ventas por producto */}
        <div className={`${sombraCard} xl:col-span-1`}>
          <div>
            <h3 className="font-sans text-lg font-semibold text-neutral-900">
              Ventas por producto
            </h3>
            <p className="text-xs text-neutral-400">Ingresos por producto activo</p>
          </div>
          <div className="mt-3">
            <Tabs
              opciones={["Mensual", "Semanal", "Diario"]}
              activa={tabVentas}
              onCambio={setTabVentas}
            />
          </div>

          <ul className="mt-4 space-y-4">
            {ventasPorProducto.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0"
              >
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {p.nombre}
                  </p>
                  <p className="text-xs font-medium text-primary-500">{p.categoria}</p>
                  <p className="text-[10px] text-neutral-400">
                    {p.pedidos} pedidos activos
                  </p>
                </div>
                <p className="font-sans text-sm font-semibold text-neutral-900">
                  {dinero(p.monto)}
                </p>
                <button
                  type="button"
                  aria-label={`Opciones de ${p.nombre}`}
                  className="px-1 text-lg leading-none text-neutral-400 transition-colors hover:text-primary-400"
                >
                  ⋯
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mx-auto mt-4 flex items-center gap-1 text-sm font-medium text-neutral-700 underline transition-colors hover:text-primary-600"
          >
            Ver mas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Columna derecha inferior */}
        <div className="space-y-6 xl:col-span-2">
          {/* Pedidos Activos */}
          <div className={sombraCard}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-sans text-lg font-semibold text-neutral-900">
                  Pedidos Activos
                </h3>
                <p className="text-xs text-neutral-400">
                  Comportamiento anual de tus pedidos
                </p>
              </div>
              <Tabs
                opciones={["Mensual", "Semanal", "Diario"]}
                activa={tabPedidos}
                onCambio={setTabPedidos}
              />
            </div>

            <div className="mt-5 flex gap-10">
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 text-neutral-500">
                  <path d="M5 20V10M12 20V4M19 20v-7" />
                </svg>
                <span>
                  <span className="block font-sans text-xl font-semibold text-neutral-900">
                    {totalVentas}k
                  </span>
                  <span className="block text-xs text-neutral-400">Total de ventas</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5 text-neutral-500">
                  <path d="M5 20V10M12 20V4M19 20v-7" />
                </svg>
                <span>
                  <span className="block font-sans text-xl font-semibold text-neutral-900">
                    {totalPedidos.toLocaleString("en-US")}
                  </span>
                  <span className="block text-xs text-neutral-400">Total de pedidos</span>
                </span>
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              <div className="flex flex-col justify-between pb-6 text-[10px] text-neutral-500">
                {["800k", "600k", "400k", "200k"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <div className="relative flex-1">
                <svg
                  viewBox={`0 0 ${anchoCurva} ${altoCurva}`}
                  preserveAspectRatio="none"
                  className="h-40 w-full"
                  role="img"
                  aria-label="Pedidos activos"
                >
                  <defs>
                    <linearGradient id="area-pedidos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,${altoCurva} ${puntosCurva} ${anchoCurva},${altoCurva}`}
                    fill="url(#area-pedidos)"
                    className="transition-all duration-500"
                  />
                  <polyline
                    points={puntosCurva}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {curva.map((v, i) => (
                    <circle
                      key={i}
                      cx={i * pasoCurva}
                      cy={yCurva(v)}
                      r="5"
                      fill="transparent"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      className="cursor-pointer transition-all duration-150 hover:fill-[#f97316]"
                    >
                      <title>{`${etiquetasCurva[Math.min(i, etiquetasCurva.length - 1)]}: ${v}k`}</title>
                    </circle>
                  ))}
                </svg>
                {/* Tooltip sobre el punto máximo de la curva */}
                <div
                  className="pointer-events-none absolute transition-all duration-500"
                  style={{
                    left: `${(iMax / (curva.length - 1)) * 100}%`,
                    top: `${(yCurva(curva[iMax]) / altoCurva) * 100 - 24}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-[0_8px_25px_rgba(0,0,0,0.18)]">
                    ${gasto}
                    <span className="block text-[9px] font-normal text-neutral-400">
                      Expense
                    </span>
                  </span>
                  <span className="mx-auto mt-1 block h-2.5 w-2.5 rounded-full border-2 border-white bg-neutral-800 shadow" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-neutral-500">
                  {etiquetasCurva.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Promedio de venta por producto */}
          <div className={sombraCard}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans text-lg font-semibold text-neutral-900">
                  Promedio de venta por producto
                </h3>
                <p className="text-xs text-neutral-400">
                  Los productos con mejor rendimiento
                </p>
              </div>
              <FiltroPeriodo
                valor={perPromedio}
                onCambio={setPerPromedio}
                opciones={["Monthly", "Weekly", "Daily"]}
              />
            </div>

            <ul className="mt-5 space-y-4">
              {promedioVenta.map((p, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border-b border-neutral-100 pb-4 last:border-0"
                >
                  <span className="w-7 font-sans text-lg font-semibold text-neutral-400">
                    #{i + 1}
                  </span>
                  <img
                    src={p.img}
                    alt={p.nombre}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {p.nombre}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-600">
                      <span className="font-semibold">{p.precio}</span>{" "}
                      <span className="ml-2 text-[10px] font-semibold text-caney-sky">
                        {p.tag}
                      </span>
                    </p>
                  </div>
                  <Sparkline sube={p.sube} />
                  <span className="w-16 text-right">
                    <span className="block font-sans text-lg font-semibold text-neutral-900">
                      {p.valor}
                    </span>
                    <span className="block text-[10px] text-neutral-400">
                      Ventas ({p.pct})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
