import { evaluateAIBoundary, getAIBoundaryPolicy } from '@/lib/ai-boundary'

export function AIBoundaryPanel() {
  const policy = getAIBoundaryPolicy()
  const issues = evaluateAIBoundary()
  const errors = issues.filter((issue) => issue.severity === 'error')

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">AI BOUNDARY</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">AI 边界契约</h2>
          <p className="mt-3 leading-8 text-ink/70">{policy.principle}</p>
        </div>
        <span className="rounded-full bg-ink/5 px-4 py-2 text-sm">
          {errors.length === 0 ? '无阻断错误' : `${errors.length} 个错误`}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">允许</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
            {policy.allowed.slice(0, 5).map((item: string) => <li key={item}>- {item}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">禁止</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
            {policy.forbidden.slice(0, 5).map((item: string) => <li key={item}>- {item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
