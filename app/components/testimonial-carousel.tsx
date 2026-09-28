import { useEffect, useState } from "react";

export type Testimonio = {
  img: string;
  texto: string;
  nombre: string;
  rol: string;
};

const SLIDE_MAX = 680; // ancho máximo de cada tarjeta, en px
const CLONES = 2; // tarjetas del inicio repetidas al final para el bucle sin salto

/** La tarjeta nunca debe ser más ancha que la pantalla del teléfono */
function medidas() {
  if (typeof window === "undefined") return { ancho: SLIDE_MAX, gap: 32 };
  const ancho = Math.min(SLIDE_MAX, window.innerWidth - 32);
  return { ancho, gap: ancho < 520 ? 16 : 32 };
}

export default function TestimonialCarousel({ items }: { items: Testimonio[] }) {
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [conAnimacion, setConAnimacion] = useState(true);
  const [{ ancho: SLIDE_W, gap: GAP }, setMedidas] = useState(medidas);

  useEffect(() => {
    setMedidas(medidas());
    const alRedimensionar = () => setMedidas(medidas());
    window.addEventListener("resize", alRedimensionar);
    return () => window.removeEventListener("resize", alRedimensionar);
  }, []);

  const estrecho = SLIDE_W < 520;

  // Avanza solo cada 4s; se pausa al pasar el mouse por encima
  useEffect(() => {
    if (pausado) return;
    const timer = setInterval(
      () => setIndex((i) => Math.min(i + 1, items.length)),
      4000,
    );
    return () => clearInterval(timer);
  }, [pausado, items.length]);

  // Al llegar al clon de la primera opinión, salta (sin animación) al inicio real
  useEffect(() => {
    if (index < items.length) return;
    const timer = setTimeout(() => {
      setConAnimacion(false);
      setIndex((i) => i % items.length);
    }, 720); // justo después de que termine la transición de 700ms
    return () => clearTimeout(timer);
  }, [index, items.length]);

  useEffect(() => {
    if (conAnimacion) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setConAnimacion(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [conAnimacion]);

  const paso = SLIDE_W + GAP;
  const pista = [...items, ...items.slice(0, CLONES)];

  return (
    <div
      className="w-full overflow-hidden py-6"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* La pista arranca en el centro de la página y se desliza según el índice */}
      <div
        className={`flex items-center ${
          conAnimacion ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          gap: `${GAP}px`,
          marginLeft: "50%",
          transform: `translateX(-${SLIDE_W / 2 + index * paso}px)`,
        }}
      >
        {pista.map((t, i) => {
          const activo = i === index;
          return (
            <article
              key={`${t.nombre}-${i}`}
              style={{ width: SLIDE_W }}
              onClick={() => !activo && setIndex(i)}
              className={`flex shrink-0 transition-all duration-700 ${
                estrecho
                  ? "flex-col items-center gap-4 rounded-3xl p-6 text-center"
                  : "items-center gap-6 rounded-3xl p-8"
              } ${
                activo
                  ? "scale-100 bg-secondary4-500 text-secondary-50 shadow-2xl"
                  : "scale-90 cursor-pointer bg-secondary4-50 text-neutral-600 opacity-80 shadow-lg hover:opacity-100"
              }`}
            >
              <img
                src={t.img}
                alt={t.nombre}
                className={`shrink-0 rounded-full object-cover shadow-md ${
                  estrecho ? "h-20 w-20" : "h-32 w-32"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm leading-relaxed">{t.texto}</p>
                <p className={`mt-4 font-bold ${activo ? "" : "text-neutral-800"}`}>
                  {t.nombre}
                </p>
                <p
                  className={`text-xs ${
                    activo ? "text-secondary-100" : "text-neutral-500"
                  }`}
                >
                  {t.rol}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Puntos clicables */}
      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver opinión ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index % items.length
                ? "bg-secondary4-500"
                : "bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
