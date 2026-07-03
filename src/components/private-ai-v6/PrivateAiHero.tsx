import { createV6AiDashboard } from '@/features/private-ai-v6'

export function PrivateAiHero() {
  const dashboard = createV6AiDashboard()

  return (
    <section className="rounded-world border border-ink/10 bg-white/55 p-8 shadow-soft md:p-10">
      <p className="text-sm tracking-[0.35em] text-moss">V6 · PRIVATE AI</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">私密档案与 AI 世界助手</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        V6 将私密档案、AI 只读脱敏上下文、人工审批队列、审计日志和脱敏记忆图谱收束到同一边界内。
        AI 是灯塔，不是世界主人；所有公开、导出、权限变化都必须由主人确认。
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/75 p-4"><p className="text-xs tracking-[0.2em] text-moss">STAGES</p><p className="mt-2 text-2xl font-semibold">{dashboard.completedStages}/{dashboard.stageCount}</p></div>
        <div className="rounded-2xl bg-paper/75 p-4"><p className="text-xs tracking-[0.2em] text-moss">QUEUE</p><p className="mt-2 text-2xl font-semibold">{dashboard.approvalItems}</p></div>
        <div className="rounded-2xl bg-paper/75 p-4"><p className="text-xs tracking-[0.2em] text-moss">BLOCKED</p><p className="mt-2 text-2xl font-semibold">{dashboard.blockedItems}</p></div>
        <div className="rounded-2xl bg-paper/75 p-4"><p className="text-xs tracking-[0.2em] text-moss">AUDIT</p><p className="mt-2 text-2xl font-semibold">{dashboard.auditEvents}</p></div>
        <div className="rounded-2xl bg-paper/75 p-4"><p className="text-xs tracking-[0.2em] text-moss">PROD</p><p className="mt-2 text-2xl font-semibold">{String(dashboard.productionLive)}</p></div>
      </div>
    </section>
  )
}
