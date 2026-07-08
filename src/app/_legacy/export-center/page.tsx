import { ExportCenterHero } from '@/components/_legacy/export-center/ExportCenterHero'
import { ExportPackageGrid } from '@/components/_legacy/export-center/ExportPackageGrid'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function ExportCenterPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <ExportCenterHero />
        <ExportPackageGrid />
      </div>
    </ResponsivePageShell>
  )
}
