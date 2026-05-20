import { getContentGrowthSummary, getThemeExhibitionMap } from '@/lib/content-growth'

export function ContentGrowthPanel() {
  const summary = getContentGrowthSummary()
  const exhibitionMap = getThemeExhibitionMap()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">CONTENT GROWTH</p>
      <h2 className="mt-3 text-3xl font-semibold">内容生长线</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        内容生长不是堆文章，而是让节点、主题、展览、时间胶囊和年度册形成可维护的世界叙事。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">模块</p><p className="mt-2 text-2xl font-semibold">{summary.growthModules}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">展览</p><p className="mt-2 text-2xl font-semibold">{summary.exhibitions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开展览</p><p className="mt-2 text-2xl font-semibold">{summary.publicExhibitions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">看板泳道</p><p className="mt-2 text-2xl font-semibold">{summary.boardLanes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {exhibitionMap.exhibitions.map((item) => (
          <div key={item.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.theme}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss">{item.visibility}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
