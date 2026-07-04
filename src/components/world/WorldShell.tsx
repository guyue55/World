import { CompassNav } from './CompassNav'
import { MobileNav } from './MobileNav'
import { WorldRuntimeProvider } from './WorldRuntimeProvider'
import { WorldRuntimeStack, WorldRuntimeUtilityDock } from './WorldRuntimeStack'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <WorldRuntimeProvider>
      <div className="min-h-screen pb-20 md:pb-0">
        <WorldRuntimeStack />
        <CompassNav />
        {children}
        <footer className="world-container border-t border-ink/10 py-10 text-sm text-ink/60">
          <p>&#x53E4;&#x6708;&#x6D6E;&#x5C7F;&#xFF5C;&#x4E00;&#x4E2A;&#x6B63;&#x5728;&#x751F;&#x957F;&#x7684;&#x4E2A;&#x4EBA;&#x6570;&#x5B57;&#x4E16;&#x754C;&#x3002;</p>
        </footer>
        <WorldRuntimeUtilityDock />
        <MobileNav />
      </div>
    </WorldRuntimeProvider>
  )
}
