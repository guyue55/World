import { aiSuggestionWorkflows } from '@/features/ai-workflow'
import { aiForbiddenActions } from '@/features/ai-safety'

export function LighthouseObservatory() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-white/45">LIGHTHOUSE OBSERVATORY</p>
      <h2 className="mt-3 text-3xl font-semibold">AI 灯塔观测站，而不是普通功能页</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">AI 可以照亮、建议、解释和提示风险，但不能自动发布、删除、改可见性或读取私密原始内容。</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {aiForbiddenActions.map((action) => (
          <span key={action} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/62">{action}</span>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {aiSuggestionWorkflows.map((workflow) => (
          <article key={workflow.id} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
            <p className="text-xs tracking-[0.28em] text-white/42">{workflow.status} · {workflow.risk}</p>
            <h3 className="mt-3 text-xl font-semibold">{workflow.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{workflow.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
