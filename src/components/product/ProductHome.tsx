import Link from 'next/link'
import type { Area, Node, Path, WorldEvent } from '@/lib/types'
import { ProductWorldCompass } from '@/components/product/ProductWorldCompass'
import { ProductWorldBoundaries } from '@/components/product/ProductWorldBoundaries'

const primaryEntrances = [
  {
    href: '/paths/eight-minute-world',
    title: '8 分钟路径',
    description: '第一次来不用理解全部宇宙，先走完一条短路径。',
  },
  {
    href: '/atlas',
    title: '世界地图',
    description: '先看到五个主区域，再进入具体节点。适合第一次来到这里的人。',
  },
  {
    href: '/timeline',
    title: '时间流',
    description: '查看这个世界如何生长：节点、路径、区域与规则留下的轨迹。',
  },
  {
    href: '/ask',
    title: 'AI 灯塔',
    description: '低光导览：只回答我在哪、能去哪、下一步看什么。',
  },
]

const productPrinciples = [
  '公开入口只展示已审查内容',
  '私密、家庭、保险箱内容不进入前台索引',
  'AI 灯塔只做导览和建议，不修改世界',
]

export function ProductHome({
  areas,
  featuredNodes,
  publicNodes,
  paths,
  events,
}: {
  areas: Area[]
  featuredNodes: Node[]
  publicNodes: Node[]
  paths: Path[]
  events: WorldEvent[]
}) {
  const visibleAreas = areas.filter((area) => area.level === 1).slice(0, 6)
  const visibleNodes = featuredNodes.slice(0, 6)
  const firstPath = paths.find((path) => path.audience === 'first-time') ?? paths[0]

  return (
    <main className="world-container space-y-14 py-10 md:py-16">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/78 px-6 py-10 shadow-soft backdrop-blur-xl md:px-10 md:py-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lake/20 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-ink/10 bg-paper/80 px-4 py-2 text-sm text-ink/65">
              古月浮屿 · 公开世界入口
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-ink md:text-7xl">
                一张书桌，连接一片星河。
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-ink/70 md:text-xl">
                这是一个正在生长的个人数字世界。技术、生活、项目、记忆与 AI，在这里被安放、连接、沉淀与演化。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/atlas" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:-translate-y-0.5 hover:bg-night">
                进入世界 →
              </Link>
              <Link href="/timeline" className="rounded-full border border-ink/10 bg-white/75 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white">
                沿时间流
              </Link>
              <Link href="/paths/eight-minute-world" className="rounded-full border border-ink/10 bg-white/75 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white">
                8 分钟路径
              </Link>
              <Link href="/archive" className="rounded-full border border-ink/10 bg-white/55 px-6 py-3 text-sm font-semibold text-ink/70 transition hover:-translate-y-0.5 hover:bg-white">
                现实检索
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/70 bg-night p-6 text-paper shadow-soft">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,164,109,0.28),transparent_10rem),radial-gradient(circle_at_76%_70%,rgba(125,154,162,0.28),transparent_12rem)]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.4em] text-gold">上线状态</p>
                <h2 className="mt-3 text-2xl font-semibold">入口清澈，深处浩瀚</h2>
                <p className="mt-3 text-sm leading-7 text-paper/70">
                  对外只显示可进入、可理解、可返回的主路径；阶段页、治理页和私密层不会干扰第一次进入的人。
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                {primaryEntrances.map((entry) => (
                  <Link key={entry.href} href={entry.href} className="rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/14">
                    <span className="font-semibold text-paper">{entry.title}</span>
                    <span className="mt-1 block leading-6 text-paper/62">{entry.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductWorldCompass areas={areas} nodes={publicNodes} paths={paths} />

      <ProductWorldBoundaries />

      <section className="grid gap-4 md:grid-cols-3">
        {visibleAreas.slice(0, 3).map((area) => (
          <Link key={area.id} href={`/atlas#${area.id}`} className="rounded-[1.6rem] border border-white/65 bg-white/72 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white">
            <p className="text-sm text-moss">{area.icon} {area.realName}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{area.worldName}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/64">{area.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">进入规则</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">先降低门槛，再保留深度</h2>
          <div className="mt-6 grid gap-3">
            {productPrinciples.map((principle) => (
              <div key={principle} className="rounded-2xl bg-paper/70 px-4 py-3 text-sm leading-7 text-ink/68">
                {principle}
              </div>
            ))}
          </div>
        </div>

        {firstPath && (
          <Link href={`/paths/${firstPath.id}`} className="rounded-[2rem] border border-white/65 bg-night p-7 text-paper shadow-soft transition hover:-translate-y-1 md:p-8">
            <p className="text-xs font-semibold tracking-[0.35em] text-gold">推荐路径</p>
            <h2 className="mt-3 text-3xl font-semibold">{firstPath.title}</h2>
            <p className="mt-3 leading-8 text-paper/68">{firstPath.description}</p>
            <p className="mt-5 text-sm text-paper/55">约 {firstPath.estimatedMinutes ?? 10} 分钟 · 点击进入路径</p>
          </Link>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-moss">精选节点</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">最近值得进入的节点</h2>
          </div>
          <Link href="/archive" className="text-sm font-semibold text-moss underline underline-offset-4">查看档案馆</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleNodes.map((node) => (
            <Link key={node.id} href={`/node/${node.slug}`} className="rounded-[1.5rem] border border-ink/8 bg-paper/65 p-5 transition hover:-translate-y-1 hover:bg-white">
              <p className="text-xs text-ink/45">{node.type} · {node.lifeStage}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{node.worldTitle ?? node.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/62">{node.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">最近发生</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">世界最近发生了什么</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="rounded-2xl bg-paper/65 p-4">
              <p className="text-xs text-ink/45">{event.date}</p>
              <h3 className="mt-1 font-semibold text-ink">{event.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink/62">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
