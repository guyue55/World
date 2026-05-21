import { AtlasWorldMap } from '@/components/worldification/AtlasWorldMap'
import { WorldPortalHero } from '@/components/worldification/WorldPortalHero'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function HomePage() {
  return (
    <ResponsivePageShell>
      <WorldPortalHero />
      <AtlasWorldMap />
    </ResponsivePageShell>
  )
}
