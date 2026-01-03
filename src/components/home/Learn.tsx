const learnPosts = [
  {
    titleKey: "learnPost1Title",
    timeKey: "learnPost1Time",
    bodyKey: "learnPost1Body",
    title: "Morning allocation radar: credit and macro themes",
    time: "Today",
    body:
      "Top forum threads from allocators discussing cross-asset liquidity, duration risk, and new macro hedges.",
  },
  {
    titleKey: "learnPost2Title",
    timeKey: "learnPost2Time",
    bodyKey: "learnPost2Body",
    title: "Manager spotlight: digital asset neutrality",
    time: "Updated daily",
    body: "Daily digest of risk notes and operational updates from the digital asset desk.",
  },
  {
    titleKey: "learnPost3Title",
    timeKey: "learnPost3Time",
    bodyKey: "learnPost3Body",
    title: "Community brief: ops and compliance corner",
    time: "This week",
    body:
      "Forum Q&A covering onboarding checklists, data room hygiene, and audit-ready packaging.",
  },
];

export function Learn() {
  return (
    <section id="learn" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-400"
            data-i18n="learnEyebrow"
          >
            Daily Forum
          </p>
          <h2 className="text-3xl font-semibold" data-i18n="learnTitle">
            Learn &amp; Community
          </h2>
          <p className="text-base text-white/70" data-i18n="learnLead">
            Fresh briefings and forum highlights to keep you updated every day.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {learnPosts.map((post) => (
            <article
              key={post.titleKey}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <header className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold" data-i18n={post.titleKey}>
                  {post.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50" data-i18n={post.timeKey}>
                  {post.time}
                </span>
              </header>
              <p className="mt-4 text-sm text-white/70" data-i18n={post.bodyKey}>
                {post.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
