import { useState } from "react";
import { Link, useNavigate } from "react-router";
import InputField from "~/components/ui/input";
import GoogleButton from "~/components/ui/google-button";

export function meta() {
  return [{ title: "Crea tu cuenta | BANEY RD" }];
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    cedula: "",
    telefono: "",
    contrasena: "",
  });

  function setField(field: keyof typeof form) {
    return (value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: llamar a la API real; por ahora simula el registro exitoso
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <h1 className="text-center text-2xl font-bold text-neutral-900">
        Crea tu cuenta
      </h1>

      <div className="grid gap-3 sm:grid-cols-2">
        <InputField
          label="Nombre"
          name="nombre"
          placeholder="Ingrese su nombre"
          value={form.nombre}
          onChange={setField("nombre")}
        />
        <InputField
          label="Apellido"
          name="apellido"
          placeholder="Ingrese su apellido"
          value={form.apellido}
          onChange={setField("apellido")}
        />
      </div>

      <InputField
        label="Correo Electrónico"
        name="correo"
        type="email"
        placeholder="Ingrese su correo electronico"
        value={form.correo}
        onChange={setField("correo")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <InputField
          label="Cedula"
          name="cedula"
          placeholder="Ingrese su cedula"
          value={form.cedula}
          onChange={setField("cedula")}
        />
        <InputField
          label="Numero Telefónico"
          name="telefono"
          type="tel"
          placeholder="Ingrese su numero telefónico"
          value={form.telefono}
          onChange={setField("telefono")}
        />
      </div>

      <InputField
        label="Contraseña"
        name="contrasena"
        type="password"
        placeholder="Ingrese su contraseña"
        value={form.contrasena}
        onChange={setField("contrasena")}
      />

      <button
        type="submit"
        className="mx-auto block w-56 rounded-full bg-primary-600 py-2.5 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-lg active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
      >
        Registrarme
      </button>

      <p className="text-center text-sm text-neutral-600">
        Ya tienes una cuenta?{" "}
        <Link to="/login" className="font-semibold text-neutral-900 hover:underline">
          Log in
        </Link>
      </p>

      <div className="flex items-center gap-4 text-neutral-400">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-sm font-semibold">OR</span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <div className="flex justify-center gap-4">
        <GoogleButton />
        <GoogleButton />
      </div>
    </form>
  );
}
