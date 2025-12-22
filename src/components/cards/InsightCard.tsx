type InsightCardProps = {
  title: string;
  body: string;
};

export function InsightCard({ title, body }: InsightCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-igates-800/60 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-slate-200">{body}</p>
    </div>
  );
}
