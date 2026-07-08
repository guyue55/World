import { evaluateWorldInvariants } from '@/lib/world-invariants'

export function WorldInvariantPanel() {
  const invariants = evaluateWorldInvariants()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.35em] text-moss">INVARIANTS</p>
          <h2 className="mt-3 text-3xl font-semibold">世界骨架不变量</h2>
        </div>
        <span className="rounded-full bg-ink/5 px-4 py-2 text-sm">
          {invariants.filter((item) => item.passed).length}/{invariants.length} 通过
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {invariants.map((item) => (
          <article key={item.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{item.id}</h3>
              <span className={item.passed ? 'text-moss' : 'text-gold'}>
                {item.passed ? '通过' : '失败'}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/60">期望：{item.expected}</p>
            <p className="text-sm leading-6 text-ink/60">实际：{item.actual}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
