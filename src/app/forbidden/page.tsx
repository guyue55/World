import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <main className="world-container flex min-h-[70vh] items-center py-16">
      <section className="max-w-2xl rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">PRIVATE GATE</p>
        <h1 className="mt-4 text-5xl font-semibold">这扇门只为特定的人打开。</h1>
        <p className="mt-6 leading-8 text-ink/70">
          里面保存着更私密的记忆。公开层不是完整世界，深处默认被保护。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">返回外庭</Link>
          <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">查看公开内容</Link>
        </div>
      </section>
    </main>
  )
}
