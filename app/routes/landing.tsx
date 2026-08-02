import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import Button from "~/components/ui/button";

export function meta() {
  return [
    { title: "BANEY RD" },
    {
      name: "description",
      content: "Marketplace agropecuario de República Dominicana",
    },
  ];
}

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero a pantalla completa; bg-primary-200 es el respaldo si falta la imagen */}
      <main
        className="relative flex-1 bg-primary-200 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
      >
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-6 pt-40">
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Vender, mover y cumplir el mercado dominicano a un clic
          </h1>
          <p className="mt-6 max-w-lg text-base text-neutral-800">
            Plataforma integral que virtualiza el mercado, conecta MIPYMES y
            productores con la demanda, optimiza logística y pagos, y simplifica
            la formalización fiscal.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Button to="/login">Inicia Sección</Button>
            <Button to="/register" variant="soft">
              Regístrate gratis Aqui <span aria-hidden>»</span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
