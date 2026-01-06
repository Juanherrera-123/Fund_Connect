const toneStyles: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  danger: "bg-rose-50 text-rose-700 border-rose-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function StatusBadge({
  label,
  labelKey,
  tone = "neutral",
}: {
  label: string;
  labelKey?: string;
  tone?: "success" | "warning" | "neutral" | "danger" | "info";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        toneStyles[tone]
      }`}
      data-i18n={labelKey}
    >
      {label}
    </span>
  );
}
