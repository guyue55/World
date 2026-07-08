import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { DeploymentChecklistPanel } from '@/components/production/DeploymentChecklistPanel'
import { DomainHttpsCdnPanel } from '@/components/production/DomainHttpsCdnPanel'
import { ProductionDashboardPanel } from '@/components/production/ProductionDashboardPanel'
import { ProductionEnvironmentPanel } from '@/components/production/ProductionEnvironmentPanel'
import { ProductionHero } from '@/components/production/ProductionHero'
import { MonitoringPanel } from '@/components/production/MonitoringPanel'
import { ProductionSmokePanel } from '@/components/production/ProductionSmokePanel'
import { RollbackDrillPanel } from '@/components/production/RollbackDrillPanel'

export default function ProductionPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <ProductionHero />
        <ProductionDashboardPanel />
        <ProductionEnvironmentPanel />
        <DeploymentChecklistPanel />
        <DomainHttpsCdnPanel />
        <ProductionSmokePanel />
        <MonitoringPanel />
        <RollbackDrillPanel />
      </div>
    </ResponsivePageShell>
  )
}
