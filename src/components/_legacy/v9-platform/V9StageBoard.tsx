import { v9Stages } from '@/features/v9-service-platform'

export function V9StageBoard() {
  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft">
      <p className="text-sm tracking-[0.32em] text-moss">STAGE BOARD</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {v9Stages.map((stage) => (
          <article key={stage.id} className="rounded-[2rem] bg-sand/70 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-ink/45">Stage {stage.stage}</p>
            <h3 className="mt-2 text-xl font-semibold">{stage.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">批次：{stage.batches.join(' / ')}</p>
            <ul className="mt-3 space-y-1 text-sm text-ink/65">
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
