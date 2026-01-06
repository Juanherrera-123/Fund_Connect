import type { ReactNode } from "react";

export type KpiCardProps = {
  label: string;
  labelKey?: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
};

export default function KpiCard({ label, labelKey, value, trend, icon }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          data-i18n={labelKey}
        >
          {label}
        </p>
        {icon ? <span className="text-slate-400">{icon}</span> : null}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {trend ? (
          <span className="text-xs font-medium text-emerald-600">{trend}</span>
        ) : null}
      </div>
    </div>
  );
}
