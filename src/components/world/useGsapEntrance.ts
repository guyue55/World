'use client'

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'

export function useGsapEntrance<T extends HTMLElement>(
  rootRef: RefObject<T | null>,
  enabled: boolean,
  selector = '[data-gsap-reveal]',
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (!targets.length) return

    if (!enabled) {
      gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: 'visibility,transform' })
      return
    }

    const media = gsap.matchMedia()

    media.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      const reduceMotion = Boolean(context.conditions?.reduceMotion)

      if (reduceMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: 'visibility,transform' })
        return
      }

      const tween = gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          ease: 'power3.out',
          stagger: { amount: 0.28, from: 'start' },
          overwrite: 'auto',
        },
      )

      return () => tween.kill()
    })

    return () => media.revert()
  }, [enabled, rootRef, selector])
}
