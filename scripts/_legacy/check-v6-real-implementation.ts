import {
  V6AuditRecorder,
  V6MemoryGraphStore,
  approveV6AutonomousTask,
  createV6LifeProject,
  createV6OpenWorldProtocol,
  createV6WorldEvent,
  discoverV6World,
  enterV6UniverseRoom,
  evaluateV6ProductionLive,
  getV6ProjectProgress,
  planV6AutonomousTask,
} from '../src/platform/server/v6'

const errors: string[] = []
const audit = new V6AuditRecorder()

const privateDiscovery = discoverV6World({ id: 'private-world', visibility: 'private' }, audit)
if (privateDiscovery.visible) errors.push('private world discovery must be redacted')

const event = createV6WorldEvent({ id: 'private-world', visibility: 'private' }, audit)
if (event.containsPrivateRawContent) errors.push('world event leaked private raw content')

const project = createV6LifeProject('life-project-1', 'creation', ['outline', 'draft', 'publish'])
const progress = getV6ProjectProgress(project)
if (progress.milestoneCount !== 3 || progress.reviewRequired !== true) errors.push('civilization project progress invalid')

const task = planV6AutonomousTask({
  id: 'risk-agent-1',
  canSelfEscalate: false,
  canAuthorizeOtherAgents: false,
}, 'critical-task-1', 'critical', audit)

if (task.status !== 'review-required') errors.push('critical task must require review')
const approvedTask = approveV6AutonomousTask(task, 'owner-1', audit)
if (approvedTask.status !== 'approved') errors.push('approved critical task should be approved')

const graph = new V6MemoryGraphStore()
graph.addNode({ id: 'public-memory', visibility: 'public', weight: 5 })
graph.addNode({ id: 'private-memory', visibility: 'private', weight: 10 })
graph.addEdge({ from: 'public-memory', to: 'private-memory', visibility: 'private' })
const redacted = graph.exportRedactedGraph()
if (redacted.nodes.some((node) => node.visibility === 'private')) errors.push('redacted graph exposed private node')
if (redacted.edges.some((edge) => edge.visibility === 'private')) errors.push('redacted graph exposed private edge')

const roomEntry = enterV6UniverseRoom({
  id: 'private-room',
  spatialPermission: 'private',
  semanticFallbackRequired: true,
}, 'viewer-1', audit)
if (roomEntry.allowed) errors.push('private universe room should require approval')
if (!roomEntry.semanticFallbackRequired) errors.push('universe room must keep semantic fallback')

const protocol = createV6OpenWorldProtocol('guyue-world-schema')
if (protocol.privateDataAccessible) errors.push('open protocol cannot expose private data')

const productionLive = evaluateV6ProductionLive({
  securityReviewPassed: true,
  privacyReviewPassed: true,
  browserSmokePassed: false,
  externalDeployPassed: false,
})
if (productionLive) errors.push('production live must remain false without deploy and smoke')

if (!audit.hasAction('world.discover')) errors.push('world discovery audit missing')
if (!audit.hasAction('agent-society.plan')) errors.push('agent society audit missing')
if (!audit.hasAction('universe.enter')) errors.push('universe entry audit missing')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 real implementation minimum proof passed.')
