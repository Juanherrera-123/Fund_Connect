import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardShell from "@/components/dashboard/DashboardShell";

const kpis = [
  { label: "Approved Funds", value: "32", trend: "+4%" },
  { label: "Assets Under Review", value: "$620M" },
  { label: "Active Requests", value: "8" },
];

export default function InvestorDashboard() {
  return (
    <DashboardShell role="Investor">
      <DashboardOverview title="Investor Dashboard" kpis={kpis} />
    </DashboardShell>
  );
}
