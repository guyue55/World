import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="world-container flex min-h-[70vh] items-center py-16">
      <section className="max-w-2xl rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">FOG AREA</p>
        <h1 className="mt-4 text-5xl font-semibold">你走到了一片尚未命名的雾区。</h1>
        <p className="mt-6 leading-8 text-ink/70">
          这里还没有稳定的路径。它可能尚未被创建，也可能仍在世界深处沉睡。
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
