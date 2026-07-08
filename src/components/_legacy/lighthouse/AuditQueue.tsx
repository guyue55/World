import { lighthouseWorkbenchSuggestions, suggestionRequiresHuman } from '@/features/_legacy/ai-lighthouse-workbench'
import { RiskBadge } from './RiskBadge'

export function AuditQueue() { 
  const queue = lighthouseWorkbenchSuggestions.filter(suggestionRequiresHuman)
  
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-8 text-white shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs tracking-[0.34em] text-white/45">OWNER AUDIT QUEUE</p>
          <h2 className="mt-3 text-3xl font-semibold">人工审核队列</h2>
          <p className="mt-3 max-w-2xl leading-8 text-white/70">
            作为世界灯塔，AI 仅具有“读取公开事实”和“提出建议”的能力。任何超出确定性事实的操作，
            包括推断隐私边界或修改数据结构，都将被拦截至此，等待岛主 (Owner) 的最终裁决。
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold">{queue.length}</p>
          <p className="mt-1 text-sm text-white/50">待确认项</p>
        </div>
      </div>
      
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {queue.map(s => (
          <article key={s.id} className="rounded-[2rem] border border-white/15 bg-white/10 p-6 transition hover:bg-white/15">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <RiskBadge risk={s.risk} />
            </div>
            <p className="mt-4 text-sm leading-7 text-white/62">{s.boundary}</p>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs tracking-[0.24em] text-white/42">{s.status.toUpperCase()}</p>
              <button type="button" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/20 transition">
                审核决策
              </button>
            </div>
          </article>
        ))}
        {queue.length === 0 && (
          <div className="col-span-2 rounded-[2rem] border border-white/10 border-dashed bg-white/5 p-8 text-center text-white/50">
            暂无需要拦截和人工审核的 AI 操作。
          </div>
        )}
      </div>
    </section>
  )
}
