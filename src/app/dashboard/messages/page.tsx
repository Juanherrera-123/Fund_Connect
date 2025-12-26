const messageColumns = [
  {
    title: "Investors",
    people: ["Kline Family Office", "Summit Holdings", "Riverside Trust", "Nordic Capital"],
  },
  {
    title: "Funds",
    people: ["Atlas Macro", "NorthBridge Credit", "Aurora Equity", "Cobalt Growth"],
  },
  {
    title: "Family offices",
    people: ["Westgate Family", "Mosaic Partners", "Hawthorne Group", "Lakeside Estate"],
  },
];

export default function MessagesDashboard() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          {messageColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">{column.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {column.people.map((person) => (
                  <li
                    key={person}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    {person}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
