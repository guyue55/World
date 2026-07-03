import type { Metadata } from 'next'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R6BoundaryPanel, R6ServiceHero, R6ServicePanels } from '@/components/r6-service-bridge'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R6ServicePage() {
  return (
    <ResponsivePageShell>
      <R6ServiceHero />
      <R6ServicePanels />
      <R6BoundaryPanel />
    </ResponsivePageShell>
  )
}
