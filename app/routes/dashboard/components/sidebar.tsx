import { Link, NavLink } from "react-router";

const IMG = "/images/image_home";

const iconos = {
  inicio: "M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5",
  bandeja: "M3 12h5l2 3h4l2-3h5M4 5h16l1 7v7H3v-7l1-7z",
  finanzas: "M5 3h14v18H5zM9 7h6M9 11h6M9 15h4",
  productos: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  clientes: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  config: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  salir: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  rutas: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 17h7a4 4 0 0 0 0-8h-5",
};

function Icono({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

// Íconos oficiales del diseño (public/images)
const panelGeneral = [
  { label: "Inicio", to: "/dashboard", icon: "/images/home.png", end: true },
  { label: "Bandeja de entrada", to: "/dashboard/bandeja", icon: "/images/direct-inbox.png" },
  { label: "Finanzas", to: "/dashboard/finanzas", icon: "/images/folder-open.png" },
  { label: "Mis productos", to: "/dashboard/productos", icon: "/images/task-square.png" },
  { label: "Clientes", to: "/dashboard/clientes", icon: "/images/people.png" },
  { label: "Rutas", to: "/dashboard/rutas", icon: "/images/people.png" },
];

const claseItem = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-1 py-2.5 text-base font-medium transition-colors hover:text-primary-400 ${
    isActive ? "text-primary-400" : "text-[#3F443D]"
  }`;

const proveedores = [
  { id: "maria-perez", nombre: "Maria Perez", lugar: "San Juan De La Maguana", img: `${IMG}/image_home_11.png` },
  { id: "juan-garcia", nombre: "Juan Garcia", lugar: "San Pedro De Macorís", img: `${IMG}/image_home_10.png` },
  { id: "agromerca-rd", nombre: "AgroMerca RD", lugar: "Santo Domingo", img: `${IMG}/image_home_08.png` },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)] lg:flex">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/logos/Logotipo_BANEY_SVG.svg"
          alt=""
          aria-hidden
          className="h-10 w-auto"
        />
        <img
          src="/logos/Baney_logo_png.png"
          alt="BANEY"
          className="h-6 w-auto"
        />
      </Link>

      <p className="mt-12 text-[17px] font-bold text-[#3F443D]">
        PANEL GENERAL
      </p>
      <nav className="mt-5 space-y-3">
        {panelGeneral.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={claseItem}
          >
            <img src={item.icon} alt="" aria-hidden className="h-5 w-5" />{" "}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <p className="mt-16 text-[17px] font-bold text-[#3F443D]">
        OTROS PROVEEDORES
      </p>
      <ul className="mt-5 space-y-4">
        {proveedores.map((p) => (
          <li key={p.nombre}>
            <Link
              to={`/dashboard/clientes/${p.id}`}
              className="flex items-center gap-3 px-1"
            >
              <img
                src={p.img}
                alt={p.nombre}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#3F443D]">
                  {p.nombre}
                </p>
                <p className="truncate text-xs text-neutral-500">{p.lugar}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <p className="text-[17px] font-bold text-[#3F443D]">CONFIGURACIÓN</p>
        <nav className="mt-5 space-y-3">
          <NavLink to="/dashboard/configuracion" className={claseItem}>
            <Icono d={iconos.config} /> Configuración
          </NavLink>
          <Link
            to="/landing"
            className="flex items-center gap-3 px-1 py-2.5 text-[15px] font-medium text-error-500 transition-colors hover:text-error-600"
          >
            <Icono d={iconos.salir} /> Cerrar Sección
          </Link>
        </nav>
      </div>
    </aside>
  );
}
