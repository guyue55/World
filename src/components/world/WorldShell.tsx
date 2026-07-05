import { CompassNav } from './CompassNav'
import { MobileNav } from './MobileNav'
import { WorldRuntimeProvider } from './WorldRuntimeProvider'
import { ProductBackdrop } from '@/components/product/ProductBackdrop'
import { ProductJourneyDock } from '@/components/product/ProductJourneyDock'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <WorldRuntimeProvider>
      <div className="min-h-screen">
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <ProductBackdrop />
        <CompassNav />
        <MobileNav />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <ProductJourneyDock />
        <footer className="world-container mt-16 border-t border-ink/10 py-10 text-sm text-ink/60">
          <p>古月浮屿｜一个正在生长的个人数字世界。公开入口只展示已审查内容，私密层不会进入前台索引。</p>
        </footer>
      </div>
    </WorldRuntimeProvider>
  )
}
