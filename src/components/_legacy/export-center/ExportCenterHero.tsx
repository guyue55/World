import { getExportCenterSummary } from '@/lib/export-center'

export function ExportCenterHero() {
  const summary = getExportCenterSummary()

  return (
    <section className="rounded-[2.5rem] border border-white/65 bg-white/72 p-8 shadow-soft backdrop-blur lg:p-12">
      <p className="text-xs font-semibold tracking-[0.35em] text-moss">EXPORT CENTER</p>
      <h1 className="mt-4 text-4xl font-semibold text-ink md:text-6xl">年度归档与导出</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
        所有你在古月浮屿上留下的痕迹，都是属于你的数据资产。这里展示了可导出的结构与边界。
        公开的节点可供随时导出备份，而私密的内容（如伴侣、家庭等层级）必须通过严格的显式确认。
      </p>
      
      <div className="mt-10 rounded-[2rem] bg-ink p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">THE YEARBOOK</p>
            <h2 className="mt-2 text-2xl font-semibold">2026 世界年鉴 (Yearbook)</h2>
            <p className="mt-2 text-sm text-white/70">将今年具有代表性的节点和事件打包成不可变的书卷。</p>
          </div>
          <button type="button" className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/80">
            生成本年度备份
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl bg-white/50 p-5"><p className="text-xs font-semibold text-ink/50">包</p><p className="mt-2 text-3xl font-semibold text-ink">{summary.packages}</p></div>
        <div className="rounded-2xl bg-white/50 p-5"><p className="text-xs font-semibold text-ink/50">需确认</p><p className="mt-2 text-3xl font-semibold text-ink">{summary.confirmationRequired}</p></div>
        <div className="rounded-2xl bg-white/50 p-5"><p className="text-xs font-semibold text-ink/50">公开包</p><p className="mt-2 text-3xl font-semibold text-ink">{summary.publicPackages}</p></div>
        <div className="rounded-2xl bg-white/50 p-5"><p className="text-xs font-semibold text-ink/50">私密包</p><p className="mt-2 text-3xl font-semibold text-ink">{summary.privatePackages}</p></div>
        <div className="rounded-2xl bg-white/50 p-5"><p className="text-xs font-semibold text-ink/50">阻断</p><p className="mt-2 text-3xl font-semibold text-ink">{summary.openReleaseBlockers}</p></div>
      </div>
    </section>
  )
}
