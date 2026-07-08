import { getAiWorkbenchSuggestions } from '@/lib/_legacy/ai-workbench'

export function AiSuggestionList() {
  const suggestions = getAiWorkbenchSuggestions()

  return (
    <section className="grid gap-4">
      {suggestions.map((item) => (
        <article key={item.id} className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-paper px-3 py-1 text-xs uppercase tracking-[0.2em] text-moss">{item.risk}</span>
            <span className="rounded-full bg-paper px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink/50">{item.status}</span>
            <span className="rounded-full bg-paper px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink/50">{item.scope}</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
          <p className="mt-3 leading-7 text-ink/65">{item.suggestion}</p>
          <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            需要用户确认：{item.requiresUserAction ? '是' : '否'}。本原型不会自动执行发布、删除或可见性变更。
          </div>
        </article>
      ))}
    </section>
  )
}
