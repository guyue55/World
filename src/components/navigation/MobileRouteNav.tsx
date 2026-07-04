'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNavigationItems, isNavigationItemActive } from '@/lib/navigation'

export function MobileRouteNav() {
  const pathname = usePathname()
  const items = getNavigationItems().filter((item) => item.mobile)

  return (
    <nav
      aria-label="移动端主导航"
      className="fixed bottom-3 left-3 right-3 z-50 rounded-full border border-ink/10 bg-paper/92 px-3 py-2 shadow-soft backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-5 gap-1 text-center text-xs">
        {items.map((item) => {
          const active = isNavigationItemActive(pathname, item)

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-2 py-2 transition ${
                active
                  ? 'bg-ink text-paper'
                  : 'text-ink/70 hover:bg-white/60 hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
