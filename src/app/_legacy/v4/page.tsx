import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { V4StatusCard } from '@/components/v4/V4StatusCard'
import { getV4EntryStatus } from '@/features/v4-entry'

export default function V4Page() {
  const status = getV4EntryStatus()

  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/50 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V4 WORLD PLATFORM</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">协作型智能数字宇宙</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          V4 聚合多人协作、插件生态、宇宙工作台、发布网络与平台治理。当前是结构完成态，
          不代表生产发布态。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <V4StatusCard title="BATCHES" value={String(status.completedBatches)} description="V4 到 V5 前批次完成数" />
          <V4StatusCard title="V5 PLAN" value={String(status.v5PlanningAllowed)} description="允许进入 V5 规划" />
          <V4StatusCard title="V5 DEV" value={String(status.v5FormalDevelopmentAllowed)} description="正式开发仍需真实证据" />
          <V4StatusCard title="RELEASE" value={String(status.releaseReady)} description="不伪装 release-ready" />
        </div>
      </section>
    </ResponsivePageShell>
  )
}
