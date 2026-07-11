'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, useEffect } from 'react'
import { beginSceneMigration, SCENE_MIGRATION_TIMING } from '@/lib/runtime/scene-migration'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import type { SceneDestination } from '@/lib/scenes/scene-destination'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

type Props = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  destination: SceneDestination
  sourceObjectId?: string
  focusReturnId?: string
}

export const SceneTransitionLink = forwardRef<HTMLAnchorElement, Props>(function SceneTransitionLink({ destination, sourceObjectId, focusReturnId, onClick, children, ...props }, ref) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const runtime = useWorldRuntime()
  const href = typeof props.href === 'string' ? props.href : destination.href
  const sourceId = props.id ?? (sourceObjectId ? `migration-source-${sourceObjectId.replace(/[^a-zA-Z0-9_-]/g, '-')}` : undefined)

  useEffect(() => { router.prefetch(href) }, [href, router])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return
    event.preventDefault()
    router.prefetch(href)
    const source = { ...createSceneContext(runtime.currentScene as Parameters<typeof createSceneContext>[0], pathname), focusedObjectId: sourceObjectId ?? null }
    beginSceneMigration({ source, target: destination, element: event.currentTarget, focusReturnId: focusReturnId ?? sourceId, reduced: runtime.motionMode !== 'full' })
    window.setTimeout(() => {
      const navigate = () => router.push(href)
      if (runtime.motionMode === 'full' && 'startViewTransition' in document) {
        ;(document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(navigate)
      } else navigate()
    }, runtime.motionMode === 'full' ? SCENE_MIGRATION_TIMING.navigationDelayMs : SCENE_MIGRATION_TIMING.reducedNavigationDelayMs)
  }

  return <Link {...props} id={sourceId} href={href} ref={ref} onClick={handleClick} data-scene-transition-object={destination.transitionObject} data-scene-transition-target={destination.sceneId}>{children}</Link>
})
