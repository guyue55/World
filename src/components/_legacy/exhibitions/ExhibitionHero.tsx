import { getThemeExhibitionSummary } from '@/lib/_legacy/theme-exhibitions'

export function ExhibitionHero() {
  const summary = getThemeExhibitionSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">EXHIBITIONS</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">主题展览</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        主题展览把节点、路径、时间河和 AI 边界重新组织成可阅读的世界策展入口。
        它复用已有世界结构，不创建孤立数据岛。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">展览</p><p className="mt-2 text-2xl font-semibold">{summary.exhibitions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开</p><p className="mt-2 text-2xl font-semibold">{summary.publicExhibitions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">规划</p><p className="mt-2 text-2xl font-semibold">{summary.planningOnly}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">路由</p><p className="mt-2 text-sm font-semibold">{summary.route}</p></div>
      </div>
    </section>
  )
}
