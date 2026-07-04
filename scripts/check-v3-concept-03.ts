import breakdown from '../data/v3-concept/03-domain-service-task-breakdown.json'

const errors: string[] = []
const requiredModels = [
  'WorldMemory',
  'MemoryEdge',
  'Space',
  'SpaceBridge',
  'AiCompanionSession',
  'LifeArchiveEntry',
  'LegacyRule',
  'ExhibitionNode',
  'WorldBookExport',
  'GovernanceEvent',
]

for (const model of requiredModels) {
  if (!breakdown.domainModels.some((item) => item.name === model)) {
    errors.push(`missing model ${model}`)
  }
}

const requiredServices = [
  'memoryService',
  'graphService',
  'spaceService',
  'aiCompanionService',
  'legacyService',
  'worldbookService',
  'governanceService',
]

for (const service of requiredServices) {
  if (!breakdown.services.some((item) => item.name === service)) {
    errors.push(`missing service ${service}`)
  }
}

if (!breakdown.implementationOrder.includes('integration tests')) {
  errors.push('integration tests must be in implementation order')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 03 check passed.')
