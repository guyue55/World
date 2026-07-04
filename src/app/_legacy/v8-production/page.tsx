import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { V8HandoffPanel, V8OperationsMatrix, V8ProductionDashboard, V8ProductionHero, V8StageBoard } from '@/components/v8-production'

export default function V8ProductionPage() {
  return (
    <ResponsivePageShell>
      <V8ProductionHero />
      <V8ProductionDashboard />
      <V8StageBoard />
      <V8OperationsMatrix />
      <V8HandoffPanel />
    </ResponsivePageShell>
  )
}
