import { PhaseTwoKickoffPanel } from '@/components/world/PhaseTwoKickoffPanel'
import { PhaseTwoHandoffPanel } from '@/components/world/PhaseTwoHandoffPanel'
import { StageCompletionTransitionPanel } from '@/components/world/StageCompletionTransitionPanel'
import { FinalClosurePanel } from '@/components/world/FinalClosurePanel'
import { PreviewReadinessPanel } from '@/components/world/PreviewReadinessPanel'
import { LocalAcceptancePanel } from '@/components/world/LocalAcceptancePanel'
import { RealEvidencePanel } from '@/components/world/RealEvidencePanel'
import { StageAcceptancePanel } from '@/components/world/StageAcceptancePanel'
import { ContentProductizationPanel } from '@/components/world/ContentProductizationPanel'
import { VisualInteractionQaPanel } from '@/components/world/VisualInteractionQaPanel'
import { ToolingBaselinePanel } from '@/components/world/ToolingBaselinePanel'
import { PhaseOneClosurePanel } from '@/components/world/PhaseOneClosurePanel'
import { PerformanceRegressionPanel } from '@/components/world/PerformanceRegressionPanel'
import { PerformanceImplementationPanel } from '@/components/world/PerformanceImplementationPanel'
import { PerformanceContractPanel } from '@/components/world/PerformanceContractPanel'
import { FeatureArchitecturePanel } from '@/components/world/FeatureArchitecturePanel'
import { ArchitectureContractPanel } from '@/components/world/ArchitectureContractPanel'
import { BallastPanel } from '@/components/world/BallastPanel'
import { GovernanceLedgerPanel } from '@/components/world/GovernanceLedgerPanel'
import { AssemblyPanel } from '@/components/world/AssemblyPanel'
import { FoundationHandoffPanel } from '@/components/world/FoundationHandoffPanel'
import { FoundationAuditPanel } from '@/components/world/FoundationAuditPanel'
import { FoundationGatePanel } from '@/components/world/FoundationGatePanel'
import { WorldKernelPanel } from '@/components/world/WorldKernelPanel'
import { FoundationQualityRadar } from '@/components/world/FoundationQualityRadar'
import { RouteAndDependencyPanel } from '@/components/world/RouteAndDependencyPanel'
import { DocumentationRegistryPanel } from '@/components/world/DocumentationRegistryPanel'
import { OperationsPanel } from '@/components/world/OperationsPanel'
import { MaintenancePanel } from '@/components/world/MaintenancePanel'
import { FallbackAndExportPanel } from '@/components/world/FallbackAndExportPanel'
import { WorldSkeletonPanel } from '@/components/world/WorldSkeletonPanel'
import { WorldLayerGrid } from '@/components/world/WorldLayerGrid'
import { SpatialProtocolPanel } from '@/components/world/SpatialProtocolPanel'
import { OntologyPanel } from '@/components/world/OntologyPanel'
import { ExtensionRegistryPanel } from '@/components/world/ExtensionRegistryPanel'
import { FutureRoadmapPanel } from '@/components/world/FutureRoadmapPanel'
import { AIBoundaryPanel } from '@/components/world/AIBoundaryPanel'
import { BuildPipelinePanel } from '@/components/world/BuildPipelinePanel'
import { LifecyclePolicyPanel } from '@/components/world/LifecyclePolicyPanel'
import { WorldInvariantPanel } from '@/components/world/WorldInvariantPanel'
import { StarLineSummary } from '@/components/world/StarLineSummary'


import { StatusPanelGroup } from '@/components/status-skeleton/StatusPanelGroup'
import { AcceptanceReadinessPanel } from '@/components/acceptance/AcceptanceReadinessPanel'
import { LintReadinessPanel } from '@/components/acceptance/LintReadinessPanel'
import { ExecutionRerunPanel } from '@/components/acceptance/ExecutionRerunPanel'
import { RealValidationRunnerPanel } from '@/components/acceptance/RealValidationRunnerPanel'
import { BrowserQaMatrixPanel } from '@/components/acceptance/BrowserQaMatrixPanel'
import { PreviewPerformancePanel } from '@/components/acceptance/PreviewPerformancePanel'
import { ValidationClosurePanel } from '@/components/acceptance/ValidationClosurePanel'
import { ReleaseGatePanel } from '@/components/acceptance/ReleaseGatePanel'
import { ReleaseEnvironmentPanel } from '@/components/acceptance/ReleaseEnvironmentPanel'
import { PublicSeoReleasePanel } from '@/components/acceptance/PublicSeoReleasePanel'
import { ReleaseClosurePanel } from '@/components/acceptance/ReleaseClosurePanel'
import { PhaseThreePlanningPanel } from '@/components/phase-three/PhaseThreePlanningPanel'
import { ContentGrowthPanel } from '@/components/phase-three/ContentGrowthPanel'
import { AiLighthousePlanningPanel } from '@/components/phase-three/AiLighthousePlanningPanel'
import { OperationsExportPanel } from '@/components/phase-three/OperationsExportPanel'
import { PhaseThreeImplementationClosurePanel } from '@/components/phase-three/PhaseThreeImplementationClosurePanel'
import { PhaseThreeRoutePanel } from '@/components/phase-three/PhaseThreeRoutePanel'
import { PhaseThreeQaPanel } from '@/components/phase-three/PhaseThreeQaPanel'
import { PhaseThreeIntegrationClosurePanel } from '@/components/phase-three/PhaseThreeIntegrationClosurePanel'
import { PhaseTwoClosurePanel } from '@/components/acceptance/PhaseTwoClosurePanel'
import { FinalHandoffPanel } from '@/components/acceptance/FinalHandoffPanel'
import { getStatusSkeletonContract } from '@/lib/status-skeleton'

export function StatusFoundationGroups() {
  const groups = getStatusSkeletonContract().groups

  return (
    <section className="space-y-6">
      <StatusPanelGroup id="experience" title={groups[0].title} purpose={groups[0].purpose} defaultOpen>
        <PhaseTwoKickoffPanel />
        <ContentProductizationPanel />
        <VisualInteractionQaPanel />
        <PerformanceRegressionPanel />
      </StatusPanelGroup>

      <StatusPanelGroup id="evidence" title={groups[1].title} purpose={groups[1].purpose}>
        <FinalHandoffPanel />
        <PhaseTwoClosurePanel />
        <AcceptanceReadinessPanel />
        <ExecutionRerunPanel />
        <RealValidationRunnerPanel />
        <BrowserQaMatrixPanel />
        <PreviewPerformancePanel />
        <ValidationClosurePanel />
        <ReleaseGatePanel />
        <ReleaseEnvironmentPanel />
        <PublicSeoReleasePanel />
        <ReleaseClosurePanel />
        <PhaseThreePlanningPanel />
        <ContentGrowthPanel />
        <AiLighthousePlanningPanel />
        <OperationsExportPanel />
        <PhaseThreeImplementationClosurePanel />
        <PhaseThreeRoutePanel />
        <PhaseThreeQaPanel />
        <PhaseThreeIntegrationClosurePanel />
        <LintReadinessPanel />
        <StageCompletionTransitionPanel />
        <FinalClosurePanel />
        <PreviewReadinessPanel />
        <LocalAcceptancePanel />
        <RealEvidencePanel />
        <StageAcceptancePanel />
        <PhaseOneClosurePanel />
      </StatusPanelGroup>

      <StatusPanelGroup id="architecture" title={groups[2].title} purpose={groups[2].purpose}>
        <ToolingBaselinePanel />
        <PerformanceImplementationPanel />
        <PerformanceContractPanel />
        <FeatureArchitecturePanel />
        <ArchitectureContractPanel />
        <GovernanceLedgerPanel />
        <DocumentationRegistryPanel />
        <OperationsPanel />
      </StatusPanelGroup>

      <StatusPanelGroup id="skeleton" title={groups[3].title} purpose={groups[3].purpose}>
        <WorldKernelPanel />
        <FoundationQualityRadar />
        <WorldSkeletonPanel />
        <WorldLayerGrid />
        <SpatialProtocolPanel />
        <OntologyPanel />
        <AIBoundaryPanel />
        <LifecyclePolicyPanel />
        <WorldInvariantPanel />
        <StarLineSummary />
      </StatusPanelGroup>
    </section>
  )
}
