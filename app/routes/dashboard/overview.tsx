import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import SearchHeader from "./components/search-header";

const IMG = "/images/image_home";

// TODO: reemplazar por las fotos reales de productos cuando se exporten del Figma
const productos = [
  {
    nombre: "Zanahorias Criollas (Lb)",
    img: "/images/image_inicio/image_inicio_01.png",
    stock: true,
    progreso: 55,
  },
  {
    nombre: "Pimientos Maduros (Und)",
    img: "/images/image_inicio/image_inicio_02.png",
    stock: true,
    progreso: 40,
  },
  {
    nombre: "Maíz Tierno (Und)",
    img: "/images/image_inicio/image_inicio_03.png",
    stock: false,
    progreso: 65,
  },
];

const estados = [
  { resumen: "0/8 Completo" },
  { resumen: "50/135 Completo" },
  { resumen: "2/8 Completo" },
];

const pedidos = [
  {
    id: "00242772362",
    cliente: "Cesar Valdez",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_09.png`,
    descripcion: "Plátanos Banilejos 12 Dz",
    precio: "$ 135,000.00",
  },
  {
    id: "00242772363",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
];

// Pasos de la guía interactiva
const pasosGuia = [
  {
    titulo: "Bienvenida",
    texto:
      "Este es tu panel de inicio. Aquí te saludamos y desde este botón puedes volver a abrir esta guía cuando quieras.",
  },
  {
    titulo: "Estado de tus pedidos",
    texto:
      "Estas tarjetas te muestran un resumen rápido: cuántos pedidos nuevos tienes y qué tan completos están.",
  },
  {
    titulo: "Tus Productos",
    texto:
      "Aquí ves tu inventario: cada producto con su foto, si tiene stock disponible y la barra de progreso de sus ventas.",
  },
  {
    titulo: "Pedidos En Curso",
    texto:
      "Esta tabla lista los pedidos activos de tus clientes con su estado, descripción y precio. Haz clic en uno para ver su detalle.",
  },
];

function TarjetaGuia({
  paso,
  setPaso,
}: {
  paso: number;
  setPaso: (p: number | null) => void;
}) {
  const info = pasosGuia[paso];
  return (
    <div className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 rounded-2xl bg-white p-5 shadow-[0_16px_45px_rgba(0,0,0,0.30)]">
      <p className="font-sans text-base font-bold text-[#415936]">
        {info.titulo}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {info.texto}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">
          Paso {paso + 1} de {pasosGuia.length}
        </span>
        <div className="flex gap-2">
          {paso > 0 && (
            <button
              type="button"
              onClick={() => setPaso(paso - 1)}
              className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 hover:bg-neutral-100"
            >
              Anterior
            </button>
          )}
          {paso < pasosGuia.length - 1 ? (
            <button
              type="button"
              onClick={() => setPaso(paso + 1)}
              className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-primary-500"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPaso(null)}
              className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-primary-500"
            >
              Terminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function meta() {
  return [{ title: "Inicio | BANEY RD" }];
}

// 6 opciones: los 3 productos repetidos, más 3 clones para el bucle sin salto
const productos6 = [...productos, ...productos];
const pistaProductos = [...productos6, ...productos6.slice(0, 3)];

export default function DashboardOverview() {
  // null = guía apagada; 0..n = paso activo
  const [paso, setPaso] = useState<number | null>(null);
  const navigate = useNavigate();

  // Carrusel de productos
  const [idxProd, setIdxProd] = useState(0);
  const [animProd, setAnimProd] = useState(true);
  // Cuántas tarjetas caben a la vez: 1 en teléfono, 2 en tablet, 3 en escritorio
  const [visiblesProd, setVisiblesProd] = useState(3);

  useEffect(() => {
    const calcular = () => {
      const a = window.innerWidth;
      setVisiblesProd(a < 640 ? 1 : a < 1280 ? 2 : 3);
    };
    calcular();
    window.addEventListener("resize", calcular);
    return () => window.removeEventListener("resize", calcular);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setIdxProd((i) => Math.min(i + 1, productos6.length)),
      3500,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (idxProd < productos6.length) return;
    const timer = setTimeout(() => {
      setAnimProd(false);
      setIdxProd(0);
    }, 720);
    return () => clearTimeout(timer);
  }, [idxProd]);

  useEffect(() => {
    if (animProd) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimProd(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [animProd]);

  const anteriorProd = () =>
    setIdxProd((i) => (i <= 0 ? productos6.length - 1 : i - 1));
  const siguienteProd = () =>
    setIdxProd((i) => Math.min(i + 1, productos6.length));

  const resaltado = (i: number) =>
    paso === i ? "relative z-50 rounded-3xl ring-4 ring-primary-300" : "relative";

  return (
    <div className="space-y-6">
      {/* Fondo semioscuro de la guía */}
      {paso !== null && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setPaso(null)}
        />
      )}

      <SearchHeader />

      {/* Banner de bienvenida */}
      <section
        className={`${resaltado(0)} rounded-3xl border border-white/30 bg-primary-300/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/85">
          Bienvenido Nuevamente
        </p>
        <h1 className="mt-2 font-sans text-3xl font-bold text-white">
          José Pérez Guzmán
        </h1>
        <button
          type="button"
          onClick={() => setPaso(0)}
          className="mt-6 flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-white active:text-neutral-900 active:ring-2 active:ring-neutral-900"
        >
          Guía interactiva
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
        {paso === 0 && <TarjetaGuia paso={paso} setPaso={setPaso} />}
      </section>

      {/* Tarjetas de estado */}
      <section className={resaltado(1)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {estados.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
            >
              <img
                src="/icons/btn_pedido.png"
                alt=""
                aria-hidden
                className="h-11 w-11 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral-500">{e.resumen}</p>
                <p className="font-sans text-sm font-medium text-neutral-900">
                  Nuevo Pedido
                </p>
              </div>
              <button
                type="button"
                aria-label="Ver detalle del pedido"
                onClick={() =>
                  navigate("/dashboard/bandeja/pedidos/00242772362")
                }
                className="px-1 text-lg text-neutral-400 transition-colors hover:text-primary-400"
              >
                ⋮
              </button>
            </div>
          ))}
        </div>
        {paso === 1 && <TarjetaGuia paso={paso} setPaso={setPaso} />}
      </section>

      {/* Tus Productos */}
      <section className={resaltado(2)}>
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-semibold text-[#3F443D]">
            Tus Productos
          </h2>
          <div className="flex gap-2">
            {[
              { d: "M15 18l-6-6 6-6", accion: anteriorProd, label: "Anterior" },
              { d: "M9 6l6 6-6 6", accion: siguienteProd, label: "Siguiente" },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                aria-label={btn.label}
                onClick={btn.accion}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-all duration-200 hover:scale-110 hover:border-primary-400 hover:text-primary-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d={btn.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden pb-2">
          <div
            className={`flex ${animProd ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              width: `${(pistaProductos.length * 100) / visiblesProd}%`,
              transform: `translateX(-${(idxProd * 100) / pistaProductos.length}%)`,
            }}
          >
            {pistaProductos.map((p, iProd) => (
              <div
                key={iProd}
                className="shrink-0 px-3"
                style={{ width: `${100 / pistaProductos.length}%` }}
              >
            <div
              key={p.nombre}
              className="overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="h-44 w-full rounded-xl object-cover"
                />
                {/* Favorito: círculo naranja con corazón blanco, como la referencia */}
                <button
                  type="button"
                  aria-label="Favorito"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-secondary3-500/60 text-white shadow-md backdrop-blur-md transition-transform hover:scale-110"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    className="h-4.5 w-4.5"
                  >
                    <path d="M12 20.25l-1.3-1.18C6.1 14.9 3 12.13 3 8.75 3 6 5.17 3.85 7.92 3.85c1.55 0 3.05.72 4.08 1.87a5.48 5.48 0 0 1 4.08-1.87C18.83 3.85 21 6 21 8.75c0 3.38-3.1 6.15-7.7 10.33L12 20.25z" />
                  </svg>
                </button>
              </div>
              <span
                className={`mt-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                  p.stock
                    ? "bg-success-200 text-success-800"
                    : "bg-error-200 text-error-700"
                }`}
              >
                {p.stock ? "Stock" : "Sin Stock"}
              </span>
              <p className="mt-3 font-sans text-xl font-semibold text-neutral-900">
                {p.nombre}
              </p>
              <div className="mt-3 h-2.5 w-full rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-secondary4-500"
                  style={{ width: `${p.progreso}%` }}
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={`${IMG}/Ellipse 5.png`}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    José Pedro Guzmán
                  </p>
                  <p className="text-xs text-neutral-500">San Juan</p>
                </div>
              </div>
            </div>
              </div>
            ))}
          </div>
        </div>
        {paso === 2 && <TarjetaGuia paso={paso} setPaso={setPaso} />}
      </section>

      {/* Pedidos En Curso */}
      <section className={resaltado(3)}>
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-semibold text-[#3F443D]">
            Pedidos En Curso
          </h2>
          <Link
            to="/dashboard/rutas"
            className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
          >
            Ver Todos
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.10)] sm:p-6">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-neutral-400">
                <th className="pb-3 pl-4 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Descripcion</th>
                <th className="pb-3 pr-4 text-right font-medium">
                  Precio Pedido
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pedidos.map((p, i) => (
                <tr
                  key={i}
                  className="group relative cursor-pointer border-t border-neutral-100 transition-transform duration-200 hover:z-10 hover:-translate-y-1"
                >
                  <td className="rounded-l-2xl py-3 pl-4 transition-colors duration-200 group-hover:bg-primary-400/20">
                    <Link to={`/dashboard/rutas/${p.id}`} className="flex items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.cliente}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {p.cliente}
                        </p>
                        <p className="text-xs text-neutral-500">{p.fecha}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 transition-colors duration-200 group-hover:bg-primary-400/20">
                    <span className="inline-block whitespace-nowrap rounded-full bg-success-100 px-3 py-1 text-xs font-semibold text-success-700">
                      EN PROCESO
                    </span>
                  </td>
                  <td className="py-3 text-neutral-700 transition-colors duration-200 group-hover:bg-primary-400/20">
                    {p.descripcion}
                  </td>
                  <td className="rounded-r-2xl py-3 pr-4 text-right font-semibold text-neutral-900 transition-colors duration-200 group-hover:bg-primary-400/20">
                    {p.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paso === 3 && <TarjetaGuia paso={paso} setPaso={setPaso} />}
      </section>
    </div>
  );
}
