import { getV7ReleaseSummary } from '@/features/v7-release-ops'

export function V7ReleaseHero() {
  const summary = getV7ReleaseSummary()

  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-soft md:p-12">
      <p className="text-sm tracking-[0.42em] text-moss">V7 · RELEASE OPERATIONS</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">第七轮｜公开发布运营版</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        V7 把古月浮屿从结构封版推进到公开发布准备、长期运营、备份回滚、质量硬化和 V8 生产运维交接。
        它不伪造生产上线结论，所有 release-ready 声明必须回到真实证据。
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-4">
        <div className="rounded-3xl bg-white/70 p-4">阶段 {summary.stages}/4</div>
        <div className="rounded-3xl bg-white/70 p-4">批次 {summary.batches}/16</div>
        <div className="rounded-3xl bg-white/70 p-4">扩展 {summary.extensions}</div>
        <div className="rounded-3xl bg-white/70 p-4">productionLive: {String(summary.productionLive)}</div>
      </div>
    </section>
  )
}
