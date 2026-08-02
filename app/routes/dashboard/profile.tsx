import { useState } from "react";
import SearchHeader from "./components/search-header";

const IMG = "/images/image_home";

function Divisor({ titulo }: { titulo: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-px flex-1 bg-neutral-200" />
      <h2 className="font-sans text-lg font-bold text-[#415936]">{titulo}</h2>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

type CampoProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function Campo({ label, value, onChange, type = "text" }: CampoProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#3F443D]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-[#415936] bg-white px-5 py-3.5 text-[15px] text-[#415936] outline-none transition-colors placeholder:text-[#415936]/60 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30"
      />
    </div>
  );
}

export function meta() {
  return [{ title: "Mi Perfil | BANEY RD" }];
}

export default function Profile() {
  const [form, setForm] = useState({
    // Información del usuario
    nombres: "Juan Rafael",
    apellidos: "Pérez Guzmán",
    correo: "agroyucaRD@gmail.com",
    telefono: "+1 (809)-884-3392",
    provincia: "San Pedro de Macorís",
    pais: "República Dominicana",
    // Información mercantil
    negocio: "AgroYUCA_RD",
    correoCorp: "agroyucaRD@gmail.com",
    telNegocio: "+1 (809)-884-3392",
    direccion: "Calle Duarte #12, San Pedro de Macorís",
    rnc: "1-31-85274-9",
    dueno: "Juan Rafael Pérez Guzmán",
    // Métodos de pago
    cuenta: "1234567890",
  });

  function set(campo: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [campo]: value }));
  }

  function guardar(event: React.FormEvent) {
    event.preventDefault();
    // TODO: enviar a la API cuando exista el backend
  }

  return (
    <div className="space-y-8">
      <SearchHeader />

      <form onSubmit={guardar} className="space-y-8">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Cambiar avatar"
            className="group shrink-0 overflow-hidden rounded-full"
          >
            <img
              src={`${IMG}/Ellipse 5.png`}
              alt="Avatar del usuario"
              className="h-24 w-24 rounded-full object-cover transition duration-200 group-hover:scale-105 group-hover:brightness-75"
            />
          </button>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
            Actualiza tu avatar haciendo clic en la imagen. Tamaño recomendado:
            288×288 px, solo en formato PNG o JPG.
          </p>
        </div>

        {/* Información del usuario */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Nombres" value={form.nombres} onChange={set("nombres")} />
          <Campo
            label="Apellidos"
            value={form.apellidos}
            onChange={set("apellidos")}
          />
          <Campo
            label="Correo Electrónico"
            type="email"
            value={form.correo}
            onChange={set("correo")}
          />
          <Campo
            label="Número Telefónico"
            type="tel"
            value={form.telefono}
            onChange={set("telefono")}
          />
          <Campo
            label="Provincia"
            value={form.provincia}
            onChange={set("provincia")}
          />
          <Campo label="País" value={form.pais} onChange={set("pais")} />
        </div>

        {/* Información del negocio */}
        <Divisor titulo="Información Mercantil" />

        <div className="space-y-5">
          <Campo
            label="Nombre de negocio"
            value={form.negocio}
            onChange={set("negocio")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              label="Correo Corporativo"
              type="email"
              value={form.correoCorp}
              onChange={set("correoCorp")}
            />
            <Campo
              label="Número Telefónico del negocio"
              type="tel"
              value={form.telNegocio}
              onChange={set("telNegocio")}
            />
          </div>
          <Campo
            label="Dirección del negocio"
            value={form.direccion}
            onChange={set("direccion")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo label="RNC" value={form.rnc} onChange={set("rnc")} />
            <Campo
              label="Dueño del negocio"
              value={form.dueno}
              onChange={set("dueno")}
            />
          </div>
        </div>

        {/* Métodos de pago */}
        <Divisor titulo="Métodos de Pago" />

        <Campo
          label="Cuenta designada"
          value={form.cuenta}
          onChange={set("cuenta")}
        />

        <div className="space-y-4 pt-2">
          <button
            type="button"
            className="w-full rounded-full bg-primary-200 py-3.5 font-sans text-[15px] font-semibold text-primary-800 transition-all duration-200 hover:scale-[1.02] hover:bg-primary-300 hover:shadow-md active:bg-primary-600 active:text-white active:ring-2 active:ring-primary-700"
          >
            Agregar otro método de pago
          </button>
          <button
            type="submit"
            className="w-full rounded-full bg-primary-600 py-3.5 font-sans text-[15px] font-semibold text-secondary-50 transition-all duration-200 hover:scale-[1.02] hover:bg-primary-500 hover:shadow-lg active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
