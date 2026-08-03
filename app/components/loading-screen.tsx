export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-caney-dark">
      <img
        src="/logos/Logotipo_BANEY_SVG.svg"
        alt="BANEY"
        className="w-36 md:w-44"
      />
      {/* Anillo degradado con punta redondeada, como Component 1 del Figma */}
      <svg
        viewBox="0 0 56 56"
        role="status"
        aria-label="Cargando"
        className="h-16 w-16 animate-spin"
      >
        <defs>
          <linearGradient id="spinner-baney" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b4926" />
            <stop offset="55%" stopColor="#cdaf86" />
            <stop offset="100%" stopColor="#f5ede0" />
          </linearGradient>
        </defs>
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="url(#spinner-baney)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="104 34"
        />
      </svg>
    </div>
  );
}
