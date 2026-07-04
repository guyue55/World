'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNavigationItems, isNavigationItemActive } from '@/lib/navigation'

export function RouteAwareNav() {
  const pathname = usePathname()
  const items = getNavigationItems().filter((item) => item.desktop)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
      <nav className="world-container flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          className="rounded-full px-3 py-2 font-semibold tracking-wide transition hover:bg-white/60"
        >
          古月浮屿
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {items.filter((item) => item.href !== '/').map((item) => {
            const active = isNavigationItemActive(pathname, item)

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-ink text-paper shadow-soft'
                    : 'text-ink/70 hover:bg-white/60 hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
