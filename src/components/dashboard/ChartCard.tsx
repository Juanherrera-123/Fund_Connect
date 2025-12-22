export default function ChartCard({
  title,
  children,
  legend,
}: {
  title: string;
  children: React.ReactNode;
  legend: { label: string; color: string }[];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 flex items-center justify-center rounded-lg bg-slate-50 p-4">
        {children}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
