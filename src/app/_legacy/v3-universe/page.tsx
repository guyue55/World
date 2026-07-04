import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { getV3VisualUniverse } from '@/lib/v3/visual-universe'

export default function V3UniversePage() {
  const universe = getV3VisualUniverse()

  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V3 VISUAL UNIVERSE</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">古月浮屿 V3 宇宙视图</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          V3 将世界从服务化平台推进到可长期生长的智能宇宙，但所有核心内容都必须拥有可访问的语义降级路径。
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {universe.universeMap.views.map((view) => (
          <article key={view} className="rounded-3xl border border-ink/10 bg-paper/70 p-5">
            <h2 className="text-xl font-semibold">{view}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/60">semantic fallback enabled</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">可访问性门禁</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {universe.accessibility.accessibilityChecks.map((check) => (
            <span key={check} className="rounded-full bg-moss/10 px-4 py-2 text-sm text-moss">
              {check}
            </span>
          ))}
        </div>
      </section>
    </ResponsivePageShell>
  )
}
