'use client'

import Link from 'next/link'
import { Archive, ArrowRight, Compass, Route, Sparkles, Waves } from 'lucide-react'
import type { Area, Node, Path, WorldEvent } from '@/lib/types'
import type { HomeDynamicWorldSurface, HomeEntrySignal } from '@/lib/public-world-surfaces'
import { ProductWorldCompass } from '@/components/product/ProductWorldCompass'
import { ProductWorldBoundaries } from '@/components/product/ProductWorldBoundaries'
import { ProductDynamicWorldGuide } from '@/components/product/ProductDynamicWorldGuide'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'
import { FirstVisitRitual } from '@/components/world/FirstVisitRitual'
import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'
import { WorldPulseConstellation } from '@/components/world/WorldPulseConstellation'
import { useRef } from 'react'


const productPrinciples = [
  '公开入口只展示已审查内容',
  '私密、家庭、保险箱内容不进入前台索引',
  'AI 灯塔只做导览和建议，不修改世界',
]

const entryIcons: Record<HomeEntrySignal['id'], typeof Route> = {
  path: Route,
  atlas: Compass,
  archive: Archive,
  ask: Sparkles,
}

const gatewayLayers = [
  {
    label: '前景入口',
    title: '先选择方向',
    body: '第一次来不需要理解全部结构，先从一条短路径、地图、档案或灯塔进入。',
  },
  {
    label: '中景航道',
    title: '沿公开路径移动',
    body: '每个入口都能返回地图，路径、时间河和档案馆共享同一份公开事实源。',
  },
  {
    label: '远景状态',
    title: '世界正在低光运行',
    body: '动效、AI 和感官层都只服务导览；私密层不会进入公开索引。',
  },
]

export function ProductHome({
  areas,
  featuredNodes,
  publicNodes,
  paths,
  events,
  dynamicWorld,
}: {
  areas: Area[]
  featuredNodes: Node[]
  publicNodes: Node[]
  paths: Path[]
  events: WorldEvent[]
  dynamicWorld: HomeDynamicWorldSurface
}) {
  const visibleAreas = areas.filter((area) => area.level === 1).slice(0, 6)
  const visibleNodes = featuredNodes.slice(0, 6)
  const firstPath = paths.find((path) => path.audience === 'first-time') ?? paths[0]
  const primaryEntry = dynamicWorld.entryPoints.find((entry) => entry.href === dynamicWorld.primaryHref) ?? dynamicWorld.entryPoints[0]

  const containerRef = useRef<HTMLElement>(null)
  useGsapEntrance(containerRef, true)

  return (
    <main ref={containerRef} className="world-container space-y-14 py-10 md:py-16">
      <SceneWorldPortal
        scene="gateway"
        eyebrow="古月浮屿 · 公开世界入口"
        title="古月浮屿，正在打开的个人世界。"
        description="你抵达的是一座公开前厅：前方有星图、路径、时间河、档案馆和低光灯塔。先选择一个方向，世界会把技术、生活、项目、记忆与 AI 的线索慢慢展开。"
        objects={['入口', '地图', '路径', '时间河', '档案馆', '灯塔']}
        primaryAction={{
          href: dynamicWorld.primaryHref,
          label: primaryEntry?.label ?? '进入世界地图',
          testId: 'home-primary-cta',
        }}
        secondaryActions={dynamicWorld.entryPoints
          .filter((entry) => entry.href !== dynamicWorld.primaryHref)
          .slice(0, 3)
          .map((entry) => ({ href: entry.href, label: entry.label, description: entry.description }))}
        stats={[
          { label: '公开航道', value: dynamicWorld.routes.filter((entry) => entry.id !== 'home').length, note: '从入口通往不同场景' },
          { label: '低门槛入口', value: dynamicWorld.entryPoints.length, note: '第一次来也能选择' },
          { label: '推荐起点', value: primaryEntry?.label ?? '地图', note: '先看地图，再进入深处' },
        ]}
      >
        <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-4">
            <FirstVisitRitual />

            <div className="overflow-hidden rounded-[1.35rem] border border-paper/12 bg-paper/10 p-4 backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.3em] text-gold">新手入口</p>
                  <h2 className="mt-2 text-2xl font-semibold text-paper">{dynamicWorld.entryTitle}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-paper/64">{dynamicWorld.entryDescription}</p>
                </div>
                <p className="rounded-full border border-paper/12 bg-paper/10 px-4 py-2 text-xs font-semibold text-paper/58">
                  入口可返回地图
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {dynamicWorld.entryPoints.map((entry) => {
                  const Icon = entryIcons[entry.id]
                  const isPrimary = entry.href === dynamicWorld.primaryHref

                  return (
                    <Link
                      key={entry.id}
                      href={entry.href}
                      className={isPrimary
                        ? 'group relative overflow-hidden rounded-[1.15rem] border border-gold/40 bg-gold/18 p-4 text-paper transition motion-safe:hover:-translate-y-0.5 hover:bg-gold/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80'
                        : 'group relative overflow-hidden rounded-[1.15rem] border border-paper/12 bg-paper/8 p-4 text-paper transition motion-safe:hover:-translate-y-0.5 hover:bg-paper/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70'}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,241,230,0.13),transparent_7rem)]" />
                      <div className="relative flex min-w-0 gap-3">
                        <span className={isPrimary
                          ? 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.95rem] bg-gold text-night'
                          : 'grid h-10 w-10 shrink-0 place-items-center rounded-[0.95rem] bg-paper/12 text-gold'}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-semibold tracking-[0.18em] text-gold">{entry.label}</span>
                          <span className="mt-2 block truncate text-base font-semibold">{entry.title}</span>
                          <span className="mt-2 block line-clamp-2 text-sm leading-6 text-paper/62">{entry.description}</span>
                          <span className="mt-3 inline-flex max-w-full items-center gap-2 text-xs font-semibold text-paper/52">
                            <span className="truncate">{entry.note}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-70 transition group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <WorldPulseConstellation surface={dynamicWorld} />
            <div className="grid gap-3 md:grid-cols-3">
              {gatewayLayers.map((layer, index) => (
                <div key={layer.label} className="rounded-[1.15rem] border border-paper/12 bg-paper/8 p-4 backdrop-blur">
                  <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/12 text-[11px] text-paper">{index + 1}</span>
                    {layer.label}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-paper">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-paper/58">{layer.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SceneWorldPortal>

      <ProductWorldCompass areas={areas} nodes={publicNodes} paths={paths} />

      <ProductDynamicWorldGuide surface={dynamicWorld} />

      <ProductWorldBoundaries />


      <section data-gsap-reveal className="grid gap-4 md:grid-cols-3">
        {visibleAreas.slice(0, 3).map((area) => (
          <Link key={area.id} href={`/atlas#${area.id}`} className="block rounded-[1.6rem] border border-white/65 bg-white/72 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white">
            <p className="truncate text-sm text-moss">{area.icon} {area.realName}</p>
            <h2 className="mt-3 truncate text-2xl font-semibold text-ink">{area.worldName}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/64">{area.description}</p>
          </Link>
        ))}
      </section>

      <section data-gsap-reveal className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
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
          <Link href={`/paths/${firstPath.id}`} className="block rounded-[2rem] border border-white/65 bg-night p-7 text-paper shadow-soft transition hover:-translate-y-1 md:p-8">
            <p className="text-xs font-semibold tracking-[0.35em] text-gold">推荐路径</p>
            <h2 className="mt-3 truncate text-3xl font-semibold">{firstPath.title}</h2>
            <p className="mt-3 line-clamp-3 leading-8 text-paper/68">{firstPath.description}</p>
            <p className="mt-5 text-sm text-paper/55">约 {firstPath.estimatedMinutes ?? 10} 分钟 · 点击进入路径</p>
          </Link>
        )}
      </section>

      <section data-gsap-reveal className="rounded-[2rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-moss">精选节点</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">最近值得进入的节点</h2>
          </div>
          <Link href="/archive" className="text-sm font-semibold text-moss underline underline-offset-4">查看档案馆</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleNodes.map((node) => (
            <Link key={node.id} href={`/node/${node.slug}`} className="block rounded-[1.5rem] border border-ink/8 bg-paper/65 p-5 transition hover:-translate-y-1 hover:bg-white">
              <p className="truncate text-xs text-ink/45">{node.type} · {node.lifeStage}</p>
              <h3 className="mt-3 truncate text-xl font-semibold text-ink">{node.worldTitle ?? node.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink/62">{node.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section data-gsap-reveal className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">最近发生</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">世界最近发生了什么</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="rounded-2xl bg-paper/65 p-4">
              <p className="text-xs text-ink/45">{event.date}</p>
              <h3 className="mt-1 truncate font-semibold text-ink">{event.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink/62">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
