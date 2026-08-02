export default function SearchHeader() {
  return (
    <div className="flex items-center gap-4">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 items-center gap-3 rounded-full border border-neutral-200 bg-white px-6 py-3.5 shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 shrink-0 text-neutral-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="BUSCAR AQUI..."
          className="w-full bg-transparent text-sm tracking-wide text-neutral-800 outline-none placeholder:text-xs placeholder:text-neutral-400"
        />
      </form>
      <button
        type="button"
        aria-label="Filtrar"
        className="flex h-12 w-12 items-center justify-center text-neutral-500 transition-all duration-200 hover:scale-110 hover:text-primary-400"
      >
        <img
          src="/images/image_rutas/btn_filter.png"
          alt=""
          aria-hidden
          className="h-6 w-auto"
        />
      </button>
    </div>
  );
}
