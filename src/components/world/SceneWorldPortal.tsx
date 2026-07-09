'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { ArrowRight, Compass, Radio, ShieldCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { useWorldRuntime } from './WorldRuntimeProvider'

export type SceneWorldPortalId = 'gateway' | 'atlas' | 'timeline' | 'archive' | 'paths' | 'lighthouse' | 'status'

export type SceneWorldPortalAction = {
  href: string
  label: string
  description?: string
  tone?: 'primary' | 'quiet'
  testId?: string
}

export type SceneWorldPortalStat = {
  label: string
  value: string | number
  note: string
}

export type SceneWorldPortalProps = {
  scene: SceneWorldPortalId
  eyebrow: string
  title: string
  description: string
  objects: string[]
  primaryAction: SceneWorldPortalAction
  secondaryActions?: SceneWorldPortalAction[]
  stats?: SceneWorldPortalStat[]
  fallbackLabel?: string
  evidenceLabel?: string
  children?: ReactNode
}

const sceneCopy: Record<SceneWorldPortalId, {
  label: string
  accent: string
  runtimeLabel: string
  visualLabel: string
  arrivalHint: string
  variantClass: string
}> = {
  gateway: {
    label: '创世原点',
    accent: 'text-gold',
    runtimeLabel: '书桌向星河打开',
    visualLabel: 'Gateway',
    arrivalHint: '入口已经打开：先完成一次抵达，再从星图、时间河、档案馆或路径进入公开世界。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(37,48,42,0.96),rgba(57,73,66,0.92)_48%,rgba(24,32,35,0.96))]',
  },
  atlas: {
    label: '星图穹顶',
    accent: 'text-lake',
    runtimeLabel: '区域正在连成穹顶',
    visualLabel: 'Atlas',
    arrivalHint: '你站在穹顶前厅：先看区域如何互相牵引，再沿星线进入节点、时间河或路径。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(24,38,44,0.96),rgba(37,48,42,0.94)_48%,rgba(16,24,32,0.96))]',
  },
  timeline: {
    label: '时间河',
    accent: 'text-lake',
    runtimeLabel: '事件正在入河',
    visualLabel: 'Timeline',
    arrivalHint: '河面已经显形：事件会按时间留下涟漪，适合从变化、项目和阶段回看世界生长。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(39,56,58,0.95),rgba(76,91,78,0.9)_48%,rgba(29,38,41,0.96))]',
  },
  archive: {
    label: '档案馆',
    accent: 'text-gold',
    runtimeLabel: '卷宗正在归位',
    visualLabel: 'Archive',
    arrivalHint: '馆门已经开启：这里优先服务检索、筛选和回收线索，而不是继续堆文章列表。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(47,42,35,0.96),rgba(68,64,53,0.92)_48%,rgba(28,32,30,0.96))]',
  },
  paths: {
    label: '星路入口',
    accent: 'text-leaf',
    runtimeLabel: '路径正在点亮',
    visualLabel: 'Paths',
    arrivalHint: '路径从脚下开始：先选择一条路线，再按下一站、返回地图、继续阅读的节奏前进。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(37,48,42,0.96),rgba(65,75,52,0.92)_48%,rgba(22,30,34,0.96))]',
  },
  lighthouse: {
    label: '低光灯塔',
    accent: 'text-gold',
    runtimeLabel: '灯塔只照亮公开路径',
    visualLabel: 'Lighthouse',
    arrivalHint: '灯塔只做导览：它解释公开内容、推荐下一站，不拥有修改世界事实的权限。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(24,30,38,0.97),rgba(39,49,54,0.92)_46%,rgba(18,23,31,0.97))]',
  },
  status: {
    label: '维护舱',
    accent: 'text-lake',
    runtimeLabel: '本地门禁正在回传',
    visualLabel: 'Status',
    arrivalHint: '维护舱给出运行证据：本地/LAN 可复查，外部发布继续冻结，不用漂亮话代替事实。',
    variantClass: 'bg-[linear-gradient(118deg,rgba(30,38,39,0.97),rgba(43,53,49,0.92)_48%,rgba(24,30,31,0.97))]',
  },
}

const portalNodes = [
  { id: 'a', x: 17, y: 33 },
  { id: 'b', x: 38, y: 18 },
  { id: 'c', x: 63, y: 28 },
  { id: 'd', x: 79, y: 57 },
  { id: 'e', x: 50, y: 74 },
  { id: 'f', x: 23, y: 66 },
]

const portalLines = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'd'],
  ['d', 'e'],
  ['e', 'f'],
  ['f', 'a'],
  ['b', 'e'],
]

function lineFromPoints(from: (typeof portalNodes)[number], to: (typeof portalNodes)[number]) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const width = Math.sqrt(dx * dx + dy * dy)
  const rotate = Math.atan2(dy, dx) * (180 / Math.PI)

  return {
    left: `${from.x}%`,
    top: `${from.y}%`,
    width: `${width}%`,
    transform: `rotate(${rotate}deg)`,
  }
}

function SceneIllustration({ scene, objects }: { scene: SceneWorldPortalId; objects: string[] }) {
  const nodeById = new Map(portalNodes.map((node) => [node.id, node]))
  const objectLabels = objects.length > 0 ? objects : [sceneCopy[scene].label]

  return (
    <div data-scene-part="SceneMotionLayer" className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(247,241,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/36 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {scene === 'timeline' ? (
          <>
            <path data-scene-object d="M-8 58 C 15 46, 25 74, 48 57 S 78 41, 108 55" fill="none" stroke="rgba(247,241,230,0.44)" strokeWidth="0.35" />
            <path data-scene-object d="M-8 64 C 16 54, 29 78, 51 63 S 77 50, 108 61" fill="none" stroke="rgba(125,154,162,0.55)" strokeWidth="0.8" />
          </>
        ) : scene === 'archive' ? (
          <>
            {[21, 36, 51, 66].map((y) => (
              <path key={y} data-scene-object d={`M8 ${y} H92`} stroke="rgba(247,241,230,0.34)" strokeWidth="0.28" />
            ))}
            {[20, 34, 48, 62, 76].map((x) => (
              <path key={x} data-scene-object d={`M${x} 18 V72`} stroke="rgba(197,164,109,0.25)" strokeWidth="0.24" />
            ))}
          </>
        ) : scene === 'paths' ? (
          <path data-scene-object d="M12 72 C 25 46, 38 58, 48 34 S 72 28, 86 18" fill="none" stroke="rgba(197,164,109,0.64)" strokeWidth="0.62" strokeDasharray="2.2 2.4" />
        ) : scene === 'lighthouse' ? (
          <>
            <path data-scene-object d="M50 18 L88 82" fill="none" stroke="rgba(197,164,109,0.58)" strokeWidth="0.42" />
            <path data-scene-object d="M50 18 L16 78" fill="none" stroke="rgba(247,241,230,0.28)" strokeWidth="0.3" />
            <path data-scene-object d="M43 78 H57 L54 42 H46 Z" fill="none" stroke="rgba(247,241,230,0.48)" strokeWidth="0.42" />
          </>
        ) : scene === 'status' ? (
          <>
            {[26, 40, 54, 68].map((y) => (
              <path key={y} data-scene-object d={`M12 ${y} H88`} stroke="rgba(247,241,230,0.30)" strokeWidth="0.28" />
            ))}
            {[24, 50, 76].map((x) => (
              <path key={x} data-scene-object d={`M${x} 20 V74`} stroke="rgba(125,154,162,0.28)" strokeWidth="0.26" />
            ))}
          </>
        ) : (
          portalLines.map(([fromId, toId]) => {
            const from = nodeById.get(fromId)
            const to = nodeById.get(toId)
            if (!from || !to) return null
            return (
              <line
                key={`${fromId}-${toId}`}
                data-scene-object
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(247,241,230,0.32)"
                strokeWidth="0.22"
              />
            )
          })
        )}
      </svg>

      {portalLines.slice(0, scene === 'timeline' || scene === 'archive' || scene === 'lighthouse' || scene === 'status' ? 3 : 7).map(([fromId, toId], index) => {
        const from = nodeById.get(fromId)
        const to = nodeById.get(toId)
        if (!from || !to) return null
        return (
          <span
            key={`${fromId}-${toId}-beam`}
            data-scene-object
            className="absolute h-px origin-left bg-gradient-to-r from-transparent via-paper/42 to-transparent"
            style={{ ...lineFromPoints(from, to), animationDelay: `${index * 0.28}s` }}
          />
        )
      })}

      {portalNodes.map((node, index) => (
        <span
          key={node.id}
          data-scene-object
          className="absolute min-w-14 -translate-x-1/2 -translate-y-1/2 rounded-[0.95rem] border border-paper/24 bg-paper/10 px-3 py-2 text-center text-[11px] font-semibold text-paper/82 backdrop-blur-md"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {objectLabels[index % objectLabels.length]}
        </span>
      ))}
    </div>
  )
}

function SceneStagePanel({
  scene,
  objects,
  meta,
  stats,
  runtimeLabel,
}: {
  scene: SceneWorldPortalId
  objects: string[]
  meta: (typeof sceneCopy)[SceneWorldPortalId]
  stats: SceneWorldPortalStat[]
  runtimeLabel: string
}) {
  return (
    <div
      data-scene-stage-panel={scene}
      data-scene-part="SceneMotionLayer"
      className="relative min-h-[17rem] overflow-hidden rounded-[1.35rem] border border-paper/16 bg-night/34 shadow-[inset_0_0_0_1px_rgba(247,241,230,0.05),0_24px_80px_rgba(0,0,0,0.24)] md:min-h-[34rem] md:rounded-[1.6rem]"
    >
      <SceneIllustration scene={scene} objects={objects} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(247,241,230,0.11),transparent_28rem),linear-gradient(180deg,rgba(12,18,20,0.08),rgba(12,18,20,0.74))]" />
      <div className="absolute left-4 top-4 z-10 rounded-full border border-paper/14 bg-paper/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.24em] text-paper/70 backdrop-blur-md">
        {meta.visualLabel}
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="rounded-[1.15rem] border border-paper/14 bg-night/54 p-4 backdrop-blur-xl">
          <p className={`text-xs font-semibold tracking-[0.24em] ${meta.accent}`}>{meta.label}</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-paper md:text-3xl">{runtimeLabel}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {stats.slice(0, 3).map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="rounded-[0.9rem] border border-paper/10 bg-paper/8 px-3 py-2">
                <p className="text-lg font-semibold text-paper">{stat.value}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-paper/64">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SceneWorldPortal({
  scene,
  eyebrow,
  title,
  description,
  objects,
  primaryAction,
  secondaryActions = [],
  stats = [],
  fallbackLabel,
  evidenceLabel,
  children,
}: SceneWorldPortalProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const meta = sceneCopy[scene]
  const shouldMove = runtime.motionMode === 'full'
  const statusStats = useMemo(() => stats.slice(0, 3), [stats])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const objects = Array.from(root.querySelectorAll<HTMLElement>('[data-scene-object]'))
    const reveal = Array.from(root.querySelectorAll<HTMLElement>('[data-scene-reveal]'))
    if (!objects.length && !reveal.length) return

    const mm = gsap.matchMedia()
    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        compactMotion: '(max-width: 767px)',
      },
      (context) => {
        const reduceMotion = Boolean(context.conditions?.reduceMotion) || runtime.reducedMotion
        const compactMotion = Boolean(context.conditions?.compactMotion) || runtime.compactMotion

        gsap.set([...objects, ...reveal], { autoAlpha: 1, clearProps: 'visibility' })
        if (reduceMotion || compactMotion || !shouldMove) {
          gsap.set(objects, { x: 0, y: 0, scale: 1, rotation: 0, clearProps: 'transform' })
          return
        }

        gsap.fromTo(
          reveal,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out', stagger: 0.08, overwrite: 'auto' }
        )
        gsap.to(objects, {
          y: (index) => (index % 2 === 0 ? -8 : 8),
          x: (index) => (index % 3 === 0 ? 6 : -4),
          duration: 5.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { amount: 1.2, from: 'center' },
          overwrite: 'auto',
        })
      }
    )

    return () => mm.revert()
  }, [runtime.compactMotion, runtime.reducedMotion, shouldMove])

  return (
    <section
      ref={rootRef}
      data-testid="scene-world-portal"
      data-world-portal={scene}
      data-scene-world-portal={scene}
      data-scene-production={scene}
      data-reduced-motion={runtime.reducedMotion ? 'true' : 'false'}
      className={`relative overflow-hidden rounded-[1.6rem] border border-white/18 px-5 py-7 text-paper shadow-soft md:min-h-[min(760px,calc(100vh-6rem))] md:rounded-[2rem] md:px-8 md:py-10 ${meta.variantClass}`}
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(247,241,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(12,18,20,0.84),rgba(12,18,20,0.50)_42%,rgba(12,18,20,0.18))]" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="grid gap-8 lg:min-h-[min(690px,calc(100vh-7rem))] lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.9fr)] lg:items-center">
          <div data-scene-part="SceneHeader" className="max-w-4xl">
            <p data-scene-reveal className={`text-xs font-semibold tracking-[0.32em] ${meta.accent}`}>
              {eyebrow}
            </p>
            <h1 data-scene-reveal className="mt-4 max-w-4xl break-words text-4xl font-semibold leading-tight sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p data-scene-reveal className="mt-4 max-w-2xl text-base leading-8 text-paper/74 md:mt-5 md:text-lg">
              {description}
            </p>
            <div data-scene-reveal data-scene-part="SceneExitRail" className="mt-6 flex flex-wrap gap-3 md:mt-7">
              <Link
                href={primaryAction.href}
                data-testid={primaryAction.testId}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-night shadow-soft transition hover:-translate-y-0.5 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80"
              >
                {primaryAction.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryActions.slice(0, 3).map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/18 bg-paper/10 px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-paper/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <aside data-scene-reveal data-scene-part="SceneEvidence" className="space-y-4">
            <div data-testid={scene === 'gateway' ? 'dynamic-world-status-card' : undefined} className="grid gap-3 rounded-[1.15rem] border border-paper/12 bg-paper/8 p-4 text-sm leading-6 text-paper/64 backdrop-blur-xl sm:grid-cols-2">
              <p className="flex items-start gap-2">
                <Compass className="mt-1 h-4 w-4 shrink-0 text-lake" />
                {meta.label} · {runtime.dayPeriod} · {runtime.season}
              </p>
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                公开场景，只展示已放行内容。
              </p>
            </div>
            <SceneStagePanel
              scene={scene}
              objects={objects}
              meta={meta}
              stats={statusStats}
              runtimeLabel={meta.runtimeLabel}
            />
          </aside>
        </div>

        <div data-scene-reveal data-scene-part="SceneBody" className="max-w-5xl">
          {children ?? (
            <p className="rounded-[1rem] border border-paper/12 bg-paper/8 px-4 py-3 text-sm leading-6 text-paper/62">
              {meta.arrivalHint}
            </p>
          )}
        </div>

        <div data-scene-reveal className="grid gap-3 border-t border-paper/12 pt-5 md:grid-cols-2">
          <p data-scene-part="SceneFallback" className="rounded-[1rem] border border-paper/12 bg-paper/8 px-4 py-3 text-sm leading-6 text-paper/62">
            降级形态：{fallbackLabel ?? '关闭强动效后，保留标题、核心行动、下一站和静态内容。'}
          </p>
          <p data-scene-part="SceneEvidence" className="rounded-[1rem] border border-paper/12 bg-paper/8 px-4 py-3 text-sm leading-6 text-paper/62">
            场景证据：{evidenceLabel ?? 'desktop、mobile、reduced-motion 与 LAN smoke 均可复核。'}
          </p>
        </div>
      </div>
    </section>
  )
}
