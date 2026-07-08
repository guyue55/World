import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { getPreV4GateStatus } from '@/lib/pre-v4/gate'

export default function PreV4GatePage() {
  const gate = getPreV4GateStatus()

  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">PRE V4 GATE</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">V4 前最终入口门禁</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          这里聚合进入 V4 正式开发前必须关闭的生产证据、真实命令、私密安全、成本与可访问性门禁。
          当前允许 V4 规划，但不允许把 V4 正式开发标为推荐。
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">v4Planning</p>
            <p className="mt-2 text-2xl font-semibold">{String(gate.summary.v4PlanningAllowed)}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">v4Development</p>
            <p className="mt-2 text-2xl font-semibold">{String(gate.summary.v4DevelopmentAllowed)}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">releaseReady</p>
            <p className="mt-2 text-2xl font-semibold">{String(gate.summary.releaseReady)}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">productionLive</p>
            <p className="mt-2 text-2xl font-semibold">{String(gate.summary.productionLive)}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">门禁组</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {gate.entryDashboard.gateGroups.map((item) => (
            <article key={item} className="rounded-2xl bg-paper/70 p-5">
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-2 text-sm text-ink/60">must be reviewed before V4 formal development</p>
            </article>
          ))}
        </div>
      </section>
    </ResponsivePageShell>
  )
}
