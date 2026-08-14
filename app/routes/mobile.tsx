import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GoogleButton from "~/components/ui/google-button";

// ============================================================
// BANEY Mobile — Vista preliminar funcional de la Fase 1
// Una sola ruta con máquina de estados: cada "vista" del flujo
// móvil es un estado; la navegación simula la app real.
// ============================================================

const IMGM = "/images/image_mobile";
const IMGH = "/images/image_home";

type Vista =
  | "carga"
  | "onboarding"
  | "rol"
  | "busca"
  | "auth"
  | "mapa"
  | "solicitud"
  | "confirmada"
  | "tracking"
  | "historial"
  | "alertas"
  | "dashT"
  | "mapaT"
  | "flota"
  | "perfilT";

type Rol = "cliente" | "transportista" | "proveedor" | null;

const slides = [
  {
    img: `${IMGM}/Logística Inteligente.png`,
    titulo: "La Logística inteligente en RD",
    texto:
      "Optimizamos el transporte, gestion de productos y servicios, apertura al mercado y conectar con quienes te necesitan.",
  },
  {
    img: `${IMGM}/Para Productores.png`,
    titulo: "Para Productores",
    texto:
      "Optimiza tus viajes de retorno. Publica tu disponibilidad y nunca regreses con el camión vacío.",
  },
  {
    img: `${IMGM}/Para Clientes y Constructores.png`,
    titulo: "Para Clientes y Constructores",
    texto:
      "Solicita transporte de materiales en segundos. Encuentra camiones regresando vacíos y ahorra costos.",
  },
  {
    img: `${IMGM}/Para Transportistas.png`,
    titulo: "Para Transportistas",
    texto:
      "Optimiza tus viajes de retorno. Publica tu disponibilidad y nunca regreses con el camión vacío.",
  },
];

const MAPA_SRC =
  "https://maps.google.com/maps?q=Santo%20Domingo%2C%20Republica%20Dominicana&z=14&output=embed";

function IconoNav({ d, activo }: { d: string; activo: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${activo ? "text-primary-700" : "text-neutral-400"}`}
    >
      <path d={d} />
    </svg>
  );
}

const ICONOS = {
  inicio: "M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5",
  historial: "M12 8v4l3 2M21 12a9 9 0 1 1-9-9c3.6 0 6.7 2.1 8.1 5.1M21 3v5h-5",
  alertas: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  perfil: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
  dashboard: "M4 19l4-6 4 3 4-7 4 4M4 5h16",
  mapa: "M9 4l6 2 6-2v14l-6 2-6-2-6 2V6l6-2zM9 4v14M15 6v14",
  flota: "M2 16V6h11v10M13 9h5l3 4v3h-3M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
};

function NavInferior({
  items,
  activa,
  onIr,
}: {
  items: { vista: Vista; label: string; icono: string }[];
  activa: Vista;
  onIr: (v: Vista) => void;
}) {
  return (
    <nav className="sticky bottom-0 z-20 mt-auto border-t border-neutral-100 bg-white px-2 pb-3 pt-2">
      <div className="relative flex items-end justify-between">
        {items.slice(0, 2).map((it) => (
          <BotonNav key={it.vista} it={it} activa={activa} onIr={onIr} />
        ))}
        <button
          type="button"
          aria-label="Nueva solicitud"
          onClick={() => onIr(items[0].vista)}
          className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-2xl text-white shadow-[0_0_0_6px_rgba(236,138,60,0.25)] transition-transform hover:scale-110"
        >
          +
        </button>
        {items.slice(2).map((it) => (
          <BotonNav key={it.vista} it={it} activa={activa} onIr={onIr} />
        ))}
      </div>
    </nav>
  );
}

function BotonNav({
  it,
  activa,
  onIr,
}: {
  it: { vista: Vista; label: string; icono: string };
  activa: Vista;
  onIr: (v: Vista) => void;
}) {
  const activo = activa === it.vista;
  return (
    <button
      type="button"
      onClick={() => onIr(it.vista)}
      className="flex w-16 flex-col items-center gap-1"
    >
      <IconoNav d={it.icono} activo={activo} />
      <span
        className={`text-[10px] ${activo ? "font-semibold text-primary-700" : "text-neutral-400"}`}
      >
        {it.label}
      </span>
    </button>
  );
}

// Verde oliva de titulares y CTA en las vistas 3, 4 y 5: #3D4D18
// (va literal en las clases porque Tailwind necesita el valor en el código)

// Fondo de campo compartido por las vistas de rol, búsqueda y login:
// se dibuja igual en las tres para que empalmen al pasar de una a otra.
function FondoCampo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[440px] select-none"
    >
      <img
        src={`${IMGM}/fondo_campo.png`}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white/85 to-transparent" />
    </div>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 shrink-0 text-[#B9C0CB]"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

// Card de opción de las vistas 3 y 5 (misma forma, colores y tipografía)
function CardOpcion({
  img,
  titulo,
  texto,
  onClick,
}: {
  img: string;
  titulo: string;
  texto: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-[18px] bg-white px-5 py-5 text-left shadow-[0_6px_24px_rgba(20,30,15,0.10)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(20,30,15,0.16)]"
    >
      <img
        src={img}
        alt=""
        aria-hidden
        className="h-16 w-16 shrink-0 rounded-full object-cover"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-bold leading-tight text-[#16202E]">
          {titulo}
        </span>
        <span className="mt-1.5 block text-[13px] leading-snug text-[#6B7688]">
          {texto}
        </span>
      </span>
      <Chevron />
    </button>
  );
}

// Aviso inferior de las vistas 3 y 5
function AvisoRol() {
  return (
    <div className="relative z-10 mt-auto flex items-start gap-2.5 rounded-2xl bg-[#F1F4EF]/95 px-4 py-3.5 shadow-[0_4px_18px_rgba(20,30,15,0.10)] backdrop-blur-sm">
      <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-secondary4-500 text-[10px] font-bold leading-none text-white">
        i
      </span>
      <p className="text-[12px] leading-relaxed text-[#6B7688]">
        Podrás cambiar de rol o registrar flotas adicionales más tarde desde tu
        perfil de configuración.
      </p>
    </div>
  );
}

const ICONO_CAMPO = {
  correo: "M3 7l9 6 9-6M3 5h18v14H3z",
  clave: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v10H5z",
  texto: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
};

function Campo({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  const [verClave, setVerClave] = useState(false);
  const esClave = type === "password";
  const icono =
    type === "email" ? ICONO_CAMPO.correo : esClave ? ICONO_CAMPO.clave : ICONO_CAMPO.texto;

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#2B3620]">
        {label}
      </label>
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F1F4F2] px-4 py-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-[18px] w-[18px] shrink-0 text-[#8C9A8B]"
        >
          <path d={icono} />
        </svg>
        <input
          type={esClave && verClave ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-[#9AA69C]"
        />
        {esClave && (
          <button
            type="button"
            onClick={() => setVerClave((v) => !v)}
            aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="shrink-0 text-[#8C9A8B] transition-colors hover:text-[#3D4D18]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px]"
            >
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
              {!verClave && <path d="M4 20L20 4" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function meta() {
  return [{ title: "BANEY Mobile | Fase 1" }];
}

export default function Mobile() {
  const navigate = useNavigate();
  const [vista, setVista] = useState<Vista>("carga");
  const [slide, setSlide] = useState(0);
  const [rol, setRol] = useState<Rol>(null);
  const [busca, setBusca] = useState<"transportista" | "productor" | null>(null);
  const [modoAuth, setModoAuth] = useState<"login" | "registro">("registro");
  const [material, setMaterial] = useState("Materiales");
  const [prog, setProg] = useState("Ahora");
  const [camion, setCamion] = useState("Mack #23");
  const [horario, setHorario] = useState("Ahora mismo");
  const [tabHistorial, setTabHistorial] = useState("Completados");

  // Splash: pasa solo al onboarding
  useEffect(() => {
    if (vista !== "carga") return;
    const t = setTimeout(() => setVista("onboarding"), 2500);
    return () => clearTimeout(t);
  }, [vista]);

  // Tras iniciar sesión / registrarse, el destino depende del rol elegido
  function completarAuth() {
    if (rol === "proveedor") {
      navigate("/dashboard");
    } else if (rol === "transportista") {
      setVista("dashT");
    } else if (busca === "productor") {
      navigate("/marketplace");
    } else {
      setVista("mapa");
    }
  }

  const navCliente = [
    { vista: "mapa" as Vista, label: "Inicio", icono: ICONOS.inicio },
    { vista: "historial" as Vista, label: "Historial", icono: ICONOS.historial },
    { vista: "alertas" as Vista, label: "Alertas", icono: ICONOS.alertas },
    { vista: "perfilT" as Vista, label: "Perfil", icono: ICONOS.perfil },
  ];
  const navTransportista = [
    { vista: "dashT" as Vista, label: "Dashboard", icono: ICONOS.dashboard },
    { vista: "mapaT" as Vista, label: "Mapa", icono: ICONOS.mapa },
    { vista: "flota" as Vista, label: "Flota", icono: ICONOS.flota },
    { vista: "perfilT" as Vista, label: "Perfil", icono: ICONOS.perfil },
  ];
  const navActual = rol === "transportista" ? navTransportista : navCliente;

  return (
    <div className="flex min-h-screen items-start justify-center bg-neutral-200 py-8 font-inter">
      {/* Salir de la vista móvil */}
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 shadow-lg transition-all hover:scale-110 hover:text-primary-400"
        aria-label="Salir de la vista móvil"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="h-4 w-4">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Marco del teléfono */}
      <div className="relative flex min-h-[860px] w-full max-w-[420px] flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
        {/* ============ VISTA 1: CARGA ============ */}
        {vista === "carga" && (
          <div className="flex flex-1 flex-col items-center bg-caney-dark px-8">
            {/* Bloque central: hoja + BANEY RD + lema */}
            <div className="-mt-16 flex flex-1 flex-col items-center justify-center">
              <img
                src="/logos/Logotipo_BANEY_SVG.svg"
                alt=""
                aria-hidden
                className="w-32 drop-shadow-md"
              />
              <img
                src="/images/image_mobile/baney_white.png"
                alt="BANEY"
                className="mt-6 h-16 w-auto"
              />
              <p className="mt-5 text-[15px] text-neutral-300">
                Logística inteligente.
              </p>
            </div>

            {/* Spinner inferior */}
            <div className="flex flex-col items-center gap-3 pb-16">
              <svg viewBox="0 0 56 56" className="h-11 w-11 animate-spin">
                <defs>
                  <linearGradient id="spin-m" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  stroke="url(#spin-m)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="104 34"
                />
              </svg>
              <p className="text-sm text-neutral-400">Cargando…</p>
            </div>
          </div>
        )}

        {/* ============ VISTA 2: ONBOARDING (carrusel) ============ */}
        {vista === "onboarding" && (
          <div className="relative flex flex-1 flex-col overflow-hidden bg-white font-sans">
            {/* Manchas decorativas oficiales (public/images) */}
            <img
              src="/images/BlobsVector_01_login.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -top-8 left-[118px] z-20 w-[302px] select-none"
            />

            {/* Pista del carrusel: imagen + textos se desplazan juntos */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {slides.map((s) => (
                  <div key={s.titulo} className="flex h-full w-full shrink-0 flex-col">
                    {/* Imagen a sangre (llega a los bordes del marco) */}
                    <div className="relative h-[470px] shrink-0 overflow-hidden rounded-b-[2.5rem]">
                      <img
                        src={s.img}
                        alt={s.titulo}
                        className="h-full w-full object-cover"
                      />
                      {/* Desvanecido hacia el fondo blanco */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/85 to-transparent"
                      />
                    </div>

                    {/* Textos centrados */}
                    <div className="flex flex-1 flex-col items-center px-9 pt-14">
                      <h2 className="text-center text-[26px] font-bold leading-tight text-caney-dark">
                        {s.titulo}
                      </h2>
                      <p className="mt-4 max-w-[16rem] text-center text-[13px] leading-relaxed text-caney-dark/55">
                        {s.texto}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slicer: pastilla ancha = lámina activa */}
              <div className="absolute inset-x-0 top-[492px] z-30 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Lámina ${i + 1}`}
                    aria-current={i === slide}
                    onClick={() => setSlide(i)}
                    className={`h-[7px] rounded-full bg-secondary4-600 transition-all duration-300 ${
                      i === slide ? "w-6" : "w-[7px] opacity-80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="z-30 flex items-center gap-4 px-8 pb-12">
              {slide < slides.length - 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setVista("rol")}
                    className="text-[15px] font-bold text-caney-dark transition-all hover:scale-105 hover:text-secondary4-600"
                  >
                    Omitir
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlide((s) => Math.min(s + 1, slides.length - 1))}
                    className="ml-auto flex items-center gap-3 rounded-full bg-[#9ba671] px-9 py-3.5 text-[15px] font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#9ba671] active:shadow-none active:ring-2 active:ring-[#9ba671]"
                  >
                    Siguiente
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setVista("rol")}
                  className="w-full rounded-full bg-[#9ba671] px-9 py-3.5 text-[15px] font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#9ba671] active:shadow-none active:ring-2 active:ring-[#9ba671]"
                >
                  Comenzar Ahora
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============ VISTA 3: ROL ============ */}
        {vista === "rol" && (
          <div className="relative flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-12">
            <FondoCampo />

            <h2 className="relative z-10 font-sans text-[30px] font-bold leading-[1.2] text-[#3D4D18]">
              Cuéntanos un poco sobre ti
            </h2>
            <p className="relative z-10 mt-3 text-[15px] text-[#7E8A80]">
              ¿Cómo planeas usar Baney RD?
            </p>

            <div className="relative z-10 -mx-3 mt-8 space-y-5">
              {[
                {
                  rol: "cliente" as Rol,
                  titulo: "Soy Cliente",
                  texto:
                    "Necesito transportar materiales, adquirir productos o encontrar suplidores.",
                  img: `${IMGH}/image_home_02.png`,
                },
                {
                  rol: "transportista" as Rol,
                  titulo: "Soy Transportista",
                  texto: "Tengo camiones o equipos y quiero ofrecer mis servicios.",
                  img: `${IMGM}/truck image.png`,
                },
                {
                  rol: "proveedor" as Rol,
                  titulo: "Soy Proveedor",
                  texto: "Deseo ofrecer mis productos y abrir mi marca al mercado.",
                  img: `${IMGH}/image_home_01.png`,
                },
              ].map((c) => (
                <CardOpcion
                  key={c.titulo}
                  img={c.img}
                  titulo={c.titulo}
                  texto={c.texto}
                  onClick={() => {
                    setRol(c.rol);
                    setVista(c.rol === "cliente" ? "busca" : "auth");
                  }}
                />
              ))}
            </div>

            <AvisoRol />
          </div>
        )}

        {/* ============ VISTA 5: ¿QUÉ BUSCAS? (cliente) ============ */}
        {vista === "busca" && (
          <div className="relative flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-12">
            <FondoCampo />

            <h2 className="relative z-10 font-sans text-[30px] font-bold leading-[1.2] text-[#3D4D18]">
              ¡Excelente! ¿Cuéntanos, qué estás buscando?
            </h2>
            <p className="relative z-10 mt-3 text-[15px] text-[#7E8A80]">
              ¿Cómo planeas usar Baney RD?
            </p>

            <div className="relative z-10 -mx-3 mt-8 space-y-5">
              <CardOpcion
                img={`${IMGM}/truck image.png`}
                titulo="Logística Inteligente"
                texto="Tengo camiones o equipos y quiero ofrecer mis servicios."
                onClick={() => {
                  setBusca("transportista");
                  setVista("auth");
                }}
              />
              <CardOpcion
                img={`${IMGH}/image_home_01.png`}
                titulo="Productos y Servicios"
                texto="Deseo ofrecer mis productos y abrir mi marca al mercado."
                onClick={() => {
                  setBusca("productor");
                  setVista("auth");
                }}
              />
            </div>

            <AvisoRol />
          </div>
        )}

        {/* ============ VISTA 4: LOGIN / REGISTRO ============ */}
        {vista === "auth" && (
          <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-16">
            <img
              src="/images/BlobsVector_01_login.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-6 z-0 w-44 select-none"
            />
            <FondoCampo />

            <h2 className="relative z-10 font-sans text-[30px] font-bold leading-tight text-[#3D4D18]">
              {modoAuth === "registro" ? "Crear cuenta" : "Bienvenido"}
            </h2>
            <p className="relative z-10 mt-1.5 text-[14px] text-[#7E8A80]">
              {modoAuth === "registro"
                ? "Regístrate para gestionar tu logística hoy."
                : "Ingresa para gestionar tu logística hoy."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                completarAuth();
              }}
              className="relative z-10 mt-6 space-y-4"
            >
              {modoAuth === "registro" && (
                <>
                  <Campo label="Nombre" placeholder="Ej: Maria" />
                  <Campo label="Apellido" placeholder="Ej: Garcia" />
                  <Campo label="Cédula" placeholder="000-0000000-0" />
                  <Campo label="Numero telefónico" placeholder="(000)-000-0000" type="tel" />
                </>
              )}
              <Campo label="Correo electrónico" placeholder="nombre@ejemplo.com" type="email" />
              <Campo label="Contraseña" placeholder="••••••••" type="password" />

              <p className="text-right text-[12px] font-semibold text-[#3D4D18]">
                ¿Olvidaste tu contraseña?
              </p>

              <button
                type="submit"
                className="w-full rounded-full bg-[#3D4D18] py-3.5 font-sans text-[15px] font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#3D4D18] active:shadow-none active:ring-2 active:ring-[#3D4D18]"
              >
                {modoAuth === "registro" ? "Registrarse" : "Iniciar Sesión"}
              </button>

              <p className="pt-1 text-center text-[12px] text-[#7E8A80]">
                o continúa con
              </p>
              <div className="flex justify-center gap-3">
                {/* Mismo botón de Google que el login/registro web (dos veces en registro) */}
                {(modoAuth === "registro" ? [0, 1] : [0]).map((i) => (
                  <GoogleButton
                    key={i}
                    translucido
                    onClick={completarAuth}
                    className="rounded-full px-6 py-3 text-[13px] shadow-md transition-all hover:scale-105 hover:shadow-lg"
                  />
                ))}
              </div>
            </form>

            <p className="relative z-10 pt-8 text-center text-[13px] text-[#3F4A33]">
              {modoAuth === "registro" ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
              <button
                type="button"
                onClick={() => setModoAuth((m) => (m === "registro" ? "login" : "registro"))}
                className="font-bold text-[#3D4D18] underline"
              >
                {modoAuth === "registro" ? "Inicia Sesión" : "Regístrate"}
              </button>
            </p>
          </div>
        )}

        {/* ============ VISTA 6: MAPA CLIENTE ============ */}
        {vista === "mapa" && (
          <>
            <div className="relative h-[500px] shrink-0 bg-neutral-100">
              <iframe
                title="Mapa de camiones disponibles"
                src={MAPA_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />

              {/* Buscador + filtro — mismo visual que el buscador de la web */}
              <div className="absolute inset-x-5 top-5 z-10 flex items-center gap-3">
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
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-neutral-400"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    placeholder="¿A dónde enviamos hoy?"
                    className="w-full bg-transparent text-sm tracking-wide text-neutral-800 outline-none placeholder:text-xs placeholder:text-neutral-400"
                  />
                </form>
                <button
                  type="button"
                  aria-label="Filtrar"
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                >
                  <img
                    src="/images/image_rutas/btn_filter.png"
                    alt=""
                    aria-hidden
                    className="h-6 w-auto"
                  />
                </button>
              </div>

              {/* Oportunidad del día */}
              <div className="absolute inset-x-5 top-[92px] z-10 flex items-center gap-3.5 rounded-[34px] bg-[#4A5720]/75 px-4 py-4 shadow-[0_10px_28px_rgba(20,30,15,0.28)] backdrop-blur-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/25">
                  <svg viewBox="0 0 24 24" fill="#F59E0B" aria-hidden className="h-5 w-5">
                    <path d="M12 2c1 3-1.5 4.5-1.5 7A3.5 3.5 0 0 0 14 12c1.5 0 2-1 2-1 .8 1.2 1.5 2.5 1.5 4a5.5 5.5 0 1 1-11 0c0-4.5 4-6.5 5.5-13z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 text-white">
                  <span className="block text-[13px] leading-tight text-white/75">
                    Oportunidad hoy
                  </span>
                  <span className="mt-0.5 block text-[17px] font-bold leading-[1.25]">
                    3 camiones en La Romana
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setVista("solicitud")}
                  className="w-[72px] shrink-0 rounded-2xl bg-warning-500 px-3 py-2.5 text-center text-[15px] font-bold leading-tight text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-warning-500 active:shadow-none active:ring-2 active:ring-warning-500"
                >
                  Ver ahora
                </button>
              </div>
            </div>

            {/* Panel de camiones cercanos */}
            <div className="relative z-10 -mt-8 flex-1 rounded-t-[38px] bg-white px-5 pb-4 pt-7 shadow-[0_-14px_44px_rgba(20,30,15,0.22)]">
              <div className="flex items-center justify-between">
                <h3 className="text-[19px] font-bold text-[#16202E]">
                  Camiones cercanos
                </h3>
                <button
                  type="button"
                  className="text-[14px] font-semibold text-[#4A5720] transition-all hover:scale-105"
                >
                  Ver todos
                </button>
              </div>

              <button
                type="button"
                onClick={() => setVista("solicitud")}
                className="mt-4 flex w-full items-start gap-3.5 rounded-2xl border border-[#EDEFEB] bg-white p-4 text-left shadow-[0_4px_16px_rgba(20,30,15,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(20,30,15,0.14)]"
              >
                <img
                  src={`${IMGM}/truck image.png`}
                  alt="Camión volteo"
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold leading-tight text-[#16202E]">
                    Camión Volteo (12m³)
                  </span>
                  <span className="mt-1.5 flex items-center gap-1 text-[12px] text-[#6B7688]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5 shrink-0">
                      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    Santo Domingo Este • 2km
                  </span>
                  <span className="mt-2 flex items-center gap-2">
                    <span className="text-[15px] font-bold text-[#4A5720]">RD$ 4,500</span>
                    <span className="rounded-md bg-[#F1F3F0] px-2 py-0.5 text-[11px] text-[#6B7688]">
                      Precio est.
                    </span>
                  </span>
                </span>
                <span className="shrink-0 rounded-md bg-success-100 px-2.5 py-1 text-[11px] font-semibold text-success-700">
                  Disponible
                </span>
              </button>

              <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-[#EDEFEB] bg-white p-4 shadow-[0_4px_16px_rgba(20,30,15,0.07)]">
                <span className="h-14 w-14 shrink-0 rounded-full bg-[#C4C4C4]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold leading-tight text-[#16202E]">
                    Plataforma (20 Tons)
                  </span>
                  <span className="mt-1.5 block text-[13px] text-[#6B7688]">
                    Camino a Santiago
                  </span>
                </span>
                <span className="shrink-0 rounded-md bg-warning-100 px-2.5 py-1 text-[11px] font-semibold leading-tight text-warning-800">
                  En 45
                  <br />
                  min
                </span>
              </div>
            </div>
            <NavInferior items={navCliente} activa="mapa" onIr={setVista} />
          </>
        )}

        {/* ============ VISTA 7: SOLICITAR TRANSPORTE ============ */}
        {vista === "solicitud" && (
          <>
            <header className="flex items-center gap-4 border-b border-[#EDEFEB] px-5 py-5">
              <button
                type="button"
                aria-label="Volver"
                onClick={() => setVista("mapa")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E3E6E0] text-[#16202E] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-[#4A5720] active:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <h2 className="flex-1 pr-10 text-center text-[17px] font-bold text-[#16202E]">
                Solicitar Transporte
              </h2>
            </header>

            <div className="flex-1 space-y-6 px-5 py-5">
              {/* Pasos */}
              <div className="flex items-center gap-2">
                {[
                  { n: 1, t: "Ruta", activo: true },
                  { n: 2, t: "Carga", activo: false },
                  { n: 3, t: "Pago", activo: false },
                ].map((p, i) => (
                  <div key={p.n} className="flex items-center gap-2 last:flex-none [&:not(:last-child)]:flex-1">
                    <span
                      className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                        p.activo ? "bg-[#4A5720] text-white" : "bg-[#F1F3F0] text-[#8A93A2]"
                      }`}
                    >
                      {p.n}
                    </span>
                    <span
                      className={`text-[14px] ${
                        p.activo ? "font-bold text-[#16202E]" : "text-[#8A93A2]"
                      }`}
                    >
                      {p.t}
                    </span>
                    {i < 2 && <span className="h-px flex-1 bg-[#E3E6E0]" />}
                  </div>
                ))}
              </div>

              {/* Ruta */}
              <div className="rounded-2xl border border-[#EDEFEB] bg-white px-5 py-5 shadow-[0_4px_16px_rgba(20,30,15,0.06)]">
                <div className="relative flex gap-3.5">
                  <span
                    aria-hidden
                    className="absolute left-[5px] top-4 h-[calc(100%-8px)] w-px bg-[#E3E6E0]"
                  />
                  <span className="relative mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-[#8B9A3A] bg-white" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-[#9AA3AF]">
                      Origen
                    </span>
                    <span className="mt-1 block text-[15px] text-[#16202E]">
                      Av. Abraham Lincoln, Santo Domingo
                    </span>
                    <span className="mt-4 block h-px bg-[#EDEFEB]" />
                  </span>
                </div>
                <div className="mt-4 flex gap-3.5">
                  <svg viewBox="0 0 24 24" fill="#8B9A3A" aria-hidden className="mt-0.5 h-[13px] w-[13px] shrink-0">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-[#9AA3AF]">
                      Destino
                    </span>
                    <span className="mt-1 block text-[15px] text-[#9AA3AF]">
                      ¿Hacia dónde va la carga?
                    </span>
                  </span>
                </div>
              </div>

              {/* Tipo de carga */}
              <div>
                <h3 className="text-[17px] font-bold text-[#16202E]">
                  ¿Qué transportamos?
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { m: "Materiales", d: "M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9zM8 9V7a4 4 0 0 1 8 0v2" },
                    { m: "Agregados", d: "" },
                    { m: "Maquinaria", d: "M7 8h13l-3-3M17 16H4l3 3" },
                    { m: "Otro", d: "" },
                  ].map(({ m, d }) => {
                    const activo = material === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMaterial(m)}
                        className={`flex h-[122px] flex-col items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                          activo
                            ? "border-secondary4-400 bg-secondary4-50"
                            : "border-[#EDEFEB] bg-white shadow-[0_4px_14px_rgba(20,30,15,0.06)]"
                        }`}
                      >
                        {m === "Agregados" ? (
                          <span className="h-6 w-6 rounded-full bg-[#5D6B84]" />
                        ) : m === "Otro" ? (
                          <span className="flex items-end gap-1">
                            {[0, 1, 2].map((k) => (
                              <span key={k} className="h-[6px] w-[6px] rounded-full bg-[#5D6B84]" />
                            ))}
                          </span>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={activo ? "#3F4A20" : "#5D6B84"}
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className="h-6 w-6"
                          >
                            <path d={d} />
                          </svg>
                        )}
                        <span
                          className={`text-[14px] font-semibold ${
                            activo ? "text-[#3F4A20]" : "text-[#5D6B84]"
                          }`}
                        >
                          {m}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Programación */}
              <div>
                <h3 className="text-[17px] font-bold text-[#16202E]">Programación</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { p: "Ahora", d: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
                    { p: "Programar", d: "M4 6h16v14H4zM8 3v4M16 3v4M4 10h16" },
                  ].map(({ p, d }) => {
                    const activo = prog === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProg(p)}
                        className={`flex items-center justify-center gap-2.5 rounded-2xl border-2 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                          activo
                            ? "border-secondary4-400 bg-secondary4-50"
                            : "border-[#EDEFEB] bg-white shadow-[0_4px_14px_rgba(20,30,15,0.06)]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={activo ? "#3F4A20" : "#5D6B84"}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="h-[18px] w-[18px]"
                        >
                          <path d={d} />
                        </svg>
                        <span
                          className={`text-[15px] font-semibold ${
                            activo ? "text-[#3F4A20]" : "text-[#5D6B84]"
                          }`}
                        >
                          {p}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <footer className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-[#EDEFEB] bg-white px-5 py-5">
              <span>
                <span className="block text-[13px] text-[#8A93A2]">Estimado total</span>
                <span className="block text-[22px] font-bold text-[#16202E]">RD$ 4,500</span>
              </span>
              <button
                type="button"
                onClick={() => setVista("confirmada")}
                className="rounded-full bg-[#4A5720] px-9 py-4 text-[15px] font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#4A5720] active:shadow-none active:ring-2 active:ring-[#4A5720]"
              >
                Continuar
              </button>
            </footer>
          </>
        )}

        {/* ============ VISTA 8: SOLICITUD CONFIRMADA ============ */}
        {vista === "confirmada" && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
            {/* Check con anillos concéntricos */}
            <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#EAF8EE]">
              <span className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#D7F2DF]">
                <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#16A34A]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-7 w-7">
                    <path d="M5 13l4.5 4.5L19 7" />
                  </svg>
                </span>
              </span>
            </span>

            <h2 className="mt-7 text-[25px] font-bold text-[#16202E]">
              ¡Solicitud Confirmada!
            </h2>
            <p className="mt-3.5 max-w-[19rem] text-center text-[14px] leading-relaxed text-[#6B7688]">
              Hemos enviado tu solicitud a los transportistas disponibles. Te
              avisaremos en cuanto uno acepte el viaje.
            </p>

            <dl className="mt-8 w-full rounded-2xl border border-[#EDEFEB] bg-white px-5 py-1 shadow-[0_4px_16px_rgba(20,30,15,0.06)]">
              {[
                ["ID de Pedido", "#TR-882190", "text-[#16202E]"],
                ["Transporte", "Volteo 12m³", "text-[#16202E]"],
                ["Precio Final", "RD$ 4,500.00", "text-[#4A5720]"],
              ].map(([k, v, c]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-[#EDEFEB] py-4 last:border-0"
                >
                  <dt className="text-[14px] text-[#8A93A2]">{k}</dt>
                  <dd className={`text-[15px] font-bold ${c}`}>{v}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setVista("tracking")}
              className="mt-8 w-full rounded-full bg-[#4A5720] py-4 text-[15px] font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#4A5720] active:shadow-none active:ring-2 active:ring-[#4A5720]"
            >
              Seguir mi pedido
            </button>
            <button
              type="button"
              onClick={() => setVista("mapa")}
              className="mt-4 w-full rounded-full border border-[#EDEFEB] bg-white py-4 text-[15px] font-bold text-[#16202E] shadow-[0_4px_16px_rgba(20,30,15,0.08)] transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-[#4A5720] active:text-white"
            >
              Volver al Inicio
            </button>
          </div>
        )}

        {/* ============ VISTA 9: TRACKING ============ */}
        {vista === "tracking" && (
          <>
            <div className="relative h-[360px] shrink-0">
              <iframe
                title="Seguimiento del pedido"
                src={MAPA_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              <div className="absolute inset-x-5 top-5 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(20,30,15,0.16)]">
                <button
                  type="button"
                  aria-label="Volver"
                  onClick={() => setVista("confirmada")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3E6E0] text-[#16202E] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-[#4A5720] active:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-bold leading-tight text-[#16202E]">
                    En camino
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-[#9AA3AF]">
                    Llegada est. 12:45 PM
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-success-50 px-3 py-1.5 text-[12px] font-bold text-success-700">
                  <span className="h-2 w-2 rounded-full bg-success-500" />
                  En vivo
                </span>
              </div>
            </div>

            <div className="relative z-10 -mt-7 flex-1 rounded-t-[28px] bg-white px-5 pb-5 pt-4 shadow-[0_-8px_24px_rgba(20,30,15,0.10)]">
              <div className="mx-auto mb-5 h-[5px] w-12 rounded-full bg-[#E3E6E0]" />

              <div className="flex items-center gap-4">
                <span className="relative shrink-0">
                  <img
                    src={`${IMGH}/image_home_09.png`}
                    alt="José Rodríguez"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-md bg-warning-400 px-1.5 py-0.5 text-[10px] font-bold text-[#16202E]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-2.5 w-2.5">
                      <path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7L12 2z" />
                    </svg>
                    4.9
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[20px] font-bold leading-tight text-[#16202E]">
                    José Rodríguez
                  </span>
                  <span className="mt-1 block text-[14px] leading-snug text-[#6B7688]">
                    Mack Granite (Rojo) • ABC-1234
                  </span>
                </span>
                {[
                  { l: "Llamar", d: "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2z" },
                  { l: "Mensaje", d: "M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0 1 3.6 11.5a8.4 8.4 0 0 1 8.4-8.4h.6a8.4 8.4 0 0 1 8.4 8.4z" },
                ].map((b) => (
                  <button
                    key={b.l}
                    type="button"
                    aria-label={b.l}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDE7E7] text-[#E9564F] transition-all duration-200 hover:scale-110 hover:shadow-md"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
                      <path d={b.d} />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="mt-7">
                <div className="flex gap-4">
                  <span className="flex w-6 shrink-0 flex-col items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-success-500 bg-white text-success-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3 w-3">
                        <path d="M5 13l4.5 4.5L19 7" />
                      </svg>
                    </span>
                    <span className="w-[2px] flex-1 bg-success-500" />
                  </span>
                  <span className="pb-6">
                    <span className="block text-[16px] font-bold text-[#16202E]">
                      Carga completada
                    </span>
                    <span className="mt-1 block text-[14px] text-[#6B7688]">
                      11:30 AM • Cantera San Pedro
                    </span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="flex w-6 shrink-0 flex-col items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9564F] text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3.5 w-3.5">
                        <path d="M2 16V6h11v10M13 9h4l3 4v3h-2M6 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 19zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z" />
                      </svg>
                    </span>
                    <span className="mt-1 w-[2px] flex-1 bg-[repeating-linear-gradient(to_bottom,#D8DCD5_0_4px,transparent_4px_9px)]" />
                  </span>
                  <span className="pb-6">
                    <span className="block text-[16px] font-bold text-[#16202E]">
                      En tránsito a destino
                    </span>
                    <span className="mt-1 block text-[14px] text-[#6B7688]">
                      En carretera hacia Santo Domingo
                    </span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="flex w-6 shrink-0 justify-center">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#C9CFC6]" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold text-[#9AA3AF]">
                      Llegada a destino
                    </span>
                    <span className="mt-1 block text-[14px] text-[#B4BCC5]">
                      Estimado en 25 minutos
                    </span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full border border-[#8B9A3A] bg-[#FBFCF9] py-4 text-[16px] font-bold text-[#16202E] transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-[#4A5720] active:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                </svg>
                Compartir ubicación
              </button>
            </div>
            <NavInferior items={navCliente} activa="tracking" onIr={setVista} />
          </>
        )}

        {/* ============ VISTA 10: HISTORIAL ============ */}
        {vista === "historial" && (
          <>
            <div className="flex-1 bg-[#FBFBFA]">
              <h2 className="px-5 pt-8 text-[28px] font-bold text-[#16202E]">
                Historial de Viajes
              </h2>

              <div className="mt-6 flex border-b border-[#EDEFEB] bg-white">
                {["Completados", "Cancelados"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTabHistorial(t)}
                    className={`flex-1 border-b-[3px] pb-3.5 text-[16px] transition-colors ${
                      tabHistorial === t
                        ? "border-[#4A5720] font-bold text-[#4A5720]"
                        : "border-transparent text-[#8A93A2] hover:text-[#4A5720]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p className="px-5 pt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                Octubre 2023
              </p>

              <div className="space-y-5 px-5 pb-5 pt-4">
                {(tabHistorial === "Completados"
                  ? [
                      { n: "Arena Azul – 12m³", f: "15 Oct 2023 • 09:45 AM", de: "La Romana, Rep. Dom.", a: "Santo Domingo Este, Rep. Dom.", p: "RD$ 5,200.00" },
                      { n: 'Blocks 6" – 2,000 unid.', f: "12 Oct 2023 • 14:20 PM", de: "Santiago De Los Caballeros", a: "Punta Cana, Rep. Dom.", p: "RD$ 12,800.00" },
                    ]
                  : [
                      { n: "Grava – 8m³", f: "3 Oct 2023 • 10:10 AM", de: "Haina, Rep. Dom.", a: "Baní, Rep. Dom.", p: "RD$ 3,100.00" },
                    ]
                ).map((v) => (
                  <div
                    key={v.n}
                    className="rounded-2xl border border-[#EDEFEB] bg-white px-5 py-5 shadow-[0_4px_16px_rgba(20,30,15,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDE7E7]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4A5720" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[22px] w-[22px]">
                          <path d="M2 16V6h11v10M13 9h4l3 4v3h-2M6 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 19zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z" />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] font-bold leading-tight text-[#16202E]">
                          {v.n}
                        </span>
                        <span className="mt-1 block text-[13px] text-[#8A93A2]">{v.f}</span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${
                          tabHistorial === "Completados"
                            ? "bg-success-100 text-success-700"
                            : "bg-error-100 text-error-600"
                        }`}
                      >
                        {tabHistorial === "Completados" ? "Entregado" : "Cancelado"}
                      </span>
                    </div>

                    <div className="relative mt-5 pl-1">
                      <span
                        aria-hidden
                        className="absolute left-[6px] top-3 h-6 w-[2px] bg-[repeating-linear-gradient(to_bottom,#D8DCD5_0_3px,transparent_3px_7px)]"
                      />
                      <p className="flex items-center gap-3 text-[14px]">
                        <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#C9CFC6]" />
                        <span className="text-[#8A93A2]">De:</span>
                        <span className="text-[#4A5568]">{v.de}</span>
                      </p>
                      <p className="mt-4 flex items-center gap-3 text-[14px]">
                        <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#4A5720]" />
                        <span className="text-[#8A93A2]">A:</span>
                        <span className="text-[#4A5568]">{v.a}</span>
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#EDEFEB] pt-4">
                      <span className="text-[19px] font-bold text-[#16202E]">{v.p}</span>
                      <button
                        type="button"
                        className="rounded-full border border-[#8B9A3A] px-6 py-2.5 text-[14px] font-semibold text-[#4A5720] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-[#4A5720] active:text-white"
                      >
                        Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <NavInferior items={rol === "transportista" ? navTransportista : navCliente} activa="historial" onIr={setVista} />
          </>
        )}

        {/* ============ VISTA 11: NOTIFICACIONES ============ */}
        {vista === "alertas" && (
          <>
            <div className="flex-1 bg-[#FBFBFA] px-4 pb-4 pt-8">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[28px] font-bold text-[#16202E]">Notificaciones</h2>
                <button
                  type="button"
                  className="text-[14px] font-semibold text-[#4A5720] transition-all hover:scale-105"
                >
                  Marcar leídas
                </button>
              </div>

              <p className="px-1 pt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                Hoy
              </p>
              <div className="mt-3 rounded-2xl border border-[#F6D9D9] bg-[#FDF4F4] p-5 shadow-[0_6px_20px_rgba(20,30,15,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error-100 text-error-500">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
                      <path d="M12.6 2H20a2 2 0 0 1 2 2v7.4a2 2 0 0 1-.6 1.4l-8.6 8.6a2 2 0 0 1-2.8 0l-7.4-7.4a2 2 0 0 1 0-2.8l8.6-8.6a2 2 0 0 1 1.4-.6zm4.9 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[17px] font-bold leading-tight text-[#16202E]">¡Nueva oportunidad!</span>
                      <span className="shrink-0 pt-0.5 text-[12px] text-[#8A93A2]">10:45 AM <span className="ml-1 inline-block h-2 w-2 rounded-full bg-error-500" /></span>
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-[#6B7688]">
                      Hay 5 camiones regresando vacíos de La Romana. Solicita ahora y ahorra un 20%.
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#EDEFEB] bg-white p-5 shadow-[0_6px_20px_rgba(20,30,15,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-100 text-success-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[17px] font-bold leading-tight text-[#16202E]">Viaje Completado</span>
                      <span className="shrink-0 pt-0.5 text-[12px] text-[#8A93A2]">09:12 AM</span>
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-[#6B7688]">
                      Tu pedido #TR-882190 ha sido entregado exitosamente por José Rodríguez.
                    </span>
                    <button
                      type="button"
                      className="mt-3 flex items-center gap-1 text-[14px] font-semibold text-[#4A5720] transition-all hover:scale-105"
                    >
                      Calificar servicio
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3.5 w-3.5">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>

              <p className="px-1 pt-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                Ayer
              </p>
              <div className="mt-3 rounded-2xl border border-[#EDEFEB] bg-white p-5 shadow-[0_6px_20px_rgba(20,30,15,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning-200 text-warning-800">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
                      <path d="M12 3c5 0 9 3.4 9 7.6 0 4.2-4 7.6-9 7.6-.9 0-1.8-.1-2.6-.3L4 20l1.3-3.3C3.9 15.3 3 13.1 3 10.6 3 6.4 7 3 12 3z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[17px] font-bold leading-tight text-[#16202E]">Mensaje de José R.</span>
                      <span className="shrink-0 pt-0.5 text-[12px] text-[#8A93A2]">Ayer, 04:30 PM</span>
                    </span>
                    <span className="mt-1.5 block text-[14px] italic leading-relaxed text-[#6B7688]">
                      "Ya llegué al punto de descarga, estoy esperando al encargado."
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#EDEFEB] bg-white p-5 shadow-[0_6px_20px_rgba(20,30,15,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.18V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 7.26 19.4l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.25 13.7H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 7.26l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 2.82-1.18V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.18l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0 1.18 2.82H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.02z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[17px] font-bold leading-tight text-[#16202E]">Perfil verificado</span>
                      <span className="shrink-0 pt-0.5 text-[12px] text-[#8A93A2]">Ayer, 02:15 PM</span>
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-[#6B7688]">
                      Tu cuenta ha sido verificada satisfactoriamente. ¡Bienvenido a Match Truck!
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <NavInferior items={rol === "transportista" ? navTransportista : navCliente} activa="alertas" onIr={setVista} />
          </>
        )}

        {/* ============ VISTA 12: DASHBOARD TRANSPORTISTA ============ */}
        {vista === "dashT" && (
          <>
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <span>
                  <span className="block text-[14px] text-[#8A93A2]">Hola, José</span>
                  <span className="block text-[26px] font-bold leading-tight text-[#16202E]">
                    Dashboard
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-right">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                      Estado
                    </span>
                    <span className="flex items-center justify-end gap-1.5 text-[13px] font-semibold text-success-600">
                      <span className="h-2 w-2 rounded-full bg-success-500" />
                      Conectado
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label="Ver notificaciones"
                    onClick={() => setVista("alertas")}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#16202E] transition-all duration-200 hover:scale-110 hover:shadow-md active:bg-[#4A5720] active:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-6 w-6">
                      <path d={ICONOS.alertas} />
                    </svg>
                    <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-error-500 ring-2 ring-white" />
                  </button>
                </span>
              </div>

              {/* Misma forma e ícono que las tarjetas de Finanzas de la web, en verde */}
              <div className="mt-6 rounded-[1.5rem] bg-[#5A6A20] p-5 text-white shadow-[0_12px_40px_rgba(90,106,32,0.38)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(90,106,32,0.48)]">
                <div className="flex items-center gap-3">
                  <img src="/icons/icon_01.png" alt="" aria-hidden className="h-11 w-11 shrink-0" />
                  <p className="flex-1 text-[14px] text-white/85">Ingresos de hoy</p>
                  <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[12px] font-medium text-white">
                    20%
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3 w-3">
                      <path d="M4 15l6-6 4 4 6-6M20 7v5h-5" />
                    </svg>
                  </span>
                </div>
                <p className="mt-4 text-[32px] font-bold leading-none">RD$ 15,200.00</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { k: "Viajes", v: "4" },
                    { k: "Calificación", v: "4.98" },
                  ].map((s) => (
                    <span key={s.k} className="rounded-2xl bg-white/15 px-4 py-3">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">
                        {s.k}
                      </span>
                      <span className="mt-0.5 block text-[24px] font-bold">{s.v}</span>
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                Acciones rápidas
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setVista("flota")}
                  className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-[#C4A97C] py-7 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#C4A97C] active:ring-2 active:ring-[#C4A97C]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-7 w-7 text-[#3F3A28]">
                    <path d="M7 20V5M7 5L4 8M7 5l3 3M17 4v15M17 19l3-3M17 19l-3-3" />
                  </svg>
                  <span className="text-[15px] font-bold text-[#3F3A28]">Publicar viaje</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVista("flota")}
                  className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white py-7 text-center shadow-[0_6px_20px_rgba(20,30,15,0.10)] transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-[#4A5720] active:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4A5720" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-7 w-7">
                    <path d="M2 16V6h11v10M13 9h4l3 4v3h-2M6 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 19zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z" />
                  </svg>
                  <span className="text-[15px] font-bold text-[#16202E]">Mi Flota</span>
                </button>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#9AA3AF]">
                  Solicitudes cercanas
                </p>
                <span className="rounded-full bg-[#4A5720] px-3 py-1 text-[11px] font-bold text-white">
                  2 Nuevos
                </span>
              </div>

              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="mt-4 rounded-2xl border border-[#EDEFEB] bg-white p-4 shadow-[0_6px_20px_rgba(20,30,15,0.09)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,30,15,0.14)]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${IMGH}/image_home_10.png`}
                      alt="Ing. Ricardo P."
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold leading-tight text-[#16202E]">
                        Ing. Ricardo P.
                      </span>
                      <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.06em] text-[#9AA3AF]">
                        Higüey • Hace 2 min
                      </span>
                    </span>
                    <span className="shrink-0 text-[16px] font-bold text-[#4A5720]">
                      RD$ 3,800
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] text-[#6B7688]">
                    Transporte de 10m³ de Grava hacia Verón.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setVista("mapaT")}
                      className="flex-1 rounded-full bg-[#4A5720] py-3 text-[15px] font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#4A5720] active:shadow-none active:ring-2 active:ring-[#4A5720]"
                    >
                      Aceptar
                    </button>
                    <button
                      type="button"
                      aria-label="Rechazar solicitud"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#EDEFEB] bg-white text-[#8A93A2] transition-all duration-200 hover:scale-110 hover:shadow-md active:bg-error-500 active:text-white"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="h-4 w-4">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <NavInferior items={navTransportista} activa="dashT" onIr={setVista} />
          </>
        )}

        {/* ============ MAPA TRANSPORTISTA (clientes disponibles) ============ */}
        {vista === "mapaT" && (
          <>
            {/* Misma estructura y línea gráfica que el mapa del cliente (vista 6) */}
            <div className="relative h-[500px] shrink-0 bg-neutral-100">
              <iframe
                title="Mapa de clientes disponibles"
                src={MAPA_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />

              <div className="absolute inset-x-5 top-5 z-10 flex items-center gap-3">
                <form
                  role="search"
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-1 items-center gap-3 rounded-full border border-neutral-200 bg-white px-6 py-3.5 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-4 w-4 shrink-0 text-neutral-400">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    placeholder="¿Dónde buscas carga hoy?"
                    className="w-full bg-transparent text-sm tracking-wide text-neutral-800 outline-none placeholder:text-xs placeholder:text-neutral-400"
                  />
                </form>
                <button
                  type="button"
                  aria-label="Filtrar"
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                >
                  <img src="/images/image_rutas/btn_filter.png" alt="" aria-hidden className="h-6 w-auto" />
                </button>
              </div>

              <div className="absolute inset-x-5 top-[92px] z-10 flex items-center gap-3.5 rounded-[34px] bg-[#4A5720]/75 px-4 py-4 shadow-[0_10px_28px_rgba(20,30,15,0.28)] backdrop-blur-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/25">
                  <svg viewBox="0 0 24 24" fill="#F59E0B" aria-hidden className="h-5 w-5">
                    <path d="M12 2c1 3-1.5 4.5-1.5 7A3.5 3.5 0 0 0 14 12c1.5 0 2-1 2-1 .8 1.2 1.5 2.5 1.5 4a5.5 5.5 0 1 1-11 0c0-4.5 4-6.5 5.5-13z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 text-white">
                  <span className="block text-[13px] leading-tight text-white/75">Oportunidad hoy</span>
                  <span className="mt-0.5 block text-[17px] font-bold leading-[1.25]">
                    3 clientes en La Romana
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setVista("flota")}
                  className="w-[72px] shrink-0 rounded-2xl bg-warning-500 px-3 py-2.5 text-center text-[15px] font-bold leading-tight text-white transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-warning-500 active:shadow-none active:ring-2 active:ring-warning-500"
                >
                  Ver ahora
                </button>
              </div>
            </div>

            <div className="relative z-10 -mt-8 flex-1 rounded-t-[38px] bg-white px-5 pb-4 pt-7 shadow-[0_-14px_44px_rgba(20,30,15,0.22)]">
              <div className="flex items-center justify-between">
                <h3 className="text-[19px] font-bold text-[#16202E]">Clientes cercanos</h3>
                <button
                  type="button"
                  className="text-[14px] font-semibold text-[#4A5720] transition-all hover:scale-105"
                >
                  Ver todos
                </button>
              </div>

              {[
                { n: "Ing. Ricardo P.", d: "10m³ de Grava hacia Verón", precio: "RD$ 3,800", chip: "Disponible", img: `${IMGH}/image_home_10.png` },
                { n: "Constructora García", d: "Blocks hacia Punta Cana", precio: "RD$ 12,800", chip: "En 45 min", img: `${IMGH}/image_home_11.png` },
              ].map((c, i) => (
                <div
                  key={c.n}
                  className="mt-4 flex items-start gap-3.5 rounded-2xl border border-[#EDEFEB] bg-white p-4 shadow-[0_4px_16px_rgba(20,30,15,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(20,30,15,0.14)]"
                >
                  <img src={c.img} alt={c.n} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-tight text-[#16202E]">
                      {c.n}
                    </span>
                    <span className="mt-1.5 flex items-center gap-1 text-[12px] text-[#6B7688]">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5 shrink-0">
                        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                      </svg>
                      {c.d}
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <span className="text-[15px] font-bold text-[#4A5720]">{c.precio}</span>
                      <span className="rounded-md bg-[#F1F3F0] px-2 py-0.5 text-[11px] text-[#6B7688]">
                        Precio est.
                      </span>
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold leading-tight ${
                      i === 0
                        ? "bg-success-100 text-success-700"
                        : "bg-warning-100 text-warning-800"
                    }`}
                  >
                    {c.chip}
                  </span>
                </div>
              ))}
            </div>
            <NavInferior items={navTransportista} activa="mapaT" onIr={setVista} />
          </>
        )}

        {/* ============ VISTA 13: PUBLICAR DISPONIBILIDAD ============ */}
        {vista === "flota" && (
          <>
            <header className="flex items-center gap-4 border-b border-[#EDEFEB] px-5 py-5">
              <button
                type="button"
                aria-label="Volver"
                onClick={() => setVista("dashT")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E3E6E0] text-[#16202E] transition-all duration-200 hover:scale-105 hover:shadow-md active:bg-[#4A5720] active:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <h2 className="flex-1 pr-10 text-center text-[17px] font-bold text-[#16202E]">
                Publicar Disponibilidad
              </h2>
            </header>

            <div className="flex-1 space-y-7 px-5 py-6">
              {/* 1. Seleccionar camión */}
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#16202E]">
                  1. Seleccionar camión
                </p>
                <div className="sin-barra-scroll mt-4 flex gap-4 overflow-x-auto">
                  {[
                    { n: "Mack #23", d: "Volteo 12m³" },
                    { n: "Isuzu #04", d: "Cama 20ft" },
                  ].map((c) => {
                    const activo = camion === c.n;
                    return (
                      <button
                        key={c.n}
                        type="button"
                        onClick={() => setCamion(c.n)}
                        className={`flex h-[122px] w-[152px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                          activo
                            ? "border-secondary4-400 bg-secondary4-50"
                            : "border-[#EDEFEB] bg-white shadow-[0_4px_14px_rgba(20,30,15,0.06)]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={activo ? "#3F4A20" : "#B9C0CB"}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="h-7 w-7"
                        >
                          <path d="M2 16V6h11v10M13 9h4l3 4v3h-2M6 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 19zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z" />
                        </svg>
                        <span className="text-[16px] font-bold text-[#16202E]">{c.n}</span>
                        <span
                          className={`text-[13px] ${
                            activo ? "text-[#7C8757]" : "text-[#8A93A2]"
                          }`}
                        >
                          {c.d}
                        </span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    aria-label="Agregar camión"
                    className="flex h-[122px] w-[152px] shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-[#D8DCD5] text-[#C9CFC6] transition-all duration-200 hover:-translate-y-1 hover:border-secondary4-400 hover:text-secondary4-500"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className="h-7 w-7">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 2. Ruta de retorno */}
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#16202E]">
                  2. Ruta de retorno
                </p>
                {/* Mismos íconos de origen/destino que la tarjeta de ruta de la web */}
                {[
                  {
                    label: "Origen (Punto de descarga actual)",
                    valor: "La Romana, Rep. Dom.",
                    icono: "/images/image_rutas/from_icon.png",
                  },
                  {
                    label: "Destino Final (Donde quieres volver)",
                    valor: "Santo Domingo",
                    icono: "/images/image_rutas/where_icon.png",
                  },
                ].map((campo) => (
                  <div key={campo.label} className="mt-4">
                    <label className="block text-[13px] text-[#8A93A2]">{campo.label}</label>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#F1F4F2] px-5 py-4">
                      <img
                        src={campo.icono}
                        alt=""
                        aria-hidden
                        className="h-6 w-6 shrink-0"
                      />
                      <span className="text-[15px] text-[#16202E]">{campo.valor}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Horario */}
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#16202E]">
                  3. Horario
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { n: "Ahora mismo", d: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
                    { n: "Más tarde", d: "M4 6h16v14H4zM8 3v4M16 3v4M4 10h16" },
                  ].map((h) => {
                    const activo = horario === h.n;
                    return (
                      <button
                        key={h.n}
                        type="button"
                        onClick={() => setHorario(h.n)}
                        className={`flex h-[92px] flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                          activo
                            ? "border-secondary4-400 bg-secondary4-50"
                            : "border-[#EDEFEB] bg-white shadow-[0_4px_14px_rgba(20,30,15,0.06)]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={activo ? "#3F4A20" : "#16202E"}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="h-5 w-5"
                        >
                          <path d={h.d} />
                        </svg>
                        <span
                          className={`text-[15px] font-semibold ${
                            activo ? "text-[#7C8757]" : "text-[#16202E]"
                          }`}
                        >
                          {h.n}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Precio base */}
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#16202E]">
                  4. Precio base (opcional)
                </p>
                <input
                  placeholder="RD$ 0.00"
                  className="mt-4 w-full rounded-2xl bg-[#F1F4F2] px-5 py-4 text-[15px] text-[#16202E] outline-none placeholder:text-[#9AA69C] focus:ring-2 focus:ring-secondary4-400"
                />
              </div>
            </div>

            <footer className="sticky bottom-0 border-t border-[#EDEFEB] bg-white px-5 py-5">
              <button
                type="button"
                onClick={() => setVista("dashT")}
                className="w-full rounded-full bg-[#2F3E17] py-4 text-[17px] font-bold text-white shadow-[0_8px_25px_rgba(236,138,60,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-[#2F3E17] active:shadow-none active:ring-2 active:ring-[#2F3E17]"
              >
                Publicar Disponibilidad
              </button>
            </footer>
          </>
        )}

        {/* ============ VISTA 14: PERFIL ============ */}
        {vista === "perfilT" && (
          <>
            <div className="flex-1 bg-[#F6F7F4]">
              {/* Cabecera verde con las curvas de la referencia */}
              <div className="relative overflow-hidden rounded-b-[44px] bg-[#5A6A20] px-6 pb-16 pt-12">
                <span
                  aria-hidden
                  className="absolute -right-14 -top-16 h-48 w-48 rounded-full bg-white/[0.07]"
                />
                <span
                  aria-hidden
                  className="absolute -left-16 bottom-[-40px] h-36 w-36 rounded-full bg-white/[0.07]"
                />

                <div className="relative mx-auto w-fit">
                  <img
                    src={`${IMGH}/image_home_11.png`}
                    alt="Triana Olivadia García"
                    className="h-[124px] w-[124px] rounded-full border-4 border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  />
                  <button
                    type="button"
                    aria-label="Editar foto"
                    className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#C4B291] text-[#4A4230] shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:bg-transparent active:text-white active:ring-2 active:ring-[#C4B291]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
                      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>

                <p className="relative mt-5 text-center text-[24px] font-bold text-white">
                  Triana Olivadia García
                </p>
                <p className="relative mt-1 text-center text-[15px] text-white/80">
                  Constructora García &amp; Asoc.
                </p>

                <div className="relative mt-4 flex justify-center gap-3">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-[13px] font-semibold text-white">
                    Cliente Premium
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#C4B291] px-4 py-2 text-[13px] font-bold text-[#3F3A28]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
                      <path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7L12 2z" />
                    </svg>
                    5.0
                  </span>
                </div>
              </div>

              {/* Tarjeta de opciones — z-20 para quedar por encima del verde */}
              <div className="relative z-20 -mt-8 px-6 pb-6">
                <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_36px_rgba(20,30,15,0.13)]">
                  {[
                    {
                      t: "Datos personales",
                      d: "Nombre, correo, teléfono",
                      bg: "bg-[#F7F3E9]",
                      color: "#6B6237",
                      i: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
                    },
                    {
                      t: "Métodos de pago",
                      d: "Tarjetas y facturación",
                      bg: "bg-[#F7F3E9]",
                      color: "#6B6237",
                      i: "M3 7h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7zM3 10h18M6 14h3",
                    },
                    {
                      t: "Mi Empresa",
                      d: "RNC y registro fiscal",
                      bg: "bg-[#F7F3E9]",
                      color: "#6B6237",
                      i: "M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3",
                    },
                    {
                      t: "Configuración",
                      d: "Notificaciones y seguridad",
                      bg: "bg-[#F1F3F0]",
                      color: "#6B7688",
                      i: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.18V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 7.26 19.4l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.25 13.7H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 7.26l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 2.82-1.18V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.18l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0 1.18 2.82H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.02z",
                    },
                  ].map((o) => (
                    <button
                      key={o.t}
                      type="button"
                      className="flex w-full items-center gap-4 border-b border-[#EFF1ED] px-5 py-4 text-left transition-colors hover:bg-primary-400/10"
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${o.bg}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={o.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[22px] w-[22px]">
                          <path d={o.i} />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] font-bold leading-tight text-[#16202E]">
                          {o.t}
                        </span>
                        <span className="mt-1 block text-[14px] text-[#6B7688]">{o.d}</span>
                      </span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4 shrink-0 text-[#B9C0CB]">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setVista("carga")}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-error-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDEEEE]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#8A7B1E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[22px] w-[22px]">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-[17px] font-bold leading-tight text-[#8A7B1E]">
                        Cerrar Sesión
                      </span>
                      <span className="mt-1 block text-[14px] text-error-500">
                        Finalizar mi actividad
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <NavInferior items={rol === "transportista" ? navTransportista : navCliente} activa="perfilT" onIr={setVista} />
          </>
        )}
      </div>
    </div>
  );
}
