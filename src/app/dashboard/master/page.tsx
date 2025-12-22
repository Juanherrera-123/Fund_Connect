import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardShell from "@/components/dashboard/DashboardShell";

const kpis = [
  { label: "Approved Funds", value: "128", trend: "+6%" },
  { label: "Assets Under Review", value: "$2.4B", trend: "+2.1%" },
  { label: "Active Requests", value: "46" },
  { label: "Pending Approvals", value: "12" },
];

export default function MasterDashboard() {
  return (
    <DashboardShell role="MasterUser">
      <DashboardOverview title="Master Dashboard" kpis={kpis} />
    </DashboardShell>
  );
}
