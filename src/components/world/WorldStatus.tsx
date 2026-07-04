import type { WorldState } from '@/lib/types'

export function WorldStatus({ state, nodeCount }: { state: WorldState; nodeCount: number }) {
  return (
    <aside className="rounded-world border border-ink/10 bg-white/50 p-6 shadow-soft">
      <p className="text-sm tracking-[0.25em] text-moss">WORLD STATUS</p>
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm text-ink/55">当前世界</p>
          <p className="text-2xl font-semibold">{state.mode} · {state.season}</p>
        </div>
        <div>
          <p className="text-sm text-ink/55">AI 灯塔</p>
          <p className="text-2xl font-semibold">{state.aiStatus}</p>
        </div>
        <div>
          <p className="text-sm text-ink/55">公开节点</p>
          <p className="text-2xl font-semibold">{nodeCount}</p>
        </div>
      </div>
    </aside>
  )
}
