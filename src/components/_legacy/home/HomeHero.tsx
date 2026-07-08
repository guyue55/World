import Link from 'next/link'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-night px-6 py-10 text-paper shadow-soft sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-lake/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-mist/10 blur-3xl" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-4xl space-y-8">
          <p className="text-sm tracking-[0.35em] text-gold">GUYUE FLOATING ISLES</p>
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              一张书桌连接星河。
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-paper/76">
              古月浮屿不是传统博客，而是一个正在生长的个人数字世界：
              内容是星体，区域是空间，关系是星线，时间是河流，AI 是灯塔。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link data-testid="home-primary-cta" className="rounded-full bg-paper px-6 py-3 text-ink shadow-soft" href="/atlas">进入世界</Link>
            <Link className="rounded-full border border-paper/20 bg-white/10 px-6 py-3" href="/paths">走一条路径</Link>
            <Link className="rounded-full border border-paper/20 bg-white/10 px-6 py-3" href="/archive">打开档案馆</Link>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-paper/15 bg-paper/10 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(197,164,109,.35),transparent_28%),radial-gradient(circle_at_72%_60%,rgba(125,154,162,.35),transparent_32%)]" />
          <div className="relative h-full min-h-[300px] rounded-[1.25rem] border border-paper/15 bg-night/40 p-6">
            <div className="absolute left-8 top-8 h-28 w-28 rounded-full border border-gold/70" />
            <div className="absolute right-10 top-16 h-16 w-16 rounded-full border border-lake/70" />
            <div className="absolute bottom-12 left-14 h-20 w-20 rounded-full border border-mist/50" />
            <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-2xl" />
            <div className="absolute bottom-6 right-6 rounded-2xl border border-paper/15 bg-paper/10 p-4 backdrop-blur">
              <p className="text-sm text-paper/60">WORLD STATUS</p>
              <p className="mt-1 text-2xl font-semibold">alive · growing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
