import { useEffect, useRef } from "react";

/**
 * Rejilla de puntos que reacciona al cursor, como fondo de toda la página.
 * Va en una capa fija detrás del contenido y no captura ningún clic.
 * Colores tomados de la paleta BANEY (verdes primary / secondary4).
 */

const SEPARACION = 26; // distancia entre puntos, en px
const RADIO_BASE = 1.2;
const RADIO_MAX = 3.4;
const ALCANCE = 320; // radio del halo que sigue al cursor, en px
const EMPUJE = 14; // cuánto se aparta un punto del centro, en px
const SEGUIMIENTO = 0.24; // qué tan rápido alcanza el halo al cursor (0-1)

// primary-400, primary-600 y secondary4-400 de app.css
const VERDES: [number, number, number][] = [
  [93, 127, 77],
  [54, 74, 45],
  [158, 170, 49],
];

export default function FondoPuntos() {
  const refLienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const lienzo = refLienzo.current;
    if (!lienzo) return;
    const ctx = lienzo.getContext("2d");
    if (!ctx) return;

    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ancho = 0;
    let alto = 0;
    let columnas = 0;
    let filas = 0;
    let puntos: { x: number; y: number; color: [number, number, number] }[] = [];

    // Posición real del cursor y la suavizada que se dibuja
    const cursor = { x: -9999, y: -9999 };
    const suave = { x: -9999, y: -9999 };
    let dentro = false;

    function construir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      lienzo!.width = Math.floor(ancho * dpr);
      lienzo!.height = Math.floor(alto * dpr);
      lienzo!.style.width = `${ancho}px`;
      lienzo!.style.height = `${alto}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rejilla guardada por filas y columnas para poder recorrer solo la
      // porción que cae bajo el halo del cursor
      const margen = SEPARACION / 2;
      columnas = Math.ceil((ancho - margen) / SEPARACION);
      filas = Math.ceil((alto - margen) / SEPARACION);
      puntos = new Array(columnas * filas);
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          // Un tercio de los puntos usa un verde distinto para dar textura
          const i = (c + f) % 7;
          const color = VERDES[i === 0 ? 2 : i % 3 === 0 ? 1 : 0];
          puntos[f * columnas + c] = {
            x: margen + c * SEPARACION,
            y: margen + f * SEPARACION,
            color,
          };
        }
      }
    }

    // Sube a 1 cuando el cursor entra y baja a 0 cuando sale, para que el
    // halo aparezca y desaparezca en vez de cortarse de golpe
    let intensidad = 0;

    function dibujar() {
      ctx!.clearRect(0, 0, ancho, alto);

      // El cursor persigue con retraso para que el movimiento se sienta fluido
      suave.x += (cursor.x - suave.x) * SEGUIMIENTO;
      suave.y += (cursor.y - suave.y) * SEGUIMIENTO;
      intensidad += ((dentro ? 1 : 0) - intensidad) * 0.13;

      if (intensidad < 0.01) return; // sin cursor no se dibuja nada

      // Solo recorremos los puntos que caen dentro del halo
      const desdeCol = Math.max(0, Math.floor((suave.x - ALCANCE) / SEPARACION));
      const hastaCol = Math.min(columnas - 1, Math.ceil((suave.x + ALCANCE) / SEPARACION));
      const desdeFila = Math.max(0, Math.floor((suave.y - ALCANCE) / SEPARACION));
      const hastaFila = Math.min(filas - 1, Math.ceil((suave.y + ALCANCE) / SEPARACION));

      for (let f = desdeFila; f <= hastaFila; f++) {
        for (let c = desdeCol; c <= hastaCol; c++) {
          const p = puntos[f * columnas + c];
          if (!p) continue;

          const dx = p.x - suave.x;
          const dy = p.y - suave.y;
          const dist = Math.hypot(dx, dy);
          if (dist > ALCANCE) continue;

          // 1 justo bajo el cursor, 0 en el borde del halo
          const t = 1 - dist / ALCANCE;
          const fuerza = t * t;

          const radio = RADIO_BASE + (RADIO_MAX - RADIO_BASE) * fuerza;
          const alfa = 0.95 * fuerza * intensidad;
          if (alfa < 0.01) continue;

          let x = p.x;
          let y = p.y;
          if (dist > 0.001) {
            const desplazamiento = EMPUJE * fuerza;
            x += (dx / dist) * desplazamiento;
            y += (dy / dist) * desplazamiento;
          }

          const [r, g, b] = p.color;
          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alfa})`;
          ctx!.arc(x, y, radio, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    let animacion = 0;
    function bucle() {
      dibujar();
      animacion = requestAnimationFrame(bucle);
    }

    function alMover(e: PointerEvent) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (!dentro) {
        // Evita que los puntos salten desde la última posición conocida
        suave.x = e.clientX;
        suave.y = e.clientY;
        dentro = true;
      }
    }

    function alSalir() {
      dentro = false;
    }

    // Sin animación: el halo salta directo a la posición del cursor
    function alMoverSinAnimacion(e: PointerEvent) {
      cursor.x = suave.x = e.clientX;
      cursor.y = suave.y = e.clientY;
      dentro = true;
      intensidad = 1;
      dibujar();
    }

    function alSalirSinAnimacion() {
      dentro = false;
      intensidad = 0;
      ctx!.clearRect(0, 0, ancho, alto);
    }

    construir();
    dibujar();

    if (sinMovimiento) {
      window.addEventListener("pointermove", alMoverSinAnimacion, { passive: true });
      window.addEventListener("pointerleave", alSalirSinAnimacion);
    } else {
      window.addEventListener("pointermove", alMover, { passive: true });
      window.addEventListener("pointerleave", alSalir);
      animacion = requestAnimationFrame(bucle);
    }

    let temporizador = 0;
    function alRedimensionar() {
      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => {
        construir();
        dibujar();
      }, 120);
    }
    window.addEventListener("resize", alRedimensionar);

    return () => {
      cancelAnimationFrame(animacion);
      window.clearTimeout(temporizador);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerleave", alSalir);
      window.removeEventListener("pointermove", alMoverSinAnimacion);
      window.removeEventListener("pointerleave", alSalirSinAnimacion);
      window.removeEventListener("resize", alRedimensionar);
    };
  }, []);

  return (
    <canvas
      ref={refLienzo}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none"
    />
  );
}
