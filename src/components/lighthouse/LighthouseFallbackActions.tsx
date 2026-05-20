import Link from 'next/link'

export function LighthouseFallbackActions() {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">NO AI FALLBACK</p>
      <h2 className="mt-3 text-3xl font-semibold">没有实时 AI，世界仍然能走</h2>
      <p className="mt-3 max-w-2xl leading-8 text-ink/70">
        V1 的核心要求是无 AI 也能浏览、搜索、归档和行走。灯塔熄灭时，地图、档案馆和路径仍然可用。
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">看世界地图</Link>
        <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">打开档案馆</Link>
        <Link href="/paths" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">选择路径</Link>
      </div>
    </section>
  )
}
