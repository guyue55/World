import Link from 'next/link'
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react'

export type SceneProductionPart = 'SceneHeader' | 'SceneBody' | 'SceneMotionLayer' | 'SceneExitRail' | 'SceneFallback' | 'SceneEvidence'

export type SceneProductionAction = {
  href: string
  label: string
  description?: string
  tone?: 'primary' | 'quiet'
}

export function SceneProductionFrame({
  sceneId,
  eyebrow,
  title,
  description,
  motionLabel,
  fallback,
  evidence,
  actions,
  children,
}: {
  sceneId: string
  eyebrow: string
  title: string
  description: string
  motionLabel: string
  fallback: string
  evidence: string
  actions: SceneProductionAction[]
  children?: React.ReactNode
}) {
  return (
    <section
      data-testid="scene-production-frame"
      data-scene-production={sceneId}
      className="overflow-hidden rounded-[1.65rem] border border-white/65 bg-white/72 shadow-soft backdrop-blur"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="p-6 md:p-7">
          <div data-scene-part="SceneHeader">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-moss">
              <Compass className="h-4 w-4" />
              {eyebrow}
            </p>
            <h1 className="mt-3 break-words text-3xl font-semibold leading-tight text-ink md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">
              {description}
            </p>
          </div>

          <div data-scene-part="SceneBody" className="mt-6">
            {children}
          </div>
        </div>

        <aside className="grid content-between gap-4 border-t border-ink/10 bg-paper/60 p-5 lg:border-l lg:border-t-0">
          <div data-scene-part="SceneMotionLayer" className="rounded-[1rem] bg-white/70 p-4">
            <p className="text-xs font-semibold tracking-[0.22em] text-moss">Motion Layer</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{motionLabel}</p>
          </div>

          <div data-scene-part="SceneFallback" className="rounded-[1rem] bg-white/70 p-4">
            <p className="text-xs font-semibold tracking-[0.22em] text-moss">Fallback</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{fallback}</p>
          </div>

          <div data-scene-part="SceneEvidence" className="rounded-[1rem] bg-white/70 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-moss">
              <ShieldCheck className="h-4 w-4" />
              Evidence
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{evidence}</p>
          </div>

          <div data-scene-part="SceneExitRail" className="grid gap-2">
            {actions.slice(0, 3).map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={`group rounded-[1rem] px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  action.tone === 'primary' ? 'bg-ink text-paper hover:bg-night' : 'bg-white/74 text-ink hover:bg-white'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span>{action.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-65 transition group-hover:translate-x-0.5" />
                </span>
                {action.description ? (
                  <span className="mt-1 block text-xs font-normal leading-5 opacity-60">{action.description}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
