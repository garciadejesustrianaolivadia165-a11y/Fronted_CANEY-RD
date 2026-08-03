import { useState } from "react";

const MESES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DIAS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function CalendarioFiltro({
  onSeleccion,
}: {
  onSeleccion: (fecha: Date) => void;
}) {
  const hoy = new Date();
  const [offset, setOffset] = useState(0);
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const vista = new Date(hoy.getFullYear(), hoy.getMonth() + offset, 1);
  const primerDia = vista.getDay();
  const diasDelMes = new Date(
    vista.getFullYear(),
    vista.getMonth() + 1,
    0,
  ).getDate();
  const diasMesAnterior = new Date(
    vista.getFullYear(),
    vista.getMonth(),
    0,
  ).getDate();

  // 42 celdas (6 filas): cola del mes anterior + mes actual + inicio del siguiente
  const celdas: { dia: number; delMes: boolean }[] = [];
  for (let i = primerDia - 1; i >= 0; i--) {
    celdas.push({ dia: diasMesAnterior - i, delMes: false });
  }
  for (let d = 1; d <= diasDelMes; d++) celdas.push({ dia: d, delMes: true });
  let siguiente = 1;
  while (celdas.length < 42) celdas.push({ dia: siguiente++, delMes: false });

  return (
    <div className="absolute right-0 top-14 z-30 w-80 rounded-[2rem] bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => setOffset((o) => o - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors hover:bg-primary-400 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="font-sans text-lg font-semibold text-neutral-900">
          {MESES[vista.getMonth()]} {vista.getFullYear()}
        </p>
        <button
          type="button"
          aria-label="Mes siguiente"
          onClick={() => setOffset((o) => o + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors hover:bg-primary-400 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-2 text-center">
        {DIAS.map((d) => (
          <span key={d} className="text-[10px] font-medium tracking-wide text-neutral-400">
            {d}
          </span>
        ))}
        {celdas.map((c, i) => {
          const clave = `${vista.getMonth()}-${c.dia}-${c.delMes}`;
          const activo = seleccionado === clave && c.delMes;
          return (
            <button
              key={i}
              type="button"
              disabled={!c.delMes}
              onClick={() => {
                setSeleccionado(clave);
                onSeleccion(new Date(vista.getFullYear(), vista.getMonth(), c.dia));
              }}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                activo
                  ? "bg-primary-500 font-semibold text-white"
                  : c.delMes
                    ? "text-neutral-700 hover:bg-primary-400/20"
                    : "cursor-default text-neutral-300"
              }`}
            >
              {c.dia}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchHeader() {
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);

  return (
    <div className="relative flex items-center gap-4">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 items-center gap-3 rounded-full border border-neutral-200 bg-white px-6 py-3.5 shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 shrink-0 text-neutral-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="BUSCAR AQUI..."
          className="w-full bg-transparent text-sm tracking-wide text-neutral-800 outline-none placeholder:text-xs placeholder:text-neutral-400"
        />
      </form>

      <button
        type="button"
        aria-label="Filtrar por fecha"
        onClick={() => setCalendarioAbierto((o) => !o)}
        className="flex h-12 w-12 items-center justify-center text-neutral-500 transition-all duration-200 hover:scale-110 hover:text-primary-400"
      >
        <img
          src="/images/image_rutas/btn_filter.png"
          alt=""
          aria-hidden
          className="h-6 w-auto"
        />
      </button>

      {calendarioAbierto && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setCalendarioAbierto(false)}
          />
          <CalendarioFiltro
            onSeleccion={() => setCalendarioAbierto(false)}
          />
        </>
      )}
    </div>
  );
}
