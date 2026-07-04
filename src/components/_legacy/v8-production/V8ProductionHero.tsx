import { getV8ProductionSummary } from '@/features/v8-production-ops'

export function V8ProductionHero() {
  const summary = getV8ProductionSummary()

  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-soft md:p-12">
      <p className="text-sm tracking-[0.42em] text-moss">V8 · PRODUCTION OPERATIONS</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">第八轮｜真实生产发布与运维闭环</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        V8 把古月浮屿从公开发布准备推进到真实生产运维闭环：部署流水线、生产观测、事故响应、域名 SEO、
        人工签收、回滚演练和 V9 服务化交接全部进入可审计结构。
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-5">
        <div className="rounded-3xl bg-white/70 p-4">阶段 {summary.stages}/4</div>
        <div className="rounded-3xl bg-white/70 p-4">批次 {summary.batches}/16</div>
        <div className="rounded-3xl bg-white/70 p-4">扩展 {summary.extensions}</div>
        <div className="rounded-3xl bg-white/70 p-4">releaseReady: {String(summary.releaseReady)}</div>
        <div className="rounded-3xl bg-white/70 p-4">productionLive: {String(summary.productionLive)}</div>
      </div>
    </section>
  )
}
