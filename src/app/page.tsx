import Link from 'next/link'
import { getAllAreas } from '@/lib/areas'
import { getFeaturedNodes, getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getRecentWorldEvents, getWorldState } from '@/lib/world-events'
import { AreaCard } from '@/components/world/AreaCard'
import { NodeCard } from '@/components/node/NodeCard'
import { PathCard } from '@/components/paths/PathCard'
import { WorldStatus } from '@/components/world/WorldStatus'
import { WorldEventCard } from '@/components/timeline/WorldEventCard'
import { WorldSkeletonPanel } from '@/components/world/WorldSkeletonPanel'

export default function HomePage() {
  const areas = getAllAreas()
  const featuredNodes = getFeaturedNodes().slice(0, 6)
  const paths = getAllPaths().slice(0, 3)
  const events = getRecentWorldEvents(4)
  const state = getWorldState()
  const publicNodes = getPublicNodes()

  return (
    <main className="space-y-20 pb-20">
      <section className="world-container pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-8">
            <p className="text-sm tracking-[0.35em] text-moss">GUYUE FLOATING WORLD</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              一张书桌连接星河。
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-ink/75">
              这里不是一个完成的网站，而是一个正在生长的个人数字世界。
              我把技术、产品、灵感、生活与记忆一点点安放在这里，
              让它们在时间中自然生长。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-full bg-ink px-6 py-3 text-paper shadow-soft" href="/atlas">进入世界</Link>
              <Link className="rounded-full border border-ink/15 bg-white/45 px-6 py-3" href="/skeleton">查看骨架</Link>
              <Link className="rounded-full border border-ink/15 bg-white/45 px-6 py-3" href="/archive">打开档案馆</Link>
              <Link className="rounded-full border border-ink/15 bg-white/45 px-6 py-3" href="/ask">点亮灯塔</Link>
            </div>
          </div>
          <WorldStatus state={state} nodeCount={publicNodes.length} />
        </div>
      </section>

      <section className="world-container">
        <WorldSkeletonPanel />
      </section>

      <section className="world-container space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">世界主区域</h2>
          <p className="mt-3 max-w-2xl leading-8 text-ink/70">地图负责漫游，档案馆负责查找。先从这些区域认识这座世界。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => <AreaCard key={area.id} area={area} />)}
        </div>
      </section>

      <section className="world-container space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">最近点亮的星</h2>
          <p className="mt-3 max-w-2xl leading-8 text-ink/70">这些节点是世界第一批发光的内容种子。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredNodes.map((node) => <NodeCard key={node.id} node={node} />)}
        </div>
      </section>

      <section className="world-container grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">精选路径</h2>
          <div className="space-y-4">
            {paths.map((path) => <PathCard key={path.id} path={path} />)}
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">最近，世界发生了什么</h2>
          <div className="space-y-4">
            {events.map((event) => <WorldEventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
