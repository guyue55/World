import { getPublicSeoReleaseSummary } from '@/lib/public-seo-release'

export function PublicSeoReleasePanel() {
  const summary = getPublicSeoReleaseSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PUBLIC SEO GATE</p>
      <h2 className="mt-3 text-3xl font-semibold">公开边界与 SEO 门禁</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        发布前必须同时确认：公开内容可被发现，私密内容不可被暴露。
        当前已建立发布前检查结构，但真实构建输出仍需补证。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开产物</p><p className="mt-2 text-2xl font-semibold">{summary.publicArtifacts}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">禁入可见性</p><p className="mt-2 text-2xl font-semibold">{summary.forbiddenVisibility}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">SEO 检查</p><p className="mt-2 text-2xl font-semibold">{summary.requiredSeoChecks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">pending</p><p className="mt-2 text-2xl font-semibold">{summary.pendingChecks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
      </div>
    </section>
  )
}
