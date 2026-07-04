import { getMultiDeviceExportPlan } from '@/lib/phase-ten-experience'

export function MultiDeviceExportPanel() {
  const plan = getMultiDeviceExportPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">多端导出计划</h2>
      <p className="mt-2 text-sm text-ink/55">exportReady: {String(plan.exportReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {plan.formats.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.scope}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">review: {String(item.humanReviewRequired)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
