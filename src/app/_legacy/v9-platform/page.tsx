import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { V9HandoffPanel, V9PlatformDashboard, V9PlatformHero, V9ServiceMatrix, V9StageBoard } from '@/components/v9-platform'

export default function V9PlatformPage() {
  return (
    <ResponsivePageShell>
      <V9PlatformHero />
      <V9PlatformDashboard />
      <V9StageBoard />
      <V9ServiceMatrix />
      <V9HandoffPanel />
    </ResponsivePageShell>
  )
}
