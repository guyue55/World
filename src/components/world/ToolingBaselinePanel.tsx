import { getToolingBaseline } from '@/lib/tooling-baseline'

export function ToolingBaselinePanel() {
  const baseline = getToolingBaseline()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">TOOLING</p>
      <h2 className="mt-3 text-3xl font-semibold">工具链基线</h2>
      <p className="mt-3 leading-8 text-ink/70">{baseline.principle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">必需文件</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.requiredFiles.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">必需脚本</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.requiredScripts.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">开发依赖</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.requiredDevDependencies.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">Node</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.runtime.node}</p>
        </div>
      </div>
    </section>
  )
}
