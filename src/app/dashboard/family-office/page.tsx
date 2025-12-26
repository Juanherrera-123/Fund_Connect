import ChartCard from "@/components/dashboard/ChartCard";

const requestsLegend = [
  { label: "Waitlist", color: "bg-amber-400" },
  { label: "Fund requests", color: "bg-emerald-500" },
];

const usersLegend = [
  { label: "Active users", color: "bg-emerald-500" },
  { label: "Inactive/pending", color: "bg-slate-400" },
];

const assetsLegend = [
  { label: "Assigned", color: "bg-emerald-500" },
  { label: "Unassigned", color: "bg-slate-400" },
];

const fundsLegend = [
  { label: "Active funds", color: "bg-emerald-500" },
  { label: "Inactive funds", color: "bg-amber-400" },
];

export default function FamilyOfficeDashboard() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Analytics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Requests" legend={requestsLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect x="20" y="35" width="50" height="70" fill="#fbbf24" />
              <rect x="100" y="20" width="50" height="85" fill="#10b981" />
            </svg>
          </ChartCard>

          <ChartCard title="Users" legend={usersLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect x="30" y="25" width="60" height="80" fill="#10b981" />
              <rect x="130" y="45" width="60" height="60" fill="#94a3b8" />
            </svg>
          </ChartCard>

          <ChartCard title="Total assets" legend={assetsLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect x="30" y="20" width="60" height="85" fill="#10b981" />
              <rect x="130" y="50" width="60" height="55" fill="#94a3b8" />
            </svg>
          </ChartCard>

          <ChartCard title="Active funds" legend={fundsLegend}>
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray="170 250"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#fbbf24"
                strokeWidth="12"
                fill="none"
                strokeDasharray="80 250"
                strokeDashoffset="-170"
              />
            </svg>
          </ChartCard>
        </div>
      </section>
    </>
  );
}
