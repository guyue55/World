'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Archive, ArrowRight, FolderSearch, LibraryBig, Search, ShieldCheck, Tags } from 'lucide-react'
import type { ArchiveDynamicSurface } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

export function ArchiveDynamicGuide({ surface }: { surface: ArchiveDynamicSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = runtime.motionMode === 'full'
  useGsapEntrance(rootRef, shouldMove, '[data-gsap-reveal]', 'emergence')

  const shelves = [
    { label: '代表卷宗', value: surface.featuredNodes.length, note: '适合第一次打开' },
    { label: '新近归档', value: surface.recentNodes.length, note: '按更新时间入柜' },
    { label: '索引标签', value: surface.tags.length, note: '快速缩小范围' },
  ]

  return (
    <section ref={rootRef} className="overflow-hidden rounded-[2rem] border border-white/65 bg-white/74 shadow-soft backdrop-blur">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative overflow-hidden bg-night p-7 text-paper md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(197,164,109,0.24),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(125,154,162,0.22),transparent_34%)]" />
          <div className="absolute inset-x-10 bottom-10 top-36 hidden opacity-35 md:block">
            <div className="h-full border-l border-paper/18">
              {[0, 1, 2].map((index) => (
                <div key={index} className="mt-14 h-px bg-paper/20" />
              ))}
            </div>
          </div>
          <div className="relative">
            <p data-gsap-reveal className="flex items-center gap-2 text-xs font-semibold tracking-[0.35em] text-gold">
              <Archive className="h-4 w-4" />
              {surface.eyebrow}
            </p>
            <h2 data-gsap-reveal className="mt-4 break-words text-3xl font-semibold leading-tight md:text-4xl">{surface.title}</h2>
            <p data-gsap-reveal className="mt-4 max-w-xl text-sm leading-7 text-paper/68">{surface.description}</p>
            <div data-gsap-reveal className="mt-6 rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper/82">
                <ShieldCheck className="h-4 w-4 text-leaf" />
                {surface.boundaryLabel}
              </p>
              <p className="mt-2 text-xs leading-6 text-paper/52">搜索和筛选只作用于服务端已经放行的公开节点。</p>
            </div>
            <div data-gsap-reveal className="mt-6 grid gap-3">
              {shelves.map((shelf, index) => (
                <div key={shelf.label} className="flex items-center gap-3 rounded-[1rem] border border-paper/12 bg-paper/7 p-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/35 text-xs font-semibold text-gold">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-paper">{shelf.label} · {shelf.value}</p>
                    <p className="mt-1 truncate text-xs text-paper/48">{shelf.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:p-8">
          <div data-gsap-reveal className="grid gap-3 sm:grid-cols-4">
            {surface.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.1rem] border border-ink/8 bg-paper/70 p-4">
                <p className="text-3xl font-semibold text-ink">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink/72">{metric.label}</p>
                <p className="mt-1 text-xs leading-5 text-ink/50">{metric.note}</p>
              </div>
            ))}
          </div>

          <div data-gsap-reveal className="rounded-[1.5rem] border border-ink/8 bg-paper/70 p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <LibraryBig className="h-4 w-4 text-moss" />
                  馆藏抽屉
                </p>
                <p className="mt-2 text-xs leading-5 text-ink/50">先按代表节点入馆，再用标签和搜索缩小范围。</p>
              </div>
              <a href="#archive-search" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
                打开检索台
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {surface.featuredNodes.map((node, index) => (
                <Link key={node.id} href={node.href} className="group block min-w-0 rounded-[1.1rem] border border-ink/8 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:bg-white">
                  <span className="text-xs font-semibold tracking-[0.22em] text-moss">卷宗 {index + 1}</span>
                  <span className="mt-3 block truncate text-sm font-semibold text-ink">{node.title}</span>
                  <span className="mt-2 block line-clamp-2 text-xs leading-5 text-ink/52">{node.caption}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
            <div data-gsap-reveal className="rounded-[1.35rem] border border-ink/8 bg-paper/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink/72">
                <Tags className="h-4 w-4 text-moss" />
                标签索引
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {surface.tags.map((tag) => (
                  <a key={tag.tag} href="#archive-search" className="rounded-full bg-white/72 px-3 py-1 text-xs font-medium text-ink/64">
                    #{tag.tag} · {tag.count}
                  </a>
                ))}
              </div>
            </div>

            <div data-gsap-reveal className="rounded-[1.35rem] border border-ink/8 bg-paper/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink/72">
                <FolderSearch className="h-4 w-4 text-moss" />
                最近入柜
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {surface.recentNodes.map((node) => (
                  <Link key={node.id} href={node.href} className="block rounded-[1rem] bg-white/72 p-3 transition hover:-translate-y-0.5 hover:bg-white">
                    <span className="block truncate text-sm font-semibold text-ink">{node.title}</span>
                    <span className="mt-1 block truncate text-xs text-ink/48">{node.caption}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div data-gsap-reveal className="rounded-[1.35rem] border border-ink/8 bg-white/55 p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Search className="h-4 w-4 text-moss" />
                  检索台
                </p>
                <p className="mt-1 text-xs leading-5 text-ink/50">{surface.searchPlaceholder}</p>
              </div>
              <a href="#archive-search" className="inline-flex items-center gap-2 text-sm font-semibold text-moss">
                跳到搜索
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {surface.rediscoveryActions.map((action) => (
                <Link key={action.href} href={action.href} className="rounded-[1rem] bg-paper/80 p-3 transition hover:-translate-y-0.5 hover:bg-white">
                  <span className="block text-sm font-semibold text-ink">{action.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-ink/52">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
