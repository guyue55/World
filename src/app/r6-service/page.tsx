import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R6BoundaryPanel, R6ServiceHero, R6ServicePanels } from '@/components/r6-service-bridge'

export default function R6ServicePage() {
  return (
    <ResponsivePageShell>
      <R6ServiceHero />
      <R6ServicePanels />
      <R6BoundaryPanel />
    </ResponsivePageShell>
  )
}
