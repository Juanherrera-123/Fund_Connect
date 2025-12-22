import ChartCard from "@/components/dashboard/ChartCard";
import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import KpiCard, { KpiCardProps } from "@/components/dashboard/KpiCard";

const lineLegend = [
  { label: "Approved", color: "bg-emerald-500" },
  { label: "Review", color: "bg-slate-400" },
];

const donutLegend = [
  { label: "MasterUser", color: "bg-slate-800" },
  { label: "Investors", color: "bg-emerald-500" },
  { label: "Managers", color: "bg-amber-400" },
  { label: "Family Office", color: "bg-slate-400" },
];

export default function DashboardOverview({
  title,
  kpis,
}: {
  title: string;
  kpis: KpiCardProps[];
}) {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Analytics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Request throughput" legend={lineLegend}>
            <svg viewBox="0 0 260 120" className="h-32 w-full">
              <polyline
                points="10,90 60,70 110,75 160,40 210,30 250,20"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <polyline
                points="10,100 60,90 110,82 160,70 210,60 250,52"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </ChartCard>

          <ChartCard title="Users by role" legend={donutLegend}>
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#0f172a"
                strokeWidth="12"
                fill="none"
                strokeDasharray="90 250"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray="70 250"
                strokeDashoffset="-90"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#fbbf24"
                strokeWidth="12"
                fill="none"
                strokeDasharray="50 250"
                strokeDashoffset="-160"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#94a3b8"
                strokeWidth="12"
                fill="none"
                strokeDasharray="40 250"
                strokeDashoffset="-210"
              />
            </svg>
          </ChartCard>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-slate-700">Operational queues</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <DataTable
            title="Pending fund approvals"
            actionLabel="Approve"
            columns={[
              { key: "fund", label: "Fund" },
              { key: "manager", label: "Manager" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                id: "fund-1",
                fund: "NorthBridge Credit",
                manager: "Orion Capital",
                status: <StatusCell label="Under review" tone="warning" />,
              },
              {
                id: "fund-2",
                fund: "Atlas Macro",
                manager: "Meridian Advisors",
                status: <StatusCell label="Compliance" tone="neutral" />,
              },
              {
                id: "fund-3",
                fund: "Cobalt Growth",
                manager: "Eastbay Partners",
                status: <StatusCell label="Documentation" tone="warning" />,
              },
            ]}
          />

          <DataTable
            title="Waitlists"
            actionLabel="Review"
            columns={[
              { key: "name", label: "Name" },
              { key: "segment", label: "Segment" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                id: "wait-1",
                name: "Kline Family Office",
                segment: "Family Office",
                status: <StatusCell label="Verification" tone="warning" />,
              },
              {
                id: "wait-2",
                name: "Summit Holdings",
                segment: "Investor",
                status: <StatusCell label="KYC" tone="neutral" />,
              },
              {
                id: "wait-3",
                name: "Granite Ventures",
                segment: "Fund Manager",
                status: <StatusCell label="Ready" tone="success" />,
              },
            ]}
          />
        </div>

        <DataTable
          title="Recent actions"
          actionLabel="View"
          columns={[
            { key: "action", label: "Action" },
            { key: "owner", label: "Owner" },
            { key: "status", label: "Status" },
          ]}
          rows={[
            {
              id: "act-1",
              action: "Updated onboarding checklist",
              owner: "Operations Desk",
              status: <StatusCell label="Completed" tone="success" />,
            },
            {
              id: "act-2",
              action: "Reviewed fund documents",
              owner: "Compliance Team",
              status: <StatusCell label="In progress" tone="warning" />,
            },
            {
              id: "act-3",
              action: "Issued quarterly report",
              owner: "Analytics",
              status: <StatusCell label="Scheduled" tone="neutral" />,
            },
          ]}
        />
      </section>
    </>
  );
}
