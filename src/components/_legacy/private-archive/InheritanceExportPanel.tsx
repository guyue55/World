import { getInheritanceExportPlan } from '@/lib/phase-five-inheritance'

export function InheritanceExportPanel() {
  const plan = getInheritanceExportPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">INHERITANCE EXPORT</p>
      <h2 className="mt-3 text-3xl font-semibold">导出与传承占位计划</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plan.packages.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.visibility}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.id}</h3>
            <p className="mt-3 text-sm text-ink/60">containsPrivate: {String(item.containsPrivate)}</p>
            <p className="mt-2 text-sm text-ink/60">confirmationRequired: {String(item.confirmationRequired)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
