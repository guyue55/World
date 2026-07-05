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

    // Strip Tailwind's 'invisible' class so GSAP has full control and clearProps doesn't revert to hidden
    targets.forEach((t) => t.classList.remove('invisible'))

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!enabled || reduceMotion) {
      gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: 'transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
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
    }, rootRef)

    return () => ctx.revert()
  }, [enabled, rootRef, selector])
}
