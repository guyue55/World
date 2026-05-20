import { getAiWorkbenchSummary } from '@/lib/ai-workbench'

export function AiWorkbenchHero() {
  const summary = getAiWorkbenchSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">AI WORKBENCH</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">AI 建议工作台</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        AI 建议工作台只展示建议、风险和确认入口，不自动执行世界变更。
        它是灯塔的控制台，不是世界的遥控器。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">建议</p><p className="mt-2 text-2xl font-semibold">{summary.suggestions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">草稿</p><p className="mt-2 text-2xl font-semibold">{summary.draftSuggestions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">高风险</p><p className="mt-2 text-2xl font-semibold">{summary.highRiskSuggestions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">状态</p><p className="mt-2 text-2xl font-semibold">{summary.protocolStatuses}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">门禁</p><p className="mt-2 text-2xl font-semibold">{summary.safetyChecks}</p></div>
      </div>
    </section>
  )
}
