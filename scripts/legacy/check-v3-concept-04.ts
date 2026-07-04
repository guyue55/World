import workflow from '../data/v3-concept/04-ai-capability-audit-workflow.json'

const errors: string[] = []

const forbiddenLayer = workflow.capabilityLayers.find((layer) => layer.level === 'L5')
if (!forbiddenLayer) errors.push('L5 forbidden layer missing')
if (!forbiddenLayer?.forbidden?.includes('自动发布')) errors.push('auto publish must be forbidden')
if (!forbiddenLayer?.forbidden?.includes('自动读取私密原文')) errors.push('raw private read must be forbidden')
if (!workflow.contextSafety.includes('no raw vault payload')) errors.push('no raw vault payload missing')
if (!workflow.auditWorkflow.includes('human review')) errors.push('human review missing')
if (!workflow.implementationTasks.includes('define AI usage cost guard')) errors.push('AI usage cost guard missing')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 04 check passed.')
