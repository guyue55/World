import Link from 'next/link'

export function UniverseHero() {
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-gradient-to-br from-white/80 via-mist/70 to-sand/60 p-8 shadow-soft md:p-12">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-10 top-10 h-2 w-2 rounded-full bg-moss" />
        <div className="absolute right-24 top-20 h-3 w-3 rounded-full bg-clay" />
        <div className="absolute bottom-16 left-1/2 h-2 w-2 rounded-full bg-ink/40" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-moss/10 blur-3xl" />
      </div>
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.42em] text-moss">GUYUE FLOATING WORLD</p>
        <h1 className="mt-5 text-5xl font-semibold leading-tight text-ink md:text-7xl">
          进入一个正在生长的个人数字宇宙
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-9 text-ink/70">
          对外是宇宙，对内是工作台，对未来是档案，对 AI 是可读协议。这里不是普通博客，而是一个可长期生长、可被审计、可被 AI 照亮的个人世界。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/world-map" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-soft">
            打开世界地图
          </Link>
          <Link href="/time-river" className="rounded-full border border-ink/15 bg-white/70 px-6 py-3 text-sm font-medium text-ink">
            进入时间河
          </Link>
          <Link href="/lighthouse" className="rounded-full border border-moss/30 bg-moss/10 px-6 py-3 text-sm font-medium text-moss">
            查看 AI 灯塔
          </Link>
        </div>
      </div>
    </section>
  )
}
