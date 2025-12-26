import StatusBadge from "@/components/dashboard/StatusBadge";

const profileFields = [
  { label: "Nombre", value: "Isabela" },
  { label: "Apellido", value: "Ramos" },
  { label: "Monto asignado", value: "$1.8M" },
  { label: "Monto objetivo", value: "$3.0M" },
  { label: "Perfil de inversión", value: "Infraestructura" },
];

export default function SettingsDashboard() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Perfil del usuario</h2>
              <p className="text-xs text-slate-500">
                Actualiza la información que se completó durante la inscripción.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Batch</span>
              <StatusBadge label="Activo" tone="success" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-2 text-xs font-medium">
                <span className="text-slate-600">{field.label}</span>
                <input
                  defaultValue={field.value}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Marcar inactivo
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
