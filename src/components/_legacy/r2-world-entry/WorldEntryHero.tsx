import { getR2Summary } from '@/features/_legacy/r2-world-experience'

export function WorldEntryHero() {
  const summary = getR2Summary()

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.96),rgba(230,238,255,0.82)_38%,rgba(20,31,58,0.08)_100%)] p-8 shadow-soft md:p-12">
      <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-white/50 blur-2xl" aria-hidden="true" />
      <div className="relative max-w-4xl">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/45">R2 World Entry Experience</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-7xl">一张书桌连接星河，访客从这里进入古月浮屿。</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">R2 不再增加新世界观，而是把首页、Atlas、罗盘、区域与节点打开方式重构为“第一眼像世界、第一步不迷路、深入后足够浩瀚”的真实入口体验。</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 md:grid-cols-5">
          <a className="rounded-2xl bg-ink px-5 py-4 text-center text-sm font-semibold text-white" href="/atlas">打开地图</a>
          <a className="rounded-2xl bg-white/70 px-5 py-4 text-center text-sm font-semibold text-ink" href="/timeline">沿时间河</a>
          <a className="rounded-2xl bg-white/70 px-5 py-4 text-center text-sm font-semibold text-ink" href="/ask">点亮灯塔</a>
          <a className="rounded-2xl bg-white/70 px-5 py-4 text-center text-sm font-semibold text-ink" href="/archive">进入档案馆</a>
          <a className="rounded-2xl bg-white/70 px-5 py-4 text-center text-sm font-semibold text-ink" href="/r2-world">R2 说明</a>
        </div>
      </div>
      <div className="relative mt-10 grid gap-3 md:grid-cols-5">
        <div className="rounded-3xl bg-white/60 p-4"><p className="text-3xl font-semibold">{summary.stages}</p><p className="text-sm text-ink/55">阶段</p></div>
        <div className="rounded-3xl bg-white/60 p-4"><p className="text-3xl font-semibold">{summary.batches}</p><p className="text-sm text-ink/55">批次</p></div>
        <div className="rounded-3xl bg-white/60 p-4"><p className="text-3xl font-semibold">{summary.areas}</p><p className="text-sm text-ink/55">主区域</p></div>
        <div className="rounded-3xl bg-white/60 p-4"><p className="text-3xl font-semibold">{summary.anchors}</p><p className="text-sm text-ink/55">罗盘锚点</p></div>
        <div className="rounded-3xl bg-white/60 p-4"><p className="text-3xl font-semibold">{summary.extensions}</p><p className="text-sm text-ink/55">扩展任务</p></div>
      </div>
    </section>
  )
}
