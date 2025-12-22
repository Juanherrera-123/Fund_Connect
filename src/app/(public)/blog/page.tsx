import Link from "next/link";

const posts = [
  {
    slug: "governance-fondos-institucionales",
    title: "Gobernanza en fondos institucionales",
    excerpt: "Estructura de aprobación y reporting para vehículos alternativos.",
  },
  {
    slug: "waitlists-con-inteligencia",
    title: "Waitlists con inteligencia operativa",
    excerpt: "Cómo priorizar inversores con señales de riesgo y apetito.",
  },
  {
    slug: "metricas-para-family-office",
    title: "Métricas accionables para family offices",
    excerpt: "KPIs que consolidan performance, drawdown y volatilidad.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-igates-900 px-6 py-12">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.4em] text-igates-400">IGATES Blog</p>
          <h1 className="mt-4 text-4xl font-semibold">Contenido estratégico para fondos.</h1>
          <p className="mt-3 text-slate-200">
            Insights para optimizar procesos de aprobación, onboarding y reporting.
          </p>
        </header>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-igates-400"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-200">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
