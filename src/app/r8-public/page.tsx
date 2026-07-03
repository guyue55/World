import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R8BoundaryPanel, R8OperationsPanels, R8PublicOperationsHero, R8ReleasePanels } from '@/components/r8-public-operations'

export default function R8PublicPage() {
  return (
    <ResponsivePageShell>
      <R8PublicOperationsHero />
      <R8ReleasePanels />
      <R8OperationsPanels />
      <R8BoundaryPanel />
    </ResponsivePageShell>
  )
}
