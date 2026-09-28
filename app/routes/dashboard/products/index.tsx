import { useState } from "react";
import { Link, useNavigate } from "react-router";
import SearchHeader from "../components/search-header";
import SubirFoto from "~/components/ui/subir-foto";
import {
  CATEGORIAS_PROD,
  ESTADOS,
  FOTOS,
  UNIDADES,
  agregarProducto,
  colorEstado,
  eliminarProducto,
  useMisProductos,
  type Estado,
} from "~/lib/mis-productos";

export function meta() {
  return [{ title: "Mis Productos | BANEY RD" }];
}

function Desplegable({
  valor,
  opciones,
  onCambio,
  etiqueta,
}: {
  valor: string;
  opciones: string[];
  onCambio: (v: string) => void;
  etiqueta: string;
}) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={etiqueta}
        aria-expanded={abierto}
        onClick={() => setAbierto((a) => !a)}
        className="flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-full border border-[#9EAA31] bg-white px-4 py-3 text-[13px] text-[#415936] transition-all duration-200 hover:scale-105 hover:shadow-md sm:w-52"
      >
        {valor}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`h-4 w-4 transition-transform ${abierto ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {abierto && (
        <ul className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:w-52">
          {opciones.map((o) => (
            <li key={o}>
              <button
                type="button"
                onClick={() => {
                  onCambio(o);
                  setAbierto(false);
                }}
                className={`w-full whitespace-nowrap px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-primary-50 ${
                  valor === o ? "font-bold text-primary-600" : "text-[#3F443D]"
                }`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Campo({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#3F443D]">{etiqueta}</span>
      {children}
    </label>
  );
}

const claseEntrada =
  "w-full rounded-2xl border border-[#9EAA31] bg-white px-5 py-3 text-[15px] text-[#415936] outline-none transition-colors placeholder:text-[#415936]/50 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30";

export default function MisProductos() {
  const navigate = useNavigate();
  const productos = useMisProductos();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas las categorías");
  const [estado, setEstado] = useState("Todos los estados");
  const [formulario, setFormulario] = useState(false);

  // Producto en edición / creación
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cat, setCat] = useState(CATEGORIAS_PROD[0]);
  const [unidad, setUnidad] = useState(UNIDADES[0]);
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState(FOTOS[0]);
  const [subidas, setSubidas] = useState<string[]>([]);
  const [nuevoEstado, setNuevoEstado] = useState<Estado>("Publicado");

  const visibles = productos.filter((p) => {
    const coincide = p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());
    const porCategoria =
      categoria === "Todas las categorías" || p.categoria === categoria;
    const porEstado = estado === "Todos los estados" || p.estado === estado;
    return coincide && porCategoria && porEstado;
  });

  const resumen = [
    { t: "Publicados", v: productos.filter((p) => p.estado === "Publicado").length, icono: "/icons/icon_01.png" },
    { t: "Agotados", v: productos.filter((p) => p.estado === "Agotado").length, icono: "/icons/icon_02.png" },
    { t: "Borradores", v: productos.filter((p) => p.estado === "Borrador").length, icono: "/icons/icon_03.png" },
  ];

  function limpiar() {
    setNombre("");
    setDescripcion("");
    setCat(CATEGORIAS_PROD[0]);
    setUnidad(UNIDADES[0]);
    setPrecio("");
    setStock("");
    setFoto(FOTOS[0]);
    setNuevoEstado("Publicado");
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (nombre.trim() === "") return;
    agregarProducto({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria: cat,
      unidad,
      precio: Number(precio) || 0,
      stock: Number(stock) || 0,
      estado: nuevoEstado,
      img: foto,
    });
    limpiar();
    setFormulario(false);
  }

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Título y acción principal */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3F443D] sm:text-3xl">
            Mis productos
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Publica y administra el catálogo de tu negocio.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormulario((f) => !f)}
          className="flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-primary-800 active:ring-2 active:ring-primary-800"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="h-4 w-4">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {formulario ? "Cerrar formulario" : "Agregar producto"}
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {resumen.map((r) => (
          <div
            key={r.t}
            className="rounded-[1.5rem] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.24)]"
          >
            <div className="flex items-center gap-3">
              <img src={r.icono} alt="" aria-hidden className="h-10 w-10 shrink-0" />
              <p className="flex-1 text-sm text-neutral-700">{r.t}</p>
            </div>
            <p className="mt-4 text-4xl font-medium text-neutral-900">{r.v}</p>
          </div>
        ))}
      </div>

      {/* Formulario de alta */}
      {formulario && (
        <form
          onSubmit={guardar}
          className="rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
        >
          <h2 className="text-lg font-bold text-[#415936]">Nuevo producto</h2>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Campo etiqueta="Nombre del producto">
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Aguacate Semil 34"
                className={claseEntrada}
              />
            </Campo>

            <Campo etiqueta="Categoría">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className={claseEntrada}
              >
                {CATEGORIAS_PROD.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Campo>

            <div className="lg:col-span-2">
              <Campo etiqueta="Descripción">
                <textarea
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe calidad, presentación y origen del producto."
                  className={`${claseEntrada} resize-none rounded-2xl`}
                />
              </Campo>
            </div>

            <Campo etiqueta="Unidad de medida">
              <select
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className={claseEntrada}
              >
                {UNIDADES.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </Campo>

            <Campo etiqueta={`Precio por ${unidad.toLowerCase()} (RD$)`}>
              <input
                inputMode="decimal"
                value={precio}
                onChange={(e) => setPrecio(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="0.00"
                className={claseEntrada}
              />
            </Campo>

            <Campo etiqueta={`Existencia disponible (${unidad})`}>
              <input
                inputMode="numeric"
                value={stock}
                onChange={(e) => setStock(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="0"
                className={claseEntrada}
              />
            </Campo>

            <Campo etiqueta="Estado de publicación">
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value as Estado)}
                className={claseEntrada}
              >
                {ESTADOS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Campo>

            <div className="lg:col-span-2">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-[#3F443D]">Foto del producto</span>
                <SubirFoto
                  etiqueta="Subir desde mi dispositivo"
                  onFoto={(url) => {
                    setSubidas((prev) => [url, ...prev]);
                    setFoto(url);
                  }}
                />
              </div>
              <div className="sin-barra-scroll flex gap-4 overflow-x-auto pb-1">
                {[...subidas, ...FOTOS].map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-label="Elegir foto"
                    aria-pressed={foto === f}
                    onClick={() => setFoto(f)}
                    className={`h-20 w-28 shrink-0 overflow-hidden rounded-2xl transition-all duration-200 hover:scale-105 ${
                      foto === f ? "ring-2 ring-primary-600" : ""
                    }`}
                  >
                    <img src={f} alt="" aria-hidden className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="submit"
              className="rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-primary-800 active:ring-2 active:ring-primary-800"
            >
              Guardar producto
            </button>
            <button
              type="button"
              onClick={() => {
                limpiar();
                setFormulario(false);
              }}
              className="rounded-full border-2 border-primary-500 px-8 py-3 text-sm font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50 hover:shadow-md"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-[#9EAA31] bg-white px-5 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-4 w-4 shrink-0 text-neutral-400">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar en mis productos..."
            className="w-full bg-transparent text-sm text-[#415936] outline-none placeholder:text-[#415936]/50"
          />
        </div>
        <Desplegable
          etiqueta="Filtrar por categoría"
          valor={categoria}
          opciones={["Todas las categorías", ...CATEGORIAS_PROD]}
          onCambio={setCategoria}
        />
        <Desplegable
          etiqueta="Filtrar por estado"
          valor={estado}
          opciones={["Todos los estados", ...ESTADOS]}
          onCambio={setEstado}
        />
      </div>

      {/* Listado: tarjetas en móvil, tabla en escritorio */}
      {visibles.length === 0 ? (
        <p className="rounded-[2rem] bg-white p-10 text-center text-sm text-neutral-500 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
          No tienes productos que coincidan con la búsqueda.
        </p>
      ) : (
        <>
          <div className="space-y-4 lg:hidden">
            {visibles.map((p) => (
              <article
                key={p.id}
                className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.20)]"
              >
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/dashboard/productos/${p.id}/stock`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/dashboard/productos/${p.id}/stock`);
                    }
                  }}
                  aria-label={`Editar ${p.nombre}`}
                  className="flex cursor-pointer items-start gap-4"
                >
                  <img
                    src={p.img}
                    alt={p.nombre}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-bold text-[#3F443D]">
                        {p.nombre}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${colorEstado[p.estado]}`}
                      >
                        {p.estado}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
                      {p.descripcion}
                    </p>
                    <p className="mt-2 text-xs text-neutral-500">
                      {p.categoria} · {p.stock} {p.unidad}
                    </p>
                    <p className="mt-1 text-base font-bold text-primary-600">
                      RD$ {p.precio.toLocaleString("es-DO")}
                      <span className="text-xs font-normal text-neutral-500">
                        {" "}
                        / {p.unidad}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/dashboard/productos/${p.id}/stock`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 rounded-full border border-primary-500 py-2 text-center text-xs font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50"
                  >
                    Editar stock
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarProducto(p.id);
                    }}
                    className="rounded-full border border-error-200 px-4 py-2 text-xs font-semibold text-error-500 transition-all duration-200 hover:scale-105 hover:bg-error-50"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[2rem] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
                  <th className="px-6 py-4 font-semibold">Producto</th>
                  <th className="px-6 py-4 font-semibold">Categoría</th>
                  <th className="px-6 py-4 font-semibold">Unidad</th>
                  <th className="px-6 py-4 font-semibold">Existencia</th>
                  <th className="px-6 py-4 font-semibold">Precio</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr
                    key={p.id}
                    tabIndex={0}
                    aria-label={`Editar ${p.nombre}`}
                    onClick={() => navigate(`/dashboard/productos/${p.id}/stock`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate(`/dashboard/productos/${p.id}/stock`);
                    }}
                    className="cursor-pointer border-b border-neutral-100 transition-colors last:border-0 hover:bg-primary-400/10 focus:bg-primary-400/10 focus:outline-none"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.img}
                          alt={p.nombre}
                          className="h-12 w-12 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#3F443D]">
                            {p.nombre}
                          </p>
                          <p className="max-w-[22rem] truncate text-xs text-neutral-500">
                            {p.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {p.categoria}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {p.unidad}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {p.stock}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-600">
                      RD$ {p.precio.toLocaleString("es-DO")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${colorEstado[p.estado]}`}
                      >
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/productos/${p.id}/stock`}
                    onClick={(e) => e.stopPropagation()}
                          className="rounded-full border border-primary-500 px-4 py-1.5 text-xs font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50"
                        >
                          Stock
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                      e.stopPropagation();
                      eliminarProducto(p.id);
                    }}
                          aria-label={`Eliminar ${p.nombre}`}
                          className="rounded-full border border-error-200 p-1.5 text-error-500 transition-all duration-200 hover:scale-110 hover:bg-error-50"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className="h-4 w-4">
                            <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
