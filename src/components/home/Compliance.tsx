const complianceItems = [
  {
    titleKey: "complianceIdentityTitle",
    bodyKey: "complianceIdentityBody",
    title: "Identity & Access",
    body: "Multi-factor auth, SSO/SAML, and secure vaulting for documents and NDAs.",
  },
  {
    titleKey: "complianceMonitoringTitle",
    bodyKey: "complianceMonitoringBody",
    title: "Monitoring",
    body: "Automated audit trails, threshold alerts, and encryption in transit and at rest.",
  },
  {
    titleKey: "complianceGovernanceTitle",
    bodyKey: "complianceGovernanceBody",
    title: "Governance",
    body: "Pre-configured policies aligned to institutional due diligence standards.",
  },
];

export function Compliance() {
  return (
    <section id="compliance" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-500"
              data-i18n="complianceEyebrow"
            >
              Compliance First
            </p>
            <h2 className="text-3xl font-semibold text-slate-900" data-i18n="complianceTitle">
              Regulatory-grade controls at every step.
            </h2>
            <p className="text-sm text-slate-600" data-i18n="complianceBody">
              SOC2-ready infrastructure, geo-fenced data residency, and layered permissions keep
              sensitive information protected.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="h-1 w-16 rounded-full bg-igates-500" />
            <div className="mt-6 space-y-6">
              {complianceItems.map((item) => (
                <div key={item.titleKey}>
                  <h4 className="text-sm font-semibold text-slate-900" data-i18n={item.titleKey}>
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600" data-i18n={item.bodyKey}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
