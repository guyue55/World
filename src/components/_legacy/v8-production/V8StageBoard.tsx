import { v8Stages } from '@/features/v8-production-ops'

export function V8StageBoard() {
  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/75 p-8 shadow-soft">
      <p className="text-sm tracking-[0.36em] text-moss">STAGES</p>
      <h2 className="mt-3 text-3xl font-semibold">四阶段生产闭环</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {v8Stages.map((stage) => (
          <article key={stage.id} className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm text-ink/50">阶段 {stage.stage} · 批次 {stage.batches.join(', ')}</p>
            <h3 className="mt-2 text-xl font-semibold">{stage.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/70">
              {stage.focus.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
