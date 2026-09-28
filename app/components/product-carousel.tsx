import { useEffect, useState } from "react";
import ProductCard from "~/components/product-card";
import type { Product } from "~/types/product";

const CARD_MAX = 320; // w-80
const GAP = 24; // gap-6
const CLONES = 5; // tarjetas del inicio repetidas al final para el bucle sin salto

/** En pantallas estrechas la tarjeta se encoge para caber entera */
function anchoTarjeta() {
  if (typeof window === "undefined") return CARD_MAX;
  return Math.min(CARD_MAX, window.innerWidth - 64);
}

export default function ProductCarousel({ items }: { items: Product[] }) {
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [conAnimacion, setConAnimacion] = useState(true);
  const [cardW, setCardW] = useState(anchoTarjeta);
  const PASO = cardW + GAP;

  useEffect(() => {
    setCardW(anchoTarjeta());
    const alRedimensionar = () => setCardW(anchoTarjeta());
    window.addEventListener("resize", alRedimensionar);
    return () => window.removeEventListener("resize", alRedimensionar);
  }, []);

  // Avanza una tarjeta cada 3.5s; se pausa con el mouse encima
  useEffect(() => {
    if (pausado) return;
    const timer = setInterval(
      () => setIndex((i) => Math.min(i + 1, items.length)),
      3500,
    );
    return () => clearInterval(timer);
  }, [pausado, items.length]);

  // Al llegar al clon de la primera tarjeta, salta (sin animación) al inicio real
  useEffect(() => {
    if (index < items.length) return;
    const timer = setTimeout(() => {
      setConAnimacion(false);
      setIndex((i) => i % items.length);
    }, 720); // justo después de que termine la transición de 700ms
    return () => clearTimeout(timer);
  }, [index, items.length]);

  const anterior = () =>
    setIndex((i) => (i <= 0 ? items.length - 1 : i - 1));
  const siguiente = () => setIndex((i) => Math.min(i + 1, items.length));

  useEffect(() => {
    if (conAnimacion) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setConAnimacion(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [conAnimacion]);

  const pista = [...items, ...items.slice(0, CLONES)];

  return (
    <div
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="relative">
        <div className="mt-6 overflow-hidden pb-4 pt-2">
          <div
            className={`flex gap-6 ${
              conAnimacion ? "transition-transform duration-700 ease-in-out" : ""
            }`}
            style={{ transform: `translateX(-${index * PASO}px)` }}
          >
            {pista.map((p, i) => (
              <div key={`${p.id}-${i}`} style={{ width: cardW }} className="shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Zonas de clic invisibles en los bordes */}
        <button
          type="button"
          aria-label="Producto anterior"
          onClick={anterior}
          className="absolute inset-y-0 left-0 z-10 w-10 cursor-pointer bg-transparent"
        />
        <button
          type="button"
          aria-label="Producto siguiente"
          onClick={siguiente}
          className="absolute inset-y-0 right-0 z-10 w-10 cursor-pointer bg-transparent"
        />
      </div>

      {/* Puntos clicables */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al producto ${i + 1}`}
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
