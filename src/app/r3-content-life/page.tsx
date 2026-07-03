
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R3AreaDensityPanel, R3ContentLifeHero, R3ContentPathways, R3LifecycleRiver, R3NodeConstellation, R3NodePassportPanel, R3RealityWorldBridge } from '@/components/r3-content-life'

export default function R3ContentLifePage() {
  return (
    <ResponsivePageShell>
      <R3ContentLifeHero />
      <R3NodeConstellation />
      <R3ContentPathways />
      <R3LifecycleRiver />
      <R3AreaDensityPanel />
      <R3NodePassportPanel />
      <R3RealityWorldBridge />
    </ResponsivePageShell>
  )
}
