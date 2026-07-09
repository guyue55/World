'use client'

import Link from 'next/link'
import { ArrowRight, Compass, MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { getScenePersonalityForPathname, type ScenePersonalityDefinition } from '@/lib/scene-personality'
import { useWorldRuntime } from './WorldRuntimeProvider'

const portalSceneIds = new Set(['atlas', 'timeline', 'archive', 'paths', 'lighthouse', 'status'])

const toneClasses: Record<string, string> = {
  'paper-starlight': 'border-white/70 bg-white/72 text-ink shadow-soft',
  'dome-lake': 'border-lake/20 bg-lake/10 text-ink shadow-soft',
  'river-moss': 'border-moss/20 bg-moss/10 text-ink shadow-soft',
  'archive-gold': 'border-gold/24 bg-gold/12 text-ink shadow-soft',
  'route-leaf': 'border-leaf/24 bg-leaf/10 text-ink shadow-soft',
  'room-ink': 'border-ink/12 bg-white/76 text-ink shadow-soft',
  'beacon-night': 'border-paper/12 bg-night text-paper shadow-soft',
  'console-slate': 'border-ink/10 bg-white/68 text-ink shadow-soft',
}

function getToneClass(personality: ScenePersonalityDefinition) {
  return toneClasses[personality.tone] ?? toneClasses['paper-starlight']
}

export function SceneIdentityBand() {
  const pathname = usePathname() ?? '/'
  const runtime = useWorldRuntime()
  const personality = getScenePersonalityForPathname(pathname)

  if (pathname === '/') return null

  const isPortalScene = portalSceneIds.has(personality.sceneId)
  if (isPortalScene) return null
  const signals = runtime.compactMotion ? personality.signals.slice(0, 2) : personality.signals.slice(0, 3)
  const mutedTextClass = personality.tone === 'beacon-night' ? 'text-paper/62' : 'text-ink/58'
  const chipClass = personality.tone === 'beacon-night' ? 'border-paper/12 bg-paper/8 text-paper/72' : 'border-white/70 bg-white/58 text-ink/62'
  const primaryClass = personality.tone === 'beacon-night' ? 'bg-paper text-night hover:bg-gold' : 'bg-ink text-paper hover:bg-night'
  const secondaryClass = personality.tone === 'beacon-night'
    ? 'border-paper/14 bg-paper/8 text-paper hover:bg-paper/14'
    : 'border-ink/10 bg-white/70 text-ink hover:bg-white'

  return (
    <section
      aria-label={`当前位置：${personality.persona}`}
      data-testid="scene-identity-band"
      data-scene-personality={personality.sceneId}
      data-scene-tone={personality.tone}
      data-reduced-motion={runtime.reducedMotion ? 'true' : 'false'}
      data-compact-scene-band={isPortalScene ? 'true' : 'false'}
      className={`${isPortalScene ? 'hidden md:block' : 'block'} world-container pt-4 md:pt-6`}
    >
      <div className={`overflow-hidden border backdrop-blur ${getToneClass(personality)} ${
        isPortalScene
          ? 'rounded-full px-4 py-2.5 md:px-5'
          : 'rounded-[1.35rem] p-4 md:p-5'
      }`}>
        <div className={isPortalScene ? 'flex flex-wrap items-center justify-between gap-3' : 'grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'}>
          <div className="min-w-0">
            <p className={`flex items-center gap-2 text-xs font-semibold ${isPortalScene ? 'tracking-[0.18em]' : 'tracking-[0.28em]'} ${mutedTextClass}`}>
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {personality.persona}
            </p>
            {isPortalScene ? null : (
              <>
                <h2 className="mt-2 break-words text-2xl font-semibold leading-tight md:text-3xl">{personality.landmark}</h2>
                <p className={`mt-2 max-w-4xl break-words text-sm leading-7 ${mutedTextClass}`}>{personality.promise}</p>
              </>
            )}
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 lg:justify-end">
            <div className="flex flex-wrap gap-2">
              {signals.map((signal) => (
                <span key={signal} className={`rounded-full border px-3 text-xs font-semibold ${isPortalScene ? 'py-1' : 'py-1.5'} ${chipClass}`}>
                  {signal}
                </span>
              ))}
            </div>
            <div className={`flex flex-wrap gap-2 ${isPortalScene ? 'hidden md:flex' : ''}`}>
              <Link
                href={personality.primaryActionHref}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${primaryClass}`}
              >
                <Compass className="h-4 w-4" />
                {personality.primaryActionLabel}
              </Link>
              <Link
                href={personality.nextStationHref}
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${secondaryClass}`}
              >
                {personality.nextStationLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
