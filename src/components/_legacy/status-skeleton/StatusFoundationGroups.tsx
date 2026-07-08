import { PhaseTwoKickoffPanel } from '@/components/world/PhaseTwoKickoffPanel'
import { PhaseTwoHandoffPanel } from '@/components/world/PhaseTwoHandoffPanel'
import { StageCompletionTransitionPanel } from '@/components/_legacy/world/StageCompletionTransitionPanel'
import { FinalClosurePanel } from '@/components/_legacy/world/FinalClosurePanel'
import { PreviewReadinessPanel } from '@/components/_legacy/world/PreviewReadinessPanel'
import { LocalAcceptancePanel } from '@/components/_legacy/world/LocalAcceptancePanel'
import { RealEvidencePanel } from '@/components/_legacy/world/RealEvidencePanel'
import { StageAcceptancePanel } from '@/components/_legacy/world/StageAcceptancePanel'
import { ContentProductizationPanel } from '@/components/_legacy/world/ContentProductizationPanel'
import { VisualInteractionQaPanel } from '@/components/_legacy/world/VisualInteractionQaPanel'
import { ToolingBaselinePanel } from '@/components/_legacy/world/ToolingBaselinePanel'
import { PhaseOneClosurePanel } from '@/components/world/PhaseOneClosurePanel'
import { PerformanceRegressionPanel } from '@/components/_legacy/world/PerformanceRegressionPanel'
import { PerformanceImplementationPanel } from '@/components/_legacy/world/PerformanceImplementationPanel'
import { PerformanceContractPanel } from '@/components/_legacy/world/PerformanceContractPanel'
import { FeatureArchitecturePanel } from '@/components/_legacy/world/FeatureArchitecturePanel'
import { ArchitectureContractPanel } from '@/components/_legacy/world/ArchitectureContractPanel'
import { BallastPanel } from '@/components/_legacy/world/BallastPanel'
import { GovernanceLedgerPanel } from '@/components/_legacy/world/GovernanceLedgerPanel'
import { AssemblyPanel } from '@/components/_legacy/world/AssemblyPanel'
import { FoundationHandoffPanel } from '@/components/_legacy/world/FoundationHandoffPanel'
import { FoundationAuditPanel } from '@/components/_legacy/world/FoundationAuditPanel'
import { FoundationGatePanel } from '@/components/_legacy/world/FoundationGatePanel'
import { WorldKernelPanel } from '@/components/_legacy/world/WorldKernelPanel'
import { FoundationQualityRadar } from '@/components/_legacy/world/FoundationQualityRadar'
import { RouteAndDependencyPanel } from '@/components/_legacy/world/RouteAndDependencyPanel'
import { DocumentationRegistryPanel } from '@/components/_legacy/world/DocumentationRegistryPanel'
import { OperationsPanel } from '@/components/_legacy/world/OperationsPanel'
import { MaintenancePanel } from '@/components/_legacy/world/MaintenancePanel'
import { FallbackAndExportPanel } from '@/components/_legacy/world/FallbackAndExportPanel'
import { WorldSkeletonPanel } from '@/components/_legacy/world/WorldSkeletonPanel'
import { WorldLayerGrid } from '@/components/_legacy/world/WorldLayerGrid'
import { SpatialProtocolPanel } from '@/components/_legacy/world/SpatialProtocolPanel'
import { OntologyPanel } from '@/components/_legacy/world/OntologyPanel'
import { ExtensionRegistryPanel } from '@/components/_legacy/world/ExtensionRegistryPanel'
import { FutureRoadmapPanel } from '@/components/_legacy/world/FutureRoadmapPanel'
import { AIBoundaryPanel } from '@/components/_legacy/world/AIBoundaryPanel'
import { BuildPipelinePanel } from '@/components/_legacy/world/BuildPipelinePanel'
import { LifecyclePolicyPanel } from '@/components/_legacy/world/LifecyclePolicyPanel'
import { WorldInvariantPanel } from '@/components/_legacy/world/WorldInvariantPanel'
import { StarLineSummary } from '@/components/_legacy/world/StarLineSummary'


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
import { getStatusSkeletonContract } from '@/lib/_legacy/status-skeleton'

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
