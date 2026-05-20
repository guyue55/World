import Link from 'next/link'
import type { Path } from '@/lib/types'
import { PathCard } from '@/components/paths/PathCard'

export function PathNextSteps({ nextPaths }: { nextPaths: Path[] }) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">NEXT STEPS</p>
      <h2 className="mt-3 text-3xl font-semibold">这条路之后，继续走向哪里？</h2>
      {nextPaths.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {nextPaths.map((path) => <PathCard key={path.id} path={path} />)}
        </div>
      ) : (
        <p className="mt-4 leading-8 text-ink/70">这条路暂时没有指定下一条路径，你可以回到地图或档案馆继续探索。</p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">回到地图</Link>
        <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">打开档案馆</Link>
        <Link href="/paths" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">查看全部路径</Link>
      </div>
    </section>
  )
}
