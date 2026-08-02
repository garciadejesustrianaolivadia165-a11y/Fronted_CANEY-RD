import { Link } from "react-router";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  to?: string; // si se pasa, se renderiza como enlace
  variant?: "primary" | "outline" | "soft";
  className?: string;
  onClick?: () => void;
};

// Todos los botones comparten el efecto del login:
// hover = crece + sombra; clic = invierte colores
const variants = {
  primary:
    "bg-primary-600 text-secondary-50 hover:bg-primary-500 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800",
  outline:
    "border-2 border-primary-500 text-primary-600 bg-white/70 hover:bg-primary-50 active:bg-primary-600 active:text-white active:border-primary-600",
  soft: "bg-white/40 text-neutral-900 backdrop-blur-sm hover:bg-white/60 active:bg-primary-600 active:text-white",
};

export default function Button({ children, to, variant = "primary", className = "", onClick }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-3 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
