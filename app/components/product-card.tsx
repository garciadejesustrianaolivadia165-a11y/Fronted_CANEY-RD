import { Link } from "react-router";
import type { Product } from "~/types/product";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${star <= rating ? "fill-warning-400" : "fill-neutral-200"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const currency = product.currency ?? "RD$";

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-neutral-400/40 transition-shadow duration-300 hover:shadow-2xl hover:shadow-neutral-500/50">
      {/* Imagen: los botones solo aparecen al pasar el mouse */}
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {/* Sombreado de la imagen al hacer hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
        <div className="absolute inset-0 flex translate-y-2 flex-col items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            to={`/checkout/carrito?producto=${product.id}`}
            className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-secondary-50 shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary-500 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
          >
            <img
              src="/images/image_home/Icono_01.png"
              alt=""
              aria-hidden
              className="h-5 w-5"
            />
            Comprar Ahora
          </Link>
          <Link
            to={`/marketplace/producto/${product.id}`}
            className="flex items-center gap-2 rounded-full bg-primary-400/90 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-primary-400 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
          >
            <img
              src="/images/image_home/Icono_02.png"
              alt=""
              aria-hidden
              className="h-5 w-5"
            />
            Ver mas detalles
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-white/15 active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
          >
            <img
              src="/images/image_home/Icono_03.png"
              alt=""
              aria-hidden
              className="h-5 w-5"
            />
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* Vendedor y datos del producto */}
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              {product.seller.name}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {product.seller.location}
            </p>
          </div>
        </div>

        <p className="text-sm font-medium text-neutral-800">{product.name}</p>

        <div className="flex items-end justify-between">
          <Stars rating={product.rating} />
          <div className="text-right">
            <p className="text-xs text-neutral-500">A partir de</p>
            <p className="text-lg font-bold text-neutral-900">
              {currency}{product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={
            product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          className={`mt-1 ${product.isFavorite ? "text-error-500" : "text-neutral-300"} transition-colors hover:text-error-400`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
