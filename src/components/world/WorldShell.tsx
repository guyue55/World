import { CompassNav } from './CompassNav'
import { MobileNav } from './MobileNav'
import { WorldRuntimeProvider } from '@/components/r8-dynamic-world'
import { WorldRuntimeStack, WorldRuntimeUtilityDock } from './WorldRuntimeStack'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <WorldRuntimeProvider>
      <div className="min-h-screen pb-20 md:pb-0">
        <WorldRuntimeStack />
        <CompassNav />
        {children}
        <footer className="world-container border-t border-ink/10 py-10 text-sm text-ink/60">
          <p>Guyue Floating Islet.</p>
        </footer>
        <WorldRuntimeUtilityDock />
        <MobileNav />
      </div>
    </WorldRuntimeProvider>
  )
}
