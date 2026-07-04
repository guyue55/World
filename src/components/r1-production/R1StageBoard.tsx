import { r1Stages } from '@/features/r1-production-stabilization'

export function R1StageBoard() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Stage Gates</p>
      <h2 className="mt-3 text-3xl font-semibold">四阶段收口路线</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {r1Stages.map((stage) => (
          <article key={stage.stage} className="rounded-3xl bg-ink/5 p-5">
            <p className="text-sm text-ink/50">阶段 {stage.stage} / 4 · {stage.status}</p>
            <h3 className="mt-2 text-xl font-semibold">{stage.title}</h3>
            <p className="mt-3 leading-7 text-ink/65">{stage.description}</p>
            <p className="mt-4 text-sm text-ink/50">批次：{stage.batches.join(' / ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
