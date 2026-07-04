import { getPhaseSevenReleaseSummary } from '@/lib/phase-seven-release'

export function ReleaseHero() {
  const summary = getPhaseSevenReleaseSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PUBLIC RELEASE</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">公开发布与长期运营</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第七阶段以真实发布证据为中心。当前看板只展示发布准备、SEO、分析与人工签收状态，
        不会因为页面完成就声明 release-ready。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">releaseReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.releaseReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">证据项</p><p className="mt-2 text-2xl font-semibold">{summary.evidenceItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">待完成</p><p className="mt-2 text-2xl font-semibold">{summary.pendingEvidence}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">SEO 检查</p><p className="mt-2 text-2xl font-semibold">{summary.seoChecks}</p></div>
      </div>
    </section>
  )
}
