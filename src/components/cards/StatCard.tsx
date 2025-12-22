type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-igates-800/60 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-igates-400">{label}</p>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
    </div>
  );
}
