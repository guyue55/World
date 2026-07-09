'use client'

import Link from 'next/link'
import { useRef, useMemo, useState } from 'react'
import { ArrowRight, Compass, Flag, Footprints, MapPinned, Route } from 'lucide-react'
import type { PathsDirectorySurface, PathsDirectoryPathSignal } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

function DynamicPathCard({ path, index }: { path: PathsDirectoryPathSignal; index: number }) {
  return (
    <Link
      href={path.href}
      data-gsap-reveal
      className="group relative block min-w-0 overflow-hidden rounded-[1.35rem] border border-ink/10 bg-white/58 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/78"
    >
      <div className="absolute left-6 top-16 bottom-6 w-px bg-ink/10" />
      <div className="relative flex items-start gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/45 bg-paper text-xs font-semibold text-moss">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold tracking-[0.25em] text-moss">{path.audienceLabel}</p>
          <h3 className="mt-3 truncate text-xl font-semibold">{path.title}</h3>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 leading-7 text-ink/65">{path.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-ink/52">
        <p className="flex items-center gap-2 truncate">
          <Footprints className="h-4 w-4 text-moss" />
          {path.nodeCount} 个节点 · 约 {path.estimatedMinutes} 分钟
        </p>
        {path.entryNodeTitle && (
          <p className="flex items-center gap-2 truncate">
            <MapPinned className="h-4 w-4 text-moss" />
            起点：{path.entryNodeTitle}
          </p>
        )}
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss">
        进入旅程
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function PathsDynamicDirectory({ surface }: { surface: PathsDirectorySurface }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapEntrance(containerRef, true)
  
  const [activeAudience, setActiveAudience] = useState(surface.audiences[0]?.audience)
  const activePaths = useMemo(() => surface.paths.filter(p => p.audience === activeAudience), [surface.paths, activeAudience])
  const activeAudienceSignal = surface.audiences.find((item) => item.audience === activeAudience) ?? surface.audiences[0]
  const featuredPath = activePaths[0]

  return (
    <div ref={containerRef} className="space-y-10">
      <section data-gsap-reveal className="overflow-hidden rounded-[2rem] border border-white/65 bg-white/74 shadow-soft backdrop-blur">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative overflow-hidden bg-night p-6 text-paper md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(197,164,109,0.24),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(125,154,162,0.2),transparent_34%)]" />
            <div className="relative">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-gold">
                <Route className="h-4 w-4" />
                旅程调度台
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-paper">{surface.title}</h2>
              <p className="mt-4 text-sm leading-7 text-paper/62">{surface.description}</p>
              <div className="mt-6 grid gap-3">
                {surface.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1rem] border border-paper/12 bg-paper/7 p-3">
                    <p className="text-xs font-semibold tracking-[0.28em] text-gold">{metric.label}</p>
                    <p className="mt-2 text-lg font-semibold text-paper">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-paper/50">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Compass className="h-4 w-4 text-moss" />
                  选择旅人
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/58">
                  {activeAudienceSignal?.description ?? '先选择适合你的入口，再沿第一条路径抵达世界深处。'}
                </p>
              </div>
              <div role="tablist" aria-label="路径人群筛选" className="flex flex-wrap gap-2">
                {surface.audiences.map((item) => {
                  const selected = item.audience === activeAudience
                  return (
                    <button
                      key={item.audience}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveAudience(item.audience)}
                      className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                        selected ? 'bg-ink text-paper shadow-soft' : 'border border-ink/10 bg-white/45 text-ink/70 hover:bg-white/70'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative rounded-[1.5rem] border border-ink/8 bg-paper/72 p-5">
                <div className="absolute left-8 top-16 bottom-8 w-px bg-ink/12" />
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Flag className="h-4 w-4 text-moss" />
                  推荐起步
                </p>
                {featuredPath ? (
                  <Link href={featuredPath.href} className="group relative mt-5 block rounded-[1.1rem] bg-white/72 p-4 transition hover:-translate-y-0.5 hover:bg-white">
                    <p className="text-xs font-semibold tracking-[0.24em] text-moss">{featuredPath.audienceLabel}</p>
                    <h3 className="mt-3 text-xl font-semibold text-ink">{featuredPath.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/60">{featuredPath.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-ink/52">
                      <span className="rounded-full bg-paper px-3 py-1">{featuredPath.nodeCount} 个节点</span>
                      <span className="rounded-full bg-paper px-3 py-1">约 {featuredPath.estimatedMinutes} 分钟</span>
                      {featuredPath.entryNodeTitle && <span className="rounded-full bg-paper px-3 py-1">起点：{featuredPath.entryNodeTitle}</span>}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss">
                      开始这一条
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ) : (
                  <p className="mt-5 rounded-[1.1rem] bg-white/70 p-4 text-sm leading-7 text-ink/56">这个入口暂时没有公开路径。</p>
                )}
              </div>

              <div className="rounded-[1.5rem] border border-ink/8 bg-paper/72 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Footprints className="h-4 w-4 text-moss" />
                  路线脊柱
                </p>
                <div className="mt-5 grid gap-3">
                  {activePaths.slice(0, 4).map((path, index) => (
                    <Link key={path.id} href={path.href} className="flex items-center gap-3 rounded-[1rem] bg-white/70 p-3 transition hover:bg-white">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/35 text-xs font-semibold text-moss">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">{path.title}</span>
                        <span className="mt-1 block truncate text-xs text-ink/48">{path.nodeCount} 步 · 下一站公开节点</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activePaths.map((path, index) => (
            <DynamicPathCard key={path.id} path={path} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
