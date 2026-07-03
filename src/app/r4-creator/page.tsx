import type { Metadata } from 'next'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R4AuditExportPanel, R4ConsolePanels, R4CreatorHero, R4InboxHarbor, R4MaintenanceQueue, R4PermissionGate } from '@/components/r4-creator-workbench'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function R4CreatorPage() {
  return (
    <ResponsivePageShell>
      <R4CreatorHero />
      <R4InboxHarbor />
      <R4ConsolePanels />
      <R4MaintenanceQueue />
      <R4PermissionGate />
      <R4AuditExportPanel />
    </ResponsivePageShell>
  )
}
