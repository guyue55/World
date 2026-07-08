import { getR4Summary } from '@/features/_legacy/r4-creator-workbench'

export function R4CreatorHero() {
  const summary = getR4Summary()
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 px-6 py-12 text-white shadow-2xl sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,191,36,0.24),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(45,212,191,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.88))]" />
      <div className="relative max-w-4xl space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-amber-200/80">R4 · Creator Workbench</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">外面是浮屿，里面是创世台。</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-200">R4 把 R3 的真实节点接入主人创作层：收集箱、节点管理、权限守门、内容债务、维护任务、审计日志与导出备份。目标不是继续堆概念，而是让世界可以被低成本长期维护。</p>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.inboxItems}</strong><span className="text-sm text-slate-300">星尘港输入</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.panels}</strong><span className="text-sm text-slate-300">创世台面板</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.tasks}</strong><span className="text-sm text-slate-300">维护任务</span></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><strong className="block text-3xl">{summary.worldHealth}%</strong><span className="text-sm text-slate-300">世界健康度</span></div>
        </div>
      </div>
    </section>
  )
}
