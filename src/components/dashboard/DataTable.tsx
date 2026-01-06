import StatusBadge from "@/components/dashboard/StatusBadge";

type Column = {
  key: string;
  label: string;
  labelKey?: string;
  className?: string;
};

type Row = {
  id: string;
  [key: string]: React.ReactNode;
  statusTone?: "success" | "warning" | "neutral" | "danger" | "info";
  statusLabel?: string;
};

export default function DataTable({
  title,
  titleKey,
  columns,
  rows,
  actionLabel,
  actionLabelKey,
  onAction,
}: {
  title: string;
  titleKey?: string;
  columns: Column[];
  rows: Row[];
  actionLabel: string | ((row: Row) => string);
  actionLabelKey?: string;
  onAction?: (row: Row) => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900" data-i18n={titleKey}>
          {title}
        </h3>
        <button
          type="button"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          data-i18n="dashboardViewAll"
        >
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-2 ${column.className ?? ""}`}>
                  <span data-i18n={column.labelKey}>{column.label}</span>
                </th>
              ))}
              <th className="px-4 py-2 text-right" data-i18n="dashboardActionColumn">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="text-slate-700">
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.key}`} className="px-4 py-2">
                      {row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right">
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 px-3 py-1 text-[0.7rem] font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                      onClick={() => onAction?.(row)}
                      data-i18n={typeof actionLabel === "string" ? actionLabelKey : undefined}
                    >
                      {typeof actionLabel === "function" ? actionLabel(row) : actionLabel}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-6 text-center text-xs font-medium text-slate-500"
                  data-i18n="dashboardNoPending"
                >
                  No pending requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function StatusCell({
  label,
  labelKey,
  tone,
}: {
  label: string;
  labelKey?: string;
  tone?: "success" | "warning" | "neutral" | "danger" | "info";
}) {
  return <StatusBadge label={label} labelKey={labelKey} tone={tone} />;
}
