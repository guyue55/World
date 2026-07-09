import { Compass, GitBranch, Map, ShieldCheck } from 'lucide-react'
import type { SceneRuntimeSummary } from '@/lib/scene-runtime'

export function SceneRuntimeStatusPanel({ summary }: { summary: SceneRuntimeSummary }) {
  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-moss">
            <Compass className="h-4 w-4" />
            场景运行时
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">公开页面开始拥有统一的场景身份</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">
            Scene Registry 把入口、星图、时间河、档案馆、路径、节点、灯塔和维护舱收束为同一份公开事实源。后续首次进入和转场都从这里读取语义。
          </p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">本地 / 局域网</p>
          <p className="mt-3 text-lg font-semibold">Scene Registry</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">
            不读取私密层，不调用真实 AI，不承担权限判断。
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <Map className="h-4 w-4" />
            公开场景
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{summary.sceneCount}</p>
          <p className="mt-1 text-sm text-ink/58">/{summary.requiredSceneCount} required</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <GitBranch className="h-4 w-4" />
            转场语义
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{summary.transitionCount}</p>
          <p className="mt-1 text-sm text-ink/58">/{summary.requiredTransitionCount} required</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">公开边界</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{summary.publicSceneOnly ? '公开' : '复核'}</p>
          <p className="mt-1 text-sm text-ink/58">不读取私密层</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <ShieldCheck className="h-4 w-4" />
            降级策略
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">已声明</p>
          <p className="mt-1 text-sm text-ink/58">reduced-motion</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {summary.scenes.slice(0, 9).map((scene) => (
          <article key={scene.id} className="rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
            <p className="truncate text-xs font-semibold tracking-[0.2em] text-moss">{scene.match}</p>
            <h3 className="mt-3 truncate text-xl font-semibold text-ink">{scene.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/62">{scene.realName} · {scene.ambientLayer}</p>
            <p className="mt-3 truncate text-xs text-ink/45">{scene.motionGrammar} / {scene.entryTransition}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-night p-5 text-paper">
        <p className="text-sm font-semibold">下一阶段</p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {summary.nextActions.map((item) => (
            <p key={item} className="rounded-[0.9rem] bg-white/8 px-4 py-3 text-sm leading-6 text-paper/68">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
