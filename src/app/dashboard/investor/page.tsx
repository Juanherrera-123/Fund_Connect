import DashboardOverview from "@/components/dashboard/DashboardOverview";

const kpis = [
  { label: "Approved Funds", value: "32", trend: "+4%" },
  { label: "Assets Under Review", value: "$620M" },
  { label: "Active Requests", value: "8" },
];

export default function InvestorDashboard() {
  return (
    <DashboardOverview title="Investor Dashboard" kpis={kpis} />
  );
}
