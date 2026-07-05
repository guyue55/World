'use client'

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'

export type GsapEntranceType = 'arrival' | 'emergence' | 'connection' | 'flow' | 'focus' | 'feedback'

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

    const mm = gsap.matchMedia(rootRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      switch (type) {
        case 'arrival':
          gsap.fromTo(targets,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out', stagger: { amount: 0.28, from: 'start' }, overwrite: 'auto' }
          )
          break
        case 'emergence':
          gsap.fromTo(targets,
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.1, overwrite: 'auto' }
          )
          break
        case 'connection':
          gsap.fromTo(targets,
            { autoAlpha: 0, x: -15 },
            { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, overwrite: 'auto' }
          )
          break
        case 'flow':
          gsap.fromTo(targets,
            { autoAlpha: 0, y: 10, rotation: -2 },
            { autoAlpha: 1, y: 0, rotation: 0, duration: 0.7, ease: 'sine.out', stagger: 0.15, overwrite: 'auto' }
          )
          break
        case 'focus':
          gsap.fromTo(targets,
            { autoAlpha: 0, filter: 'blur(10px)' },
            { autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.inOut', stagger: 0.2, overwrite: 'auto' }
          )
          break
        case 'feedback':
          gsap.fromTo(targets,
            { autoAlpha: 0, y: -10 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.1, overwrite: 'auto' }
          )
          break
      }
    })
    
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotation: 0, clearProps: 'transform,filter' })
    })

    return () => mm.revert()
  }, [enabled, rootRef, selector, type])
}
