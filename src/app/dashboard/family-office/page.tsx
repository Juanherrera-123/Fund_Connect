import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardShell from "@/components/dashboard/DashboardShell";

const kpis = [
  { label: "Approved Funds", value: "18" },
  { label: "Assets Under Review", value: "$940M", trend: "+1.4%" },
  { label: "Active Requests", value: "11" },
];

export default function FamilyOfficeDashboard() {
  return (
    <DashboardShell role="Family Office">
      <DashboardOverview title="Family Office Dashboard" kpis={kpis} />
    </DashboardShell>
  );
}
