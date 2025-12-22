export type KpiCardProps = {
  label: string;
  value: string;
  trend?: string;
};

export default function KpiCard({ label, value, trend }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {trend ? (
          <span className="text-xs font-medium text-emerald-600">{trend}</span>
        ) : null}
      </div>
    </div>
  );
}
