import DashboardOverview from "@/components/dashboard/DashboardOverview";

const kpis = [
  { label: "Approved Funds", value: "18" },
  { label: "Assets Under Review", value: "$940M", trend: "+1.4%" },
  { label: "Active Requests", value: "11" },
];

export default function FamilyOfficeDashboard() {
  return (
    <DashboardOverview title="Family Office Dashboard" kpis={kpis} />
  );
}
