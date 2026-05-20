import { getReleaseEvidencePackagePlan } from '@/lib/phase-thirteen-release'

export function EvidencePackagePanel() {
  const plan = getReleaseEvidencePackagePlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">证据包整合</h2>
      <p className="mt-2 text-sm text-ink/55">evidencePackageReady: {String(plan.evidencePackageReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {plan.sections.map((section) => (
          <article key={section.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{section.id}</p>
            <h3 className="mt-3 text-lg font-semibold">{section.title}</h3>
            <p className="mt-3 text-sm text-ink/60">required: {String(section.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
