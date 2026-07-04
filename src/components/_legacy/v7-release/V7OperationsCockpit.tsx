import { v7BackupRollback, v7OperationsCadence, v7ReleaseCockpit } from '@/features/v7-release-ops'

export function V7OperationsCockpit() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm tracking-[0.28em] text-moss">COCKPIT</p>
        <h2 className="mt-2 text-3xl font-semibold">公开发布运营驾驶舱</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {v7ReleaseCockpit.cards.map((card) => (
            <article key={card.id} className="rounded-3xl bg-white/70 p-4">
              <p className="font-medium">{card.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-moss">{card.state}</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
          <h3 className="text-xl font-semibold">运营节奏</h3>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/70">
            {v7OperationsCadence.cadence.map((item) => (
              <li key={item.id}>• {item.name}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
          <h3 className="text-xl font-semibold">回滚阶梯</h3>
          <p className="mt-3 text-sm leading-7 text-ink/65">{v7BackupRollback.rollbackSteps.join(' → ')}</p>
        </div>
      </div>
    </section>
  )
}
