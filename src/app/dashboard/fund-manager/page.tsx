import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardShell from "@/components/dashboard/DashboardShell";

const kpis = [
  { label: "Approved Funds", value: "6" },
  { label: "Assets Under Review", value: "$180M" },
  { label: "Active Requests", value: "4" },
];

export default function FundManagerDashboard() {
  return (
    <DashboardShell role="Fund Manager">
      <DashboardOverview title="Fund Manager Dashboard" kpis={kpis} />
    </DashboardShell>
  );
}
