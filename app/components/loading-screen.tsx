export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-caney-dark">
      <img
        src="/logos/Logotipo_BANEY_SVG.svg"
        alt="BANEY"
        className="w-36 md:w-44"
      />
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-secondary-50/20 border-t-secondary2-300"
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}