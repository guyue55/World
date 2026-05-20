import policy from '../../../data/domains/governance/lifecycle-policy.json'

export function LifecyclePolicyPanel() {
  const transitions = policy.allowedTransitions

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LIFE CYCLE</p>
      <h2 className="mt-3 text-3xl font-semibold">节点生命周期状态机</h2>
      <p className="mt-3 leading-8 text-ink/70">
        节点可以生长、开花、结果、归档、沉睡或保持沉默，但状态变化必须有路径。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(transitions).map(([from, next]) => (
          <article key={from} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <h3 className="font-semibold">{from}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              可转向：{(next as string[]).join(' / ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
