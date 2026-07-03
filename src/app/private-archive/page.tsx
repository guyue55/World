import type { Metadata } from 'next'
import { PrivateArchiveBoundaryPanel } from '@/components/private-archive/PrivateArchiveBoundaryPanel'
import { PrivateArchiveHero } from '@/components/private-archive/PrivateArchiveHero'
import { PrivateArchivePlaceholderGrid } from '@/components/private-archive/PrivateArchivePlaceholderGrid'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { AnnualWorldBookPanel } from '@/components/private-archive/AnnualWorldBookPanel'
import { InheritanceExportPanel } from '@/components/private-archive/InheritanceExportPanel'
import { TimeCapsulePanel } from '@/components/private-archive/TimeCapsulePanel'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PrivateArchivePage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <PrivateArchiveHero />
        <PrivateArchiveBoundaryPanel />
        <PrivateArchivePlaceholderGrid />
        <TimeCapsulePanel />
        <AnnualWorldBookPanel />
        <InheritanceExportPanel />
      </div>
    </ResponsivePageShell>
  )
}
