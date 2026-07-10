'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Archive, BookOpen, Compass, Home, Map, Route, Sparkles } from 'lucide-react'
import { getNavigationItems, isNavigationItemActive, type NavigationItem } from '@/lib/navigation'
import { ThemeToggle } from './ThemeToggle'

const iconById: Record<string, typeof Home> = {
  home: Home,
  atlas: Map,
  timeline: Compass,
  archive: Archive,
  paths: Route,
  lighthouse: Sparkles,
  manifesto: BookOpen,
}

function ChromeLink({ item, pathname, compact = false }: { item: NavigationItem; pathname: string; compact?: boolean }) {
  const Icon = iconById[item.id] ?? Compass
  const active = isNavigationItemActive(pathname, item)

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      aria-label={item.label}
      title={item.label}
      className={active
        ? 'flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg bg-paper text-night'
        : 'flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg text-paper/72 transition-colors hover:bg-paper/12 hover:text-paper focus-visible:outline'}
    >
      <Icon aria-hidden="true" size={17} />
      {compact ? <span className="text-[11px]">{item.label}</span> : <span className="sr-only">{item.label}</span>}
    </Link>
  )
}

export function WorldChrome() {
  const pathname = usePathname() || '/'
  const items = getNavigationItems()
  const desktopItems = items.filter((item) => item.desktop)
  const mobileItems = items.filter((item) => item.mobile)

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:block" data-world-chrome>
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
          <Link href="/" className="pointer-events-auto world-scene-title rounded-lg bg-night/72 px-3 py-2 text-base text-paper backdrop-blur-md focus-visible:outline">
            古月浮屿
          </Link>
          <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-paper/15 bg-night/72 p-1.5 backdrop-blur-md">
            <nav aria-label="空间罗盘" className="flex items-center gap-1">
              {desktopItems.map((item) => <ChromeLink key={item.id} item={item} pathname={pathname} />)}
            </nav>
            <span className="h-7 w-px bg-paper/15" aria-hidden="true" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-3 md:hidden">
        <Link href="/" className="pointer-events-auto world-scene-title rounded-lg bg-night/78 px-3 py-2 text-sm text-paper backdrop-blur-md">古月浮屿</Link>
        <div className="pointer-events-auto"><ThemeToggle /></div>
      </header>

      <nav
        aria-label="移动端空间罗盘"
        data-testid="mobile-primary-navigation"
        className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 grid grid-cols-5 gap-1 rounded-lg border border-paper/15 bg-night/92 p-1.5 text-paper shadow-2xl backdrop-blur-md md:hidden"
      >
        {mobileItems.slice(0, 5).map((item) => <ChromeLink key={item.id} item={item} pathname={pathname} compact />)}
      </nav>
    </>
  )
}
