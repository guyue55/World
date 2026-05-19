import { evaluateWorldSkeletonHealth } from '@/lib/world-skeleton-health'

export function WorldSkeletonPanel() {
  const health = evaluateWorldSkeletonHealth()

  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white/45 p-6 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.35em] text-moss">WORLD SKELETON</p>
          <h2 className="mt-3 text-3xl font-semibold">世界骨架健康度</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink/50">当前评分</p>
          <p className="text-5xl font-semibold">{health.score}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {health.checks.map((item) => (
          <div key={item.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{item.title}</h3>
              <span className={item.passed ? 'text-moss' : 'text-gold'}>
                {item.passed ? '通过' : '待补'}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
