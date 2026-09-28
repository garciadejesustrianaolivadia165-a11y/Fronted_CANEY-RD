import { useState } from "react";
import { Link, NavLink } from "react-router";
import Button from "~/components/ui/button";
import SearchBar from "~/components/search-bar";

const links = [
  { label: "Home", to: "/" },
  { label: "Rutas", to: "/dashboard/rutas" },
  { label: "Sobre Nosotros", to: "#" }, // pendiente
  { label: "Mis pedidos", to: "/dashboard/mis-pedidos" },
  { label: "Academia BANEY", to: "#" }, // pendiente
];

export default function Navbar({ session = false }: { session?: boolean }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5 xl:gap-6 2xl:gap-8 2xl:px-16">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/logos/Logo_Horizontal_baney_png.png"
            alt="BANEY"
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        {session && (
          <SearchBar className="hidden w-56 shrink-0 xl:flex 2xl:w-72" />
        )}

        <div className="hidden items-center gap-6 xl:flex 2xl:gap-10">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="whitespace-nowrap text-sm font-semibold text-neutral-900 hover:text-primary-600"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Acciones de escritorio */}
        {session ? (
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <Button to="/landing" variant="outline" className="px-5 py-2 text-sm">
              Cerrar Sección
            </Button>
            <Link to="/dashboard" aria-label="Ir a tu perfil">
              <img
                src="/images/image_home/Ellipse 5.png"
                alt="Perfil"
                className="h-10 w-10 min-w-10 rounded-full object-cover ring-2 ring-primary-400 transition-transform hover:scale-110"
              />
            </Link>
          </div>
        ) : (
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <Button to="/login" className="px-5 py-2 text-sm">
              Iniciar Sección
            </Button>
            <Button to="/register" variant="outline" className="px-5 py-2 text-sm">
              Registrarse <span aria-hidden>»</span>
            </Button>
          </div>
        )}

        {/* Menú compacto (móvil y tablet) */}
        <div className="flex shrink-0 items-center gap-3 xl:hidden">
          {session && (
            <Link to="/dashboard" aria-label="Ir a tu perfil">
              <img
                src="/images/image_home/Ellipse 5.png"
                alt="Perfil"
                className="h-9 w-9 min-w-9 rounded-full object-cover ring-2 ring-primary-400"
              />
            </Link>
          )}
          <button
            type="button"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((a) => !a)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
              className="h-5 w-5"
            >
              {menuAbierto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Panel desplegable del menú compacto */}
      {menuAbierto && (
        <div className="mx-4 rounded-3xl bg-white/95 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.20)] backdrop-blur-md sm:mx-8 xl:hidden">
          {session && <SearchBar className="mb-4 w-full" />}
          <div className="flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMenuAbierto(false)}
                className="border-b border-neutral-100 py-3 text-sm font-semibold text-neutral-900 last:border-0 hover:text-primary-600"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {session ? (
              <Button to="/landing" variant="outline" className="w-full py-2.5 text-sm">
                Cerrar Sección
              </Button>
            ) : (
              <>
                <Button to="/login" className="w-full py-2.5 text-sm">
                  Iniciar Sección
                </Button>
                <Button to="/register" variant="outline" className="w-full py-2.5 text-sm">
                  Registrarse <span aria-hidden>»</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
