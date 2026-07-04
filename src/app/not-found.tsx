import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="world-container flex min-h-[70vh] items-center py-16">
      <section className="max-w-2xl rounded-world border border-white/65 bg-white/70 p-8 shadow-soft backdrop-blur">
        <p className="text-sm tracking-[0.35em] text-moss">雾区</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink">你走到了一片尚未命名的区域。</h1>
        <p className="mt-6 leading-8 text-ink/70">
          这里还没有稳定路径，或内容仍在世界深处沉睡。你可以回到地图、打开档案馆，或让灯塔给你一个方向。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">回到世界地图</Link>
          <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">打开档案馆</Link>
          <Link href="/ask" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">点亮灯塔</Link>
        </div>
      </section>
    </main>
  )
}
