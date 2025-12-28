import ChartCard from "@/components/dashboard/ChartCard";
import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import KpiCard, { KpiCardProps } from "@/components/dashboard/KpiCard";
import type { Role } from "@/lib/types";

const lineLegend = [
  { label: "Active funds", color: "bg-emerald-500" },
  { label: "Funds in review", color: "bg-slate-400" },
];

const donutLegend = [
  { label: "Investors", color: "bg-emerald-500" },
  { label: "Managers", color: "bg-amber-400" },
  { label: "Family Office", color: "bg-slate-400" },
];

const visibilityByRole: Record<
  Role,
  { kpis: boolean; charts: boolean; tables: boolean }
> = {
  MasterUser: { kpis: true, charts: true, tables: true },
  Investor: { kpis: true, charts: true, tables: false },
  "Fund Manager": { kpis: true, charts: false, tables: true },
  "Family Office": { kpis: false, charts: true, tables: true },
};

type TableRow = {
  id: string;
  [key: string]: React.ReactNode;
  statusLabel?: string;
  statusTone?: "success" | "warning" | "neutral";
};

export default function DashboardOverview({
  title,
  kpis,
  role,
  pendingFundRows = [],
  waitlistRows = [],
  actionRows = [],
  activeFundsCount = 0,
  pendingFundsCount = 0,
  roleCounts = { investors: 0, managers: 0, familyOffices: 0 },
  onPendingFundAction,
}: {
  title: string;
  kpis: KpiCardProps[];
  role: Role;
  pendingFundRows?: TableRow[];
  waitlistRows?: TableRow[];
  actionRows?: TableRow[];
  activeFundsCount?: number;
  pendingFundsCount?: number;
  roleCounts?: { investors: number; managers: number; familyOffices: number };
  onPendingFundAction?: (row: TableRow) => void;
}) {
  const visibility = visibilityByRole[role];
  const maxLineValue = Math.max(activeFundsCount, pendingFundsCount, 1);
  const lineY = (value: number) => 100 - Math.round((value / maxLineValue) * 70);
  const activeLineY = lineY(activeFundsCount);
  const pendingLineY = lineY(pendingFundsCount);
  const activePoints = `10,${activeLineY} 60,${activeLineY} 110,${activeLineY} 160,${activeLineY} 210,${activeLineY} 250,${activeLineY}`;
  const pendingPoints = `10,${pendingLineY} 60,${pendingLineY} 110,${pendingLineY} 160,${pendingLineY} 210,${pendingLineY} 250,${pendingLineY}`;
  const totalRoles =
    roleCounts.investors + roleCounts.managers + roleCounts.familyOffices || 1;
  const investorArc = Math.round((roleCounts.investors / totalRoles) * 250);
  const managerArc = Math.round((roleCounts.managers / totalRoles) * 250);
  const familyArc = Math.round((roleCounts.familyOffices / totalRoles) * 250);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      </header>

      {visibility.kpis ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </div>
        </section>
      ) : null}

      {visibility.charts ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-700">Analytics</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Fund pipeline" legend={lineLegend}>
              <svg viewBox="0 0 260 120" className="h-32 w-full">
                <polyline
                  points={activePoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <polyline
                  points={pendingPoints}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </ChartCard>

            <ChartCard title="Users per role" legend={donutLegend}>
              <svg viewBox="0 0 120 120" className="h-32 w-32">
                <g>
                  <title>{`Investors: ${roleCounts.investors}`}</title>
                  <circle
                    cx="60"
                    cy="60"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${investorArc} 250`}
                  />
                </g>
                <g>
                  <title>{`Managers: ${roleCounts.managers}`}</title>
                  <circle
                    cx="60"
                    cy="60"
                    r="40"
                    stroke="#fbbf24"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${managerArc} 250`}
                    strokeDashoffset={`-${investorArc}`}
                  />
                </g>
                <g>
                  <title>{`Family Office: ${roleCounts.familyOffices}`}</title>
                  <circle
                    cx="60"
                    cy="60"
                    r="40"
                    stroke="#94a3b8"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${familyArc} 250`}
                    strokeDashoffset={`-${investorArc + managerArc}`}
                  />
                </g>
              </svg>
            </ChartCard>
          </div>
        </section>
      ) : null}

      {visibility.tables ? (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-700">Operational queues</h2>
          <div className="grid gap-4 xl:grid-cols-2">
            <DataTable
              title="Pending fund approvals"
              actionLabel="Approve"
              onAction={onPendingFundAction}
              columns={[
                { key: "fund", label: "Fund" },
                { key: "manager", label: "Manager" },
                { key: "submitted", label: "Submitted" },
                { key: "status", label: "Status" },
              ]}
              rows={pendingFundRows.map((row) => ({
                ...row,
                status: row.statusLabel ? (
                  <StatusCell label={row.statusLabel} tone={row.statusTone} />
                ) : (
                  "—"
                ),
              }))}
            />

            <DataTable
              title="Waitlist"
              actionLabel="Review"
              columns={[
                { key: "fund", label: "Fund" },
                { key: "investor", label: "Investor" },
                { key: "country", label: "Country" },
                { key: "status", label: "Status" },
              ]}
              rows={waitlistRows.map((row) => ({
                ...row,
                status: row.statusLabel ? (
                  <StatusCell label={row.statusLabel} tone={row.statusTone} />
                ) : (
                  "—"
                ),
              }))}
            />
          </div>

          <DataTable
            title="Recent actions"
            actionLabel="View"
            columns={[
              { key: "action", label: "Action" },
              { key: "detail", label: "Detail" },
              { key: "date", label: "Date" },
              { key: "status", label: "Status" },
            ]}
            rows={actionRows.map((row) => ({
              ...row,
              status: row.statusLabel ? (
                <StatusCell label={row.statusLabel} tone={row.statusTone} />
              ) : (
                "—"
              ),
            }))}
          />
        </section>
      ) : null}
    </>
  );
}
