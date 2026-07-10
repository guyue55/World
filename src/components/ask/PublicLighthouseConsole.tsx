'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, FileSearch, LockKeyhole, RadioTower, Route, Search, ShieldCheck } from 'lucide-react'
import type { LighthouseConsoleSurface } from '@/lib/public-world-surfaces'
import type { LighthouseRuntimeResponse } from '@/server/ai/lighthouse-runtime'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function PublicLighthouseConsole({
  surface,
  runtimeResponse,
}: {
  surface: LighthouseConsoleSurface
  runtimeResponse: LighthouseRuntimeResponse
}) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion
  useGsapEntrance(rootRef, shouldMove)

  const signals = [
    { label: '公开问题', value: surface.questions.length },
    { label: '推荐路径', value: surface.paths.length },
    { label: '推荐节点', value: surface.nodes.length },
  ]
  const auditSignals = [
    { label: '模式', value: runtimeResponse.mode },
    { label: '意图', value: runtimeResponse.intent },
    { label: '依据', value: runtimeResponse.grounding.status },
    { label: '置信度', value: runtimeResponse.grounding.confidence },
    { label: '公开上下文', value: runtimeResponse.auditSummary.publicContextCount },
    { label: '排除上下文', value: runtimeResponse.auditSummary.excludedContextCount },
    { label: '缓存', value: `${runtimeResponse.auditSummary.cache.ttlSeconds}s` },
    { label: '超时预算', value: `${runtimeResponse.auditSummary.timeout.budgetMs}ms` },
  ]

  return (
    <section ref={rootRef} className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-night text-paper shadow-soft">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[28rem] overflow-hidden border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(237,190,102,0.24),transparent_32%),radial-gradient(circle_at_50%_82%,rgba(125,154,162,0.22),transparent_36%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(247,241,230,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.14)_1px,transparent_1px)] [background-size:58px_58px]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-12 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full border border-gold/26"
            animate={shouldMove ? { rotate: 360, scale: [1, 1.04, 1] } : undefined}
            transition={{ rotate: { duration: 42, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-40 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
            animate={shouldMove ? { y: [0, 150, 0], opacity: [0.16, 0.84, 0.16] } : undefined}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div data-gsap-reveal>
              <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.32em] text-gold">
                <Bot className="h-4 w-4" />
                LOW LIGHT CONSOLE
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">灯塔只照路，不替你决定</h2>
              <p className="mt-4 text-sm leading-7 text-paper/68">
                当前控制台只读取公开索引，输出导览、路径和节点建议。它不会写入世界，也不会读取私密内容。
              </p>
            </div>
            <div data-gsap-reveal className="grid grid-cols-3 gap-3">
              {signals.map((signal) => (
                <div key={signal.label} className="rounded-[1rem] border border-paper/12 bg-paper/8 p-3">
                  <p className="text-2xl font-semibold">{signal.value}</p>
                  <p className="mt-1 text-xs text-paper/50">{signal.label}</p>
                </div>
              ))}
            </div>
            <p data-gsap-reveal className="rounded-[1rem] border border-paper/12 bg-paper/8 p-4 text-xs leading-6 text-paper/58">
              {surface.boundaryNotice}
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:p-8">
          <div data-gsap-reveal className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-paper">
              <RadioTower className="h-4 w-4 text-gold" />
              观测回声
            </p>
            <p className="mt-3 text-sm leading-7 text-paper/66">{runtimeResponse.answer}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {auditSignals.map((signal) => (
                <div key={signal.label} className="rounded-[0.9rem] border border-paper/10 bg-paper/7 p-3">
                  <p className="truncate text-sm font-semibold text-paper">{signal.value}</p>
                  <p className="mt-1 text-xs text-paper/45">{signal.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-gsap-reveal className="rounded-[1.2rem] border border-lake/22 bg-lake/10 p-4">
            <p className="text-sm font-semibold text-lake">Grounded 导览</p>
            <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[0.9rem] bg-paper/8 p-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-paper/46">依据状态</p>
                <p className="mt-2 text-sm font-semibold text-paper">{runtimeResponse.grounding.status} / {runtimeResponse.grounding.confidence}</p>
                <p className="mt-2 text-xs leading-5 text-paper/52">
                  公开来源 {runtimeResponse.grounding.sourceCount} 条；publicOnly：{runtimeResponse.grounding.publicOnly ? '是' : '否'}。
                </p>
              </div>
              <div className="grid gap-2">
                {runtimeResponse.grounding.basis.slice(0, 3).map((basis) => (
                  <p key={basis} className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/58">{basis}</p>
                ))}
              </div>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {runtimeResponse.nextSteps.map((step) => (
                <Link key={`${step.href}-${step.title}`} href={step.href} className="rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                  <span className="block truncate text-sm font-semibold text-paper">{step.title}</span>
                  <span className="mt-1 block line-clamp-2 text-xs leading-5 text-paper/50">{step.reason}</span>
                </Link>
              ))}
            </div>
          </div>

          <div data-gsap-reveal className="rounded-[1.2rem] border border-gold/24 bg-gold/10 p-4">
            <p className="text-sm font-semibold text-gold">不想问也可以继续</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {surface.fallbackActions.map((action) => (
                <Link key={action.href} href={action.href} className="rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                  <span className="block text-sm font-semibold">{action.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-paper/50">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {surface.questions.map((question) => (
              <article key={question.title} data-gsap-reveal className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
                <Search className="h-4 w-4 text-gold" />
                <h3 className="mt-3 text-lg font-semibold">{question.title}</h3>
                <p className="mt-2 line-clamp-4 text-xs leading-6 text-paper/58">{question.answer}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper/72">
                <Route className="h-4 w-4 text-leaf" />
                建议路径
              </p>
              <div className="mt-4 space-y-2">
                {surface.paths.map((path) => (
                  <Link key={path.id} href={path.href} data-gsap-reveal className="block rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                    <span className="block truncate text-sm font-semibold">{path.title}</span>
                    <span className="mt-1 block truncate text-xs text-paper/48">{path.caption}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper/72">
                <ShieldCheck className="h-4 w-4 text-lake" />
                可读节点
              </p>
              <div className="mt-4 space-y-2">
                {surface.nodes.map((node) => (
                  <Link key={node.id} href={node.href} data-gsap-reveal className="block rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                    <span className="block truncate text-sm font-semibold">{node.title}</span>
                    <span className="mt-1 block truncate text-xs text-paper/48">{node.caption}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div data-gsap-reveal className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper/72">
                <FileSearch className="h-4 w-4 text-gold" />
                公开来源
              </p>
              <div className="mt-4 grid gap-2">
                {runtimeResponse.sources.slice(0, 4).map((source) => (
                  <Link key={`${source.href}-${source.title}`} href={source.href} className="rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                    <span className="block truncate text-sm font-semibold">{source.title}</span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-paper/50">{source.reason}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div data-gsap-reveal className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper/72">
                <LockKeyhole className="h-4 w-4 text-leaf" />
                低光边界
              </p>
              <div className="mt-4 space-y-2">
                {runtimeResponse.limits.map((limit) => (
                  <p key={limit} className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/54">{limit}</p>
                ))}
              </div>
              <p className="mt-4 rounded-[0.9rem] border border-leaf/20 bg-leaf/10 p-3 text-xs leading-5 text-paper/58">
                Provider：{runtimeResponse.auditSummary.providerStatus}；写入世界源：{runtimeResponse.auditSummary.writesWorldSource ? '是' : '否'}。
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div data-gsap-reveal className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="text-sm font-semibold text-paper/72">运行推荐</p>
              <div className="mt-4 grid gap-2">
                {runtimeResponse.recommendations.map((item) => (
                  <Link key={`${item.href}-${item.title}`} href={item.href} className="rounded-[0.9rem] bg-paper/8 p-3 transition hover:bg-paper/14">
                    <span className="block truncate text-sm font-semibold">{item.title}</span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-paper/50">{item.reason}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div data-gsap-reveal className="rounded-[1.2rem] border border-paper/12 bg-paper/8 p-4">
              <p className="text-sm font-semibold text-paper/72">运行审计</p>
              <div className="mt-4 grid gap-2">
                <p className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/54">
                  请求：{runtimeResponse.auditSummary.requestId}；摘要：{runtimeResponse.auditSummary.questionDigest}
                </p>
                <p className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/54">
                  缓存：{runtimeResponse.auditSummary.cache.policy}
                </p>
                <p className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/54">
                  超时：{runtimeResponse.auditSummary.timeout.elapsedMs}ms / {runtimeResponse.auditSummary.timeout.budgetMs}ms；可取消：{runtimeResponse.auditSummary.timeout.cancellable ? '是' : '否'}
                </p>
                <p className="rounded-[0.9rem] bg-paper/8 p-3 text-xs leading-5 text-paper/54">
                  输出：{runtimeResponse.auditSummary.outputSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
