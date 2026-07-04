import { v7ExtensionRegistry, v7QualityBudget } from '@/features/v7-release-ops'

export function V7ExtensionRegistry() {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
      <p className="text-sm tracking-[0.28em] text-moss">EXTENSIONS</p>
      <h2 className="mt-2 text-3xl font-semibold">扩展任务注册表</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {v7ExtensionRegistry.items.map((item) => (
          <article key={item.id} className="rounded-3xl bg-white/70 p-4">
            <p className="font-medium">{item.name}</p>
            <p className="mt-1 text-xs text-moss">{item.kind}</p>
            <p className="mt-2 text-sm leading-6 text-ink/65">{item.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-ink/5 p-4 text-sm leading-7 text-ink/70">
        性能预算：{v7QualityBudget.performanceBudgets.map((item) => item.id).join('、')}；无障碍预算：
        {v7QualityBudget.accessibilityBudgets.length} 项。
      </div>
    </section>
  )
}
