import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <main className="world-container flex min-h-[70vh] items-center py-16">
      <section className="max-w-2xl rounded-world border border-white/65 bg-white/70 p-8 shadow-soft backdrop-blur">
        <p className="text-sm tracking-[0.35em] text-moss">私密门</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink">这扇门只为特定的人打开。</h1>
        <p className="mt-6 leading-8 text-ink/70">
          公开世界不是完整世界。家庭、保险箱、私密档案与内部工作台默认被守门，前端只体现边界，实际访问由服务端路由拦截。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">返回外庭</Link>
          <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">查看公开内容</Link>
          <Link href="/ask" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">询问灯塔</Link>
        </div>
      </section>
    </main>
  )
}
