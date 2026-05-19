import { getExtensionPoints, validateExtensionRegistry } from '@/lib/extensions'

export function ExtensionRegistryPanel() {
  const points = getExtensionPoints()
  const issues = validateExtensionRegistry()
  const errors = issues.filter((issue) => issue.severity === 'error')

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">EXTENSIBILITY</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">扩展点注册表</h2>
          <p className="mt-3 leading-8 text-ink/70">
            未来可以无限扩充，但扩展必须通过注册点进入世界，不能穿透骨架。
          </p>
        </div>
        <span className="rounded-full bg-ink/5 px-4 py-2 text-sm">
          {errors.length === 0 ? `${points.length} 个扩展点` : `${errors.length} 个错误`}
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {points.map((point) => (
          <article key={point.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{point.owner} · {point.stability}</p>
            <h3 className="mt-2 font-semibold">{point.id}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              进入条件：{point.requires.join(' / ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
