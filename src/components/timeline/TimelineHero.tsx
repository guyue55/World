import type { WorldState } from '@/lib/types'

export function TimelineHero({ state }: { state: WorldState }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-soft md:p-10">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lake/20 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.35em] text-moss">TIME RIVER</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">时间河</h1>
        <p className="mt-5 text-lg leading-9 text-ink/70">
          时间河记录的是世界事件，而不只是文章发布时间。节点、区域、法则与路径如何生长，
          都在这里留下可以回访的痕迹。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink/55">
          <span className="rounded-full bg-paper/80 px-4 py-2">mode: {state.mode}</span>
          <span className="rounded-full bg-paper/80 px-4 py-2">season: {state.season}</span>
          <span className="rounded-full bg-paper/80 px-4 py-2">ai: {state.aiStatus}</span>
        </div>
      </div>
    </section>
  )
}
