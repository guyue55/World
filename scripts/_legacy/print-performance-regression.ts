import {
  getLargeContentStrategy,
  getPerformanceMetricsModel,
  getPerformanceRegressionGuard,
  getRoutePerformanceProfiles,
  getSmoothnessAuditChecklist,
} from '../src/lib/performance-regression'

function main() {
  const metrics = getPerformanceMetricsModel()
  const routes = getRoutePerformanceProfiles()
  const smoothness = getSmoothnessAuditChecklist()
  const largeContent = getLargeContentStrategy()
  const guard = getPerformanceRegressionGuard()

  console.log(`${metrics.name}`)
  console.log(`metrics=${metrics.metrics.length}`)
  console.log(`routeProfiles=${routes.profiles.length}`)
  console.log(`smoothnessAuditItems=${smoothness.auditItems.length}`)
  console.log(`largeContentStages=${largeContent.growthStages.length}`)
  console.log(`regressionGuards=${guard.guards.length}`)
}

main()
