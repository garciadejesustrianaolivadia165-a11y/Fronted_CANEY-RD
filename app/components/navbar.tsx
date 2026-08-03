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
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="flex w-full items-center justify-between gap-6 px-8 py-5 2xl:gap-8 2xl:px-16">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/logos/Logo_Horizontal_baney_png.png"
            alt="BANEY"
            className="h-11 w-auto"
          />
        </Link>

        {session && (
          <SearchBar className="hidden w-56 shrink-0 lg:flex 2xl:w-72" />
        )}

        <div className="hidden items-center gap-6 lg:flex 2xl:gap-10">
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

        {session ? (
          <div className="flex shrink-0 items-center gap-3">
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
          <div className="flex shrink-0 items-center gap-3">
            <Button to="/login" className="px-5 py-2 text-sm">
              Iniciar Sección
            </Button>
            <Button to="/register" variant="outline" className="px-5 py-2 text-sm">
              Registrarse <span aria-hidden>»</span>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
