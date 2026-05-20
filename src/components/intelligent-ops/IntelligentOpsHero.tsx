import { getPhaseTenExperienceSummary } from '@/lib/phase-ten-experience'

export function IntelligentOpsHero() {
  const summary = getPhaseTenExperienceSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">INTELLIGENT OPS</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">智能化运营与多端扩展</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十阶段把古月浮屿推向长期智能运营、多端阅读、离线访问和多格式导出，但所有自动化仍需要人工边界。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">deviceReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.deviceReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">设备</p><p className="mt-2 text-2xl font-semibold">{summary.devices}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">PWA</p><p className="mt-2 text-2xl font-semibold">{String(summary.pwaReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">导出格式</p><p className="mt-2 text-2xl font-semibold">{summary.exportFormats}</p></div>
      </div>
    </section>
  )
}
