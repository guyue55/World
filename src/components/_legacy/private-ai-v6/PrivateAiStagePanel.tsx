import { getV6PrivateAiStages } from '@/features/private-ai-v6'

export function PrivateAiStagePanel() {
  const stages = getV6PrivateAiStages()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">STAGE LEDGER</p>
      <h2 className="mt-3 text-3xl font-semibold">四阶段完成记录</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => (
          <article key={stage.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{stage.stage}</p>
            <h3 className="mt-3 text-lg font-semibold">{stage.status}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/60">
              {stage.batches.map((batch) => <li key={batch}>· {batch}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
