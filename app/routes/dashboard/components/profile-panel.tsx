import { useState } from "react";
import { Link } from "react-router";

const IMG = "/images/image_home";

const clientes = [
  { nombre: "Cesar Valdez", lugar: "San Cristóbal", img: `${IMG}/image_home_09.png` },
  { nombre: "Mini-Market Manolo", lugar: "Santo Domingo", img: `${IMG}/image_home_12.png` },
  { nombre: "Colmado La Fuerza", lugar: "San Pedro De Macorís", img: `${IMG}/image_home_13.png` },
  { nombre: "Garden's Restaurant", lugar: "Santo Domingo", img: `${IMG}/image_home_07.png` },
  { nombre: "D' Luisa's Comedor", lugar: "Azua", img: `${IMG}/image_home_11.png` },
];

// Barras apiladas del mini-gráfico: 4 tonos de oliva de abajo (oscuro) hacia arriba (pálido).
// Una barra por día, de domingo a sábado.
const barras = [
  [12, 6, 5, 4],
  [20, 9, 7, 6],
  [25, 11, 10, 7],
  [32, 13, 12, 9],
  [26, 12, 9, 7],
  [22, 10, 8, 6],
  [16, 8, 6, 5],
];
const dias = ["D", "L", "M", "M", "J", "V", "S"];
const tonos = [
  "bg-secondary4-600",
  "bg-secondary4-400",
  "bg-secondary4-200",
  "bg-secondary4-50",
];

const acciones = [
  {
    label: "Notificaciones",
    d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  },
  {
    label: "Mensajes",
    d: "M4 4h16v12H7l-3 3V4zM8 9h8",
  },
  {
    label: "Pedidos",
    d: "M6 2l1.5 4h9L18 2M3 6h18l-2 14H5L3 6zM9 10v4M15 10v4",
  },
];

export default function ProfilePanel() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const opcionMenu =
    "block w-full px-5 py-2.5 text-left text-sm font-medium text-[#3F443D] transition-colors hover:bg-primary-400/10 hover:text-primary-400";

  return (
    <aside className="hidden w-72 shrink-0 flex-col rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)] xl:flex">
      <div className="relative flex items-center justify-between">
        <h2 className="font-sans text-lg font-semibold text-neutral-900">
          Tu Perfil
        </h2>
        <button
          type="button"
          aria-label="Opciones del perfil"
          onClick={() => setMenuAbierto((o) => !o)}
          className="rounded-full px-2 text-lg text-neutral-500 transition-colors hover:text-primary-400"
        >
          ⋮
        </button>

        {menuAbierto && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuAbierto(false)}
            />
            <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
              <Link
                to="/dashboard/perfil"
                onClick={() => setMenuAbierto(false)}
                className={opcionMenu}
              >
                Mi perfil
              </Link>
              <button type="button" className={opcionMenu}>
                Mis permisos
              </button>
              <button type="button" className={opcionMenu}>
                Pagos
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center">
        {/* Avatar con la línea de completado del perfil: arco verde con puntas redondeadas.
            Al hacer clic lleva a Mi Perfil */}
        <Link
          to="/dashboard/perfil"
          aria-label="Ir a Mi Perfil"
          className="relative block h-36 w-36"
        >
          <svg viewBox="0 0 144 144" className="absolute inset-0 h-full w-full">
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke="#ededed"
              strokeWidth="9"
            />
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke="#9eaa31"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="290 402"
              transform="rotate(130 72 72)"
            />
          </svg>
          <img
            src={`${IMG}/Ellipse 5.png`}
            alt="José Pedro Guzman"
            className="absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-[0_6px_18px_rgba(0,0,0,0.15)]"
          />
        </Link>

        <p className="mt-5 font-sans text-xl font-semibold text-neutral-900">
          José Pedro Guzman
        </p>
        <p className="font-sans text-sm text-neutral-500">Proveedor</p>

        <div className="mt-5 flex gap-4">
          {acciones.map((a) => (
            <button
              key={a.label}
              type="button"
              aria-label={a.label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-300 text-neutral-800 transition-all duration-200 hover:scale-110 hover:border-primary-400 hover:bg-primary-400 hover:text-white hover:shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d={a.d} />
              </svg>
            </button>
          ))}
        </div>

        {/* Actividad: días activos del usuario en la página */}
        <div className="mt-8 w-full">
          <p className="text-center text-sm font-semibold text-[#415936]">
            Actividad
          </p>
          <div className="mt-3 flex items-end justify-center gap-2">
            {barras.map((b, i) => (
              <div
                key={i}
                className="flex w-6 flex-col-reverse overflow-hidden rounded-sm"
              >
                {b.map((h, j) => (
                  <div key={j} className={tonos[j]} style={{ height: h }} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {dias.map((dia, i) => (
              <span
                key={i}
                className="w-6 text-center text-xs font-medium text-[#415936]"
              >
                {dia}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-neutral-900">
          Tus Clientes
        </h3>
        <button
          type="button"
          aria-label="Agregar cliente"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-600 transition-all duration-200 hover:scale-110 hover:border-primary-400 hover:bg-primary-400 hover:text-white"
        >
          +
        </button>
      </div>

      <ul className="mt-4 flex-1 space-y-4">
        {clientes.map((c) => (
          <li
            key={c.nombre}
            className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0"
          >
            <img
              src={c.img}
              alt={c.nombre}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-900">
                {c.nombre}
              </p>
              <p className="truncate text-xs text-neutral-500">{c.lugar}</p>
            </div>
            <button
              type="button"
              className="rounded-full bg-secondary2-300 px-3.5 py-1 text-xs font-semibold text-white transition-all duration-200 hover:scale-110 hover:bg-secondary2-400 hover:shadow-md"
            >
              Ver
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 w-full rounded-full bg-primary-200 py-2.5 text-sm font-medium text-primary-800 transition-all duration-200 hover:scale-105 hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white active:ring-2 active:ring-primary-700"
      >
        Ver Todos
      </button>
    </aside>
  );
}
