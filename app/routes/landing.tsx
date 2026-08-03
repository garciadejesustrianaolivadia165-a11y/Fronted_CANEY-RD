import Navbar from "~/components/navbar";
import FooterLanding from "~/components/footer-landing";
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

      {/* Hero: campo de fondo + granjero con camiones a la derecha */}
      <main className="relative flex-1 overflow-hidden bg-primary-100">
        <img
          src="/images/Fondo_login.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/15" />

        <img
          src="/images/granjero.png"
          alt="Productor BANEY usando la plataforma"
          className="absolute bottom-0 right-[6%] z-10 hidden h-[88%] w-auto object-contain object-bottom lg:block"
        />

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[96rem] flex-col justify-start px-8 pt-36 2xl:px-16">
          <h1 className="max-w-2xl font-sans text-5xl font-bold leading-tight text-[#5F4829] md:text-6xl">
            Vender, mover y cumplir el mercado dominicano a un clic
          </h1>
          <p className="mt-7 max-w-xl text-lg text-neutral-800">
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

      <FooterLanding />
    </div>
  );
}
