import ChartCard from "@/components/dashboard/ChartCard";
import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import KpiCard, { KpiCardProps } from "@/components/dashboard/KpiCard";
import type { Role } from "@/lib/types";

const lineLegend = [
  { label: "Active funds", labelKey: "dashboardLegendActiveFunds", color: "bg-emerald-500" },
  { label: "Funds in review", labelKey: "dashboardLegendFundsReview", color: "bg-slate-400" },
];

const donutLegend = [
  { label: "Managers", labelKey: "dashboardLegendManagers", color: "bg-amber-400" },
];

const visibilityByRole: Record<Role, { kpis: boolean; charts: boolean; tables: boolean }> = {
  MasterUser: { kpis: true, charts: true, tables: true },
  "Fund Manager": { kpis: true, charts: false, tables: true },
};

type TableRow = {
  id: string;
  [key: string]: React.ReactNode;
  statusLabel?: string;
  statusLabelKey?: string;
  statusTone?: "success" | "warning" | "neutral" | "danger" | "info";
};

export default function DashboardOverview({
  title,
  titleKey,
  kpis,
  role,
  pendingFundRows = [],
  waitlistRows = [],
  actionRows = [],
  activeFundsCount = 0,
  pendingFundsCount = 0,
  roleCounts = { managers: 0 },
  onPendingFundAction,
}: {
  title: string;
  titleKey?: string;
  kpis: KpiCardProps[];
  role: Role;
  pendingFundRows?: TableRow[];
  waitlistRows?: TableRow[];
  actionRows?: TableRow[];
  activeFundsCount?: number;
  pendingFundsCount?: number;
  roleCounts?: { managers: number };
  onPendingFundAction?: (row: TableRow) => void;
}) {
  const visibility = visibilityByRole[role];
  const maxLineValue = Math.max(activeFundsCount, pendingFundsCount, 1);
  const lineY = (value: number) => 100 - Math.round((value / maxLineValue) * 70);
  const activeLineY = lineY(activeFundsCount);
  const pendingLineY = lineY(pendingFundsCount);
  const activePoints = `10,${activeLineY} 60,${activeLineY} 110,${activeLineY} 160,${activeLineY} 210,${activeLineY} 250,${activeLineY}`;
  const pendingPoints = `10,${pendingLineY} 60,${pendingLineY} 110,${pendingLineY} 160,${pendingLineY} 210,${pendingLineY} 250,${pendingLineY}`;
  const totalRoles = roleCounts.managers || 1;
  const managerArc = Math.round((roleCounts.managers / totalRoles) * 250);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n={titleKey}>
          {title}
        </h1>
      </header>

      {visibility.kpis ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardKeyMetrics">
            Key metrics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </div>
        </section>
      ) : null}

      {visibility.charts ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardAnalytics">
            Analytics
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Fund pipeline" titleKey="dashboardFundPipeline" legend={lineLegend}>
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

            <ChartCard title="Users per role" titleKey="dashboardUsersPerRole" legend={donutLegend}>
              <svg viewBox="0 0 120 120" className="h-32 w-32">
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
                  />
                </g>
              </svg>
            </ChartCard>
          </div>
        </section>
      ) : null}

      {visibility.tables ? (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardOperationalQueues">
            Operational queues
          </h2>
          <div className="grid gap-4 xl:grid-cols-2">
            <DataTable
              title="Pending fund approvals"
              titleKey="dashboardPendingFundApprovals"
              actionLabel="Review"
              actionLabelKey="dashboardReviewAction"
              onAction={onPendingFundAction}
              columns={[
                { key: "manager", label: "Name", labelKey: "dashboardColumnName" },
                { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
                { key: "submitted", label: "Submitted", labelKey: "dashboardColumnSubmitted" },
              ]}
              rows={pendingFundRows.map((row) => ({
                ...row,
                status: row.statusLabel ? (
                  <StatusCell
                    label={row.statusLabel}
                    labelKey={row.statusLabelKey}
                    tone={row.statusTone}
                  />
                ) : (
                  "—"
                ),
              }))}
            />

            <DataTable
              title="Waitlist"
              titleKey="dashboardWaitlist"
              actionLabel="Review"
              actionLabelKey="dashboardReviewAction"
              columns={[
                { key: "fund", label: "Fund", labelKey: "dashboardColumnFund" },
                { key: "requester", label: "Requester", labelKey: "dashboardColumnName" },
                { key: "country", label: "Country", labelKey: "dashboardColumnCountry" },
                { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
              ]}
              rows={waitlistRows.map((row) => ({
                ...row,
                status: row.statusLabel ? (
                  <StatusCell
                    label={row.statusLabel}
                    labelKey={row.statusLabelKey}
                    tone={row.statusTone}
                  />
                ) : (
                  "—"
                ),
              }))}
            />
          </div>

          <DataTable
            title="Recent actions"
            titleKey="dashboardRecentActions"
            actionLabel="View"
            actionLabelKey="dashboardViewAction"
            columns={[
              { key: "action", label: "Action", labelKey: "dashboardColumnAction" },
              { key: "detail", label: "Detail", labelKey: "dashboardColumnDetail" },
              { key: "date", label: "Date", labelKey: "dashboardColumnDate" },
              { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
            ]}
            rows={actionRows.map((row) => ({
              ...row,
              status: row.statusLabel ? (
                <StatusCell
                  label={row.statusLabel}
                  labelKey={row.statusLabelKey}
                  tone={row.statusTone}
                />
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
