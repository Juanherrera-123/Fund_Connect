import StatusBadge from "@/components/dashboard/StatusBadge";

type Column = {
  key: string;
  label: string;
  className?: string;
};

type Row = {
  id: string;
  [key: string]: React.ReactNode;
  statusTone?: "success" | "warning" | "neutral";
  statusLabel?: string;
};

export default function DataTable({
  title,
  columns,
  rows,
  actionLabel,
}: {
  title: string;
  columns: Column[];
  rows: Row[];
  actionLabel: string;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button
          type="button"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
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
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-2 text-right">Action</th>
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
                    >
                      {actionLabel}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-6 text-center text-xs font-medium text-slate-500"
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
  tone,
}: {
  label: string;
  tone?: "success" | "warning" | "neutral";
}) {
  return <StatusBadge label={label} tone={tone} />;
}
