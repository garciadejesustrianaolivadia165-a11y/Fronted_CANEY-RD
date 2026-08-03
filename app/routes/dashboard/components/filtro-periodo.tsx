import { useState } from "react";

export default function FiltroPeriodo({
  valor,
  onCambio,
  opciones = ["Semana", "Mes", "Año"],
}: {
  valor: string;
  onCambio: (v: string) => void;
  opciones?: string[];
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((o) => !o)}
        className="flex items-center gap-1 text-xs font-medium text-neutral-600 transition-colors hover:text-primary-400"
      >
        {valor}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-3 w-3 transition-transform ${abierto ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {abierto && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setAbierto(false)}
          />
          <div className="absolute right-0 top-6 z-20 w-28 rounded-xl bg-white py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
            {opciones.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  onCambio(p);
                  setAbierto(false);
                }}
                className={`block w-full px-4 py-1.5 text-left text-xs transition-colors hover:bg-primary-400/10 hover:text-primary-600 ${
                  valor === p
                    ? "font-semibold text-primary-600"
                    : "text-neutral-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Factores compartidos para escalar los números según el período elegido
export const FACTORES_PERIODO: Record<string, number> = {
  Semana: 0.25,
  Mes: 1,
  Año: 12,
};

export function formatearPeriodo(base: number, periodo: string) {
  return Math.round(base * (FACTORES_PERIODO[periodo] ?? 1)).toLocaleString(
    "en-US",
  );
}
