import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingScreen from "~/components/loading-screen";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import Button from "~/components/ui/button";
import ProductCarousel from "~/components/product-carousel";
import TestimonialCarousel, {
  type Testimonio,
} from "~/components/testimonial-carousel";
import type { Product } from "~/types/product";

const IMG = "/images/image_home";

const LOREM_CORTO =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.";
const LOREM_LARGO =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

const heroPersonas = [
  { img: `${IMG}/image_home_01.png`, name: "Jose Pérez", loc: "San Pedro de Macoriz" },
  { img: `${IMG}/image_home_02.png`, name: "Cristina Jimenez", loc: "Santo Domingo" },
];

const features = [
  { img: `${IMG}/image_home_03.png`, title: "Regular precios del mercado" },
  { img: `${IMG}/image_home_04.png`, title: "Digitalización del mercado" },
  { img: `${IMG}/image_home_05.png`, title: "Logística simplicidad" },
];

const ecosistema = [
  { img: `${IMG}/image_home_08.png`, name: "AgroMerca RD" },
  { img: `${IMG}/image_home_09.png`, name: "Jumbo RD" },
  { img: `${IMG}/image_home_10.png`, name: "Supermercado Nacional" },
  { img: `${IMG}/image_home_11.png`, name: "AgroExpressRD" },
  { img: `${IMG}/image_home_12.png`, name: "Supermercado Nacional" },
  { img: `${IMG}/image_home_13.png`, name: "AgroExpressRD" },
];

const avatarVendedor = `${IMG}/Ellipse 5.png`;

const testimonios: Testimonio[] = [
  {
    img: `${IMG}/image_home_06.png`,
    texto: LOREM_LARGO,
    nombre: "Jacinto José Reyes",
    rol: "Productor Primario",
  },
  {
    img: `${IMG}/image_home_07.png`,
    texto: LOREM_LARGO,
    nombre: "Hermanos Rodríguez",
    rol: "Productores de cacao",
  },
  {
    img: `${IMG}/image_home_12.png`,
    texto: LOREM_LARGO,
    nombre: "Luisa y Ramón García",
    rol: "Agricultores",
  },
  {
    img: `${IMG}/image_home_13.png`,
    texto: LOREM_LARGO,
    nombre: "Miguel Castillo",
    rol: "Productor de tomates",
  },
];

const productos: Product[] = [
  {
    id: "1",
    name: "Papas Criollas",
    image: `${IMG}/image_home_14.png`,
    price: 75,
    currency: "$",
    rating: 4,
    seller: { name: "José Pérez", avatar: avatarVendedor, location: "Bani" },
  },
  {
    id: "2",
    name: "Carne Angus",
    image: `${IMG}/image_home_15.png`,
    price: 430,
    currency: "$",
    rating: 4,
    seller: { name: "José Pérez", avatar: avatarVendedor, location: "San Pedro" },
  },
  {
    id: "3",
    name: "Platanos",
    image: `${IMG}/image_home_16.png`,
    price: 10,
    currency: "$",
    rating: 4,
    seller: { name: "José Pérez", avatar: avatarVendedor, location: "San Cristobal" },
  },
  {
    id: "4",
    name: "Miel Artesanal",
    image: `${IMG}/image_home_17.png`,
    price: 500,
    currency: "$",
    rating: 4,
    seller: { name: "José Pérez", avatar: avatarVendedor, location: "Monte Plata" },
  },
  // TODO: reemplazar estas imágenes cuando exportes más productos del Figma
  {
    id: "5",
    name: "Papas Blancas",
    image: `${IMG}/image_home_14.png`,
    price: 65,
    currency: "$",
    rating: 5,
    seller: { name: "María Santos", avatar: avatarVendedor, location: "Constanza" },
  },
  {
    id: "6",
    name: "Res Premium",
    image: `${IMG}/image_home_15.png`,
    price: 520,
    currency: "$",
    rating: 4,
    seller: { name: "Rancho Díaz", avatar: avatarVendedor, location: "Higüey" }
  },
  {
    id: "7",
    name: "Guineos Verdes",
    image: `${IMG}/image_home_16.png`,
    price: 8,
    currency: "$",
    rating: 4,
    seller: { name: "Finca López", avatar: avatarVendedor, location: "Azua" },
  },
  {
    id: "8",
    name: "Miel de Abeja Pura",
    image: `${IMG}/image_home_17.png`,
    price: 450,
    currency: "$",
    rating: 5,
    seller: { name: "Apiario Marte", avatar: avatarVendedor, location: "Jarabacoa" },
  },
];

export function meta() {
  return [
    { title: "BANEY RD" },
    {
      name: "description",
      content: "Marketplace agropecuario de República Dominicana",
    },
  ];
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simula la carga inicial; cuando conectemos la API real,
  // este estado dependerá de los datos en vez de un timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div
      className="flex min-h-screen flex-col bg-secondary-50 bg-[length:100%_auto] bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/images/image_home/fondo_home.png')" }}
    >
      <Navbar session />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2">
          <div className="min-w-0">
            <h1 className="max-w-md text-2xl font-bold leading-snug text-secondary2-500 sm:text-3xl md:text-4xl">
              Fortalece tus conocimientos y habilidades para hacer crecer tu
              negocio
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-700">
              {LOREM_LARGO}
            </p>
            <Button to="/dashboard" className="mt-8 px-6 py-2.5 text-sm">
              Ingresa a tu Perfil
            </Button>
          </div>

          <div className="flex min-w-0 justify-center gap-4 sm:gap-8 lg:justify-end">
            {heroPersonas.map((p, i) => (
              <figure key={p.name} className="w-1/2 min-w-0 max-w-[288px] sm:w-60 lg:w-72">
                <img
                  src={p.img}
                  alt={p.name}
                  className={`aspect-[3/4] w-full cursor-pointer rounded-3xl object-cover shadow-lg transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-105 hover:shadow-2xl ${
                    i === 0
                      ? "hover:-rotate-3 hover:-translate-x-2"
                      : "hover:rotate-3 hover:translate-x-2"
                  }`}
                />
                <figcaption className="mt-3 flex items-center gap-2">
                  <img
                    src={p.img}
                    alt=""
                    aria-hidden
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {p.name}
                    </p>
                    <p className="truncate text-xs text-neutral-500">{p.loc}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Tarjetas informativas */}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <img
                src={f.img}
                alt={f.title}
                className="w-full drop-shadow-lg"
              />
              <h3 className="mx-auto mt-7 max-w-[280px] text-2xl font-semibold leading-snug text-neutral-900">
                {f.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[300px] text-sm leading-relaxed text-neutral-500">
                {LOREM_CORTO}
              </p>
            </div>
          ))}
        </section>

        {/* Testimonios */}
        <section className="overflow-hidden py-14">
          <img
            src={`${IMG}/titulo_home.png`}
            alt="Mas de 35,000 mil proveedores usan nuestros servicios"
            className="mx-auto w-full max-w-6xl px-6"
          />

          <div className="mt-8">
            <TestimonialCarousel items={testimonios} />
          </div>
        </section>

        {/* Ecosistema */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-center text-2xl font-bold tracking-wide text-neutral-900">
            CONOCE EL ECOSISTEMA BANEY
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {ecosistema.map((e, i) => (
              <div key={`${e.name}-${i}`} className="flex items-start gap-5">
                <img
                  src={e.img}
                  alt={e.name}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{e.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{LOREM_CORTO}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Productos: catálogo a todo lo ancho, hasta el borde */}
        <section className="w-full px-8 py-16 2xl:px-16">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-bold tracking-wide text-neutral-900">
              NUESTROS PRODUCTOS
            </h2>
            <Link
              to="/marketplace"
              className="text-sm font-semibold text-neutral-900 underline hover:text-primary-600"
            >
              Ver Todos los freelancers <span aria-hidden>›</span>
            </Link>
          </div>

          <ProductCarousel items={productos} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
