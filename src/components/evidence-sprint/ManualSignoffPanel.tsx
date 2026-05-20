import { getManualSignoffPreparationChecklist } from '@/lib/phase-fourteen-evidence'

export function ManualSignoffPanel() {
  const checklist = getManualSignoffPreparationChecklist()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">人工签收准备</h2>
      <p className="mt-2 text-sm text-ink/55">manualSignoffReady: {String(checklist.manualSignoffReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {checklist.items.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">required: {String(item.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
