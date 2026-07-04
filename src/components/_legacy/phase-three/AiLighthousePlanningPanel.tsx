import { getAiLighthousePlanningSummary, getPhaseThreeAiLighthouseRoadmap } from '@/lib/ai-lighthouse-planning'

export function AiLighthousePlanningPanel() {
  const summary = getAiLighthousePlanningSummary()
  const roadmap = getPhaseThreeAiLighthouseRoadmap()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">AI LIGHTHOUSE</p>
      <h2 className="mt-3 text-3xl font-semibold">AI 灯塔增强线</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        AI 只能照亮、解释、建议，不得替代用户决定世界。第三阶段只规划低风险辅助能力，
        并继续阻止自动发布、删除、改可见性和读取私密内容。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">允许能力</p><p className="mt-2 text-2xl font-semibold">{summary.allowedCapabilities}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">禁止能力</p><p className="mt-2 text-2xl font-semibold">{summary.forbiddenCapabilities}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">用户确认</p><p className="mt-2 text-2xl font-semibold">{summary.requiredUserActions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">安全检查</p><p className="mt-2 text-2xl font-semibold">{summary.safetyChecks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {roadmap.allowedCapabilities.map((item) => (
          <div key={item.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.boundary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
