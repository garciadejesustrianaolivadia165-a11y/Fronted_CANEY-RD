import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import SearchHeader from "../components/search-header";
import SubirFoto from "~/components/ui/subir-foto";
import {
  CATEGORIAS_PROD,
  ESTADOS,
  FOTOS,
  UNIDADES,
  actualizarProducto,
  buscarProducto,
  colorEstado,
  eliminarProducto,
  type Estado,
} from "~/lib/mis-productos";

export function meta() {
  return [{ title: "Editar producto | BANEY RD" }];
}

const claseEntrada =
  "w-full rounded-2xl border border-[#9EAA31] bg-white px-5 py-3 text-[15px] text-[#415936] outline-none transition-colors placeholder:text-[#415936]/50 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30";

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

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = buscarProducto(id);

  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? "");
  const [categoria, setCategoria] = useState(producto?.categoria ?? CATEGORIAS_PROD[0]);
  const [unidad, setUnidad] = useState(producto?.unidad ?? UNIDADES[0]);
  const [precio, setPrecio] = useState(String(producto?.precio ?? ""));
  const [stock, setStock] = useState(String(producto?.stock ?? ""));
  const [estado, setEstado] = useState<Estado>(producto?.estado ?? "Publicado");
  const [foto, setFoto] = useState(producto?.img ?? FOTOS[0]);
  const [subidas, setSubidas] = useState<string[]>([]);
  const [guardado, setGuardado] = useState(false);

  // La foto actual primero, luego las subidas y por último las de la galería
  const galeria = [...new Set([foto, ...subidas, ...FOTOS])];

  if (!producto) {
    return (
      <div className="space-y-6">
        <SearchHeader />
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
          <p className="text-sm text-neutral-500">
            Ese producto ya no existe en tu catálogo.
          </p>
          <Link
            to="/dashboard/productos"
            className="mt-6 inline-block rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Volver a Mis productos
          </Link>
        </div>
      </div>
    );
  }

  const existencias = Number(stock) || 0;

  function ajustar(delta: number) {
    setStock(String(Math.max(0, existencias + delta)));
    setGuardado(false);
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault();
    actualizarProducto(producto!.id, {
      nombre: nombre.trim() || producto!.nombre,
      descripcion: descripcion.trim(),
      categoria,
      unidad,
      precio: Number(precio) || 0,
      stock: existencias,
      estado,
      img: foto,
    });
    setGuardado(true);
  }

  function borrar() {
    eliminarProducto(producto!.id);
    navigate("/dashboard/productos");
  }

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Cabecera */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/dashboard/productos"
          aria-label="Volver a Mis productos"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E3E6E0] text-[#3F443D] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-primary-600 active:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold text-[#3F443D] sm:text-3xl">
            {producto.nombre}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Modifica la información y las existencias de tu producto.
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-semibold ${colorEstado[estado]}`}
        >
          {estado}
        </span>
      </div>

      <form onSubmit={guardar} className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Existencias */}
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] xl:order-2">
          <h2 className="text-lg font-bold text-[#415936]">Existencias</h2>

          <div className="mt-5 overflow-hidden rounded-2xl">
            <img
              src={foto}
              alt={producto.nombre}
              className="h-40 w-full object-cover"
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Restar una unidad"
              onClick={() => ajustar(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary-500 text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="h-4 w-4">
                <path d="M5 12h14" />
              </svg>
            </button>

            <div className="text-center">
              <input
                inputMode="numeric"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value.replace(/[^\d]/g, ""));
                  setGuardado(false);
                }}
                aria-label="Existencia disponible"
                className="w-28 bg-transparent text-center text-4xl font-bold text-[#3F443D] outline-none"
              />
              <p className="text-xs text-neutral-500">{unidad} disponibles</p>
            </div>

            <button
              type="button"
              aria-label="Sumar una unidad"
              onClick={() => ajustar(1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary-500 text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="h-4 w-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {[10, 50, 100].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => ajustar(n)}
                className="rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-100"
              >
                +{n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setStock("0");
                setEstado("Agotado");
                setGuardado(false);
              }}
              className="rounded-full bg-error-50 px-4 py-2 text-xs font-semibold text-error-500 transition-all duration-200 hover:scale-105 hover:bg-error-100"
            >
              Marcar agotado
            </button>
          </div>

          <p className="mt-5 border-t border-neutral-100 pt-5 text-sm text-neutral-500">
            Valor del inventario
          </p>
          <p className="text-2xl font-bold text-primary-600">
            RD$ {(existencias * (Number(precio) || 0)).toLocaleString("es-DO")}
          </p>
        </div>

        {/* Datos del producto */}
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] xl:order-1 xl:col-span-2">
          <h2 className="text-lg font-bold text-[#415936]">
            Información del producto
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Campo etiqueta="Nombre del producto">
              <input
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setGuardado(false);
                }}
                className={claseEntrada}
              />
            </Campo>

            <Campo etiqueta="Categoría">
              <select
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value);
                  setGuardado(false);
                }}
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
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                    setGuardado(false);
                  }}
                  className={`${claseEntrada} resize-none`}
                />
              </Campo>
            </div>

            <Campo etiqueta="Unidad de medida">
              <select
                value={unidad}
                onChange={(e) => {
                  setUnidad(e.target.value);
                  setGuardado(false);
                }}
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
                onChange={(e) => {
                  setPrecio(e.target.value.replace(/[^\d.]/g, ""));
                  setGuardado(false);
                }}
                className={claseEntrada}
              />
            </Campo>

            <Campo etiqueta="Estado de publicación">
              <select
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value as Estado);
                  setGuardado(false);
                }}
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
                    setGuardado(false);
                  }}
                />
              </div>
              <div className="sin-barra-scroll flex gap-4 overflow-x-auto pb-1">
                {galeria.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-label="Elegir foto"
                    aria-pressed={foto === f}
                    onClick={() => {
                      setFoto(f);
                      setGuardado(false);
                    }}
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

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-primary-800 active:ring-2 active:ring-primary-800"
            >
              Guardar cambios
            </button>
            <Link
              to="/dashboard/productos"
              className="rounded-full border-2 border-primary-500 px-8 py-3 text-sm font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50 hover:shadow-md"
            >
              Volver
            </Link>
            <button
              type="button"
              onClick={borrar}
              className="rounded-full border border-error-200 px-6 py-3 text-sm font-semibold text-error-500 transition-all duration-200 hover:scale-105 hover:bg-error-50"
            >
              Eliminar producto
            </button>
            {guardado && (
              <span
                role="status"
                className="rounded-full bg-success-100 px-4 py-2 text-xs font-semibold text-success-700"
              >
                Cambios guardados
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
