import { Link, Outlet } from "react-router";
import Navbar from "~/components/navbar";

export default function AuthLayout() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Fondo_login.jpg')" }}
    >
      {/* Velo claro para atenuar el fondo, como en el diseño */}
      <div className="absolute inset-0 bg-white/50" />

      <Navbar />

      {/* Tarjeta de login centrada */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-10 pt-24">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:min-h-[620px] lg:grid-cols-2">
          {/* Lado izquierdo: cielo azul + campo en la base + granjero al frente */}
          <aside className="relative hidden overflow-hidden bg-caney-sky lg:block">
            <img
              src="/images/Image_login.png"
              alt=""
              aria-hidden
              className="absolute bottom-0 left-0 w-[115%] max-w-none translate-y-[9.4%]"
            />
            <img
              src="/images/granjero.png"
              alt="Productor BANEY usando la plataforma"
              className="absolute bottom-0 right-16 z-20 h-[82%] w-auto object-contain object-bottom"
            />
            <Link
              to="/"
              className="absolute left-5 top-4 flex items-center gap-2"
            >
              <img
                src="/logos/Logo_Horizontal_baney_png.png"
                alt="BANEY"
                className="h-9 w-auto"
              />
            </Link>
          </aside>

          {/* Lado derecho: formulario con formas orgánicas decorativas */}
          <main className="relative z-10 overflow-hidden bg-white lg:-ml-24 lg:rounded-l-3xl">
            <img
              src="/images/BlobsVector_01_login.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 w-56"
            />
            <img
              src="/images/BlobsVector_02_login.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-2 right-0 h-44 w-auto"
            />

            <div className="relative z-10 flex h-full flex-col justify-center px-8 py-8 sm:px-12">
              <Outlet />
              <p className="mt-6 text-center text-sm text-neutral-500">
                Derechos reservados BANEY RD
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
