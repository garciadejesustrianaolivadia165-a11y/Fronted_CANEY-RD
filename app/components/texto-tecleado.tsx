import { useEffect, useState } from "react";

/**
 * Escribe el texto carácter a carácter al montarse, con un cursor parpadeante
 * en el verde de la paleta. El texto completo queda siempre en el DOM para
 * lectores de pantalla y buscadores; lo que se anima es una copia decorativa.
 */
export default function TextoTecleado({
  texto,
  velocidad = 38,
  retraso = 250,
  className = "",
  claseCursor = "",
}: {
  texto: string;
  /** milisegundos por carácter */
  velocidad?: number;
  /** espera antes de empezar a escribir, en ms */
  retraso?: number;
  className?: string;
  claseCursor?: string;
}) {
  const [escritos, setEscritos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sinMovimiento) {
      setEscritos(texto.length);
      setTerminado(true);
      return;
    }

    setEscritos(0);
    setTerminado(false);

    let intervalo = 0;
    const inicio = window.setTimeout(() => {
      intervalo = window.setInterval(() => {
        setEscritos((n) => {
          if (n >= texto.length) {
            window.clearInterval(intervalo);
            setTerminado(true);
            return n;
          }
          return n + 1;
        });
      }, velocidad);
    }, retraso);

    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(intervalo);
    };
  }, [texto, velocidad, retraso]);

  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {texto.slice(0, escritos)}
        <span
          className={`ml-1 inline-block w-[0.07em] self-stretch bg-primary-600 align-[-0.12em] ${
            terminado ? "animate-parpadeo" : ""
          } ${claseCursor}`}
          style={{ height: "0.95em" }}
        />
      </span>
    </span>
  );
}
