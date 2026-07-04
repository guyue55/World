import type { Path } from '@/lib/types'
import { getAudienceSummary } from '@/lib/path-guidance'

export function PathHero({ paths }: { paths: Path[] }) {
  const audiences = getAudienceSummary(paths)

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-soft md:p-10">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm tracking-[0.35em] text-moss">GUIDED PATHS</p>
          <h1 className="mt-4 break-words text-5xl font-semibold leading-tight md:text-6xl">精选路径</h1>
          <p className="mt-5 break-words text-lg leading-9 text-ink/70">
            路径不是分类，而是为不同旅人准备的行走路线。它把星体排成可以理解、可以继续走下去的顺序。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {audiences.map((item) => (
            <div key={item.audience} className="min-w-0 rounded-2xl bg-paper/70 p-4">
              <p className="truncate text-sm text-ink/50">{item.audience}</p>
              <p className="mt-1 truncate text-2xl font-semibold">{item.count} 条路径</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
