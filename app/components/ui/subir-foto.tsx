import { useId, useRef, useState } from "react";

const TIPOS = ["image/png", "image/jpeg", "image/webp", "image/avif"];
const MAX_MB = 5;

/**
 * Selector de imagen desde el dispositivo del usuario.
 * La foto se lee en el navegador y se devuelve como data URL, así que
 * funciona sin backend; al conectar la API habrá que subir el File real.
 */
export default function SubirFoto({
  onFoto,
  etiqueta = "Subir foto",
  className = "",
  children,
}: {
  onFoto: (dataUrl: string) => void;
  etiqueta?: string;
  className?: string;
  /** Si se pasa contenido, se usa como disparador en vez del botón normal */
  children?: React.ReactNode;
}) {
  const id = useId();
  const refEntrada = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function procesar(archivo: File | undefined) {
    if (!archivo) return;

    if (!TIPOS.includes(archivo.type)) {
      setError("Usa una imagen PNG, JPG, WEBP o AVIF.");
      return;
    }
    if (archivo.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen supera los ${MAX_MB} MB.`);
      return;
    }

    setError("");
    setCargando(true);
    const lector = new FileReader();
    lector.onload = () => {
      setCargando(false);
      if (typeof lector.result === "string") onFoto(lector.result);
    };
    lector.onerror = () => {
      setCargando(false);
      setError("No se pudo leer la imagen, inténtalo de nuevo.");
    };
    lector.readAsDataURL(archivo);
  }

  return (
    <div className={className}>
      <input
        ref={refEntrada}
        id={id}
        type="file"
        accept={TIPOS.join(",")}
        className="sr-only"
        onChange={(e) => {
          procesar(e.target.files?.[0]);
          // Permite volver a elegir el mismo archivo
          e.target.value = "";
        }}
      />
      {children ? (
        <button
          type="button"
          aria-label={etiqueta}
          onClick={() => refEntrada.current?.click()}
          className="block"
        >
          {children}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => refEntrada.current?.click()}
          className="flex items-center gap-2 rounded-full border-2 border-primary-500 px-5 py-2.5 text-sm font-semibold text-primary-600 transition-all duration-200 hover:scale-105 hover:bg-primary-50 hover:shadow-md active:bg-primary-600 active:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="h-4 w-4"
          >
            <path d="M12 16V4M8 8l4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          {cargando ? "Cargando…" : etiqueta}
        </button>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-error-500">
          {error}
        </p>
      )}
    </div>
  );
}
