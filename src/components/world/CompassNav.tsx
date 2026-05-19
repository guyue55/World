import Link from 'next/link'

const items = [
  ['地图', '/atlas'],
  ['骨架', '/skeleton'],
  ['时间河', '/timeline'],
  ['档案馆', '/archive'],
  ['路径', '/paths'],
  ['灯塔', '/ask'],
  ['状态', '/status'],
  ['宪章', '/manifesto'],
]

export function CompassNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/75 backdrop-blur-xl">
      <nav className="world-container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">古月浮屿</Link>
        <div className="hidden items-center gap-5 md:flex">
          {items.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-ink/70 hover:text-ink">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
