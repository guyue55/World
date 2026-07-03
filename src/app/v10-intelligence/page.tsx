import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { V10EvolutionMatrix, V10FinalManifestPanel, V10IntelligenceDashboard, V10IntelligenceHero, V10StageBoard } from '@/components/v10-intelligence'

export default function V10IntelligencePage() {
  return (
    <ResponsivePageShell>
      <V10IntelligenceHero />
      <V10IntelligenceDashboard />
      <V10StageBoard />
      <V10EvolutionMatrix />
      <V10FinalManifestPanel />
    </ResponsivePageShell>
  )
}
