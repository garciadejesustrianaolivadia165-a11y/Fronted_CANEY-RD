import { useState } from "react";
import { Link, useNavigate } from "react-router";
import SearchHeader from "../components/search-header";
import FiltroPeriodo, {
  formatearPeriodo,
} from "../components/filtro-periodo";

const IMG = "/images/image_home";

const pedidos = [
  {
    id: "00242772362",
    cliente: "Cesar Valdez",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_09.png`,
    status: "COMPLETADO",
    descripcion: "Plátanos Banilejos 12 Dz",
    precio: "$ 135,000.00",
  },
  {
    id: "00242772363",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    status: "EN PROCESO",
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
  {
    id: "00242772364",
    cliente: "Mini-Market Manolo",
    fecha: "25/2/2026",
    img: `${IMG}/image_home_12.png`,
    status: "NO INICIADO",
    descripcion: "Pimientos Importados",
    precio: "$ 5,000.00",
  },
];

function StatusChip({ status }: { status: string }) {
  const estilos: Record<string, string> = {
    COMPLETADO: "bg-success-100 text-success-700",
    "EN PROCESO": "bg-warning-200 text-warning-800",
    "NO INICIADO": "bg-error-200 text-error-700",
  };
  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${estilos[status]}`}
    >
      {status}
    </span>
  );
}

// Alturas de las barras del gráfico de ventas (q1 a q4)
const barrasVentas = [55, 40, 70, 48, 30, 60, 75, 42, 52, 38, 65, 45, 58, 35, 68, 72];

// Puntos de las líneas Jan-Jun (3 series, valores 0-100)
const series = [
  { color: "#9eaa31", puntos: [30, 45, 50, 62, 70, 66] },
  { color: "#e0b84a", puntos: [20, 30, 42, 50, 58, 64] },
  { color: "#6b4926", puntos: [40, 48, 55, 60, 68, 75] },
];
const meses = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];

function GraficoLineas() {
  const ancho = 340;
  const alto = 120;
  const paso = ancho / (meses.length - 1);
  const aY = (v: number) => alto - (v / 100) * alto;
  const puntoInteractivo = {
    transformBox: "fill-box",
    transformOrigin: "center",
  } as const;

  return (
    <div>
      <svg
        viewBox={`0 0 ${ancho} ${alto + 24}`}
        className="w-full"
        role="img"
        aria-label="Indicadores mensuales"
      >
        {[0, 33, 66, 100].map((v) => (
          <line
            key={v}
            x1="0"
            x2={ancho}
            y1={aY(v)}
            y2={aY(v)}
            stroke="#e5e7e5"
            strokeDasharray="3 4"
          />
        ))}
        {series.map((s, i) => (
          <g key={i}>
            <polyline
              fill="none"
              stroke={s.color}
              strokeWidth="1.8"
              points={s.puntos.map((v, j) => `${j * paso},${aY(v)}`).join(" ")}
            />
            {s.puntos.map((v, j) => (
              <circle
                key={j}
                cx={j * paso}
                cy={aY(v)}
                r="2.6"
                fill={s.color}
                style={puntoInteractivo}
                className="cursor-pointer transition-transform duration-150 hover:scale-150"
              >
                <title>{`${meses[j]}: ${(v * 100).toLocaleString("en-US")}`}</title>
              </circle>
            ))}
          </g>
        ))}
        {meses.map((m, j) => (
          <text
            key={m}
            x={j * paso}
            y={alto + 18}
            textAnchor="middle"
            className="fill-neutral-500 text-[9px]"
          >
            {m}
          </text>
        ))}
      </svg>
      <div className="mt-2 flex gap-5">
        {series.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5 text-xs text-neutral-600">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            Content
          </span>
        ))}
      </div>
    </div>
  );
}

export function meta() {
  return [{ title: "Bandeja de entrada | BANEY RD" }];
}

const sombraGrafico =
  "rounded-3xl bg-white p-6 shadow-[0_14px_45px_rgba(0,0,0,0.20)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.26)]";

export default function Inbox() {
  const navigate = useNavigate();
  const [perStatus, setPerStatus] = useState("Semana");
  const [perVentas, setPerVentas] = useState("Semana");
  const celda =
    "py-3 transition-colors duration-200 group-hover:bg-primary-400/20";

  return (
    <div className="space-y-6">
      <SearchHeader />

      {/* Tus Pedidos */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-semibold text-[#3F443D]">
            Tus Pedidos
          </h2>
          <Link
            to="/dashboard/bandeja/pedidos"
            className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
          >
            Ver Todos
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-neutral-400">
                <th className="pb-3 pl-4 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Descripcion</th>
                <th className="pb-3 pr-4 text-right font-medium">
                  Precio Pedido
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pedidos.map((p, i) => (
                <tr
                  key={i}
                  onClick={() => navigate(`/dashboard/bandeja/pedidos/${p.id}`)}
                  className="group relative cursor-pointer border-t border-neutral-100 transition-transform duration-200 hover:z-10 hover:-translate-y-1"
                >
                  <td className={`rounded-l-2xl pl-4 ${celda}`}>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.cliente}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {p.cliente}
                        </p>
                        <p className="text-xs text-neutral-500">{p.fecha}</p>
                      </div>
                    </div>
                  </td>
                  <td className={celda}>
                    <StatusChip status={p.status} />
                  </td>
                  <td className={`text-neutral-700 ${celda}`}>
                    {p.descripcion}
                  </td>
                  <td
                    className={`rounded-r-2xl pr-4 text-right font-semibold text-neutral-900 ${celda}`}
                  >
                    {p.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Indicadores */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-semibold text-[#3F443D]">
            Indicadores
          </h2>
          <Link
            to="/dashboard/finanzas/indicadores"
            className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
          >
            Mas Detalle
          </Link>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {/* Status de pedidos: dona */}
          <div className={sombraGrafico}>
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Status De Pedidos
              </h3>
              <FiltroPeriodo valor={perStatus} onCambio={setPerStatus} />
            </div>
            <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
              {formatearPeriodo(5000, perStatus)}
            </p>
            <p className="text-sm text-neutral-600">50 Orders</p>

            <div className="mt-4 flex items-center gap-8">
              <svg viewBox="0 0 42 42" className="h-44 w-44 -rotate-90" role="img" aria-label="Distribución de pedidos">
                {[
                  { color: "#9eaa31", dash: "50 50", offset: "0", titulo: "Content: 50%" },
                  { color: "#e0b84a", dash: "35 65", offset: "-50", titulo: "Content: 35%" },
                  { color: "#6b4926", dash: "15 85", offset: "-85", titulo: "Content: 15%" },
                ].map((seg) => (
                  <circle
                    key={seg.color}
                    cx="21"
                    cy="21"
                    r="15.9"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="7"
                    strokeDasharray={seg.dash}
                    strokeDashoffset={seg.offset}
                    className="cursor-pointer transition-all duration-150 hover:opacity-80 hover:[stroke-width:9]"
                  >
                    <title>{seg.titulo}</title>
                  </circle>
                ))}
              </svg>
              <div className="space-y-2">
                {["#9eaa31", "#e0b84a", "#6b4926"].map((c) => (
                  <span key={c} className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c }} />
                    Content
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ventas: barras */}
          <div className={sombraGrafico}>
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Ventas
              </h3>
              <FiltroPeriodo valor={perVentas} onCambio={setPerVentas} />
            </div>
            <p className="mt-3 font-sans text-3xl font-medium text-primary-600">
              {formatearPeriodo(5000, perVentas)}
            </p>
            <p className="text-sm text-neutral-600">50 Orders</p>

            <div className="mt-6 flex items-end gap-1.5" style={{ height: 130 }}>
              {barrasVentas.map((h, i) => (
                <div key={i} className="group relative flex-1">
                  <div
                    className="w-full rounded-t-sm bg-secondary4-400 transition-colors duration-150 group-hover:bg-secondary4-600"
                    style={{ height: `${(h * 130) / 100}px` }}
                  />
                  <div className="pointer-events-none absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-lg group-hover:block">
                    ${formatearPeriodo(h * 100, perVentas)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between px-2 text-[10px] text-neutral-500">
              {["q1", "q2", "q3", "q4"].map((q) => (
                <span key={q}>{q}</span>
              ))}
            </div>
            <span className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
              <span className="h-2 w-2 rounded-full bg-secondary4-400" />
              Content
            </span>
          </div>

          {/* Líneas mensuales */}
          <div className={sombraGrafico}>
            <GraficoLineas />
          </div>
          <div className={sombraGrafico}>
            <GraficoLineas />
          </div>
        </div>
      </section>
    </div>
  );
}
