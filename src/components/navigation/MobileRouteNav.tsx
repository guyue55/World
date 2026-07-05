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
      className="sticky top-0 z-40 mx-auto w-[calc(100%-1rem)] max-w-[36rem] rounded-b-[1.25rem] border-x border-b border-ink/10 bg-paper/94 px-2 py-2 shadow-soft backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-5 gap-1 text-center text-xs">
        {items.map((item) => {
          const active = isNavigationItemActive(pathname, item)

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`min-w-0 rounded-full px-2 py-2 transition ${
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
