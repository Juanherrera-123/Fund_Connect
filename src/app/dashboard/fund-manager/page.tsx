import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";

const iconClass = "h-4 w-4";

const fundKpis = [
  {
    label: "Total funds",
    value: "214",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M4 6h12v9H4z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M7 6V4h6v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Inactive funds",
    value: "58",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M5 5h10v10H5z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M7 7l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Active funds",
    value: "156",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M10 3l7 4v6l-7 4-7-4V7l7-4z"
          fill="currentColor"
          opacity="0.25"
        />
        <path
          d="M7.5 10.5l1.5 1.5 3.5-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function FundManagerDashboard() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Funds</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {fundKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-slate-700">Operational queues</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <DataTable
            title="Pending fund approvals"
            actionLabel="Review"
            columns={[
              { key: "fund", label: "Fund name" },
              { key: "owner", label: "Owner" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                id: "fund-1",
                fund: "NorthBridge Credit",
                owner: "Orion Capital",
                status: <StatusCell label="Pending approval" tone="warning" />,
              },
              {
                id: "fund-2",
                fund: "Atlas Macro",
                owner: "Meridian Advisors",
                status: <StatusCell label="Pending approval" tone="warning" />,
              },
              {
                id: "fund-3",
                fund: "Cobalt Growth",
                owner: "Eastbay Partners",
                status: <StatusCell label="Pending approval" tone="warning" />,
              },
            ]}
          />

          <DataTable
            title="Active funds"
            actionLabel="Open"
            columns={[
              { key: "fund", label: "Fund name" },
              { key: "owner", label: "Owner" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                id: "active-1",
                fund: "Summit Infra",
                owner: "Rivergate Partners",
                status: <StatusCell label="Running" tone="success" />,
              },
              {
                id: "active-2",
                fund: "Aurora Equity",
                owner: "Stonebridge Group",
                status: <StatusCell label="Approved" tone="neutral" />,
              },
              {
                id: "active-3",
                fund: "Horizon Opportunities",
                owner: "Kline Family Office",
                status: <StatusCell label="Running" tone="success" />,
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
