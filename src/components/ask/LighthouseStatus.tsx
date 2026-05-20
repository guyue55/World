export function LighthouseStatus({
  promptCount,
  recommendedNodeCount,
  recommendedPathCount,
}: {
  promptCount: number
  recommendedNodeCount: number
  recommendedPathCount: number
}) {
  return (
    <section className="rounded-world border border-ink/10 bg-night p-8 text-paper shadow-soft">
      <p className="text-sm tracking-[0.35em] text-paper/50">LOW LIGHT MODE</p>
      <h2 className="mt-4 text-3xl font-semibold">灯塔当前处于低光模式</h2>
      <p className="mt-4 max-w-2xl leading-8 text-paper/75">
        这里不假装已经接入实时 AI。当前能力是基于公开内容和公开路径提供安全导览。
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-paper/50">安全问题</p>
          <p className="mt-2 text-3xl font-semibold">{promptCount}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-paper/50">推荐节点</p>
          <p className="mt-2 text-3xl font-semibold">{recommendedNodeCount}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-paper/50">推荐路径</p>
          <p className="mt-2 text-3xl font-semibold">{recommendedPathCount}</p>
        </div>
      </div>
    </section>
  )
}
