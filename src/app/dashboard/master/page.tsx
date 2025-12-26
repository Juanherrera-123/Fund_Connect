import DashboardOverview from "@/components/dashboard/DashboardOverview";

const iconClass = "h-4 w-4";

const kpis = [
  {
    label: "Active Funds",
    value: "128",
    trend: "+6%",
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
  {
    label: "Pending Assets",
    value: "$2.4B",
    trend: "+2.1%",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M4 14.5h12M5 13V7m5 6V5m5 8V9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "On waitlist",
    value: "46",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M4 5h12v6H4z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M6 13h8M6 16h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Pending Approvals",
    value: "12",
    icon: (
      <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
        <path
          d="M5 4h10v12H5z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M7 8h6M7 11h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function MasterDashboard() {
  return (
    <DashboardOverview title="Master Dashboard" kpis={kpis} role="MasterUser" />
  );
}
