import { ExhibitionGrid } from '@/components/_legacy/exhibitions/ExhibitionGrid'
import { ExhibitionHero } from '@/components/_legacy/exhibitions/ExhibitionHero'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function ExhibitionsPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <ExhibitionHero />
        <ExhibitionGrid />
      </div>
    </ResponsivePageShell>
  )
}
