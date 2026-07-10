import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { WorldSceneId } from '@/lib/world-scene-assets'

type WorldViewportProps = {
  sceneId: WorldSceneId
  label: string
  background: ReactNode
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export function WorldViewport({ sceneId, label, background, children, fallback, className }: WorldViewportProps) {
  return (
    <section
      className={clsx('world-viewport', className)}
      data-world-scene={sceneId}
      data-testid={`world-viewport-${sceneId}`}
      aria-label={label}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">{background}</div>
      {children}
      {fallback ? <div data-scene-static-fallback>{fallback}</div> : null}
    </section>
  )
}
