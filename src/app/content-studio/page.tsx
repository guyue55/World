import { ContentSeedBoard } from '@/components/content-ingestion/ContentSeedBoard'
import { ContentChannelBoard } from '@/components/content-ingestion/ContentChannelBoard'
import { ContentReviewPanel } from '@/components/content-ingestion/ContentReviewPanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
export default function ContentStudioPage(){return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/75 p-8 shadow-soft md:p-12"><p className="text-sm tracking-[0.42em] text-moss">ROUND 03 · CONTENT</p><h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实内容接入工作台</h1><p className="mt-5 max-w-3xl leading-8 text-ink/70">第三轮从内容种子开始，把公开内容、时间线内容、视觉设计内容和 AI 边界内容纳入可审计的数据结构。</p></section><ContentSeedBoard/><ContentChannelBoard/><ContentReviewPanel/></ResponsivePageShell>}
