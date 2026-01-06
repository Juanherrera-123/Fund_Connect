export default function ChartCard({
  title,
  titleKey,
  children,
  legend,
}: {
  title: string;
  titleKey?: string;
  children: React.ReactNode;
  legend: { label: string; labelKey?: string; color: string }[];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900" data-i18n={titleKey}>
        {title}
      </h3>
      <div className="mt-4 flex items-center justify-center rounded-lg bg-slate-50 p-4">
        {children}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <span data-i18n={item.labelKey}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
