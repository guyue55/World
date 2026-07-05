import Link from 'next/link'
import { ArrowRight, Compass, Route, Search, Sparkles, Waves } from 'lucide-react'
import type { DynamicWorldRouteSignal, HomeDynamicWorldSurface } from '@/lib/public-world-surfaces'

const icons: Record<DynamicWorldRouteSignal['id'], typeof Compass> = {
  home: Sparkles,
  path: Route,
  atlas: Compass,
  timeline: Waves,
  ask: Sparkles,
  archive: Search,
}

export function ProductDynamicWorldGuide({ surface }: { surface: HomeDynamicWorldSurface }) {
  const primaryRoute = surface.routes.find((route) => route.href === surface.primaryHref) ?? surface.routes[0]

  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">{surface.eyebrow}</p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">{surface.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{surface.description}</p>
        </div>
        {primaryRoute && (
          <Link href={primaryRoute.href} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper shadow-soft transition hover:-translate-y-0.5 hover:bg-night">
            {primaryRoute.shortLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {surface.routes.filter((route) => route.id !== 'home').map((route) => {
          const Icon = icons[route.id]

          return (
            <Link key={route.id} href={route.href} className="group block rounded-[1.35rem] bg-paper/70 p-5 transition hover:-translate-y-1 hover:bg-white">
              <div className="flex min-w-0 items-start justify-between gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] bg-ink text-paper">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-medium text-ink/52">{route.intent}</span>
              </div>
              <h3 className="mt-4 truncate text-xl font-semibold text-ink">{route.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink/62">{route.description}</p>
              <p className="mt-4 truncate text-xs font-medium text-moss">{route.caption}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
