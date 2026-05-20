import { getExportCenterSummary } from '@/lib/export-center'

export function ExportCenterHero() {
  const summary = getExportCenterSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">EXPORT CENTER</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">导出中心</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        导出中心展示可导出结构、格式和确认边界。公开包可以规划，私密传承包必须显式确认，
        本原型不会自动生成私密导出。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">包</p><p className="mt-2 text-2xl font-semibold">{summary.packages}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">需确认</p><p className="mt-2 text-2xl font-semibold">{summary.confirmationRequired}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开包</p><p className="mt-2 text-2xl font-semibold">{summary.publicPackages}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">私密包</p><p className="mt-2 text-2xl font-semibold">{summary.privatePackages}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
      </div>
    </section>
  )
}
