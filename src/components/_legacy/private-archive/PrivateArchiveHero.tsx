import { getPrivateArchiveSummary } from '@/lib/private-archive'

export function PrivateArchiveHero() {
  const summary = getPrivateArchiveSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PRIVATE ARCHIVE</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">私密档案入口</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第五阶段先建立私密档案的边界、层级和占位索引。当前页面只展示元数据占位和规则，
        不保存、不渲染、不导出真实私密内容。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">占位</p><p className="mt-2 text-2xl font-semibold">{summary.itemCount}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">排除公开构建</p><p className="mt-2 text-2xl font-semibold">{summary.excludedCount}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">真实正文</p><p className="mt-2 text-2xl font-semibold">{summary.storedContentCount}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">层级</p><p className="mt-2 text-2xl font-semibold">{summary.tiers}</p></div>
      </div>
    </section>
  )
}
