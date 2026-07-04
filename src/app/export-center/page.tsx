import { ExportCenterHero } from '@/components/export-center/ExportCenterHero'
import { ExportPackageGrid } from '@/components/export-center/ExportPackageGrid'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

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
