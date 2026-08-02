import { useState } from "react";
import { Link, useNavigate } from "react-router";
import InputField from "~/components/ui/input";
import GoogleButton from "~/components/ui/google-button";

export function meta() {
  return [{ title: "Inicio de Sección | BANEY RD" }];
}

type LoginErrors = {
  nombre?: string;
  correo?: string;
  contrasena?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Vista "Error de Acceso": los mensajes aparecen bajo cada campo inválido
    const next: LoginErrors = {};
    if (!nombre.trim()) next.nombre = "Nombre incorrecto";
    if (!/^\S+@\S+\.\S+$/.test(correo)) next.correo = "Correo electrónico incorrecto";
    if (contrasena.length < 6) next.contrasena = "Contraseña incorrecta";
    setErrors(next);

    if (Object.keys(next).length === 0) {
      // TODO: llamar a la API real; por ahora simula el acceso exitoso
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <h1 className="text-center text-2xl font-bold text-neutral-900">
        Inicio de Sección
      </h1>

      <InputField
        label="Nombre"
        name="nombre"
        placeholder="Ingrese su nombre completo"
        value={nombre}
        onChange={setNombre}
        error={errors.nombre}
      />
      <InputField
        label="Correo Electrónico"
        name="correo"
        type="email"
        placeholder="Ingrese su correo electrónico"
        value={correo}
        onChange={setCorreo}
        error={errors.correo}
      />
      <InputField
        label="Contraseña"
        name="contrasena"
        type="password"
        placeholder="Ingrese su contraseña"
        value={contrasena}
        onChange={setContrasena}
        error={errors.contrasena}
      />

      <button
        type="submit"
        className="mx-auto block w-56 rounded-full bg-primary-600 py-2.5 text-sm font-semibold text-secondary-50 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:shadow-lg active:bg-white active:text-primary-800 active:ring-2 active:ring-primary-800"
      >
        Iniciar Sección
      </button>

      <p className="text-center text-sm text-neutral-600">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="font-semibold text-neutral-900 hover:underline">
          Regístrate
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
