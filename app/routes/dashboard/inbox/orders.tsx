import { useState } from "react";
import { Link } from "react-router";
import SearchHeader from "../components/search-header";

const IMG = "/images/image_home";

type Pedido = {
  id: string;
  cliente: string;
  fecha: string;
  img: string;
  status: string;
  descripcion: string;
  precio: string;
};

const pedidosIniciales: Pedido[] = [
  { id: "1", cliente: "Cesar Valdez", fecha: "25/2/2026", img: `${IMG}/image_home_09.png`, status: "COMPLETADO", descripcion: "Plátanos Banilejos 12 Dz", precio: "$ 135,000.00" },
  { id: "2", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "EN PROCESO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "3", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "COMPLETADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "4", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "EN PROCESO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "5", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "EN PROCESO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "6", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "EN PROCESO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "7", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "COMPLETADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "8", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "NO INICIADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "9", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "COMPLETADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "10", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "COMPLETADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "11", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "NO INICIADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "12", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "NO INICIADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
  { id: "13", cliente: "Mini-Market Manolo", fecha: "25/2/2026", img: `${IMG}/image_home_12.png`, status: "NO INICIADO", descripcion: "Pimientos Importados", precio: "$ 5,000.00" },
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

export function meta() {
  return [{ title: "Mis Pedidos | BANEY RD" }];
}

export default function InboxOrders() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  // id del pedido con el menú Aceptar/Rechazar abierto
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

  function decidir(id: string, aceptar: boolean) {
    setPedidos((lista) =>
      lista.map((p) =>
        p.id === id
          ? { ...p, status: aceptar ? "EN PROCESO" : "NO INICIADO" }
          : p,
      ),
    );
    setMenuAbierto(null);
  }

  const celda =
    "py-3 transition-colors duration-200 group-hover:bg-primary-400/20";

  return (
    <div className="space-y-6">
      <SearchHeader />

      <div className="flex items-center justify-between">
        <h1 className="font-sans text-xl font-semibold text-[#3F443D]">
          Tus Pedidos
        </h1>
        <Link
          to="/dashboard/bandeja"
          className="text-sm font-medium text-caney-sky underline hover:text-primary-600"
        >
          Volver Atras
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-neutral-400">
              <th className="pb-3 pl-4 font-medium">Cliente</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Descripcion</th>
              <th className="pb-3 pr-4 text-right font-medium">Precio Pedido</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pedidos.map((p) => (
              <tr
                key={p.id}
                onClick={() =>
                  setMenuAbierto((abierto) => (abierto === p.id ? null : p.id))
                }
                className={`group relative cursor-pointer border-t border-neutral-100 transition-transform duration-200 hover:z-10 hover:-translate-y-1 ${
                  menuAbierto === p.id ? "bg-primary-400/20" : ""
                }`}
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
                <td className={`text-neutral-700 ${celda}`}>{p.descripcion}</td>
                <td
                  className={`relative rounded-r-2xl pr-4 text-right font-semibold text-neutral-900 ${celda}`}
                >
                  {p.precio}

                  {/* Menú Aceptar / Rechazar */}
                  {menuAbierto === p.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-2 top-full z-20 -mt-2 w-40 cursor-default rounded-2xl bg-white py-2 text-left shadow-[0_12px_35px_rgba(0,0,0,0.20)]"
                    >
                      <button
                        type="button"
                        onClick={() => decidir(p.id, true)}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-success-600 transition-colors hover:bg-success-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                        </svg>
                        Aceptar
                      </button>
                      <button
                        type="button"
                        onClick={() => decidir(p.id, false)}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-error-500 transition-colors hover:bg-error-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M9 9l6 6M15 9l-6 6" />
                        </svg>
                        Rechazar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
