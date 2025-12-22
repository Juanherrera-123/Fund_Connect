const footerLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
  { label: "Contacto", href: "mailto:hello@igates.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-igates-900 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-white">IGATES</p>
          <p className="text-xs text-white/50">
            Plataforma institucional para gestión de fondos.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-white/60">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
