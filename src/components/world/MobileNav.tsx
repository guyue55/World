import Link from 'next/link'

const items = [
  ['地图', '/atlas'],
  ['骨架', '/skeleton'],
  ['档案馆', '/archive'],
  ['路径', '/paths'],
  ['灯塔', '/ask'],
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-full border border-ink/10 bg-paper/90 px-3 py-2 shadow-soft backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-1 text-center text-xs">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-full px-2 py-2 text-ink/70 hover:bg-white/60">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
