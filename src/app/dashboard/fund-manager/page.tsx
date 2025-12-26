import DashboardOverview from "@/components/dashboard/DashboardOverview";

const kpis = [
  { label: "Approved Funds", value: "6" },
  { label: "Assets Under Review", value: "$180M" },
  { label: "Active Requests", value: "4" },
];

export default function FundManagerDashboard() {
  return (
    <DashboardOverview title="Fund Manager Dashboard" kpis={kpis} />
  );
}
