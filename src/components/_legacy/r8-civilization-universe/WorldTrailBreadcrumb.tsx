'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { resolveRouteAnchor } from './types'

export function WorldTrailBreadcrumb() {
  const pathname = usePathname()
  const anchor = useMemo(() => resolveRouteAnchor(pathname), [pathname])

  return (
    <div className="pointer-events-none fixed left-4 top-[18.2rem] z-[42] hidden max-w-[21rem] 2xl:block">
      <div className="pointer-events-auto rounded-[1.5rem] border border-white/50 bg-white/68 p-3 text-xs font-semibold text-ink/55 shadow-soft backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">World Trail</p>
        <p className="mt-2 text-ink">你位于：{anchor.where}</p>
        <p className="mt-1 leading-5">{anchor.what}</p>
        <div className="mt-3 flex gap-2">
          <Link href="/" className="rounded-full bg-white px-3 py-1 text-[11px] text-ink/60">原点</Link>
          <Link href="/atlas" className="rounded-full bg-ink px-3 py-1 text-[11px] text-white">地图</Link>
        </div>
      </div>
    </div>
  )
}
