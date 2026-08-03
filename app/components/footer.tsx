import { Link } from "react-router";

const columns = [
  {
    title: "Product",
    items: [
      "BD Proveedores",
      "Clientes",
      "Productos",
      "Time tracking",
      "Planificación",
      "Reclutamiento",
    ],
  },
  {
    title: "Information",
    items: ["FAQ", "Vlog", "Soporte"],
  },
  {
    title: "Company",
    items: ["Sobre nosotros", "Carreras", "Contáctanos", "Medios"],
  },
];

const legales = ["Terminos", "Privacidad", "Cookies"];

const socials = [
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.15h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V24h-4.52v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V24H8.34V8.25z",
  },
  {
    name: "Facebook",
    href: "#",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary4-500 text-secondary-50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-lg font-bold">{col.title}</h3>
              <ul className="space-y-3 text-sm text-secondary-100">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="rounded-2xl bg-white/10 p-6">
            <h3 className="mb-4 font-bold">Unete a nuestro Newsletter</h3>
            <form
              className="flex items-center overflow-hidden rounded-full bg-white"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Correo Electrónico"
                aria-label="Correo Electrónico"
                className="w-full bg-transparent px-4 py-2 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                aria-label="Suscribirse"
                className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-primary-600"
              >
                <span aria-hidden>→</span>
              </button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-secondary-100/80">
              Recibe novedades del mercado, el ecosistema y la academia BANEY
              directo en tu correo.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 md:flex-row">
          <Link to="/" className="flex items-center">
            <img
              src="/logos/Logo_Horizontal_baney_png.png"
              alt="BANEY"
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex gap-8 text-sm text-secondary-100">
            {legales.map((item) => (
              <a key={item} href="#" className="hover:text-white hover:underline">
                {item}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="text-secondary-100 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
