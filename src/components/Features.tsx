const FEATURES = [
  {
    title: "KB-first compression",
    body: "We tune quality until your file lands inside the min–max KB window — not just “smaller”.",
  },
  {
    title: "Stays on your device",
    body: "Photos and signatures are processed in the browser. Nothing is uploaded for resizing.",
  },
  {
    title: "Custom when presets miss",
    body: "Notification says 15–40 KB? Open Custom and type it. Custom is always pinned on the home page.",
  },
  {
    title: "Exam shortcuts",
    body: "One-tap presets for popular recruitments so you skip guessing dimensions and ranges.",
  },
  {
    title: "Signature clean-up",
    body: "Optional high-contrast pass for ink-on-paper signatures before they hit the KB target.",
  },
  {
    title: "PDF helpers",
    body: "Merge photos into a PDF or slim an existing PDF when the portal caps document size.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Why SizeToKB
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          Built around the kilobyte, not a generic resize slider
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Exam portals reject files by KB. SizeToKB is shaped for that constraint — presets when you
          know the exam, Custom when you only have the notification PDF.
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <article key={f.title} className="bg-white p-5 sm:p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrustPills() {
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[var(--muted)]">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> On-device processing
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> Free · no signup
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> Custom always available
      </span>
    </div>
  );
}
