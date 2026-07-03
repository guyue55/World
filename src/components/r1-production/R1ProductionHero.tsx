import { getR1Summary } from '@/features/r1-production-stabilization'

export function R1ProductionHero() {
  const summary = getR1Summary()

  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/45">R1 Production Stabilization</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实生产收口</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
        R1 不再扩张新概念，而是把 V10 后的结构成果收束成可复跑、可部署、可验收的工程基线，服务于“进入一个真正可运行的个人数字世界”的最终目标。
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-4">
        <div className="rounded-3xl bg-ink/5 p-4"><p className="text-3xl font-semibold">{summary.stages}</p><p className="text-sm text-ink/55">阶段</p></div>
        <div className="rounded-3xl bg-ink/5 p-4"><p className="text-3xl font-semibold">{summary.batches}</p><p className="text-sm text-ink/55">批次</p></div>
        <div className="rounded-3xl bg-ink/5 p-4"><p className="text-3xl font-semibold">{summary.extensions}</p><p className="text-sm text-ink/55">扩展任务</p></div>
        <div className="rounded-3xl bg-ink/5 p-4"><p className="text-3xl font-semibold">{summary.smokeRoutes}</p><p className="text-sm text-ink/55">Preview smoke 路径</p></div>
      </div>
    </section>
  )
}
