import { useState } from "react";
import { Link, Outlet } from "react-router";
import Sidebar from "./components/sidebar";
import ProfilePanel from "./components/profile-panel";

export default function DashboardLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="flex min-h-screen gap-6 overflow-x-hidden p-4 font-inter sm:p-6">
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      <main className="min-w-0 flex-1">
        {/* Cabecera solo para móvil y tablet: da acceso al menú lateral */}
        <div className="mb-5 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#3F443D] shadow-[0_6px_20px_rgba(20,30,15,0.12)] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-primary-600 active:text-white"
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
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <Link to="/" className="flex items-center">
            <img
              src="/logos/Logo_Horizontal_baney_png.png"
              alt="BANEY"
              className="h-9 w-auto"
            />
          </Link>

          <Link to="/dashboard/perfil" aria-label="Ir a tu perfil">
            <img
              src="/images/image_home/Ellipse 5.png"
              alt="Perfil"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-400 transition-transform hover:scale-110"
            />
          </Link>
        </div>

        <Outlet />
      </main>

      <ProfilePanel />
    </div>
  );
}
