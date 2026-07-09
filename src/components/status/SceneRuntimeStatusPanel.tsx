import { Compass, GitBranch, Map, ShieldCheck } from 'lucide-react'
import type { AmbientEnvironmentSummary } from '@/lib/ambient-environment'
import type { JourneyMemorySummary } from '@/lib/journey-memory'
import type { SceneRuntimeSummary } from '@/lib/scene-runtime'
import type { ScenePersonalitySummary } from '@/lib/scene-personality'
import type { SceneTransitionSummary } from '@/lib/scene-transition'

export function SceneRuntimeStatusPanel({
  summary,
  ambientEnvironmentSummary,
  journeyMemorySummary,
  personalitySummary,
  transitionSummary,
}: {
  summary: SceneRuntimeSummary
  ambientEnvironmentSummary?: AmbientEnvironmentSummary
  journeyMemorySummary?: JourneyMemorySummary
  personalitySummary?: ScenePersonalitySummary
  transitionSummary?: SceneTransitionSummary
}) {
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

      {transitionSummary && (
        <div className="mt-6 rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-moss">Scene Transition Shell</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">公开转场语法已进入统一壳</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/62">
                Shell 只包裹公开页面内容，GSAP 负责编排轻量入场，Framer Motion 只处理显隐；reduced-motion 下直接显示目标页面。
              </p>
            </div>
            <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold">MOTIONS</p>
              <p className="mt-2 text-2xl font-semibold">{transitionSummary.motionCount}/{transitionSummary.requiredMotionCount}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {transitionSummary.motions.map((motion) => (
              <article key={motion.id} className="rounded-[1rem] bg-white/70 p-4">
                <p className="truncate text-xs font-semibold tracking-[0.18em] text-moss">{motion.id}</p>
                <h4 className="mt-2 truncate text-base font-semibold text-ink">{motion.label}</h4>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/58">{motion.intent}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {transitionSummary.routeExamples.map((route) => (
              <article key={route.transitionId} className="rounded-[1rem] border border-ink/8 bg-white/65 p-4">
                <p className="truncate text-xs font-semibold tracking-[0.18em] text-moss">{route.transitionId}</p>
                <h4 className="mt-2 truncate text-sm font-semibold text-ink">{route.from} → {route.to}</h4>
                <p className="mt-2 truncate text-xs text-ink/52">{route.motion}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {personalitySummary && (
        <div className="mt-6 rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-moss">Scene Personality</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">公开场景拥有可辨认的人格身份</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/62">
                身份带用同一份事实源说明当前位置、空间信号、主行动和下一站，帮助访问者不看 URL 也能知道自己在哪。
              </p>
            </div>
            <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold">PERSONAS</p>
              <p className="mt-2 text-2xl font-semibold">{personalitySummary.personalityCount}/{personalitySummary.requiredPersonalityCount}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {personalitySummary.personalities.slice(0, 9).map((personality) => (
              <article key={personality.sceneId} className="rounded-[1rem] bg-white/70 p-4">
                <p className="truncate text-xs font-semibold tracking-[0.18em] text-moss">{personality.sceneId}</p>
                <h4 className="mt-2 truncate text-base font-semibold text-ink">{personality.persona}</h4>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/58">{personality.landmark}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {journeyMemorySummary && (
        <div className="mt-6 rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-moss">Journey Memory</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">公开旅程可以被轻量恢复</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/62">
                旅程记忆只保存公开场景、公开节点、公开路径和访问时间；清空本地存储后，世界仍能完整浏览。
              </p>
            </div>
            <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold">HISTORY</p>
              <p className="mt-2 text-2xl font-semibold">{journeyMemorySummary.maxHistory}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">主键</p>
              <p className="mt-2 truncate text-sm font-semibold text-ink">{journeyMemorySummary.primaryKey}</p>
            </div>
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">历史</p>
              <p className="mt-2 truncate text-sm font-semibold text-ink">{journeyMemorySummary.historyKey}</p>
            </div>
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">边界</p>
              <p className="mt-2 text-sm font-semibold text-ink">{journeyMemorySummary.allowedFieldCount} 可存 / {journeyMemorySummary.forbiddenFieldCount} 禁止</p>
            </div>
          </div>
        </div>
      )}

      {ambientEnvironmentSummary && (
        <div className="mt-6 rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-moss">Ambient Environment v2</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">空气层由时间、季节、场景和灯塔状态共同驱动</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/62">
                环境只使用轻量颜色、微纹理和场景标签表达世界状态；reduced-motion 下保留静态空气，不播放连续位移。
              </p>
            </div>
            <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold">SCENES</p>
              <p className="mt-2 text-2xl font-semibold">{ambientEnvironmentSummary.sceneEnvironmentCount}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">日光</p>
              <p className="mt-2 text-sm font-semibold text-ink">{ambientEnvironmentSummary.dayPeriodCount} 段</p>
            </div>
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">季节</p>
              <p className="mt-2 text-sm font-semibold text-ink">{ambientEnvironmentSummary.seasonCount} 类</p>
            </div>
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">灯塔</p>
              <p className="mt-2 text-sm font-semibold text-ink">{ambientEnvironmentSummary.aiStatusCount} 态</p>
            </div>
            <div className="rounded-[1rem] bg-white/70 p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-moss">降级</p>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/58">{ambientEnvironmentSummary.reducedMotionBehavior}</p>
            </div>
          </div>
        </div>
      )}

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
