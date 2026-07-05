'use client'

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { getMotionGrammarRule, type MotionGrammarType } from '@/lib/motion-grammar'

export type GsapEntranceType = MotionGrammarType

export function useGsapEntrance<T extends HTMLElement>(
  rootRef: RefObject<T | null>,
  enabled: boolean,
  selector = '[data-gsap-reveal]',
  type: GsapEntranceType = 'arrival'
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (!targets.length) return

    // Strip Tailwind's 'invisible' class so GSAP has full control and clearProps doesn't revert to hidden
    targets.forEach((t) => t.classList.remove('invisible'))

    if (!enabled) {
      gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, clearProps: 'transform' })
      return
    }

    const rule = getMotionGrammarRule(type)
    const mm = gsap.matchMedia(rootRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(targets, rule.from as gsap.TweenVars, rule.to as gsap.TweenVars)
    })
    
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { ...rule.reducedMotion, clearProps: 'transform,filter' })
    })

    return () => mm.revert()
  }, [enabled, rootRef, selector, type])
}
