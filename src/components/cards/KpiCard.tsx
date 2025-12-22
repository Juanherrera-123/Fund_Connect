type KpiCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function KpiCard({ label, value, detail }: KpiCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-igates-400">{label}</p>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-slate-200">{detail}</p>
    </div>
  );
}
