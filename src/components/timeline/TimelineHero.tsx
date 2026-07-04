import type { WorldState } from '@/lib/types'

const stateLabels = {
  mode: {
    alive: '运行中',
    quiet: '低光运行',
    frozen: '冻结',
    repair: '修复中',
    archive: '归档态',
  },
  season: {
    spring: '春 · 萌发',
    summer: '夏 · 生长',
    autumn: '秋 · 沉淀',
    winter: '冬 · 静读',
  },
  aiStatus: {
    enabled: '灯塔可用',
    'low-light': '灯塔低光',
    disabled: '灯塔关闭',
  },
}

export function TimelineHero({ state }: { state: WorldState }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-white/72 p-8 shadow-soft backdrop-blur md:p-10">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lake/20 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.35em] text-moss">TIME RIVER</p>
        <h1 className="mt-4 break-words text-5xl font-semibold leading-tight md:text-6xl">时间流</h1>
        <p className="mt-5 break-words text-lg leading-9 text-ink/70">
          这里记录世界如何生长：一颗种子被点亮、一个项目进入工坊、一条法则被写入宪章，都会在时间流中留下痕迹。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink/58">
          <span className="rounded-full bg-paper/80 px-4 py-2">{stateLabels.mode[state.mode]}</span>
          <span className="rounded-full bg-paper/80 px-4 py-2">{stateLabels.season[state.season]}</span>
          <span className="rounded-full bg-paper/80 px-4 py-2">{stateLabels.aiStatus[state.aiStatus]}</span>
        </div>
      </div>
    </section>
  )
}
