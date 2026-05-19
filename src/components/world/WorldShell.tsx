import { CompassNav } from './CompassNav'
import { MobileNav } from './MobileNav'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <CompassNav />
      {children}
      <footer className="world-container border-t border-ink/10 py-10 text-sm text-ink/60">
        <p>古月浮屿｜一个正在生长的个人数字世界。</p>
      </footer>
      <MobileNav />
    </div>
  )
}
