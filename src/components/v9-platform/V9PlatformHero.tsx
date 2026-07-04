import { getV9ServiceSummary } from '@/features/v9-service-platform'

export function V9PlatformHero() {
  const summary = getV9ServiceSummary()

  return (
    <section className="rounded-[3rem] border border-white/60 bg-white/80 p-8 shadow-soft md:p-12">
      <p className="text-sm tracking-[0.42em] text-moss">V9 · SERVICE PLATFORM</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">服务化平台版</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第九轮把古月浮屿从静态优先的个人数字世界，推进为具备身份、权限、API、审计、存储端口、集成适配器和平台控制台的服务化骨架。
      </p>
      <div className="mt-8 grid gap-3 text-sm md:grid-cols-5">
        <span className="rounded-2xl bg-moss/10 px-4 py-3">阶段 {summary.stages}/4</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">批次 {summary.batches}/16</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">扩展 {summary.extensions}</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">角色 {summary.roles}</span>
        <span className="rounded-2xl bg-moss/10 px-4 py-3">服务上线：否</span>
      </div>
    </section>
  )
}
