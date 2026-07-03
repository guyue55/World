import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { R1ProductionDashboard, R1ProductionHero, R1ReleaseEvidencePanel, R1StageBoard } from '@/components/r1-production'

export default function R1ProductionPage() {
  return (
    <ResponsivePageShell>
      <R1ProductionHero />
      <R1ProductionDashboard />
      <R1StageBoard />
      <R1ReleaseEvidencePanel />
    </ResponsivePageShell>
  )
}
