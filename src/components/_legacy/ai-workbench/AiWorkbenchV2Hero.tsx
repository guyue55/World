import { getAiWorkbenchV2Summary } from '@/lib/ai-workbench-v2'

export function AiWorkbenchV2Hero() {
  const summary = getAiWorkbenchV2Summary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">AI WORKBENCH V2</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">AI 深度协作工作台</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第六阶段的 AI 只生成建议、解释和提醒。所有影响发布、删除、导出、可见性的动作都必须人工确认，
        私密层级默认不可读。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">建议类型</p><p className="mt-2 text-2xl font-semibold">{summary.suggestionTypes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">队列建议</p><p className="mt-2 text-2xl font-semibold">{summary.queuedSuggestions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">已执行</p><p className="mt-2 text-2xl font-semibold">{summary.executedSuggestions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">需确认</p><p className="mt-2 text-2xl font-semibold">{summary.humanRequired}</p></div>
      </div>
    </section>
  )
}
