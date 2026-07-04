import { ExhibitionGrid } from '@/components/exhibitions/ExhibitionGrid'
import { ExhibitionHero } from '@/components/exhibitions/ExhibitionHero'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

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
