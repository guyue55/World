import { v7ReleaseRoadmap } from '@/features/v7-release-ops'

export function V7StageBoard() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {v7ReleaseRoadmap.stages.map((stage) => (
        <article key={stage.id} className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
          <p className="text-sm text-moss">阶段 {stage.stage} / 4</p>
          <h2 className="mt-2 text-2xl font-semibold">{stage.title}</h2>
          <p className="mt-3 text-sm leading-7 text-ink/65">批次：{stage.batches.join('、')}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/70">
            {stage.focus.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
