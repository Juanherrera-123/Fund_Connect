import { notFound } from "next/navigation";

const posts = {
  "governance-fondos-institucionales": {
    title: "Gobernanza en fondos institucionales",
    body: "Diseña flujos de aprobación con trazabilidad, comités y reporting automático.",
  },
  "waitlists-con-inteligencia": {
    title: "Waitlists con inteligencia operativa",
    body: "Segmenta inversores con señales de riesgo, preferencias y capacidad de capital.",
  },
  "metricas-para-family-office": {
    title: "Métricas accionables para family offices",
    body: "Consolida performance, drawdown y volatilidad con dashboards en tiempo real.",
  },
} as const;

type BlogSlugPageProps = {
  params: { slug: string };
};

export default function BlogSlugPage({ params }: BlogSlugPageProps) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-igates-900 px-6 py-12">
      <article className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="text-lg text-slate-200">{post.body}</p>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
          Contenido extendido próximamente. Este espacio se conectará a una fuente SSG interna.
        </div>
      </article>
    </main>
  );
}
