import { v10Stages } from '@/features/v10-intelligent-world'

export function V10StageBoard() {
  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft md:p-8">
      <p className="text-sm tracking-[0.32em] text-moss">STAGE BOARD</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {v10Stages.map((stage) => (
          <article key={stage.id} className="rounded-[2rem] bg-cream/70 p-5">
            <p className="text-sm text-ink/50">阶段 {stage.stage} · 批次 {stage.batches.join(' / ')}</p>
            <h2 className="mt-2 text-xl font-semibold">{stage.title}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/65">
              {stage.focus.map((item) => <li key={item}>· {item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
