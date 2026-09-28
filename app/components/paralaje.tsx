import { useEffect } from "react";

/**
 * Da efecto de paralaje a cualquier elemento que lleve `data-paralaje="0.15"`
 * dentro de la vista donde se monte este componente. No envuelve nada, así que
 * no altera la maquetación: solo aplica un `transform` al hacer scroll.
 *
 * El valor es la fracción del desplazamiento: 0.05 se mueve poco (fondo lejano)
 * y 0.25 bastante (primer plano). Un valor negativo lo mueve en sentido contrario.
 */
export default function Paralaje() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elementos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-paralaje]"),
    );
    if (elementos.length === 0) return;

    // Centro de cada elemento en coordenadas del documento, medido sin
    // transformación para que leer y escribir no se retroalimenten
    const centros = new Map<HTMLElement, number>();

    function medir() {
      for (const el of elementos) {
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        centros.set(el, r.top + window.scrollY + r.height / 2);
      }
    }

    let pendiente = 0;

    function actualizar() {
      const centroPantalla = window.scrollY + window.innerHeight / 2;
      for (const el of elementos) {
        const velocidad = Number(el.dataset.paralaje) || 0;
        const centro = centros.get(el);
        if (centro === undefined) continue;
        const distancia = centro - centroPantalla;
        const desplazamiento = -distancia * velocidad;
        el.style.transform = `translate3d(0, ${desplazamiento.toFixed(2)}px, 0)`;
      }
      pendiente = 0;
    }

    function alScroll() {
      if (!pendiente) pendiente = requestAnimationFrame(actualizar);
    }

    for (const el of elementos) {
      el.style.willChange = "transform";
    }

    medir();
    actualizar();

    let temporizador = 0;
    function alRedimensionar() {
      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => {
        medir();
        actualizar();
      }, 150);
    }

    // Las fotos cambian la altura de la página al terminar de cargar
    window.addEventListener("load", alRedimensionar);
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alRedimensionar);

    return () => {
      cancelAnimationFrame(pendiente);
      window.clearTimeout(temporizador);
      window.removeEventListener("load", alRedimensionar);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alRedimensionar);
      for (const el of elementos) {
        el.style.transform = "";
        el.style.willChange = "";
      }
    };
  }, []);

  return null;
}
